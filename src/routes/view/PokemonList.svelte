<script>
  import { fetchPokemon } from '../model/pokemons.js';
  import { pokemonList } from '../model/pokemons.js';

  // Numbers of pokemon to fetch
  //! It must be a mlutiple of 3
  let limit = 153;

  let promise = fetchPokemon(limit);
</script>

<!-- Grid -->
<div class="flex justify-center w-4/5 p-8">
  <div class="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
    {#await promise}
      <!-- Loading spinner -->
      <div class="flex flex-col items-center justify-center col-span-3">
        <div class="flex flex-row items-center justify-center">
          <div class="w-12 h-12 border-dotted border-1 border-t-4 border-indigo-900 rounded-full animate-spin"></div>
        </div>
      </div>
    {:then}
      {#each pokemonList as pokemon}
        <!-- Pokemon card -->
        <div class="card group bg-base-100 shadow-xl m-4 transition ease-in-out hover:bg-base-300 active:scale-95 duration-150">
          <a href="#{pokemon.name.toLowerCase()}"> <!-- Link to pokemon popup page -->
          <div class="absolute justify-start p-4 z-20">
            <h1 class="font-black text-6xl lg:text-6xl md:text-6xl sm:text-red text-gray-200 group-hover:text-gray-100">#{pokemon.id}</h1>
          </div>

          <figure class="px-10 pt-10 z-30">
            <img src={pokemon.sprite} alt={pokemon.name} class="rounded-xl" />
          </figure>

          <div class="card-body items-center text-center z-30">
            <h2 class="card-title font-black text-3xl">{pokemon.name}</h2>
          </div>
          </a>
        </div>
        
        <!-- Pokemon popup page -->
        <div class="modal" id="{pokemon.name.toLowerCase()}">
          <div class="modal-box">
            <h3 class="font-bold text-lg">{pokemon.id}  {pokemon.name}</h3>
            <div class="modal-action">
            <a href="#pokemonList" class="btn">Yay!</a>
            </div>
          </div>
        </div>
      {/each}
    {/await}
  </div>
</div>