<template>
    <div class="terminal">
        <div id="output"></div>
        <div id="prompt">
            <span id="username">dusdjhyeon></span>  <!--set dynamic after-->
            <textarea id="input" rows="1" spellcheck="false" ref="textarea" @input="handleResizeHeight">
            </textarea>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.handleResizeHeight();
    },
    updated() {
        this.handleResizeHeight();
    },
    methods: {
        handleResizeHeight() {
            this.$refs.textarea.style.height = 'auto';
            this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px';
        }
    }
}
</script>

<style scoped>
@import '@/styles/terminal.css';
</style>