<template>
    <div>
        <div v-for="(item, index) in list" 
        :key="index" 
        :class="{ 'box-clicked': clickedIndex === index }"
        class="box"
        @click="selectBox(index)"
        >
            {{  item  }}
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
            clickedIndex: null
        }
    },
    methods: {
        selectBox(index) {
            this.clickedIndex = index;
        }
    }
}
</script>

<style scoped>
.box {
  height: 37px;  
  display: flex; 
  align-items: center; 
  justify-content: center; 
  margin-bottom: 0px; 
  width: 100%;
  font-size:14px;
}
.box-clicked {
    background-color:rgb(121, 113, 103);
}
</style>