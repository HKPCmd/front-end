<template>
    <div id="sidebar" class="sidebar">
        <h3>Cluster: {{ clusterName }}</h3>   <!--set dynamic after-->
        <h4>Namespaces</h4>
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
            namespaceList: ["default", "kube-node-lease", "kube-system", "kube-public", "kubernetes-dashboard"]
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