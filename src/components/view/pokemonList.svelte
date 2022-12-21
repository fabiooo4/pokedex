<script>
  import LoadingSpinner from './loadingSpinner.svelte';
  import PokemonCard from './pokemonCard.svelte';
  import PokemonModal from './pokemonModal.svelte';
  import SearchBar from './searchBar.svelte';

  import { fetchPokemon } from '../scripts/pokemons.js';
  import { pokemons } from '../scripts/store.js';
  import { filteredPokemons } from '../scripts/store.js';
  
  // Numbers of pokemon to fetch
  //! It must be a mlutiple of 3
  let limit = 151; // First generation


  // Fetch only once
  let pokemonList;
  let filteredPokemonList;
  let isSearching = false;
  let promise;

  if (pokemons !== 0) {
    promise = Promise.resolve(fetchPokemon(limit)).then(() => {
      pokemons.subscribe(value => {
        pokemonList = value;
      });

      filteredPokemons.set(pokemonList);
      filteredPokemons.subscribe(value => {
        filteredPokemonList = value;
      });

      isSearching = true;
      console.log(pokemonList);

      return pokemonList;
    });
  }
</script>

<!--? Title -->
<h1 class="font-extrabold text-7xl lg:text-9xl md:text-8xl sm:text-7xl m-5">Pokédex</h1>

<!--? Search bar -->
<SearchBar isSearching = {isSearching}/>


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