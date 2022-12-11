export let pokemonList = [];
// let offset = 0;
const url = 'https://pokeapi.co/api/v2/pokemon/';

export const fetchPokemon = async (limit) => {
  for (let pokemonId = 1; pokemonId <= limit; pokemonId++) {
    await fetch(url + pokemonId)
      .then(response => response.json())
      .then(data => {
        let pokemon = {
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          id: data.id,
          sprite: data.sprites.other['official-artwork'].front_default,
        };

        pokemonList.push(pokemon);
      })
      .catch(err => console.error(err));
  }
};