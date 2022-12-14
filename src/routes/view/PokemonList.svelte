<script>
  import { fetchPokemon } from '../model/pokemons.js';
  import { pokemonList } from '../model/pokemons.js';

  // Numbers of pokemon to fetch
  //! It must be a mlutiple of 3
  let limit = 151;
  let promise;

  // if pokemonList is empty, fetch pokemon
  if (pokemonList.length === 0) {
    promise = fetchPokemon(limit);
  }
</script>

<!-- Grid -->
<div class="flex justify-center w-4/5 p-8">
  <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
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
          <!-- Id -->
          <div class="absolute justify-start p-4 z-0">
            <h1 class="font-black text-6xl lg:text-6xl md:text-6xl sm:text-red text-gray-200 group-hover:text-gray-100">#{pokemon.id}</h1> 
          </div>

          <a class="z-20" href="#{pokemon.name.toLowerCase()}">
          <figure class="px-10 pt-10 z-10">
            <!-- Image -->
            <img src={pokemon.sprite} alt={pokemon.name} class="rounded-xl" />
          </figure>

          <div class="card-body items-center text-center">
            <!-- Name -->
            <h2 class="card-title font-black text-3xl">{pokemon.name}</h2>

            <!-- Types -->
            <div class="px-6 pt-4 pb-2 flex flex-row">
              {#each pokemon.types as type}
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>
              {/each}
            </div>
            
          </div>
          </a>
        </div>
        
        <!-- Pokemon popup page -->
        <!-- TODO: Display name, id, type, sprite, evolution chain, stats, abilities -->
        <div class="modal" id="{pokemon.name.toLowerCase()}">
          <div class="modal-box [&::-webkit-scrollbar]:hidden">
            
            

            <!-- Name -->
            <h3 class="flex justify-center font-extrabold text-6xl p-0">{pokemon.name}</h3>

            <!-- Id -->
            <div class="absolute justify-start p-4 -z-10">
              <h1 class="font-black text-7xl lg:text-7xl md:text-6xl sm:text-4xl text-gray-200 group-hover:text-gray-100">#{pokemon.id}</h1> 
            </div>

            <div class="flex justify-center">
              <!-- Image -->
              <img src={pokemon.sprite} alt={pokemon.name} class="rounded-xl h-1/2 w-1/2" />
            </div>

            <!-- Evolution chain -->
            <h1 class="flex justify-center font-bold text-lg">Evolution chain</h1>
            <div class="flex justify-center">
              <div>
                {#each pokemon.evolutionChain as evolution}
                  <img src={evolution.sprite} alt={evolution.name} class="rounded w-1/4 h-1/4" />
                  <h1 class="font-bold text-lg">{evolution.name}</h1>
                {/each}
              </div>
            </div>
            
            <!-- TODO: Close button fixed to page -->
            <div class="modal-action">
            <a href="#pokemonList" class="btn">Close</a>
            </div>
          </div>
        </div>
      {/each}
    {/await}
  </div>
</div>

<style type="text/css">

</style>