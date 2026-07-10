(function (global) {
  async function fetchJsonWithRetry(url, options = {}) {
    const retries = Number.isFinite(options.retries) ? options.retries : 2;
    const delayMs = Number.isFinite(options.delayMs) ? options.delayMs : 400;
    const headers = options.headers || {};

    let lastError = null;

    for (let attempt = 0; attempt <= retries; attempt += 1) {
      try {
        const response = await fetch(url, {
          headers: {
            Accept: 'application/json',
            ...headers,
          },
        });

        if (!response.ok) {
          const errorText = await response.text().catch(() => '');
          const retryable = [429, 403, 500, 502, 503, 504].includes(response.status);
          if (retryable && attempt < retries) {
            throw new Error(`HTTP ${response.status}${errorText ? `: ${errorText}` : ''}`);
          }
          throw new Error(`HTTP ${response.status}${errorText ? `: ${errorText}` : ''}`);
        }

        return await response.json();
      } catch (error) {
        lastError = error;
        if (attempt < retries) {
          await new Promise((resolve) => window.setTimeout(resolve, delayMs * (attempt + 1)));
        }
      }
    }

    throw lastError;
  }

  async function loadEntriesWithConcurrency(entries, task, concurrency = 8) {
    if (!Array.isArray(entries) || !entries.length) {
      return [];
    }

    const results = [];
    let nextIndex = 0;
    const workerCount = Math.min(concurrency, entries.length);

    const workers = Array.from({ length: workerCount }, async () => {
      while (nextIndex < entries.length) {
        const currentIndex = nextIndex;
        nextIndex += 1;
        try {
          results[currentIndex] = await task(entries[currentIndex], currentIndex);
        } catch (error) {
          results[currentIndex] = null;
        }
      }
    });

    await Promise.all(workers);
    return results.filter(Boolean);
  }

  function formatName(name) {
    if (!name) {
      return '';
    }

    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  function createPokemonEntry(pokemonData, speciesData, fallbackName, locale = 'fr') {
    const localizedName = speciesData?.names?.find((entry) => entry.language?.name === locale)?.name || formatName(pokemonData?.name || fallbackName || '');
    const types = (pokemonData?.types || []).map((entry) => entry.type?.name).filter(Boolean);

    return {
      id: pokemonData?.id ?? 0,
      name: pokemonData?.name || fallbackName || '',
      displayName: localizedName || formatName(fallbackName || ''),
      image: pokemonData?.sprites?.other?.['official-artwork']?.front_default || pokemonData?.sprites?.front_default || '',
      height: pokemonData?.height ?? 0,
      weight: pokemonData?.weight ?? 0,
      types,
    };
  }

  const lookupCache = new Map();

  async function fetchJsonMaybe(url, options = {}) {
    try {
      return await fetchJsonWithRetry(url, options);
    } catch (error) {
      return null;
    }
  }

  async function fetchPokemonByName(name, locale = 'fr') {
    const normalizedName = (name || '').trim();
    if (!normalizedName) {
      throw new Error('Pokemon name is required');
    }

    const cacheKey = normalizedName.toLowerCase();
    if (lookupCache.has(cacheKey)) {
      return lookupCache.get(cacheKey);
    }

    const directPokemonData = await fetchJsonMaybe(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(normalizedName)}`);
    if (directPokemonData?.species?.url) {
      const speciesData = await fetchJsonMaybe(directPokemonData.species.url);
      const result = {
        pokemonData: directPokemonData,
        speciesData,
        entry: createPokemonEntry(directPokemonData, speciesData, normalizedName, locale),
      };
      lookupCache.set(cacheKey, result);
      return result;
    }

    const speciesData = await fetchJsonMaybe(`https://pokeapi.co/api/v2/pokemon-species/${encodeURIComponent(normalizedName)}`);
    if (speciesData?.varieties?.length) {
      const variety = (speciesData.varieties || []).find((variant) => variant.is_default) || speciesData.varieties?.[0];
      const pokemonData = variety?.pokemon?.url ? await fetchJsonMaybe(variety.pokemon.url) : null;
      if (pokemonData) {
        const result = {
          pokemonData,
          speciesData,
          entry: createPokemonEntry(pokemonData, speciesData, normalizedName, locale),
        };
        lookupCache.set(cacheKey, result);
        return result;
      }
    }

    const catalogData = await fetchJsonMaybe('https://pokeapi.co/api/v2/pokemon-species?limit=1025');
    const catalogResults = catalogData?.results || [];

    for (const catalogEntry of catalogResults) {
      const candidateSpecies = await fetchJsonMaybe(catalogEntry.url);
      const candidateName = (candidateSpecies?.name || '').toLowerCase();
      const localizedNames = (candidateSpecies?.names || [])
        .map((entry) => entry?.name?.toLowerCase())
        .filter(Boolean);
      const searchTerms = [candidateName, ...localizedNames];
      const normalizedInput = normalizedName.toLowerCase();
      const matched = searchTerms.some((term) => term === normalizedInput || term.includes(normalizedInput) || normalizedInput.includes(term));

      if (!matched) {
        continue;
      }

      const variety = (candidateSpecies?.varieties || []).find((variant) => variant.is_default) || candidateSpecies?.varieties?.[0];
      const candidatePokemonData = variety?.pokemon?.url ? await fetchJsonMaybe(variety.pokemon.url) : null;
      if (candidatePokemonData) {
        const result = {
          pokemonData: candidatePokemonData,
          speciesData: candidateSpecies,
          entry: createPokemonEntry(candidatePokemonData, candidateSpecies, normalizedName, locale),
        };
        lookupCache.set(cacheKey, result);
        return result;
      }
    }

    throw new Error(`Pokemon not found: ${normalizedName}`);
  }

  const api = {
    fetchJsonWithRetry,
    loadEntriesWithConcurrency,
    createPokemonEntry,
    fetchPokemonByName,
  };

  global.PokemonApiUtils = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
