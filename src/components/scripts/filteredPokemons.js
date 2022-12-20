export let search = "";

export const filterPokemonList = (pokemonList, searchInput) => {
  let filteredPokemonList = [];
  pokemonList.forEach(pokemon => {
    if (searchInput === "") {
      // If empty return all pokemon
      filteredPokemonList = pokemonList;
    } else if (pokemon.name.toLowerCase().includes(searchInput)) {
      // Filter by name
      filteredPokemonList.push(pokemon);
    } else if (pokemon.types.some(type => type.type.name.toLowerCase().includes(searchInput))) {
      // Filter by type
      filteredPokemonList.push(pokemon);
    } else if (pokemon.abilities.some(ability => ability.name.toLowerCase().includes(searchInput))) {
      // Filter by ability
      filteredPokemonList.push(pokemon);
    } else {
      // If no match return empty array
      filteredPokemonList = [];
    }
  });
  return filteredPokemonList;
};