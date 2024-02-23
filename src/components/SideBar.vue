<template>
    <div id="sidebar" class="sidebar">
        <h3>Cluster: {{ clusterName }}</h3>   <!--set dynamic after-->
        <div style="display: flex; align-items: center; justify-content: space-between; ">
            <h3>Namespaces</h3>
            <button @click="getNamespaces" style="background: transparent; border: none; cursor: pointer;"> 
                <img src="@/assets/refresh.png" alt="Refresh" style="height: 23px; width: 23px;">
            </button>
        </div>
        <div id="namespace-list">
            <NamespaceBlock :list="namespaceList" />
        </div>
    </div>
</template>

<script>
import NamespaceBlock from './NamespaceBlock.vue'

export default {
    components: {
        NamespaceBlock
    },
    data() {
        return {
            clusterName: 'minikube',
            namespaceList: []
        }
    },
    created() {
        this.getNamespaces();
    },
    methods: {
        getNamespaces() {
            this.$axios.get('/namespaces')
            .then(response => {
                this.namespaceList = response.data;
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style scoped>
@import '@/styles/sidebar.css';

h3,h4 {
    margin: 9px;
    margin-bottom: 10px;
}
</style>