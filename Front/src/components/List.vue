<template>
    <div>
        <div :class="{
            'h-[200px]': karaoke.expanded,
            'h-[66vh]': !karaoke.expanded
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

                    <div v-if="karaoke.filteredSongs && karaoke.listView" class="  mr-2 flex flex-col my-2"
                        v-for="song in this.karaoke.filteredSongs">
                        <div :id="song.Artist.charAt(0)" @click="selectSong(song)" :class="{
                            'bg-slate-300': !song.Selected,
                            'bg-white': song.Selected,
                            'bg-opacity-70': song.Selected,
                            'flex flex-row': gallery,
                            'pl-2': !gallery,
                            'h-[90px]':gallery

                        }"
                            class=" w-full hover:bg-opacity-50 text-opacity-30 font-montseregular rounded-lg shadow  bg-opacity-30">
                            <img v-if="gallery" :src="`/images/${song.SongPath}`"
                                class=" rounded-md barcelona h-full w-[90px]" alt="">
                            <div class="flex flex-col" :class="{'h-[110px]':gallery}" >
                                <div class=" flex flex-col relative " :class="{
                                    'pl-2':gallery,'h-[60px]': gallery, 'w-[190px]':gallery
                                }">
                                    <p class="font-montsebold font-extrabold">{{ song.Artist }}</p>
                                    <p>{{ song.Title }}</p>
                                </div>
                                <img v-if="song.Language == 'Ingles'&&gallery" class=" opacity-70 mb-2 self-end  mr-2 w-[30px]"
                                    src="../assets/images/uk.png" alt="">
                                <img v-if="song.Language == 'Espanol'&&gallery" class=" opacity-70 mb-2 self-end  mr-2 w-[30px]"
                                    src="../assets/images/spain.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div v-else class=" mr-2 flex flex-col my-2" v-for="song in this.karaoke.songs">
                        <div :id="song.Artist.charAt(0)" @click="selectSong(song)" :class="{
                            'bg-slate-300': !song.Selected,
                            'bg-white': song.Selected,
                            'bg-opacity-70': song.Selected,
                            'flex flex-row': gallery,
                            'pl-2': !gallery,
                            'h-[90px]':gallery

                        }"
                            class=" w-full hover:bg-opacity-50 text-opacity-30 font-montseregular rounded-lg shadow  bg-opacity-30">
                            <img v-if="gallery" :src="`/images/${song.SongPath}`"
                                class=" rounded-md barcelona h-full w-[90px]" alt="">
                            <div class="flex flex-col" :class="{'h-[110px]':gallery}" >
                                <div class=" flex flex-col relative leading-5 " :class="{
                                    'pl-2':gallery,'h-[60px]': gallery, 'w-[190px]':gallery
                                }">
                                    <p class=" mt-1 font-montsebold font-extrabold">{{ song.Artist }}</p>
                                    <p class=" mb-1" >{{ song.Title }}</p>
                                </div>
                                <img v-if="song.Language == 'Ingles'&&gallery" class=" opacity-70 mb-2 self-end  mr-0 w-[30px]"
                                    src="../assets/images/uk.png" alt="">
                                <img v-if="song.Language == 'Espanol'&&gallery" class=" opacity-70 mb-2 self-end  mr-0 w-[30px]"
                                    src="../assets/images/spain.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
.bg-slate-200 {
    background-color: #e5e7eb;

}

.bg-slate-300 {
    background-color: #ffffff3e;

}

.list-container {
    transition: height 2s ease-in-out;
}
</style>
