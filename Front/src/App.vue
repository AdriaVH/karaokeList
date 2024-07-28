<template>
  <div class=" relative h-screen flex flex-col " :style="{
    backgroundImage: 'url(../src/assets/images/bg-doble.png)'
  }">
    <div class=" w-full  flex flex-col">
      <nav class="  ring-gray-600 ring-opacity-30 ring-8 bg-opacity-40 bg-slate-900 h-12 ">
        <div class=" font-montsebold mx-4 m-[10px] bg-opacity-70 flex justify-between text-slate-300 h-8">
          <RouterLink to="/" class=" transition duration-500 ease-in-out hover:scale-125 opacity-100 hover:text-white">
            <img class="   w-7" src="./assets/images/listView.png" alt="">
          </RouterLink>
          <RouterLink to="/Share"
            class=" transition duration-500 ease-in-out hover:scale-125 opacity-100 hover:text-white">
            <div
              class=" ring-white ring-opacity-30 ring-2 bg-opacity-40 h-[27px] w-[27px]  rounded-md  bg-slate-800 flex flex-col items-center">
              <img class="mt-0.5  w-6" src="./assets/images/qrWebAlpha.png" alt="">

            </div>
          </RouterLink>
          <RouterLink to="/Search"
            class=" transition duration-500 ease-in-out hover:scale-125 opacity-100 hover:text-white">
            <img class="w-7" src="./assets/images/searchAlpha.png" alt="">

          </RouterLink>
        </div>
      </nav>
      <div class=" self-center mt-6 ">
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <Component :is="Component" />
          </transition>
        </RouterView>
      </div>

    </div>
    <div class=" visible w-full absolute songBar-container bottom-0 flex flex-col"
      :class="{ 'expanded': karaoke.expanded, 'h-24': visible, 'h-0': !visible }">
      <!-- <button @click="toggleHeight" class=" w-20 bg-black flex flex-col items-center"
        :class="{ 'h-8': visible }" >
        <img :src="currentImage" alt="Default Image"
          class=" -mt-3 transition duration-500 hover:scale-100 scale-75 h-14 w-20" />
      </button> -->
      <SongBar></SongBar>
    </div>
  </div>
</template>
<script>

import SongBar from './components/SongBar.vue'
import { useKaraokeStore } from './stores/karaoke';
import { watch } from 'vue';

export default {
  name: "App",
  components: { SongBar },
  setup() {
    const karaoke = useKaraokeStore()

    return { karaoke }

  },
  created() {
    this.getSongs()
  },
  async mounted() {
    this.getSongs();
    if (this.karaoke.songsOnCart == false&&this.activeSongs) {
      this.intervalId = setInterval(this.getSongs, 3000);
    }
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },

  data() {
    return {
      song: {},
      visible: true,
      currentImage: "../src/assets/images/arrowUp.png"
    }
  },
  computed: {
    activeSongs() {
      let result = false
      this.karaoke.songs.map(song => {
        if (song.isActive) {
          result = true
        }
      })
      return result
    }
  },

  methods: {
    async getSong() {

      try {
        this.song = null
        const response = await fetch('http://localhost:3018/api/songs/1')
        const data = await response.json()
        this.song = data
      } catch (err) {

      }
    },
    async getSongs() {
      // console.log(this.karaoke.songs)
      try {

        const response = await fetch('http://localhost:3018/api/songs')
        const data = await response.json()
        data.forEach(song => {
          const pathParts = song.SongPath.split("/");
          const lastPart = pathParts.pop();
          song.SongPath = lastPart + " [CO].jpg"

        });
        this.karaoke.songs = data
        this.fetchImages()
      } catch (err) {

      }
    },
    toggleHeight() {
      if (!this.karaoke.expanded) {
        this.currentImage = "../src/assets/images/arrowDown.png"
      } else {
        this.currentImage = "../src/assets/images/arrowUp.png"
      }
      this.karaoke.expanded = !this.karaoke.expanded;

    },
  }
}


</script>
<style>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;

}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.slide-fade-enter-active {
  transition: all 1s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to,
.visible-enter-active,
.visible-leave-active {
  transition: height 0.5s ease-in-out;
}

.songBar-container {
  /* Default height */
  height: 0px;
  bottom: 0px;
  transition: height 2s ease-in-out;
}

.songBar-container.expanded {
  /* Expanded height */
  height: 450px;
}
</style>
