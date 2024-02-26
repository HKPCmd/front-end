import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        namespace: null,
        podname: null,
        namespaceList: [],
    },
    mutations: {
        setNamespace(state, namespace) {
            state.namespace = namespace;
        },
        setPodname(state, podname) {
            state.podname = podname;
        },
        setNamespaceList(state, namespaceList) {
            state.namespaceList = namespaceList;
        },
    },
});