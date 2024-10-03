<template>
    <div class=" px-3 mt-6 ring-gray-600 ring-opacity-30 ring-8 bg-opacity-40 justify-between  h-[40px] w-[320px] rounded-lg  bg-slate-900 flex flex-row items-center">
        <input v-model="inputText" class=" caret caret-slate-300 focus:placeholder-gray-400 focus:outline-none font-medium  border-opacity-50 placeholder:text-slate-300 rounded-lg border-2 border-transparent bg-transparent" :class="{ 'text-white': inputText.length > 0 }" type="text" placeholder="Search">
        <button class=" transition duration-500 ease-in-out hover:scale-125 text-slate-300" @click="clearSearch">
            <img class="w-6" src="../assets/images/searchAlpha.png" alt="">
        </button>
    </div>
</template>
<script>
import { useKaraokeStore } from '../stores/karaoke';
export default {
    name:"SearchBar",
    data(){
        return{
inputText:""
        }
    },
    setup() {
    const karaoke = useKaraokeStore()
return {karaoke}


  },
    watch:{
        inputText(newVal, oldVal) {
            this.karaoke.searchTerm=newVal
        }
    },
    
}
</script>
<style>
    
</style>