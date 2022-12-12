export let pokemonList = [];
// let offset = 0;
const url = 'https://pokeapi.co/api/v2/';

export const fetchPokemon = async (limit) => {
  for (let pokemonId = 1; pokemonId <= limit; pokemonId++) {
    await fetch(url + "pokemon/" + pokemonId)
      .then(response => response.json())
      .then(data => {
        // Fetch evolution chain using species url
        fetch(data.species.url)
          .then(response => response.json())
          .then(data => {
            // Fetch evolution chain
            fetch(data.evolution_chain.url)
              .then(response => response.json())
              .then(data => {
                let evolutionChain = [];
                evolutionChain.push(data.chain.species.name);
                if (data.chain.evolves_to.length > 0) {
                  evolutionChain.push(data.chain.evolves_to[0].species.name);
                  if (data.chain.evolves_to[0].evolves_to.length > 0) {
                    evolutionChain.push(data.chain.evolves_to[0].evolves_to[0].species.name);
                  }
                }

                // Get evolution chain sprites
                evolutionChain.forEach((pokemon, index) => {
                fetch(url + "pokemon/" + pokemon)
                  .then(response => response.json())
                  .then(data => {
                    evolutionChain[index] = {
                      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                      sprite: data.sprites.other['official-artwork'].front_default
                    };
                    
                    // Add evolution chain to pokemon object
                    pokemonList[pokemonId - 1].evolutionChain = evolutionChain;
                  })
                  .catch(err => console.error(err));
                });
              })
              .catch(err => console.error(err));
          })
          .catch(err => console.error(err));
        
        let pokemon = {
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          id: data.id,
          sprite: data.sprites.other['official-artwork'].front_default,
          abilities: data.abilities,
          type: data.types,
          stats: {
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            specialAttack: data.stats[3].base_stat,
            specialDefense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat
          },
          evolutionChain: []
        };

        pokemonList.push(pokemon);
      })
      .catch(err => console.error(err));
  }
  console.log(pokemonList);
};