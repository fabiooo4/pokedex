<script>
  import { fetchPokemon } from '../model/pokemons.js';
  import { pokemonList } from '../model/pokemons.js';

  // Numbers of pokemon to fetch
  //! It must be a mlutiple of 3
  let limit = 102;

  let promise = fetchPokemon(limit);
</script>

<div class="flex justify-center w-4/5 p-8">
  <div class="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
    {#await promise}
      <div class="flex flex-col items-center justify-center">
        <div class="flex flex-row items-center justify-center">
          <div class="w-12 h-12 border-dotted border-1 border-t-4 border-indigo-900 rounded-full animate-spin"></div>
        </div>
      </div>
    {:then}
      {#each pokemonList as pokemon}
        <div class="card group bg-base-100 shadow-xl m-4 transition ease-in-out hover:bg-base-300 active:scale-95 duration-150">
          <div class="absolute justify-start p-4 z-0">
            <h1 class="font-black text-6xl lg:text-6xl md:text-6xl sm:text-red text-gray-200 group-hover:text-gray-100">#{pokemon.id}</h1>
          </div>
          <figure class="px-10 pt-10 z-10">
            <img src={pokemon.sprite} alt={pokemon.name} class="rounded-xl" />
          </figure>
          <div class="card-body items-center text-center">
            <h2 class="card-title font-black text-3xl">{pokemon.name}</h2>
          </div>
        </div>
      {/each}
    {/await}
  </div>
</div>