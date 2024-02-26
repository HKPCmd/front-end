<template>
    <div class="terminal">
        <div id="output"></div>
        <div id="prompt">
            <span id="username">dusdjhyeon></span>
            <textarea id="input" 
                rows="1" 
                spellcheck="false" 
                ref="textarea" 
                v-model="message" 
                @input="handleResizeHeight" 
                @keydown.enter.prevent="sendMessage">
            </textarea>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            socket: null,
            message: '',
            outputs: [],
        };
    },
    computed: {
        ...mapState(['namespace', 'podname']),
    },
    methods: {
        sendMessage() {
            const data = {
                namespace: this.namespace,
                podName: this.podname,
                command: this.message
            };
            if (this.socket) {
                this.socket.send(JSON.stringify(data));
            }
        },
        receiveMessage(data) {
            const { Stdout, Stderr } = JSON.parse(data);
            this.outputs.push(Stdout || Stderr);
        },
        handleResizeHeight() {
            this.$refs.textarea.style.height = 'auto';
            this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px';
        }
    },
    created() {
        this.socket = new WebSocket('ws://172.25.219.226:8000/ws');
        this.socket.onmessage = (event) => {
            this.receiveMessage(event.data);
        };
        this.socket.onopen = () => {
            console.log('WebSocket is open now.');
        };
        this.socket.onclose = () => {
            console.log('WebSocket is closed now.');
        };
        this.socket.onerror = (event) => {
            console.error('WebSocket encountered error: ', event);
        };
        this.handleResizeHeight();
    },
    beforeDestroy() {
        if (this.socket) {
            this.socket.close();
        }
    },
    updated() {
        this.handleResizeHeight();
    },
}
</script>

<style scoped>
@import '@/styles/terminal.css';
</style>