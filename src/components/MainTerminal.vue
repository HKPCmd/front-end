<template>
    <div class="terminal">
        <div class="commands">
            <div v-for="(command, index) in commands" :key="'command' + index">
                <div class="command">
                    <span class="username">dusdjhyeon></span>{{ command }}
                </div>
                <div class="response" v-if="responses[index] !== undefined" ref="response">
                    <pre>{{ responses[index] }}</pre>
                </div>
            </div>
        </div>
        <div id="prompt">
            <span id="username">dusdjhyeon></span>
            <textarea id="input" rows="1" spellcheck="false" ref="textarea" v-model="message" @input="handleResizeHeight" @keydown.enter.prevent="sendMessage"></textarea>
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
            commands: [],
            responses: [],
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
                this.commands.push(this.message);
                this.socket.send(JSON.stringify(data));
                this.message = '';
            }
        },
        receiveMessage(data) {
            this.responses.push(data);
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
    },
    beforeDestroy() {
        if (this.socket) {
            this.socket.close();
        }
    },
    mounted() {
        this.handleResizeHeight();
    },
    updated() {
        this.$nextTick(function () {
            this.handleResizeHeight();
            const terminalElement = this.$el.querySelector('.terminal');
            if (terminalElement) {
                terminalElement.scrollTop = terminalElement.scrollHeight;
            }
        })
    },
}
</script>

<style scoped>
@import '@/styles/terminal.css';
</style>