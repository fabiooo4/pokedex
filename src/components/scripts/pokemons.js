export let pokemonList = [];

let typeColor = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  fairy: '#EE99AC',
  dark: '#705848',
  steel: '#B8B8D0'
}

let statColor = {
  hp: '#53d113',
  attack: '#ebcb33',
  defense: '#e67420',
  'special-attack': '#29bbe0',
  'special-defense': '#4d6dd5',
  speed: '#d426ce'
}

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
        
        // Fetch ability descriptions if language is english and add to pokemon object
        let abilities = [];
        data.abilities.forEach(ability => {
          fetch(ability.ability.url)
            .then(response => response.json())
            .then(data => {
              data.effect_entries.forEach(entry => {
                if (entry.language.name === 'en') {
                  abilities.push({
                    name: ability.ability.name,
                    description: entry.effect,
                    is_hidden: ability.is_hidden
                  });
                }
              });
            })
            .catch(err => console.error(err));
        });

        let pokemon = {
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          id: data.id,
          sprite: data.sprites.other['official-artwork'].front_default,
          abilities: abilities,
          types: data.types,
          // Stats array is ordered as follows: hp, attack, defense, special-attack, special-defense, speed
          stats: data.stats,
          evolutionChain: []
        };

        // Assign typeColor to types
        pokemon.types.forEach(type => {
          type.type.color = typeColor[type.type.name];
        });

        // Assign statColor to stats
        pokemon.stats.forEach(stat => {
          stat.color = statColor[stat.stat.name];
        });

        pokemonList.push(pokemon);
      })
      .catch(err => console.error(err));
  }
  console.log(pokemonList);
};