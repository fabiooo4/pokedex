<script>
  // import { fetchPokemon } from '../components/scripts/pokemons.js';
  // import { pokemonList } from '../components/scripts/pokemons.js';
  import { onMount } from 'svelte';
  import { getPromise } from '../components/scripts/pokemonPromises.js';
  import { pokemonList } from '../components/scripts/pokemonPromises.js';
  import LoadingSpinner from '../components/view/loadingSpinner.svelte';
  import PokemonCard from '../components/view/pokemonCard.svelte';
  import PokemonPopup from '../components/view/pokemonPopup.svelte';

  // // Numbers of pokemon to fetch
  // //! It must be a mlutiple of 3
  let limit = 500; // First generation

  // // Fetch only once
  // let promise;
  // if (pokemonList.length === 0) {
  //   promise = fetchPokemon(limit);
  // }

  // Fetch only once
  let promise;
  if (pokemonList.length === 0) {
    promise = getPromise(limit);
    console.log(pokemonList);
  }
</script>

<!--? Grid -->
<div class="flex justify-center w-3/4 p-8">
  <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
    {#await promise}
      <LoadingSpinner />
    {:then}
      {#each pokemonList as pokemon}
        <PokemonCard pokemon = {pokemon} />
        <PokemonPopup pokemon = {pokemon} />
      {/each}
    {:catch error}
      <div class="text-red-500">{error.message}</div>
    {/await}
  </div>
</div>