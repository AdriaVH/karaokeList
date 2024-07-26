<template>
    <div 
        class=" right-[1vh] absolute mt-0 items-end flex flex-col transition-all duration-[2900ms] ease-in-out" 
        :class="{'bottom-14': !karaoke.expanded, 'bottom-[420px]': karaoke.expanded}"
    >
        <!-- <button class=" center rounded-full border-slate-100 border-2 text-2xl w-[80px]" >+</button>
        <button class="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:bg-gradient-to-l transform hover:-translate-y-1 hover:scale-110 rounded-full py-2 px-4 text-white font-semibold shadow-md transition-transform duration-150 ease-in-out">
            Click Me!
          </button> -->
          <button class="  flex flex-row items-center justify-center p-0.5 mb-2 text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
            <span class=" font-extrabold font-montseregular text-4xl relative px-6 py-3.5 transition-all ease-in duration-150 bg-opacity-90 bg-gray-900 rounded-full group-hover:bg-opacity-0">
            +
            <span class=" font-montseregular font-black absolute -right-1 -top-1  ease-in-out text-black inline-flex items-center justify-center w-6 h-6 ms-2 text-base bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 bg-opacity-50 rounded-full">
                2
                </span>
            </span>
            </button>
            <!-- <button type="button" class="  transition duration-300 hover:font-semibold hover:ring-slate-200 hover:ring-opacity-50 hover:bg-slate-400 hover:bg-opacity-40 justify-center pt-2 inline-flex  h-[40px] w-[120px] bg-slate-800 ring-gray-600 ring-opacity-30 ring-8 bg-opacity-40 hover:text-white border border-transparent focus:ring-4 focus:outline-none text-slate-200 focus:ring-gray-300 font-medium rounded-xl   text-center  text-sm">
                Add Songs
                <span class=" ease-in-out text-white inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold bg-gray-300 bg-opacity-50 rounded-full">
                    2
                    </span>
                </button> -->

          
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