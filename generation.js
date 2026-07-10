const searchInput = document.getElementById('pokemon-search');
const suggestionsList = document.getElementById('search-suggestions');
const pokemonGrid = document.getElementById('pokemon-grid');
const resultsCount = document.getElementById('results-count');
const generationLabel = document.getElementById('generation-label');
const searchLabel = document.getElementById('pokemon-search-label');
const backLink = document.querySelector('.back-link');
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
    chooseLanguage: 'Choisir la langue',
    backLink: 'Retour au Pokédex',
    generationLabel: 'Génération',
    navToggleLabel: 'Ouvrir le menu',
    loading: 'Chargement...',
    loadingFailed: 'Le chargement a échoué.',
    resultsCount: '{count} Pokémon',
    noResults: 'Aucun Pokémon ne correspond à votre recherche.',
  },
  en: {
    searchPlaceholder: 'Search for a Pokémon',
    suggestionsLabel: 'Suggestions',
    chooseLanguage: 'Choose a language',
    backLink: 'Back to Pokédex',
    generationLabel: 'Generation',
    navToggleLabel: 'Open menu',
    loading: 'Loading...',
    loadingFailed: 'The loading failed.',
    resultsCount: '{count} Pokémon',
    noResults: 'No Pokémon match your search.',
  },
  es: {
    searchPlaceholder: 'Buscar un Pokémon',
    suggestionsLabel: 'Sugerencias',
    chooseLanguage: 'Elegir idioma',
    backLink: 'Volver al Pokédex',
    generationLabel: 'Generación',
    navToggleLabel: 'Abrir menú',
    loading: 'Cargando...',
    loadingFailed: 'La carga falló.',
    resultsCount: '{count} Pokémon',
    noResults: 'Ningún Pokémon coincide con tu búsqueda.',
  },
  de: {
    searchPlaceholder: 'Nach einem Pokémon suchen',
    suggestionsLabel: 'Vorschläge',
    chooseLanguage: 'Sprache wählen',
    backLink: 'Zurück zum Pokédex',
    generationLabel: 'Generation',
    navToggleLabel: 'Menü öffnen',
    loading: 'Lädt...',
    loadingFailed: 'Das Laden ist fehlgeschlagen.',
    resultsCount: '{count} Pokémon',
    noResults: 'Kein Pokémon passt zu deiner Suche.',
  },
  it: {
    searchPlaceholder: 'Cerca un Pokémon',
    suggestionsLabel: 'Suggerimenti',
    chooseLanguage: 'Scegli la lingua',
    backLink: 'Torna al Pokédex',
    generationLabel: 'Generazione',
    navToggleLabel: 'Apri menu',
    loading: 'Caricamento...',
    loadingFailed: 'Il caricamento è fallito.',
    resultsCount: '{count} Pokémon',
    noResults: 'Nessun Pokémon corrisponde alla tua ricerca.',
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
  pokemonList: [],
  filteredList: [],
  currentGeneration: 1,
  allPokemonCatalog: [],
  searchQuery: '',
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

function getGenerationFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const generationParam = Number.parseInt(params.get('generation') || '1', 10);
  return Number.isFinite(generationParam) ? generationParam : 1;
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
  if (searchInput) {
    searchInput.placeholder = getText('searchPlaceholder');
    searchInput.setAttribute('aria-label', getText('searchPlaceholder'));
    suggestionsList?.setAttribute('aria-label', getText('suggestionsLabel'));
  }
  if (searchLabel) {
    searchLabel.textContent = getText('searchPlaceholder');
  }
  if (backLink) {
    backLink.innerHTML = `← ${getText('backLink')}`;
  }
  if (generationLabel) {
    generationLabel.textContent = `${getText('generationLabel')} ${state.currentGeneration || getGenerationFromUrl()}`;
  }
  if (navToggle) {
    navToggle.setAttribute('aria-label', getText('navToggleLabel'));
  }
  renderCards(state.filteredList);
  renderSuggestions(searchInput.value, state.searchQuery ? state.filteredList : state.pokemonList);
}

function renderCards(list) {
  pokemonGrid.innerHTML = '';

  if (!list.length) {
    pokemonGrid.innerHTML = `<p class="detail-placeholder">${getText('noResults')}</p>`;
    return;
  }

  list.forEach((pokemon) => {
    const card = document.createElement('a');
    card.className = 'pokemon-card';
    card.href = `pokemon.html?name=${encodeURIComponent(pokemon.name)}&generation=${state.currentGeneration}`;
    card.innerHTML = `
      <img src="${pokemon.image}" alt="${pokemon.displayName}" />
      <div class="card-copy">
        <strong>#${pokemon.id.toString().padStart(3, '0')} ${pokemon.displayName}</strong>
        <div class="type-row">
          ${pokemon.types.map((typeName) => `<span class="type-pill ${typeName}">${getTypeName(typeName)}</span>`).join('')}
        </div>
      </div>
    `;

    pokemonGrid.appendChild(card);
  });
}

function buildPokemonEntry(pokemonData, speciesData) {
  return window.PokemonApiUtils.createPokemonEntry(pokemonData, speciesData, '', state.locale);
}

async function resolvePokemonSearchTarget(inputName) {
  try {
    const result = await window.PokemonApiUtils.fetchPokemonByName(inputName, state.locale);
    return result?.entry || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function fetchPokemonDetails(name) {
  try {
    return await resolvePokemonSearchTarget(name);
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function loadAllPokemonCatalog() {
  if (state.allPokemonCatalog.length) {
    return state.allPokemonCatalog;
  }

  const data = await window.PokemonApiUtils.fetchJsonWithRetry('https://pokeapi.co/api/v2/pokemon?limit=1025');
  state.allPokemonCatalog = (data.results || []).map((entry) => ({
    name: entry.name,
    url: entry.url,
  }));

  return state.allPokemonCatalog;
}

function renderSuggestions(query, sourceList = state.pokemonList) {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery.length < 3) {
    suggestionsList.classList.remove('open');
    suggestionsList.innerHTML = '';
    return;
  }

  const matches = sourceList.filter((pokemon) => {
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
    link.href = `pokemon.html?name=${encodeURIComponent(pokemon.name)}&generation=${state.currentGeneration}`;
    link.innerHTML = `
      <img class="suggestion-image" src="${pokemon.image || ''}" alt="" />
      <span class="suggestion-name">${pokemon.displayName}</span>
    `;
    item.appendChild(link);
    suggestionsList.appendChild(item);
  });

  suggestionsList.classList.add('open');
}

async function loadGenerationPokemon(generationId) {
  state.currentGeneration = generationId;
  resultsCount.textContent = getText('loading');

  const generationResponse = await fetch(`https://pokeapi.co/api/v2/generation/${generationId}`);
  const generationData = await generationResponse.json();
  const generationSpecies = generationData.pokemon_species || [];

  generationLabel.textContent = `${getText('generationLabel')} ${generationId}`;

  const pokemonList = await window.PokemonApiUtils.loadEntriesWithConcurrency(generationSpecies, async (speciesEntry) => {
    try {
      const { entry } = await window.PokemonApiUtils.fetchPokemonByName(speciesEntry.name, state.locale);
      return entry;
    } catch (error) {
      return {
        id: 0,
        name: speciesEntry.name,
        displayName: formatName(speciesEntry.name),
        image: '',
        height: 0,
        weight: 0,
        types: [],
      };
    }
  }, 8);

  state.pokemonList = pokemonList.sort((a, b) => a.id - b.id).filter((pokemon) => pokemon.id > 0);
  state.filteredList = [...state.pokemonList];
  state.searchQuery = '';
  resultsCount.textContent = getText('resultsCount').replace('{count}', state.pokemonList.length);
  renderCards(state.filteredList);
  renderSuggestions(searchInput.value, state.pokemonList);
}

searchInput.addEventListener('input', (event) => {
  const query = event.target.value;
  const normalizedQuery = query.trim().toLowerCase();
  state.searchQuery = normalizedQuery;

  if (normalizedQuery.length < 3) {
    state.filteredList = [...state.pokemonList];
    resultsCount.textContent = getText('resultsCount').replace('{count}', state.pokemonList.length);
    renderCards(state.filteredList);
    renderSuggestions(query, state.pokemonList);
    return;
  }

  pokemonGrid.innerHTML = '';
  renderSuggestions(query, state.pokemonList);
});

searchInput.addEventListener('focus', () => renderSuggestions(searchInput.value));

document.addEventListener('click', (event) => {
  if (!event.target.closest('.search-panel')) {
    suggestionsList.classList.remove('open');
    suggestionsList.innerHTML = '';
  }
});

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
    }
  });
}

document.addEventListener('click', (event) => {
  if (!event.target.closest('.language-control')) {
    setLanguageMenuOpen(false);
  }

  if (!event.target.closest('.top-nav')) {
    setTopNavMenuOpen(false);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const generationId = getGenerationFromUrl();
  state.currentGeneration = generationId;
  applyLocale(getCurrentLocale());
  loadGenerationPokemon(generationId).catch((error) => {
    console.error(error);
    pokemonGrid.innerHTML = `<p class="detail-placeholder">${getText('loadingFailed')}</p>`;
  });
});
