<script>
  import { pokemons } from '../scripts/store.js';
  import { filteredPokemons } from '../scripts/store.js';

  let search = '';
  let pokemonList;
  let filteredPokemonList;

  pokemons.subscribe(value => {
    pokemonList = value;
  });


  filteredPokemons.subscribe(value => {
    filteredPokemonList = value;
  });

  export let isSearching = false;

  const handleSearch = () => {
    if (search !== '') {
      // Filter pokemons by name, type or id
      filteredPokemons.set(pokemonList.filter(pokemon => {
        // Filter by name
        return pokemon.name.toLowerCase().includes(search.toLowerCase()) || 
        // Filter by type
        pokemon.types.some(type => {
          return type.type.name.toLowerCase().includes(search.toLowerCase());
        }) || 
        // Filter by id
        pokemon.id.toString().includes(search);
      }));
      
      search = '';
    } else {
      // Reset filtered pokemons
      filteredPokemons.set(pokemonList);
    }
  }
</script>

<!--? Search bar -->
<div class="form-control">
  <div class="input-group">
    {#if isSearching}
      <input type="text" placeholder="Search…" class="input input-bordered" bind:value="{search}" />
      <button class="btn btn-square bg-zinc-900" on:click={handleSearch}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </button>
    {:else}
      <input placeholder="Search…" class="input input-bordered" disabled />
      <button class="btn btn-square" disabled>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </button>
    {/if}
  </div>
</div>