const searchInput = document.getElementById('pokemon-search');
const suggestionsList = document.getElementById('search-suggestions');
const pokemonGrid = document.getElementById('pokemon-grid');
const resultsCount = document.getElementById('results-count');
const generationMenu = document.getElementById('generation-menu');
const pokemonSection = document.getElementById('pokemon-section');
const heroTitle = document.getElementById('hero-title');
const heroSubtitle = document.getElementById('hero-subtitle');
const generationLabel = document.getElementById('generation-label');
const generationHelper = document.getElementById('generation-helper');
const generationSectionTitle = document.getElementById('generation-section-title');
const searchLabel = document.getElementById('pokemon-search-label');
const welcomeBadge = document.getElementById('welcome-badge');
const welcomeTitle = document.getElementById('welcome-title');
const welcomeDescription = document.getElementById('welcome-description');
const languageToggle = document.getElementById('language-toggle');
const languageMenu = document.getElementById('language-menu');
const languageOptions = Array.from(document.querySelectorAll('.language-option'));
const navToggle = document.getElementById('nav-toggle');
const topNavMenu = document.getElementById('top-nav-menu');

const generationDefinitions = [
  {
    id: 1,
    iconicPokemon: '150',
    labels: {
      fr: { label: 'Génération 1', title: 'Première génération', subtitle: 'Découvrez les 151 Pokémon de la première génération.' },
      en: { label: 'Generation 1', title: 'First generation', subtitle: 'Discover the 151 Pokémon of the first generation.' },
      es: { label: 'Generación 1', title: 'Primera generación', subtitle: 'Descubre los 151 Pokémon de la primera generación.' },
      de: { label: 'Generation 1', title: 'Erste Generation', subtitle: 'Entdecke die 151 Pokémon der ersten Generation.' },
      it: { label: 'Generazione 1', title: 'Prima generazione', subtitle: 'Scopri i 151 Pokémon della prima generazione.' },
    },
  },
  {
    id: 2,
    iconicPokemon: '157',
    labels: {
      fr: { label: 'Génération 2', title: 'Deuxième génération', subtitle: 'Découvrez les 100 Pokémon de la deuxième génération.' },
      en: { label: 'Generation 2', title: 'Second generation', subtitle: 'Discover the 100 Pokémon of the second generation.' },
      es: { label: 'Generación 2', title: 'Segunda generación', subtitle: 'Descubre los 100 Pokémon de la segunda generación.' },
      de: { label: 'Generation 2', title: 'Zweite Generation', subtitle: 'Entdecke die 100 Pokémon der zweiten Generation.' },
      it: { label: 'Generazione 2', title: 'Seconda generazione', subtitle: 'Scopri i 100 Pokémon della seconda generazione.' },
    },
  },
  {
    id: 3,
    iconicPokemon: '373',
    labels: {
      fr: { label: 'Génération 3', title: 'Troisième génération', subtitle: 'Découvrez les 135 Pokémon de la troisième génération.' },
      en: { label: 'Generation 3', title: 'Third generation', subtitle: 'Discover the 135 Pokémon of the third generation.' },
      es: { label: 'Generación 3', title: 'Tercera generación', subtitle: 'Descubre los 135 Pokémon de la tercera generación.' },
      de: { label: 'Generation 3', title: 'Dritte Generation', subtitle: 'Entdecke die 135 Pokémon der dritten Generation.' },
      it: { label: 'Generazione 3', title: 'Terza generazione', subtitle: 'Scopri i 135 Pokémon della terza generazione.' },
    },
  },
  {
    id: 4,
    iconicPokemon: '445',
    labels: {
      fr: { label: 'Génération 4', title: 'Quatrième génération', subtitle: 'Découvrez les 107 Pokémon de la quatrième génération.' },
      en: { label: 'Generation 4', title: 'Fourth generation', subtitle: 'Discover the 107 Pokémon of the fourth generation.' },
      es: { label: 'Generación 4', title: 'Cuarta generación', subtitle: 'Descubre los 107 Pokémon de la cuarta generación.' },
      de: { label: 'Generation 4', title: 'Vierte Generation', subtitle: 'Entdecke die 107 Pokémon der vierten Generation.' },
      it: { label: 'Generazione 4', title: 'Quarta generazione', subtitle: 'Scopri i 107 Pokémon della quarta generazione.' },
    },
  },
  {
    id: 5,
    iconicPokemon: '646',
    labels: {
      fr: { label: 'Génération 5', title: 'Cinquième génération', subtitle: 'Découvrez les 156 Pokémon de la cinquième génération.' },
      en: { label: 'Generation 5', title: 'Fifth generation', subtitle: 'Discover the 156 Pokémon of the fifth generation.' },
      es: { label: 'Generación 5', title: 'Quinta generación', subtitle: 'Descubre los 156 Pokémon de la quinta generación.' },
      de: { label: 'Generation 5', title: 'Fünfte Generation', subtitle: 'Entdecke die 156 Pokémon der fünften Generation.' },
      it: { label: 'Generazione 5', title: 'Quinta generazione', subtitle: 'Scopri i 156 Pokémon della quinta generazione.' },
    },
  },
  {
    id: 6,
    iconicPokemon: '658',
    labels: {
      fr: { label: 'Génération 6', title: 'Sixième génération', subtitle: 'Découvrez les 72 Pokémon de la sixième génération.' },
      en: { label: 'Generation 6', title: 'Sixth generation', subtitle: 'Discover the 72 Pokémon of the sixth generation.' },
      es: { label: 'Generación 6', title: 'Sexta generación', subtitle: 'Descubre los 72 Pokémon de la sexta generación.' },
      de: { label: 'Generation 6', title: 'Sechste Generation', subtitle: 'Entdecke die 72 Pokémon der sechsten Generation.' },
      it: { label: 'Generazione 6', title: 'Sesta generazione', subtitle: 'Scopri i 72 Pokémon della sesta generazione.' },
    },
  },
  {
    id: 7,
    iconicPokemon: '727',
    labels: {
      fr: { label: 'Génération 7', title: 'Septième génération', subtitle: 'Découvrez les 88 Pokémon de la septième génération.' },
      en: { label: 'Generation 7', title: 'Seventh generation', subtitle: 'Discover the 88 Pokémon of the seventh generation.' },
      es: { label: 'Generación 7', title: 'Séptima generación', subtitle: 'Descubre los 88 Pokémon de la séptima generación.' },
      de: { label: 'Generation 7', title: 'Siebte Generation', subtitle: 'Entdecke die 88 Pokémon der siebten Generation.' },
      it: { label: 'Generazione 7', title: 'Settima generazione', subtitle: 'Scopri gli 88 Pokémon della settima generazione.' },
    },
  },
  {
    id: 8,
    iconicPokemon: '898',
    labels: {
      fr: { label: 'Génération 8', title: 'Huitième génération', subtitle: 'Découvrez les 96 Pokémon de la huitième génération.' },
      en: { label: 'Generation 8', title: 'Eighth generation', subtitle: 'Discover the 96 Pokémon of the eighth generation.' },
      es: { label: 'Generación 8', title: 'Octava generación', subtitle: 'Descubre los 96 Pokémon de la octava generación.' },
      de: { label: 'Generation 8', title: 'Achte Generation', subtitle: 'Entdecke die 96 Pokémon der achten Generation.' },
      it: { label: 'Generazione 8', title: 'Ottava generazione', subtitle: 'Scopri i 96 Pokémon dell’ottava generazione.' },
    },
  },
  {
    id: 9,
    iconicPokemon: '1009',
    labels: {
      fr: { label: 'Génération 9', title: 'Neuvième génération', subtitle: 'Découvrez les 103 Pokémon de la neuvième génération.' },
      en: { label: 'Generation 9', title: 'Ninth generation', subtitle: 'Discover the 103 Pokémon of the ninth generation.' },
      es: { label: 'Generación 9', title: 'Novena generación', subtitle: 'Descubre los 103 Pokémon de la novena generación.' },
      de: { label: 'Generation 9', title: 'Neunte Generation', subtitle: 'Entdecke die 103 Pokémon der neunten Generation.' },
      it: { label: 'Generazione 9', title: 'Nona generazione', subtitle: 'Scopri i 103 Pokémon della nona generazione.' },
    },
  },
];

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
    generationHelper: 'Choisissez une génération',
    generationsTitle: 'Générations',
    generationLabel: 'Génération',
    navToggleLabel: 'Ouvrir le menu',
    chooseLanguage: 'Choisir la langue',
    chooseGeneration: 'Choisis une génération',
    selectionPrompt: 'Sélectionne une génération pour voir les Pokémon',
    welcomeBadge: '✨ L’aventure commence',
    welcomeTitle: 'Choisis ton époque Pokémon',
    welcomeDescription: 'Parcours le Pokédex génération par génération, découvre les créatures emblématiques de chaque époque et plonge dans l’univers de ta région préférée.',
    loading: 'Chargement...',
    loadingFailed: 'Le chargement a échoué.',
    noResults: 'Aucun Pokémon ne correspond à votre recherche.',
    resultsCount: '{count} Pokémon',
  },
  en: {
    searchPlaceholder: 'Search for a Pokémon',
    suggestionsLabel: 'Suggestions',
    generationHelper: 'Choose a generation',
    generationsTitle: 'Generations',
    generationLabel: 'Generation',
    navToggleLabel: 'Open menu',
    chooseLanguage: 'Choose a language',
    chooseGeneration: 'Choose a generation',
    selectionPrompt: 'Select a generation to see the Pokémon',
    welcomeBadge: '✨ The adventure begins',
    welcomeTitle: 'Choose your Pokémon era',
    welcomeDescription: 'Explore the Pokédex generation by generation, discover the iconic creatures of each era, and dive into the world of your favorite region.',
    loading: 'Loading...',
    loadingFailed: 'The loading failed.',
    noResults: 'No Pokémon match your search.',
    resultsCount: '{count} Pokémon',
  },
  es: {
    searchPlaceholder: 'Buscar un Pokémon',
    suggestionsLabel: 'Sugerencias',
    generationHelper: 'Elige una generación',
    generationsTitle: 'Generaciones',
    generationLabel: 'Generación',
    navToggleLabel: 'Abrir menú',
    chooseLanguage: 'Elegir idioma',
    chooseGeneration: 'Elige una generación',
    selectionPrompt: 'Selecciona una generación para ver los Pokémon',
    welcomeBadge: '✨ La aventura comienza',
    welcomeTitle: 'Elige tu era Pokémon',
    welcomeDescription: 'Explora la Pokédex generación tras generación, descubre las criaturas icónicas de cada época y sumérgete en el universo de tu región favorita.',
    loading: 'Cargando...',
    loadingFailed: 'La carga falló.',
    noResults: 'Ningún Pokémon coincide con tu búsqueda.',
    resultsCount: '{count} Pokémon',
  },
  de: {
    searchPlaceholder: 'Nach einem Pokémon suchen',
    suggestionsLabel: 'Vorschläge',
    generationHelper: 'Wähle eine Generation',
    generationsTitle: 'Generationen',
    generationLabel: 'Generation',
    navToggleLabel: 'Menü öffnen',
    chooseLanguage: 'Sprache wählen',
    chooseGeneration: 'Wähle eine Generation',
    selectionPrompt: 'Wähle eine Generation, um die Pokémon zu sehen',
    welcomeBadge: '✨ Das Abenteuer beginnt',
    welcomeTitle: 'Wähle deine Pokémon-Ära',
    welcomeDescription: 'Erkunde die Pokédex generationenweise, entdecke die ikonischen Kreaturen jeder Ära und tauche in die Welt deiner Lieblingsregion ein.',
    loading: 'Lädt...',
    loadingFailed: 'Das Laden ist fehlgeschlagen.',
    noResults: 'Kein Pokémon passt zu deiner Suche.',
    resultsCount: '{count} Pokémon',
  },
  it: {
    searchPlaceholder: 'Cerca un Pokémon',
    suggestionsLabel: 'Suggerimenti',
    generationHelper: 'Scegli una generazione',
    generationsTitle: 'Generazioni',
    generationLabel: 'Generazione',
    navToggleLabel: 'Apri menu',
    chooseLanguage: 'Scegli la lingua',
    chooseGeneration: 'Scegli una generazione',
    selectionPrompt: 'Seleziona una generazione per vedere i Pokémon',
    welcomeBadge: '✨ L’avventura inizia',
    welcomeTitle: 'Scegli la tua era Pokémon',
    welcomeDescription: 'Esplora la Pokédex generazione dopo generazione, scopri le creature iconiche di ogni epoca e immergiti nel mondo della tua regione preferita.',
    loading: 'Caricamento...',
    loadingFailed: 'Il caricamento è fallito.',
    noResults: 'Nessun Pokémon corrisponde alla tua ricerca.',
    resultsCount: '{count} Pokémon',
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
  pokemonList: [],
  filteredList: [],
  currentGeneration: 1,
  hasSelectedGeneration: false,
  locale: 'fr',
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

function getApiLocale(locale) {
  return locale;
}

function getText(key) {
  return translations[state.locale]?.[key] || translations.fr[key] || key;
}

function getGenerationMeta(generationId) {
  const meta = generationDefinitions.find((entry) => entry.id === generationId) || generationDefinitions[0];
  const labels = meta.labels[state.locale] || meta.labels.fr;
  return { ...meta, ...labels };
}

function getCurrentGenerationId() {
  const params = new URLSearchParams(window.location.search);
  const generationParam = Number.parseInt(params.get('generation') || '1', 10);

  if (Number.isFinite(generationParam) && generationParam >= 1 && generationParam <= generationDefinitions.length) {
    return generationParam;
  }

  return 1;
}

function getTypeName(typeName) {
  return typeLabelMap[state.locale]?.[typeName] || typeLabelMap.fr[typeName] || formatName(typeName);
}

function persistPokemonNameMap(list) {
  try {
    const map = {};
    list.forEach((pokemon) => {
      map[pokemon.name.toLowerCase()] = pokemon.name;
      map[pokemon.displayName.toLowerCase()] = pokemon.name;
    });
    window.localStorage.setItem('pokemon-name-map', JSON.stringify(map));
  } catch (error) {
    console.error(error);
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

function updateHero() {
  const meta = getGenerationMeta(state.currentGeneration);
  if (heroTitle) {
    heroTitle.textContent = 'Pokédex';
  }
  if (heroSubtitle) {
    heroSubtitle.textContent = '';
  }
  if (generationLabel) {
    generationLabel.textContent = state.hasSelectedGeneration ? meta.label : getText('chooseGeneration');
  }
  if (generationHelper) {
    generationHelper.textContent = getText('generationHelper');
  }
  if (generationSectionTitle) {
    generationSectionTitle.textContent = getText('generationsTitle');
  }
  if (searchLabel) {
    searchLabel.textContent = getText('searchPlaceholder');
  }
  if (welcomeBadge) {
    welcomeBadge.textContent = getText('welcomeBadge');
  }
  if (welcomeTitle) {
    welcomeTitle.textContent = getText('welcomeTitle');
  }
  if (welcomeDescription) {
    welcomeDescription.textContent = getText('welcomeDescription');
  }
  if (resultsCount) {
    resultsCount.textContent = state.hasSelectedGeneration
      ? getText('resultsCount').replace('{count}', state.pokemonList.length)
      : getText('selectionPrompt');
  }
  if (navToggle) {
    navToggle.setAttribute('aria-label', getText('navToggleLabel'));
  }
  searchInput.placeholder = getText('searchPlaceholder');
  searchInput.setAttribute('aria-label', getText('searchPlaceholder'));
  suggestionsList.setAttribute('aria-label', getText('suggestionsLabel'));
  document.title = 'Pokédex';
  document.documentElement.lang = state.locale;
}

function showPokemonSection(visible) {
  if (pokemonSection) {
    pokemonSection.classList.toggle('is-hidden', !visible);
  }

  if (!visible) {
    if (resultsCount) {
      resultsCount.textContent = getText('selectionPrompt');
    }
    if (generationLabel) {
      generationLabel.textContent = getText('chooseGeneration');
    }
  }
}

function renderGenerationMenu() {
  generationMenu.innerHTML = '';

  generationDefinitions.forEach((meta) => {
    const labels = meta.labels[state.locale] || meta.labels.fr;
    const card = document.createElement('a');
    card.className = `generation-card${state.hasSelectedGeneration && meta.id === state.currentGeneration ? ' active' : ''}`;
    card.href = `generation.html?generation=${meta.id}`;
    card.innerHTML = `
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${meta.iconicPokemon}.png" alt="${labels.title}" />
      <div>
        <strong>${labels.title}</strong>
      </div>
    `;
    generationMenu.appendChild(card);
  });
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
    card.href = `pokemon.html?name=${encodeURIComponent(pokemon.name)}${state.currentGeneration > 1 ? `&generation=${state.currentGeneration}` : ''}`;
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
  const localizedName = speciesData.names?.find((entry) => entry.language?.name === getApiLocale(state.locale))?.name || formatName(pokemonData.name);
  const types = (pokemonData.types || []).map((entry) => entry.type?.name).filter(Boolean);

  return {
    id: pokemonData.id,
    name: pokemonData.name,
    displayName: localizedName,
    image: pokemonData.sprites?.other?.['official-artwork']?.front_default || pokemonData.sprites?.front_default || '',
    height: pokemonData.height ?? 0,
    weight: pokemonData.weight ?? 0,
    types,
  };
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

  const response = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=1025');
  const data = await response.json();
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

  const items = Array.isArray(sourceList) ? sourceList : [];
  const matches = items.filter((pokemon) => {
    const searchable = `${pokemon.displayName || ''} ${pokemon.name || ''} ${Array.isArray(pokemon.types) ? pokemon.types.join(' ') : ''}`.toLowerCase();
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
    link.href = `pokemon.html?name=${encodeURIComponent(pokemon.name)}${state.hasSelectedGeneration ? `&generation=${state.currentGeneration}` : ''}`;
    link.innerHTML = `
      <img class="suggestion-image" src="${pokemon.image || ''}" alt="" />
      <span class="suggestion-name">${pokemon.displayName}</span>
    `;
    item.appendChild(link);
    suggestionsList.appendChild(item);
  });

  suggestionsList.classList.add('open');
}

function applyLocale(locale) {
  state.locale = normalizeLocale(locale);
  window.localStorage.setItem('pokedex-locale', state.locale);
  updateLanguageControls();
  updateHero();
  renderGenerationMenu();

  if (state.searchQuery) {
    renderCards(state.filteredList);
    renderSuggestions(searchInput.value, state.filteredList);
  } else if (state.hasSelectedGeneration && state.pokemonList.length) {
    resultsCount.textContent = getText('resultsCount').replace('{count}', state.pokemonList.length);
    renderCards(state.filteredList);
    renderSuggestions(searchInput.value, state.pokemonList);
  }
}

function selectGeneration(generationId, { updateUrl = true, loadPokemon = true } = {}) {
  state.currentGeneration = generationId;
  state.hasSelectedGeneration = true;
  updateHero();
  renderGenerationMenu();
  showPokemonSection(true);

  if (updateUrl) {
    const params = new URLSearchParams(window.location.search);
    params.set('generation', String(generationId));
    const nextUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', nextUrl);
  }

  if (loadPokemon) {
    loadGenerationPokemon(generationId).catch((error) => {
      console.error(error);
      pokemonGrid.innerHTML = `<p class="detail-placeholder">${getText('loadingFailed')}</p>`;
    });
  }
}

async function loadGenerationPokemon(generationId) {
  state.currentGeneration = generationId;
  state.hasSelectedGeneration = true;
  updateHero();
  renderGenerationMenu();
  showPokemonSection(true);

  resultsCount.textContent = getText('loading');
  const generationResponse = await fetch(`https://pokeapi.co/api/v2/generation/${generationId}`);
  const generationData = await generationResponse.json();
  const generationSpecies = generationData.pokemon_species || [];

  const pokemonList = await Promise.all(
    generationSpecies.map(async (speciesEntry) => {
      try {
        const [speciesResponse, pokemonResponse] = await Promise.all([
          fetch(speciesEntry.url),
          fetch(`https://pokeapi.co/api/v2/pokemon/${speciesEntry.name}`),
        ]);

        const [speciesData, pokemonData] = await Promise.all([speciesResponse.json(), pokemonResponse.json()]);
        const localizedName = speciesData.names?.find((entry) => entry.language?.name === getApiLocale(state.locale))?.name || formatName(speciesEntry.name);
        const types = (pokemonData.types || []).map((entry) => entry.type?.name).filter(Boolean);

        return {
          id: pokemonData.id,
          name: pokemonData.name,
          displayName: localizedName,
          image: pokemonData.sprites?.other?.['official-artwork']?.front_default || pokemonData.sprites?.front_default || '',
          height: pokemonData.height ?? 0,
          weight: pokemonData.weight ?? 0,
          types,
        };
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
    })
  );

  state.pokemonList = pokemonList.sort((a, b) => a.id - b.id).filter((pokemon) => pokemon.id > 0);
  state.filteredList = [...state.pokemonList];
  persistPokemonNameMap(state.pokemonList);
  resultsCount.textContent = getText('resultsCount').replace('{count}', state.pokemonList.length);
  renderCards(state.filteredList);
  renderSuggestions(searchInput.value);
}

searchInput.addEventListener('input', async (event) => {
  const query = event.target.value;
  const normalizedQuery = query.trim().toLowerCase();
  state.searchQuery = normalizedQuery;

  if (normalizedQuery.length < 3) {
    state.filteredList = [...state.pokemonList];
    if (state.hasSelectedGeneration) {
      resultsCount.textContent = getText('resultsCount').replace('{count}', state.pokemonList.length);
      renderCards(state.filteredList);
      renderSuggestions(query, state.pokemonList);
    } else {
      showPokemonSection(false);
      resultsCount.textContent = getText('selectionPrompt');
      pokemonGrid.innerHTML = '';
      suggestionsList.classList.remove('open');
      suggestionsList.innerHTML = '';
    }
    return;
  }

  if (state.hasSelectedGeneration) {
    showPokemonSection(true);
    const suggestionSource = state.filteredList.length ? state.filteredList : state.pokemonList;
    renderSuggestions(query, suggestionSource);
    return;
  }

  try {
    const catalog = await loadAllPokemonCatalog();
    const matchedNames = catalog.filter((pokemon) => {
      const name = pokemon.name || '';
      return name.includes(normalizedQuery) || normalizedQuery.includes(name);
    }).slice(0, 20);
    const results = await Promise.all(matchedNames.map(async (pokemon) => fetchPokemonDetails(pokemon.name)));
    const suggestionSource = results.filter(Boolean).sort((a, b) => a.id - b.id);
    renderSuggestions(query, suggestionSource);
  } catch (error) {
    console.error(error);
    suggestionsList.classList.remove('open');
    suggestionsList.innerHTML = '';
  }
});

searchInput.addEventListener('focus', () => renderSuggestions(searchInput.value, state.searchQuery ? state.filteredList : state.pokemonList));

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

if (generationMenu) {
  generationMenu.addEventListener('click', (event) => {
    const selectedGeneration = event.target.closest('button[data-generation]');
    if (!selectedGeneration) {
      return;
    }

    const generationId = Number.parseInt(selectedGeneration.dataset.generation, 10);
    if (Number.isFinite(generationId)) {
      selectGeneration(generationId);
    }
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
      if (state.hasSelectedGeneration) {
        loadGenerationPokemon(state.currentGeneration).catch((error) => {
          console.error(error);
          pokemonGrid.innerHTML = `<p class="detail-placeholder">${getText('loadingFailed')}</p>`;
        });
      }
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
  const hasGenerationParam = window.location.search.includes('generation=');

  if (hasGenerationParam) {
    window.location.replace(`generation.html${window.location.search}`);
    return;
  }

  const generationId = getCurrentGenerationId();
  state.currentGeneration = generationId;
  state.hasSelectedGeneration = false;
  applyLocale(getCurrentLocale());
  showPokemonSection(false);
});
