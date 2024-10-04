<template>

    <div class="h-full flex flex-col items-center">
        <div class=" z-20 relative h-screen w-screen flex flex-col " :style="{
            backgroundImage: 'url(./images/bg-doblehoritz.png)',
            backgroundPosition: 'center left',
            backgroundSize: '' // Adjust as needed
        }">
        </div>
        <div v-show="karaoke.songBarVisible" ref="madridRef"
            class="w-[180px] z-10 madrid absolute flex flex-col transition-all duration-500 ease-in-out transform">
            <div
                class=" h-[28px] transition-opacity valencia flex flex-row items-center justify-center bg-opacity-0 pt-[0.1px] px-[3px] mb-2 text-sm font-medium rounded-t-lg group bg-gradient-to-br from-purple-200 from-10% via-30% to-90%  via-blue-200  to-emerald-300 text-white ">
                <span
                    class=" h-[25.5px] mt-1 text-center w-[180px] font-extrabold font-montseregular text-base transition-all ease-in duration-150 bg-opacity-90 bg-gray-900 rounded-t-lg">
                    Songs added
                </span>
            </div>

        </div>

        <div
            class=" absolute z-30 w-full valencia hide-scrollbar ring-gray-600 ring-opacity-30 ring-8  flex flex-col items-center overflow-scroll bg-opacity-40 bg-slate-900 h-full">
            <button @click="toggleHeight" class=" absolute w-[40vw] flex flex-col items-center h-4">
                <img :src="currentImage" alt="Default Image"
                    class=" -mt-3.5 transition duration-500 hover:scale-100 scale-75 h-14 w-20" />
            </button>
            <button @click="unlockingOptions"
                class="  mt-2 transition-all duration-[2000ms] left-2 absolute opacity-50 " :class="{
                    ' h-[4vh]': karaoke.expanded,
                    'w-[00px] -ml-2': !karaoke.expanded,
                }" alt=""> <img class="h-full w-full" :src="lockImage" alt=""> </button>
            <div v-if="songBarSongs[0]"
                class="  ml-[3.2vw] text-center font-semibold text-white gap-2 items-center flex pt-3 w-[70vw] rounded-xl -gap-1"
                :class="{
                    'animate-slide flex-row mt-3': !karaoke.expanded, 'animate-end centered-object mt-8': karaoke.expanded,
                    'flex-col': karaoke.expanded
                }">
                <img :src="`/images/${songBarSongs[0].SongPath}`" class=" rounded-md imgOnQue " :class="{
                    'w-[140px] -mt-2': karaoke.expanded,
                    'w-[60px]': !karaoke.expanded,
                }" alt="">
                <div @click="selectSong(songBarSongs[0])" class=" text-left">
                    <p>{{ songBarSongs[0].Artist }}</p>
                    <p>{{ songBarSongs[0].Title }}</p>
                </div>
            </div>
            <h1 v-if="karaoke.expanded" v-for="(song, index) in songBarSongs" :key="index"
                class=" w-full items-center  flex flex-row text-center font-semibold text-white">
                <div v-if="index > 0" class="flex flex-row w-full justify-center mt-1">
                    <img @click="songUp(song, index, index - 1)" v-if="showingOptions && index > 1"
                        src="../assets/images/arrowGreenUp.png" class=" mt-1 opacity-70 h-[55px] w-[60px]" alt="">

                    <div @click="selectSong(song)"
                        class=" gap-3 items-center flex flex-row mt-1 w-[340px] rounded-lg -gap-1" :class="{
                            'ml-[55px]': index < 2 && showingOptions,
                            'mr-[60px]': showingOptions && index == songBarSongs.length - 1
                        }">
                        <img :src="`/images/${song.SongPath}`" class=" rounded-md barcelona h-[60px] w-[60px]" alt="">
                        <div class=" text-left">
                            <p>{{ song.Artist }}</p>
                            <p>{{ song.Title }}</p>
                        </div>

                    </div>
                    <img @click="songDown(song, index, index + 1)"
                        v-if="showingOptions && index !== songBarSongs.length - 1"
                        src="../assets/images/arrowRedDown.png" class=" mt-1 opacity-70 h-[55px] w-[60px]" alt="">
                </div>

            </h1>

        </div>

    </div>
</template>
<script>
import { useKaraokeStore } from '@/stores/karaoke';
import AddToQue from './AddToQue.vue';
import { onMounted, ref, watch } from 'vue';
export default {
    name: "SongBar",
    data() {
        return {
            animateStates: {},
            showingOptions: false,
            currentImage: "../images/arrowUp.png",
            lockImage:"../images/locked1.png",
            count: 0,
            innerCount: 0
        }
    },
    components: { AddToQue },
    computed: {
        songBarSongs() {
            let array = this.karaoke.songs
            if (!array) {
                return []
            }
            let selectedArray = array.filter(song => song.Selected)

            let finalArray = selectedArray.sort((a, b) => {

                const dateA = new Date(a.TimeStamp);
                const dateB = new Date(b.TimeStamp);

                return dateA.getTime() - dateB.getTime();
            });

            return finalArray
        },
    },
    watch: {
        songBarSongs(newVal, oldVal) {
            let popUp = ""
            console.log(newVal.length)
            console.log(oldVal.length)
            if (newVal.length > oldVal.length) {
                popUp = true
            }
            if (popUp) {

                this.$refs.madridRef.classList.remove("slide-down")
                this.$refs.madridRef.classList.add("slide-up"); // Apply the slide-up animation
                console.log(newVal)
                setTimeout(() => {
                    this.$refs.madridRef.classList.remove("slide-up")
                    this.$refs.madridRef.classList.add("slide-down")

                    popUp = ""
                }, 6000);

            }

        }
    },

    methods: {
        songUp(song, index, indexUp) {
            if (index > 1) {
                let currentDate = new Date(this.songBarSongs[indexUp].TimeStamp);

                currentDate.setSeconds(currentDate.getSeconds() - 1);
                currentDate.setHours(currentDate.getHours() + 2)

                let newTimestampString = currentDate.toISOString().slice(0, 19).replace('T', ' ');

                song.TimeStamp = newTimestampString;
                console.log(`Updated Song Timestamp: ${song.TimeStamp}`)

                this.updateSong(song)

            }
        },
        songDown(song, index, indexDown) {

            let currentDate = new Date(this.songBarSongs[indexDown].TimeStamp);

            currentDate.setSeconds(currentDate.getSeconds() + 1);
            currentDate.setHours(currentDate.getHours() + 2)

            let newTimestampString = currentDate.toISOString().slice(0, 19).replace('T', ' ');

            song.TimeStamp = newTimestampString;
            console.log(`Updated Song Timestamp: ${song.TimeStamp}`)

            this.updateSong(song)

        },
        selectSong(song) {
            if (this.showingOptions) {
                song.Selected = !song.Selected;
                let now = new Date();
                let toString = now.toISOString();
                song.TimeStamp = toString.slice(0, 19).replace('T', ' ');


                console.log(`TimeStamp property value is: ${song.TimeStamp}`)
                this.updateSong(song)
            }
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
                const response = await fetch(`${this.karaoke.localhost}/api/songs/${song.Id}`, requestOptions)
                const data = await response.json()

                console.log(requestOptions.body)
                console.log(response)


            } catch (err) {
                console.log(err)
            }

        },
        toggleHeight() {
            if (!this.karaoke.expanded) {
                this.currentImage = "./images/arrowDown.png"
            } else {
                this.currentImage = "./images/arrowUp.png"
            }
            this.karaoke.expanded = !this.karaoke.expanded;

        },
        unlockingOptions(){
            this.showingOptions = !this.showingOptions;
            console.log(this.showingOptions)
            if (!this.showingOptions) {
                this.lockImage = "./src/assets/images/locked1.png"
            } else {
                this.lockImage = "./src/assets/images/unlocked1.png"
            }


        }
    },
    mounted() {


    },

    setup() {
    const karaoke = useKaraokeStore();
    const madridRef = ref(null); // Reference to the madrid element
    onMounted(() => {
        madridRef.value.style.transform = 'translateY(0)';
    });
    return { karaoke, madridRef };
},


}
</script>
<style>
@keyframes slideUp {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-100%);
    }
}

@keyframes slideDown {
    0% {
        transform: translateY(-100%);
    }

    100% {
        transform: translateY(0);
    }
}

.madrid {
    transform: translateY(-100%);
    animation-fill-mode: forwards;
    animation-duration: 3s;
}

.madrid.slide-up {
    animation-name: slideUp;
}

.madrid.slide-down {
    animation-name: slideDown;
}

.imgOnQue {
    transition: width 2s ease-in-out;
}

.animate-slide {
    animation-name: slideRightToLeft;
    animation-duration: 20s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}

.animate-start {
    animation-play-state: running;
}

.animate-end {
    animation-play-state: paused;
    transition: transform 2s ease-in-out;
}

.centered-object {
    transform: translateX(-2.5%);
    transition: transform 2s ease-in-out;
}

.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

@keyframes slideRightToLeft {
    0% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(-100%);
    }
}
</style>