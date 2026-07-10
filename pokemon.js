const detailCard = document.getElementById('detail-card');
const backLink = document.querySelector('.back-link');
const searchInput = document.getElementById('pokemon-search');
const suggestionsList = document.getElementById('search-suggestions');
const languageToggle = document.getElementById('language-toggle');
const languageMenu = document.getElementById('language-menu');
const languageOptions = Array.from(document.querySelectorAll('.language-option'));
const navToggle = document.getElementById('nav-toggle');
const topNavMenu = document.getElementById('top-nav-menu');

const typeLabelMap = {
  fr: {
    normal: 'Normal', fire: 'Feu', water: 'Eau', electric: 'Électrik', grass: 'Plante', ice: 'Glace', fighting: 'Combat', poison: 'Poison', ground: 'Sol', flying: 'Vol', psychic: 'Psy', bug: 'Insecte', rock: 'Roche', ghost: 'Spectre', dragon: 'Dragon', dark: 'Ténèbres', steel: 'Acier', fairy: 'Fée',
  },
  en: {
    normal: 'Normal', fire: 'Fire', water: 'Water', electric: 'Electric', grass: 'Grass', ice: 'Ice', fighting: 'Fighting', poison: 'Poison', ground: 'Ground', flying: 'Flying', psychic: 'Psychic', bug: 'Bug', rock: 'Rock', ghost: 'Ghost', dragon: 'Dragon', dark: 'Dark', steel: 'Steel', fairy: 'Fairy',
  },
  es: {
    normal: 'Normal', fire: 'Fuego', water: 'Agua', electric: 'Eléctrico', grass: 'Planta', ice: 'Hielo', fighting: 'Lucha', poison: 'Veneno', ground: 'Tierra', flying: 'Volador', psychic: 'Psíquico', bug: 'Bicho', rock: 'Roca', ghost: 'Fantasma', dragon: 'Dragón', dark: 'Siniestro', steel: 'Acero', fairy: 'Hada',
  },
  de: {
    normal: 'Normal', fire: 'Feuer', water: 'Wasser', electric: 'Elektro', grass: 'Pflanze', ice: 'Eis', fighting: 'Kampf', poison: 'Gift', ground: 'Boden', flying: 'Flug', psychic: 'Psycho', bug: 'Käfer', rock: 'Gestein', ghost: 'Geist', dragon: 'Drache', dark: 'Unlicht', steel: 'Stahl', fairy: 'Fee',
  },
  it: {
    normal: 'Normale', fire: 'Fuoco', water: 'Acqua', electric: 'Elettro', grass: 'Erba', ice: 'Ghiaccio', fighting: 'Lotta', poison: 'Veleno', ground: 'Terra', flying: 'Volante', psychic: 'Psico', bug: 'Coleottero', rock: 'Roccia', ghost: 'Spettro', dragon: 'Drago', dark: 'Buio', steel: 'Acciaio', fairy: 'Folletto',
  },
};

const translations = {
  fr: {
    searchPlaceholder: 'Rechercher un Pokémon',
    suggestionsLabel: 'Suggestions',
    backLink: 'Retour au Pokédex',
    chooseLanguage: 'Choisir la langue',
    loading: 'Chargement du Pokémon…',
    noSelection: 'Aucun Pokémon sélectionné.',
    loadingFailed: 'Impossible de charger ce Pokémon.',
    height: 'Taille',
    weight: 'Poids',
    previousEvolution: 'Évolution précédente',
    nextEvolution: 'Évolution suivante',
    noPreviousEvolution: 'Aucune évolution précédente.',
    noNextEvolution: 'Aucune évolution suivante.',
  },
  en: {
    searchPlaceholder: 'Search for a Pokémon',
    suggestionsLabel: 'Suggestions',
    backLink: 'Back to Pokédex',
    chooseLanguage: 'Choose a language',
    loading: 'Loading Pokémon…',
    noSelection: 'No Pokémon selected.',
    loadingFailed: 'Unable to load this Pokémon.',
    height: 'Height',
    weight: 'Weight',
    previousEvolution: 'Previous evolution',
    nextEvolution: 'Next evolution',
    noPreviousEvolution: 'No previous evolution.',
    noNextEvolution: 'No next evolution.',
  },
  es: {
    searchPlaceholder: 'Buscar un Pokémon',
    suggestionsLabel: 'Sugerencias',
    backLink: 'Volver al Pokédex',
    chooseLanguage: 'Elegir idioma',
    loading: 'Cargando Pokémon…',
    noSelection: 'Ningún Pokémon seleccionado.',
    loadingFailed: 'No se puede cargar este Pokémon.',
    height: 'Altura',
    weight: 'Peso',
    previousEvolution: 'Evolución anterior',
    nextEvolution: 'Siguiente evolución',
    noPreviousEvolution: 'Sin evolución anterior.',
    noNextEvolution: 'Sin evolución posterior.',
  },
  de: {
    searchPlaceholder: 'Nach einem Pokémon suchen',
    suggestionsLabel: 'Vorschläge',
    backLink: 'Zurück zum Pokédex',
    chooseLanguage: 'Sprache wählen',
    loading: 'Pokémon wird geladen…',
    noSelection: 'Kein Pokémon ausgewählt.',
    loadingFailed: 'Dieses Pokémon konnte nicht geladen werden.',
    height: 'Größe',
    weight: 'Gewicht',
    previousEvolution: 'Vorherige Entwicklung',
    nextEvolution: 'Nächste Entwicklung',
    noPreviousEvolution: 'Keine vorherige Entwicklung.',
    noNextEvolution: 'Keine nächste Entwicklung.',
  },
  it: {
    searchPlaceholder: 'Cerca un Pokémon',
    suggestionsLabel: 'Suggerimenti',
    backLink: 'Torna al Pokédex',
    chooseLanguage: 'Scegli la lingua',
    loading: 'Caricamento Pokémon…',
    noSelection: 'Nessun Pokémon selezionato.',
    loadingFailed: 'Impossibile caricare questo Pokémon.',
    height: 'Altezza',
    weight: 'Peso',
    previousEvolution: 'Evoluzione precedente',
    nextEvolution: 'Evoluzione successiva',
    noPreviousEvolution: 'Nessuna evoluzione precedente.',
    noNextEvolution: 'Nessuna evoluzione successiva.',
  },
};

const languageLabels = {
  fr: { label: 'Français', flag: '🇫🇷' },
  en: { label: 'English', flag: '🇺🇸' },
  es: { label: 'Español', flag: '🇪🇸' },
  de: { label: 'Deutsch', flag: '🇩🇪' },
  it: { label: 'Italiano', flag: '🇮🇹' },
};

const flagImageMap = {
  fr: 'https://flagcdn.com/w20/fr.png',
  en: 'https://flagcdn.com/w20/us.png',
  es: 'https://flagcdn.com/w20/es.png',
  de: 'https://flagcdn.com/w20/de.png',
  it: 'https://flagcdn.com/w20/it.png',
};

const state = {
  locale: 'fr',
  autocompleteItems: [],
};

function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function normalizeLocale(locale) {
  const normalized = (locale || 'fr').toLowerCase().slice(0, 2);
  return Object.prototype.hasOwnProperty.call(translations, normalized) ? normalized : 'fr';
}

function getCurrentLocale() {
  const storedLocale = window.localStorage?.getItem('pokedex-locale');
  if (storedLocale) {
    return normalizeLocale(storedLocale);
  }

  return normalizeLocale(navigator.language || 'fr');
}

function getText(key) {
  return translations[state.locale]?.[key] || translations.fr[key] || key;
}

function getTypeName(typeName) {
  return typeLabelMap[state.locale]?.[typeName] || typeLabelMap.fr[typeName] || formatName(typeName);
}

function getPokemonNameFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('name');
}

function setPageTitle(pokemonName) {
  const title = pokemonName ? `Pokédex - ${pokemonName}` : 'Pokédex';
  document.title = title;
}

function getGenerationFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const generationParam = Number.parseInt(params.get('generation') || '1', 10);
  return Number.isFinite(generationParam) ? generationParam : 1;
}

function readPokemonNameMap() {
  try {
    const stored = window.localStorage?.getItem('pokemon-name-map');
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error(error);
    return {};
  }
}

function setLanguageMenuOpen(isOpen) {
  if (languageMenu) {
    languageMenu.classList.toggle('open', isOpen);
  }
  if (languageToggle) {
    languageToggle.classList.toggle('is-open', isOpen);
    languageToggle.setAttribute('aria-expanded', String(isOpen));
  }
}

function setTopNavMenuOpen(isOpen) {
  if (topNavMenu) {
    topNavMenu.classList.toggle('open', isOpen);
  }
  if (navToggle) {
    navToggle.setAttribute('aria-expanded', String(isOpen));
  }
}

function updateDetailPlaceholder() {
  const placeholder = document.querySelector('.detail-placeholder');
  if (placeholder) {
    placeholder.textContent = getText('loading');
  }
}

function updateLanguageControls() {
  if (languageToggle) {
    const currentLanguage = languageLabels[state.locale] || languageLabels.fr;
    const flag = languageToggle.querySelector('.language-flag');
    const text = languageToggle.querySelector('.language-text');

    if (flag) {
      flag.src = flagImageMap[state.locale] || flagImageMap.fr;
      flag.alt = currentLanguage.label;
    }

    if (text) {
      text.textContent = currentLanguage.label;
    }

    languageToggle.setAttribute('aria-label', getText('chooseLanguage'));
  }

  languageOptions.forEach((option) => {
    const isActive = option.dataset.locale === state.locale;
    option.classList.toggle('active', isActive);
    option.setAttribute('aria-pressed', String(isActive));
  });
}

function applyLocale(locale) {
  state.locale = normalizeLocale(locale);
  window.localStorage.setItem('pokedex-locale', state.locale);
  updateLanguageControls();
  updateDetailPlaceholder();
  document.documentElement.lang = state.locale;

  if (backLink) {
    backLink.innerHTML = `← ${getText('backLink')}`;
  }

  if (searchInput) {
    searchInput.placeholder = getText('searchPlaceholder') || 'Rechercher un Pokémon';
    searchInput.setAttribute('aria-label', getText('searchPlaceholder') || 'Rechercher un Pokémon');
    suggestionsList?.setAttribute('aria-label', translations[state.locale]?.suggestionsLabel || 'Suggestions');
    renderSuggestions(searchInput.value);
  }
}

async function loadAutocompleteItems() {
  const generationId = getGenerationFromUrl();

  try {
    const generationResponse = await fetch(`https://pokeapi.co/api/v2/generation/${generationId}`);
    const generationData = await generationResponse.json();
    const generationSpecies = generationData.pokemon_species || [];

    const items = await Promise.all(
      generationSpecies.map(async (speciesEntry) => {
        try {
          const { entry } = await window.PokemonApiUtils.fetchPokemonByName(speciesEntry.name, state.locale);

          return {
            name: entry.name,
            displayName: entry.displayName,
            image: entry.image,
            types: entry.types,
          };
        } catch (error) {
          return {
            name: speciesEntry.name,
            displayName: formatName(speciesEntry.name),
            image: '',
            types: [],
          };
        }
      })
    );

    state.autocompleteItems = items.sort((a, b) => a.displayName.localeCompare(b.displayName));
    renderSuggestions(searchInput?.value || '');
  } catch (error) {
    console.error(error);
  }
}

function renderSuggestions(query) {
  if (!suggestionsList || !searchInput) {
    return;
  }

  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery.length < 3) {
    suggestionsList.classList.remove('open');
    suggestionsList.innerHTML = '';
    return;
  }

  const matches = state.autocompleteItems.filter((pokemon) => {
    const searchable = `${pokemon.displayName} ${pokemon.name} ${pokemon.types.join(' ')}`.toLowerCase();
    return searchable.includes(normalizedQuery);
  }).slice(0, 8);

  if (!matches.length) {
    suggestionsList.classList.remove('open');
    suggestionsList.innerHTML = '';
    return;
  }

  suggestionsList.innerHTML = '';
  matches.forEach((pokemon) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.className = 'suggestion-item';
    link.href = `pokemon.html?name=${encodeURIComponent(pokemon.name)}${getGenerationFromUrl() > 1 ? `&generation=${getGenerationFromUrl()}` : ''}`;
    link.innerHTML = `
      <img class="suggestion-image" src="${pokemon.image || ''}" alt="" />
      <span class="suggestion-name">${pokemon.displayName}</span>
    `;
    item.appendChild(link);
    suggestionsList.appendChild(item);
  });

  suggestionsList.classList.add('open');
}

async function resolvePokemonName(inputName) {
  const rawName = inputName?.trim();

  if (!rawName) {
    return null;
  }

  const localMap = readPokemonNameMap();
  const normalizedInput = rawName.toLowerCase();

  if (localMap[normalizedInput]) {
    return localMap[normalizedInput];
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(normalizedInput)}`);

    if (response.ok) {
      const data = await response.json();
      return data.name;
    }
  } catch (error) {
    console.error(error);
  }

  try {
    const listResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const listData = await listResponse.json();

    for (const pokemon of listData.results || []) {
      const speciesResponse = await fetch(pokemon.url.replace('/pokemon/', '/pokemon-species/'));
      const speciesData = await speciesResponse.json();
      const frenchName = speciesData.names?.find((entry) => entry.language?.name === 'fr')?.name?.toLowerCase();

      if (frenchName === rawName.toLowerCase() || pokemon.name === rawName.toLowerCase()) {
        return pokemon.name;
      }
    }
  } catch (error) {
    console.error(error);
  }

  return rawName.toLowerCase();
}

async function loadPokemonDetails() {
  const resolvedName = await resolvePokemonName(getPokemonNameFromUrl());

  if (!resolvedName) {
    detailCard.innerHTML = `<p class="detail-placeholder">${getText('noSelection')}</p>`;
    return;
  }

  updateDetailPlaceholder();
  const incomingName = getPokemonNameFromUrl();
  const generationId = getGenerationFromUrl();

  if (backLink) {
    backLink.href = 'index.html';
    backLink.innerHTML = `← ${getText('backLink')}`;
  }

  if (incomingName?.trim()?.toLowerCase() !== resolvedName.toLowerCase()) {
    const url = new URL(window.location.href);
    url.searchParams.set('name', resolvedName);
    if (generationId > 1) {
      url.searchParams.set('generation', generationId);
    }
    window.history.replaceState({}, '', `${url.pathname}${url.search}`);
  }

  try {
    const { pokemonData: data, speciesData } = await window.PokemonApiUtils.fetchPokemonByName(resolvedName, state.locale);
    const localeCode = state.locale;
    const localizedName = speciesData.names?.find((entry) => entry.language?.name === localeCode)?.name || formatName(data.name);
    const types = (data.types || []).map((entry) => entry.type?.name).filter(Boolean);

    const evolutionChainUrl = speciesData.evolution_chain?.url;
    let before = [];
    let after = [];

    if (evolutionChainUrl) {
      const evolutionResponse = await fetch(evolutionChainUrl);
      const evolutionData = await evolutionResponse.json();

      const getLocalizedNameFromSpeciesUrl = async (speciesUrl, fallbackName = '') => {
        if (!speciesUrl) {
          return formatName(fallbackName);
        }

        const speciesResponse = await fetch(speciesUrl);
        const speciesEntry = await speciesResponse.json();
        return speciesEntry.names?.find((entry) => entry.language?.name === localeCode)?.name || formatName(speciesEntry.name || fallbackName);
      };

      const chainStages = [];
      const visit = async (node) => {
        if (node?.species?.name) {
          chainStages.push({
            slug: node.species.name || node.species.url?.split('/').filter(Boolean).pop() || '',
            displayName: await getLocalizedNameFromSpeciesUrl(node.species.url, node.species.name),
          });
        }

        for (const child of node?.evolves_to || []) {
          await visit(child);
        }
      };

      await visit(evolutionData.chain);

      const currentIndex = chainStages.findIndex((stage) => stage.slug === data.name);

      if (currentIndex > 0) {
        before = [chainStages[currentIndex - 1]];
      }

      if (currentIndex >= 0 && currentIndex < chainStages.length - 1) {
        after = [chainStages[currentIndex + 1]];
      }
    }

    setPageTitle(localizedName);

    detailCard.innerHTML = `
      <div class="detail-header">
        <div>
          <h3>${localizedName}</h3>
          <div class="type-row">
            ${types.map((typeName) => `<span class="type-pill ${typeName}">${getTypeName(typeName)}</span>`).join('')}
          </div>
        </div>
        <span class="badge">#${data.id.toString().padStart(3, '0')}</span>
      </div>
      <img class="detail-image" src="${data.sprites?.other?.['official-artwork']?.front_default || data.sprites?.front_default || ''}" alt="${localizedName}" />
      <div class="stats-grid">
        <div class="stat-box">
          <span>${getText('height')}</span>
          <strong>${(data.height / 10).toFixed(1)} m</strong>
        </div>
        <div class="stat-box">
          <span>${getText('weight')}</span>
          <strong>${(data.weight / 10).toFixed(1)} kg</strong>
        </div>
      </div>
      <div class="evolution-group">
        <h4>${getText('previousEvolution')}</h4>
        <div class="evolution-row">
          ${before.length ? before.map((stage) => `<a class="evolution-pill" href="pokemon.html?name=${encodeURIComponent(stage.slug)}${generationId > 1 ? `&generation=${generationId}` : ''}">${stage.displayName}</a>`).join('') : `<span class="detail-placeholder">${getText('noPreviousEvolution')}</span>`}
        </div>
      </div>
      <div class="evolution-group">
        <h4>${getText('nextEvolution')}</h4>
        <div class="evolution-row">
          ${after.length ? after.map((stage) => `<a class="evolution-pill" href="pokemon.html?name=${encodeURIComponent(stage.slug)}${generationId > 1 ? `&generation=${generationId}` : ''}">${stage.displayName}</a>`).join('') : `<span class="detail-placeholder">${getText('noNextEvolution')}</span>`}
        </div>
      </div>
    `;
  } catch (error) {
    console.error(error);
    detailCard.innerHTML = `<p class="detail-placeholder">${getText('loadingFailed')}</p>`;
  }
}

if (searchInput) {
  searchInput.addEventListener('input', (event) => {
    renderSuggestions(event.target.value);
  });

  searchInput.addEventListener('focus', () => {
    renderSuggestions(searchInput.value);
  });
}

if (navToggle) {
  navToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    setTopNavMenuOpen(!topNavMenu?.classList.contains('open'));
  });
}

if (languageToggle) {
  languageToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    setLanguageMenuOpen(!languageMenu?.classList.contains('open'));
  });
}

if (languageMenu) {
  languageMenu.addEventListener('click', (event) => {
    const selectedOption = event.target.closest('.language-option');
    if (!selectedOption) {
      return;
    }

    const locale = selectedOption.dataset.locale;
    if (locale) {
      applyLocale(locale);
      setLanguageMenuOpen(false);
      loadPokemonDetails();
      loadAutocompleteItems();
    }
  });
}

document.addEventListener('click', (event) => {
  if (!event.target.closest('.language-control') && !event.target.closest('.search-panel')) {
    setLanguageMenuOpen(false);
    if (suggestionsList) {
      suggestionsList.classList.remove('open');
      suggestionsList.innerHTML = '';
    }
  }
});

window.addEventListener('DOMContentLoaded', () => {
  state.locale = getCurrentLocale();
  applyLocale(state.locale);
  loadPokemonDetails();
  loadAutocompleteItems();
});
