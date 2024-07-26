<template>
    <div class=" mt-6 w-full items-center flex flex-col" >
        <!-- <button class=" center rounded-full border-slate-100 border-2 text-2xl w-[80px]" >+</button>
        <button class="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:bg-gradient-to-l transform hover:-translate-y-1 hover:scale-110 rounded-full py-2 px-4 text-white font-semibold shadow-md transition-transform duration-150 ease-in-out">
            Click Me!
          </button>
          <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Red to Yellow
            </span>
            </button> -->
            <button type="button" class="  transition duration-300 hover:font-semibold hover:ring-slate-200 hover:ring-opacity-50 hover:bg-slate-400 hover:bg-opacity-40 justify-center pt-2 inline-flex  h-[40px] w-[120px] bg-slate-800 ring-gray-600 ring-opacity-30 ring-8 bg-opacity-40 hover:text-white border border-transparent focus:ring-4 focus:outline-none text-slate-200 focus:ring-gray-300 font-medium rounded-xl   text-center  text-sm">
                Add Songs
                <span class=" ease-in-out text-white inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold bg-gray-300 bg-opacity-50 rounded-full">
                    2
                    </span>
                </button>

          
    </div>
</template>
<script>
export default {
    name:"AddToQue",
    data(){
        return{

        }
    }
    
}
</script>
<style>
.button-with-background-image {
    background-image: url('/Front/src/assets/images/bg.png');
    background-size:contain;
    background-position: center;
  }
</style>