<script>
  export let pokemon;
</script>

<div class="card cursor-pointer group bg-base-100 shadow-xl m-4 transition ease-in-out hover:bg-base-300 active:scale-95 duration-150">
  <a href="#{pokemon.name.toLowerCase()}">    
    <!--! Id -->
    <div class="absolute justify-start p-4 z-10">
      <h1 class="font-black text-7xl lg:text-7xl md:text-5xl sm:text-5xl text-gray-200 group-hover:text-gray-100">#{pokemon.id}</h1> 
    </div>

    <!--! Image -->
    <figure class="px-10 pt-10">
      <img src={pokemon.sprite} alt={pokemon.name} class="rounded-xl z-20" />
    </figure>

    <div class="card-body items-center text-center">
      <!--! Name -->
      <h2 class="card-title font-black text-3xl">{pokemon.name}</h2>

      <!--! Type -->
      <div class="px-6 pt-4 pb-2 flex flex-row">
        {#each pokemon.types as type}
          <span class="inline-block bg-[{type.type.color}] text-white rounded-full px-3 py-1 text-sm font-semibold mr-2">{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>
        {/each}
      </div>

    </div>
  </a>
</div>



