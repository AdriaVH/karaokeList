<template>
    <div class=" scrollbar scrollbar-track-transparent scrollbar-thumb-transparent scrollbar-corner-transparent flex flex-col gap-2 items-center overflow-hidden bg-opacity-40 bg-slate-900 h-full" :class="{
        'overflow-scroll':karaoke.expanded,
}">
        <div v-if="songBarSongs[0]"
            class=" text-center font-semibold text-white gap-2 items-center flex  mt-1 w-full rounded-xl -gap-1"
            :class="{ 'animate-slide':!karaoke.expanded, 'animate-end': karaoke.expanded, 'centered-object': karaoke.expanded, ' mt-4' : karaoke.expanded,  'flex-row':!karaoke.expanded,
            'flex-col':karaoke.expanded }">
            <img :src="`/images/${songBarSongs[0].SongPath}`" class=" rounded-md imgOnQue " :class="{
                'w-[140px]': karaoke.expanded,
                'w-[60px]': !karaoke.expanded,
            }" alt="">
            <div class=" text-left">
                <p>{{ songBarSongs[0].Artist }}</p>
                <p>{{ songBarSongs[0].Title }}</p>
            </div>
        </div>
        <h1 v-for="(song, index) in songBarSongs" :key="index"
            class=" w-full items-center  flex flex-col text-center font-semibold text-white">
            <p class=" gap-3 items-center flex flex-row mt-1 w-[340px] rounded-lg -gap-1"
                :class="{ 'animate-start': song.AnimateStart, 'animate-end': song.AnimateEnd }" v-if="index > 0">
                <img :src="`/images/${song.SongPath}`" class=" rounded-md barcelona h-[60px] w-[60px]" alt="">
            <div class=" text-left">
                <p>{{ song.Artist }}</p>
                <p>{{ song.Title }}</p>
            </div>
            </p>
        </h1>
    </div>
</template>
<script>
import { useKaraokeStore } from '@/stores/karaoke';

export default {
    name: "SongBar",
    data() {
        return {
            animateStates: {},
        }
    },
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
        }
    },

    methods: {
    },
    setup() {
        const karaoke = useKaraokeStore();

        return { karaoke };
    },

}
</script>
<style>
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
    transform: translateX(1%); 
    transition: transform 2s ease-in-out; 
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