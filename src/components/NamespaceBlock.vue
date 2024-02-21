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
                <div v-for="(status, podname) in podData" :key="podname" class="pod-info">
                    <div class="pod-wrapper">
                        {{ podname }}
                    </div>
                    <span :class="{ 'running': status === 'Running', 'not-running': status !== 'Running' }"></span>
                </div>
            </div>
        </div>       
    </div>
</template>

<script>
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
            podData: {
                "pod1": "Running",
                "pod2": "Pending",
                "pod3": "Failed",
            }
        }
    },
    methods: {
        selectBox(index) {
            if (this.clickedIndex === index) {
                this.clickedIndex = null;
            } else {
                this.clickedIndex = index;
            }
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
    justify-content: center; 
    padding: 10px;
    margin: 0px;
    width: 100%;
    font-size:14px;
    font-weight: bold;
    color:beige;
    background-color: transparent;
    flex-direction: column;
}
.box-clicked {
    background-color:rgb(121, 113, 103);
}
.pods-list{
    border: 0;
    outline: 0;
    height: flex;
    align-items: center;
    justify-content: center;
}
.pod-info {
    display: flex;
    align-items: center;
    font-size: 13px;
    justify-content: center;
}
.pod-wrapper {
    margin: 5px;
}
.running {
    width: 10px;
    height: 10px;
    background-color: rgb(5, 155, 5);
    border-radius: 50%;
    margin-left: 10px;
}
.not-running {
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
    margin-left: 10px;
}
</style>