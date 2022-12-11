<script>
  import { fetchPokemon } from '../model/pokemons.js';
  import { pokemonList } from '../model/pokemons.js';

  let limit = 100;

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