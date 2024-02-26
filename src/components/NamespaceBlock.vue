<template>
    <div>
        <div v-for="(item, index) in list" :key="index">
            <button 
            :class="{ 'box-clicked': clickedIndex === index }"
            class="box"
            @click="selectBox(index)"
            >
                {{  item  }}
            </button>
            <div v-if="clickedIndex === index" class="pods-list">
                <div v-for="(status, podname) in podList" :key="podname" class="pod-info">
                    <span :class="{ 'running': status === 'Running', 'not-running': status !== 'Running' }"></span>
                    <button
                    class="pod-wrapper"
                    :class="{ 'underline': underlineIndex === podname }"
                    @click="underlineText(podname)">
                        {{ podname }}
                    </button>
                </div>
            </div>
        </div>       
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    props: {
        list: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            clickedIndex: null,
            podList: {},
            underlineIndex: null,
        }
    },
    methods: {
        ...mapMutations(['setNamespace', 'setPodname']),
        selectBox(index) {
            if (this.clickedIndex === index) {
                this.clickedIndex = null;
            } else {
                this.clickedIndex = index;
                var namespace = this.list[index];
                this.setNamespace(namespace);
                this.$axios.get('/pods', { params: { namespace: namespace} })
                    .then(response => {
                        this.podList = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        },
        underlineText(podname) {
            this.setPodname(podname);
            this.underlineIndex = podname;
        }
    }
}
</script>

<style scoped>
.box {
    border: 0;
    outline: 0;
    height: 40px;  
    display: flex; 
    align-items: center; 
    justify-content: space-between; 
    padding: 10px;
    margin: 0px;
    width: 100%;
    font-size:14px;
    font-weight: bold;
    color:beige;
    background-color: transparent;
    flex-direction: column;
    cursor: pointer;
}
.box-clicked {
    background-color:rgb(121, 113, 103);
}
.pods-list{
    border: 0;
    outline: 0;
    height: flex;
    align-items: left;
    justify-content: left;
}
.pod-info {
    display: flex;
    align-items: center;
    font-size: 13px;
    padding-left: 10px;
    justify-content: left;
}
.pod-wrapper {
    text-align: left;
    white-space: normal;
    margin: 5px;
    border: none;
    background: transparent;
    cursor: pointer;
    color:beige;
}
.underline {
    text-decoration: underline;
    text-decoration-color: beige;
    text-decoration-thickness: 2px;
}
.running {
    width: 10px;
    height: 10px;
    background-color: rgb(5, 155, 5);
    border-radius: 50%;
}
.not-running {
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
}
</style>