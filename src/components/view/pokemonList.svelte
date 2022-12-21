<script>
  import LoadingSpinner from './loadingSpinner.svelte';
  import PokemonCard from './pokemonCard.svelte';
  import PokemonModal from './pokemonModal.svelte';
  import { fetchPokemon } from '../scripts/pokemons.js';
  import { pokemonList } from '../scripts/pokemons.js';
  
  // Numbers of pokemon to fetch
  //! It must be a mlutiple of 3
  let limit = 151; // First generation

  let filteredPokemonList = [];
  // Fetch only once
  let promise;
  if (pokemonList.length === 0) {
    promise = Promise.resolve(fetchPokemon(limit)).then(() => {
      filteredPokemonList = pokemonList;
      isSearching = true;
      return pokemonList;
    });
  }

  let search = '';
  let isSearching = false;

  const handleSearch = () => {
    if (search !== '') {
        filteredPokemonList = pokemonList.filter(pokemon => {
          return pokemon.name.toLowerCase().includes(search.toLowerCase());
      });
    } else {
      filteredPokemonList = pokemonList;
    }
  }
</script>

<!--? Title -->
<h1 class="font-extrabold text-7xl lg:text-9xl md:text-8xl sm:text-7xl m-5">Pokédex</h1>

<!-- TODO Search bar -->
<div class="form-control">
  <div class="input-group">
    {#if isSearching}
      <input type="text" placeholder="Search…" class="input input-bordered" bind:value="{search}" />
      <button class="btn btn-square" on:click={handleSearch}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </button>
    {:else}
      <input placeholder="Search…" class="input input-bordered" disabled />
      <button class="btn btn-square" disabled>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </button>
    {/if}
  </div>
</div>

<!--? Grid -->
<div class="flex justify-center w-3/4 p-8">
  <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
    {#await promise}
      <LoadingSpinner />
    {:then}
      {#each filteredPokemonList as pokemon}
        <PokemonCard pokemon = {pokemon} />
        <PokemonModal pokemon = {pokemon} />
      {/each}
    {/await}
  </div>
</div>