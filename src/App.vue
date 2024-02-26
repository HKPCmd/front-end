<template>
  <div id="app">
    <Terminal />
    <Sidebar />
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Terminal from './components/MainTerminal.vue'
import Sidebar from './components/SideBar.vue'
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {
    Terminal,
    Sidebar
  },
  computed: {
    ...mapState(['namespace', 'podname']),
  },
  methods: {
    ...mapMutations(['setNamespace', 'setPodname']),
  }
}
</script>

<style>
@import '@/styles/main.css';
</style>