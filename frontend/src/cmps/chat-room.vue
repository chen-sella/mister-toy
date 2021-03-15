<template>
  <div class="chat-container">
    <section class="chat-header">
      <section class="header-content">
        <h4>Lets Chat About- {{ toy.name }}</h4>
        <el-button
          class="close-chat"
          icon="el-icon-close"
          circle
          @click="closeChat"
        ></el-button>
      </section>
      <p v-if="isTyping">is typing...</p>
    </section>
    <section class="chat-content">
      <ul class="msgs-container">
        <li v-for="(msg, idx) in msgs" :key="idx">
          {{ msg.from.username }}: {{ msg.txt }}
        </li>
      </ul>
    </section>
    <form @submit.prevent="sendMsg">
      <input @input="onInput" ref="input" type="text" v-model="msg.txt" />
      <button>Send</button>
    </form>
  </div>
</template>

<script>
import { socketService } from "@/services/socket.service";
import { utilService } from "@/services/util-service";

export default {
  name: "chatRoom",
  props: {
    toy: {
      type: Object,
    },
    user: {
      type: Object,
    },
  },
  data() {
    return {
      msg: { from: this.user || "unknown", txt: "" },
      msgs: [],
      topic: this.toy._id,
      isTyping: false,
    };
  },
  created() {
    socketService.setup();
    socketService.emit("chat topic", this.topic);
    socketService.on("chat addMsg", this.addMsg);
    socketService.on("chat incoming-msg", () => this.toggleTyping(true));
    socketService.on("stop typing", () => this.toggleTyping(false));
    this.debounce = utilService.debounce(() =>
      socketService.emit("chat user-typing", false)
    );
  },
  destroyed() {
    socketService.off("chat addMsg", this.addMsg);
    socketService.terminate();
  },
  methods: {
    toggleTyping(isTyping) {
      console.log("isTyping", isTyping);
      this.isTyping = isTyping;
    },
    addMsg(msg) {
      this.msgs.push(msg);
    },
    sendMsg() {
      console.log("Sending", this.msg);
      socketService.emit("chat newMsg", this.msg);
      this.msg = { from: this.user || "unknown", txt: "" };
    },
    changeTopic() {
      socketService.emit("chat topic", this.topic);
    },
    closeChat() {
      this.$emit("closeChat");
    },
    onInput() {
      socketService.emit("chat user-typing", true);
      this.debounce();
    },
  },
  mounted() {
    this.$refs.input.focus();
  },
};
</script>
