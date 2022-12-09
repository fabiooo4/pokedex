<script>
  let pokemonList = [];
  let limit = 100;
  // let offset = 0;
  const url = 'https://pokeapi.co/api/v2/pokemon/';

  const fetchPokemon = async (limit) => {
    for (let pokemonId = 1; pokemonId <= limit; pokemonId++) {
      await fetch(url + pokemonId)
        .then(response => response.json())
        .then(data => {
          let pokemon = {
            name: data.name,
            id: data.id,
            sprite: data.sprites.other['official-artwork'].front_default,
          };

          pokemonList.push(pokemon);
        })
        .catch(err => console.error(err));
    }
  };

  let promise = fetchPokemon(limit);
</script>

{#await promise}
  <div class="flex flex-col items-center justify-center">
    <div class="flex flex-row items-center justify-center">
      <div class="w-12 h-12 border-dotted border-1 border-t-4 border-indigo-900 rounded-full animate-spin"></div>
    </div>
  </div>
{:then}
  {#each pokemonList as pokemon}
    <div>
      <h2>{pokemon.name}</h2>
      <img class="scale-50" src={pokemon.sprite} alt={pokemon.name} />
    </div>
  {/each}
{/await}