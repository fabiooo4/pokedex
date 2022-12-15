<script>
  export let pokemon;
</script>


<div class="modal modal-bottom sm:modal-middle" id="{pokemon.name.toLowerCase()}">
  <div class="modal-box [&::-webkit-scrollbar]:hidden overflow-x-hidden">

    <!--! Name -->
    <h3 class="flex justify-center font-extrabold text-6xl mb-2">{pokemon.name}</h3>

    <!--! Id -->
    <div class="absolute justify-start p-4 -z-10">
      <h1 class="font-black text-7xl lg:text-7xl md:text-6xl sm:text-4xl text-gray-200 group-hover:text-gray-100">#{pokemon.id}</h1> 
    </div>

    <!--! Image -->
    <div class="flex justify-center">
      <img src={pokemon.sprite} alt={pokemon.name} class="rounded-xl h-1/2 w-1/2" />
    </div>

    <!--! Type -->
    <div>
      <h1 class="flex justify-center font-extrabold text-xl p-2">Type</h1>
      <div class="flex justify-center ml-2">
        {#each pokemon.types as type}
          <span class="inline-block justify-center bg-[{type.type.color}] text-white rounded-full px-3 py-1 mr-2 text-sm font-semibold">{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>
        {/each}
      </div>
    </div>


    <!--! Abilities-->
    <div class="flex justify-center ml-2 grid grid-cols-2 mt-8">
      <h1 class="font-bold text-xl p-2 text-center">Normal Abilities:</h1> 
      <h1 class="font-bold text-xl p-2 text-center">Hidden Abilities:</h1>
      {#each pokemon.abilities as ability}
        <div class="flex justify-center">
          
          <!-- Chech if hidden-->
          {#if ability.is_hidden}

            <div class="group cursor-pointer relative inline-block w-24 text-center mr-4">
              <!-- Ability name -->
              <span class="inline-block w-max justify-center bg-gray-200 text-black rounded-full px-3 py-1 mt-2 text-sm font-semibold">{ability.name.charAt(0).toUpperCase() + ability.name.slice(1)}
              
                <!-- Info icon -->
                <svg class="inline-block w-4 h-4 mb-1" fill="none" stroke="black" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </span>
              

              <div class="opacity-0 transition-opacity duration-300 w-52 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-1/2 px-3 pointer-events-none">
                
                <p>{ability.description}</p>

                <!-- Tooltip arrow -->
                <svg class="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve"><polygon class="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
              </div>
            </div>

          {:else}
          
            <div class="group cursor-pointer relative inline-block w-24 text-center mr-4">
              <!-- Ability name -->
              <span class="inline-block w-max justify-center bg-gray-200 text-black rounded-full px-3 py-1 mt-2 text-sm font-semibold">{ability.name.charAt(0).toUpperCase() + ability.name.slice(1)}
              
                <!-- Info icon -->
                <svg class="inline-block w-4 h-4 mb-1" fill="none" stroke="black" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </span>
              
              <div class="opacity-0 transition-opacity duration-300 w-52 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-1/2 px-3 pointer-events-none">
                
                <p>{ability.description}</p>

                <!-- Tooltip arrow -->
                <svg class="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve"><polygon class="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
              </div>
            </div>  

          {/if}                  
        </div>
      {/each}
    </div>

    <!--! Stats -->
    <h1 class="flex justify-center font-extrabold text-xl p-2 my-2">Stats</h1>
      <div class="grid content-center grid-rows-3 grid-cols-10 grid-flow-row ml-36">
        {#each pokemon.stats as stat}
            <h1 class="self-center justify-self-end w-max mr-3 lg:mr-0 md:mr-1 sm:mr-3 text-center font-bold text-base col-span-1">{stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:</h1>
            <h1 class="self-center justify-self-end w-max text-center font-semibold text-sm col-span-1 px-2">{stat.base_stat}</h1>
            <div class="self-center col-span-8 rounded-md h-4 w-[{stat.base_stat/2}%] bg-[{stat.color}]"></div>
        {/each}
      </div>
    
    <!--! Evolution chain -->
    {#if pokemon.evolutionChain.length >= 3}
      <h1 class="flex justify-center font-extrabold text-xl p-2 mt-4">Evolution chain</h1>
      <div class="flex">
        <div class="grid gap-x-8 lg:gap-x-10 md:gap-x-10 sm:gap-x-8 grid-rows-5 grid-cols-{pokemon.evolutionChain.length} grid-flow-col">
          {#each pokemon.evolutionChain as evolution}
            <img src={evolution.sprite} alt={evolution.name} class="bg-gray-200 shadow-lg p-1 rounded-xl row-span-4"/>
            <h1 class="text-center font-bold text-lg row-span-1">{evolution.name}</h1>
          {/each}
        </div>
      </div>
    {:else if pokemon.evolutionChain.length ==2}
      <h1 class="flex justify-center font-extrabold text-xl p-2 mt-4">Evolution chain</h1>
      <div class="flex flex-nowrap">
        <div class="grid gap-x-10 mx-10 lg:mx-[84px] md:mx-[84px] sm:mx-10 shrink grid-rows-5 grid-cols-{pokemon.evolutionChain.length} grid-flow-col">
          {#each pokemon.evolutionChain as evolution}
            <img src={evolution.sprite} alt={evolution.name} class="bg-gray-200 shadow-lg p-1 rounded-xl row-span-4"/>
            <h1 class="text-center font-bold text-md row-span-1">{evolution.name}</h1>
          {/each}
        </div>
      </div>
    {/if}
    
    <div class="modal-action">
    <a href="#pokemonList" class="btn">Close</a>
    </div>
  </div>
</div>