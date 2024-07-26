<template>
    <div 
        class=" right-[1vh] absolute mt-0 items-end flex flex-col transition-all duration-[2900ms] ease-in-out" 
        :class="{'bottom-14': !karaoke.expanded, 'bottom-[420px]': karaoke.expanded}"
    >

          <button class="  flex flex-row items-center justify-center p-0.5 mb-2 text-sm font-medium rounded-full group bg-gradient-to-br from-purple-300 via-green-300 via-emerald-300 to-blue-300 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 text-white hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-400">
            <span class=" font-extrabold font-montseregular text-4xl relative px-6 py-3.5 transition-all ease-in duration-150 bg-opacity-90 bg-gray-900 rounded-full group-hover:bg-opacity-0">
            +
            <span class=" border-black font-montseregular font-black absolute -right-1 -top-1  ease-in-out text-black inline-flex items-center justify-center w-6 h-6 ms-2 text-base bg-gradient-to-br from-blue-300 via-green-300 to-purple-300 bg-opacity-50 rounded-full">
                2
                </span>
            </span>
            </button>


          
    </div>
</template>
<script>
import { useKaraokeStore } from '@/stores/karaoke';
export default {
    name:"AddToQue",
    data(){
        return{

        }
    },
    setup() {
        const karaoke = useKaraokeStore();

        return { karaoke };
    },
    
}
</script>
<style>
.button-with-background-image {
    background-image: url('/Front/src/assets/images/bg.png');
    background-size:contain;
    background-position: center;
  }
</style>