<template>
    <div class=" -mt-14 right-[4vw] absolute items-end flex flex-col transition-all duration-[2900ms] ease-in-out">

        <button @click="selectSongs"
            class="  flex flex-row items-center justify-center bg-opacity-0 p-[3px] mb-2 text-sm font-medium rounded-full group bg-gradient-to-br from-purple-300 via-green-300 via-emerald-300 to-blue-300 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 text-white hover:text-gray-900 ">
            <span
                class=" font-extrabold font-montseregular text-4xl px-6 py-3.5 transition-all ease-in duration-150 bg-opacity-90 bg-gray-900 rounded-full group-hover:bg-opacity-0">
                +
                <span v-if="karaoke.songsOnCart.length>1"
                    class=" border-black font-montseregular font-black absolute -right-1 -top-1  ease-in-out text-black inline-flex items-center justify-center w-6 h-6 ms-2 text-base bg-gradient-to-br from-blue-300 via-green-300 to-purple-300 bg-opacity-50 rounded-full">
                    {{(karaoke.songsOnCart.length)}}
                </span>
            </span>
        </button>

    </div>
</template>
<script>
import { useKaraokeStore } from '@/stores/karaoke';
export default {
    name: "AddToQue",
    data() {
        return {

        }
    },
    methods: {
        selectSongs() {
            for (let song of this.karaoke.songsOnCart) {
                song.Selected = !song.Selected;
                delete song.isActive
                delete song.isAlreadyAdded
                let now = new Date();
                let toString = now.toISOString();
                song.TimeStamp = toString.slice(0, 19).replace('T', ' ');

                console.log(`TimeStamp property value is: ${song.TimeStamp}`)
                this.updateSong(song)
            }
            this.karaoke.songsOnCart=[]


        },
        async updateSong(song) {

            console.log(`Song updated succesfully`)
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
    setup() {
        const karaoke = useKaraokeStore();

        return { karaoke };
    },

}
</script>
<style>
.button-with-background-image {
    background-image: url('/Front/src/assets/images/bg.png');
    background-size: contain;
    background-position: center;
}
</style>