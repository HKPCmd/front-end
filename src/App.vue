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

export default {
  name: 'App',
  components: {
    //HelloWorld
    Terminal,
    Sidebar
  }
}
</script>

<style>
@import '@/styles/main.css';
</style>