<template>
    <transition name="fade" mode="out-in">

    <div v-if="!karaoke.songs[0]" class="loader">
        <div class="loader-inner">
            <div class="loader-line-wrap">
                <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
                <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
                <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
                <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
                <div class="loader-line"></div>
            </div>
        </div>
    </div>
    
    <div v-else >
        <div :class="{
            'h-[20vh]': karaoke.expanded,
            'h-[66vh]': !karaoke.expanded,
            'h-[62vh]':karaoke.listView&!karaoke.expanded
        }"
            class=" list-container gap-2 relative px-3 mt-6 ring-gray-600 ring-opacity-30 ring-8 bg-opacity-40 w-[330px] rounded-lg  bg-slate-900 flex flex-col items-center">
            <div class=" mt-3 flex flex-row gap-10">
                <button :class="{
                    'opacity-100': !gallery,
                    'opacity-50': gallery
                }" class="  transition duration-500 ease-in-out hover:scale-125 hover:opacity-100 text-slate-300 "
                    @click="galleryOrList">
                    <img class="  w-8" src="../assets/images/listView.png" alt="">
                </button>
                <button :class="{
                    'opacity-100': gallery,
                    'opacity-50': !gallery
                }" class=" transition duration-500 ease-in-out hover:scale-125  hover:opacity-100 text-slate-300"
                    @click="galleryOrList">
                    <img class="  w-8" src="../assets/images/imageList.png" alt="">
                </button>
            </div>
            <div class="gap-[1.5px] flex flex-row list-none p-0 m-0">
                <ul class="" v-for="coords in karaoke.coords">
                    <button @click="scrollToElement(`${coords.Letter}`)"
                        class=" transition duration-100 ease-in-out hover:scale-125 opacity-50 hover:opacity-100 hover:font-medium text-slate-300 cursor-pointer uppercase">
                        {{ coords.Letter }}</button>
                </ul>
            </div>

            <div ref="scrollContainer"
                class=" ml-1.5 mb-4 relative overflow-scroll overflow-x-hidden scrollbar transition duration-500 ease-in-out hover:scrollbar-thumb-slate-300  w-full  h-full">

                <div>

                    <div v-if="karaoke.filteredSongs && karaoke.listView" class=" mr-2 flex flex-col my-2"
                        v-for="song in this.karaoke.filteredSongs">
                    <div :id="song.Artist.charAt(0)" @click="songToCart(song)" class=" rounded-lg  " :class="{'bg-gradient-to-br from-red-400 via-orange-300  to-blue-200 ':song.isActive,
                'p-0.5':!gallery,
            'p-[2.5px]':gallery}" >
                        <div :class="{
                            'bg-slate-300': !song.Selected,
                            'bg-white bg-opacity-70': song.Selected,
                            'flex flex-row h-[90px]': gallery,
                            'pl-2': !gallery,
                            ' bg-opacity-100 bg-gray-800 text-white text-opacity-80  ': song.isActive

                        }"
                            class="  w-full hover:bg-opacity-50 text-opacity-30 font-montseregular rounded-lg shadow  bg-opacity-30">
                            <img v-if="gallery" :src="`/images/${song.SongPath}`"
                                class=" rounded-l-lg barcelona h-full w-[90px]" alt="">
                            <div class="flex flex-col" :class="{ 'h-[110px]': gallery }">
                                <div class=" flex flex-col relative " :class="{
                                    'h-[60px] w-[190px] pl-2': gallery
                                }">
                                    <p class="font-montsebold font-extrabold">{{ song.Artist }}</p>
                                    <p>{{ song.Title }}</p>
                                </div>
                                <img v-if="song.Language == 'Ingles' && gallery"
                                    class=" opacity-70 mb-2 self-end  mr-2 w-[30px]" src="../assets/images/uk.png"
                                    alt="">
                                <img v-if="song.Language == 'Espanol' && gallery"
                                    class=" opacity-70 mb-2 self-end  mr-2 w-[30px]" src="../assets/images/spain.png"
                                    alt="">
                            </div>
                        </div>
                    </div>
                    </div>
                    <div v-else  class=" mr-2 flex flex-col my-2" v-for="song in this.karaoke.songs">
                        <div :id="song.Artist.charAt(0)" @click="songToCart(song)" class=" rounded-lg  " :class="{'bg-gradient-to-br from-red-400 via-orange-300  to-blue-200 ':song.isActive,
                        'p-0.5':!gallery,
                    'p-[2.5px]':gallery}" >
                                <div :class="{
                                    'bg-slate-300': !song.Selected,
                                    'bg-white bg-opacity-70': song.Selected,
                                    'flex flex-row h-[90px]': gallery,
                                    'pl-2': !gallery,
                                    ' bg-opacity-90  bg-slate-900  text-white text-opacity-80': song.isActive
        
                                }"
                                    class="  w-full hover:bg-opacity-50 text-opacity-30 font-montseregular rounded-lg bg-opacity-30">
                                    <img v-if="gallery" :src="`/images/${song.SongPath}`"
                                        class=" rounded-l-lg barcelona h-full w-[90px]" alt="">
                                    <div class="flex flex-col" :class="{ 'h-[110px]': gallery }">
                                        <div class=" flex flex-col relative " :class="{
                                            'h-[60px] w-[190px] pl-2': gallery
                                        }">
                                            <p class="font-montsebold font-extrabold">{{ song.Artist }}</p>
                                            <p>{{ song.Title }}</p>
                                        </div>
                                        <img v-if="song.Language == 'Ingles' && gallery"
                                            class=" opacity-70 mb-2 self-end  mr-2 w-[30px]" src="../assets/images/uk.png"
                                            alt="">
                                        <img v-if="song.Language == 'Espanol' && gallery"
                                            class=" opacity-70 mb-2 self-end  mr-2 w-[30px]" src="../assets/images/spain.png"
                                            alt="">
                                    </div>
                                </div>
                            </div>
                            </div>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>
<script>
import { onMounted, onUnmounted, ref } from 'vue';
import { watch } from 'vue';
import { useKaraokeStore } from '../stores/karaoke';

export default {
    name: "List",
    data() {
        return {
            gallery: false,
        }
    },

    methods: {
        songToCart(song) {
            if(!song.Selected){
                song.isAlreadyAdded=false
            this.karaoke.songsOnCart.forEach(item=>{
                item.isAlreadyAdded=item.Id==song.Id
            })
console.log(song.isAlreadyAdded)

            if(song.isAlreadyAdded){
                this.karaoke.songsOnCart=this.karaoke.songsOnCart.filter(item=>{
                    return item.Id !== song.Id;})
                    // console.log(this.karaoke.songsOnCart)
                    song.isActive=false
                
            }else{
                this.karaoke.songs.forEach(item => {
                item.isActive = item.Id == song.Id;
            });
                this.karaoke.songsOnCart.push(song)
                for(let song of this.karaoke.songsOnCart){
                    song.isActive=true
                }
                console.log(this.karaoke.songsOnCart)
            }}

        },
        scrollToElement(selector) {
            const element = document.querySelector("#" + selector);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        },

        galleryOrList() {
            this.gallery = !this.gallery

        },
        async getCoords() {
            try {
                const response = await fetch('http://localhost:3018/api/coords');
                const data = await response.json();
                this.karaoke.coords = data;
                // console.log(this.karaoke.songs[0].Selected)
            } catch (err) { }
        },
        selectSong(song) {

            song.Selected = !song.Selected;
            let now = new Date();
            let toString = now.toISOString();
            song.TimeStamp = toString.slice(0, 19).replace('T', ' ');


            console.log(`TimeStamp property value is: ${song.TimeStamp}`)
            this.updateSong(song)

        },
        async updateSong(song) {
            let selected = song.Selected
            console.log(`Property Selected is: ${selected}`)
            const requestOptions = {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    song)

            };
            try {
                const response = await fetch(`http://localhost:3018/api/songs/${song.Id}`, requestOptions)
                const data = await response.json()

                console.log(requestOptions)


            } catch (err) {
                console.log(err)
            }

        },
    },

    created() {
        this.getCoords()
    },
    setup() {
        const karaoke = useKaraokeStore();
        watch(
            () => karaoke.songs,
            (newSongs, oldSongs) => {
                karaoke.songs = newSongs
            },
            { deep: true }
        );
        watch(() => karaoke.listView,
            (newList, oldList) => {
                karaoke.listView = newList
            });
        watch(() => karaoke.expanded,
            (newValue, oldValue) => {
                karaoke.expanded = newValue
                console.log(karaoke.expanded)
            })


        return { karaoke };
    },

}
</script>
<style>
.list-container {
    transition: height 2s ease-in-out;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity 1s ease-in-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
.loader {

    bottom: 0;
    left: 0;
    overflow: hidden;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 99999;
}

.loader-inner {
    bottom: 0;
    height: 60px;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
}

.loader-line-wrap {
    animation: 
		spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite
	;
    box-sizing: border-box;
    height: 50px;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    transform-origin: 50% 100%;
    width: 100px;
}
.loader-line {
    border: 4px solid transparent;
    border-radius: 100%;
    box-sizing: border-box;
    height: 100px;
    left: 0;
    margin: 0 auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
}
.loader-line-wrap:nth-child(1) { animation-delay: -50ms; }
.loader-line-wrap:nth-child(2) { animation-delay: -100ms; }
.loader-line-wrap:nth-child(3) { animation-delay: -150ms; }
.loader-line-wrap:nth-child(4) { animation-delay: -200ms; }
.loader-line-wrap:nth-child(5) { animation-delay: -250ms; }

.loader-line-wrap:nth-child(1) .loader-line {
    border-color: hsl(0, 80%, 60%);
    height: 90px;
    width: 90px;
    top: 7px;
}
.loader-line-wrap:nth-child(2) .loader-line {
    border-color: hsl(60, 80%, 60%);
    height: 76px;
    width: 76px;
    top: 14px;
}
.loader-line-wrap:nth-child(3) .loader-line {
    border-color: hsl(120, 80%, 60%);
    height: 62px;
    width: 62px;
    top: 21px;
}
.loader-line-wrap:nth-child(4) .loader-line {
    border-color: hsl(180, 80%, 60%);
    height: 48px;
    width: 48px;
    top: 28px;
}
.loader-line-wrap:nth-child(5) .loader-line {
    border-color: hsl(240, 80%, 60%);
    height: 34px;
    width: 34px;
    top: 35px;
}

@keyframes spin {
    0%, 15% {
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
