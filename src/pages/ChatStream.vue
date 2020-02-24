<template>
  <q-page class="column justify-end">
      <div class="column reverse" style="margin-bottom:100px">
        <!-- <div class="q-pa-md row justify-center">
        <h7>
          <span class="text-bold text-grey-9">Sunday, 19th</span>
        </h7>
        </div>-->
        <div
          class="message-item q-ml-md row items-start q-mt-md"
          v-for="item in messages"
          :key="item.id"
        >
          <q-icon class="col-0.5 q-mr-sm" name="far fa-meh-blank" size="lg" />
          <div class="col">
            <div class="text-bold text-subtitle1">
              {{item.senderName}}
              <span class="text-caption">{{item.createdAt}}</span>
            </div>
            <div class="text-body1 q-mr-lg">{{item.stuff}}</div>
          </div>
        </div>
      </div>
    <q-input
      class="q-ma-md absolute-bottom q-mt-lg"
      outlined
      autofocus
      v-model="stuff"
      @keyup.enter="send()"
    >
      <template v-slot:before>
        <q-icon name="face" size="md" />
      </template>
      <template v-slot:append>
        <q-btn color="blue-grey-10" type="sent" label="보내기" @click="send()" />
      </template>
    </q-input>
  </q-page>
</template>

<script>
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";

function registEventSource(vueInstance) {
  console.log(`SESSION=${vueInstance.getCookie("SESSION")}`);
  const etc = {
    headers: {
      Cookie: `SESSION=${vueInstance.getCookie("SESSION")}`
    },
    withCredentials: true
  };
  const eventSource = new EventSourcePolyfill(
    `http://localhost:8080/chats/stream?channelId=${vueInstance.id}`,
    etc
  );
  eventSource.addEventListener("message", function(event) {
    vueInstance.messages.push(JSON.parse(event.data));
  });
}
// async function getMessages(channelId, vueInstance) {
//   try {
//     const response = await vueInstance.$axios.get(
//       `http://localhost:8080/chats/stream?channelId=${channelId}`
//     );
//     if (response.status == 200) {
//       vueInstance.messages = response.data;
//     } else {
//       alert(response.status);
//     }
//   } catch (error) {
//     alert(error);
//   }
// }

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      stuff: "",
      messages: []
      // messages: [
      //   {
      //     id: "12312",
      //     stuff:
      //       "우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따",
      //     sender: "larry",
      //     time: "2020년 02월 11일 23:22:12"
      //   },
      //   {
      //     id: "123122",
      //     stuff: "hello",
      //     sender: "larry",
      //     time: "2020년 02월 11일 23:22:12"
      //   },
      //   {
      //     id: "12312363",
      //     stuff: "hello",
      //     sender: "larry",
      //     time: "2020년 02월 11일 23:22:12"
      //   },
      //   {
      //     id: "12312747",
      //     stuff: "hello",
      //     sender: "larry",
      //     time: "2020년 02월 11일 23:22:12"
      //   }
      // ]
    };
  },
  methods: {
    send: function() {
      alert(this.stuff);
    },
    getCookie: function(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2)
        return parts
          .pop()
          .split(";")
          .shift();
    }
  },
  mounted() {
    registEventSource(this);
  }
};
</script>

<style lang="scss" scoped>
h7 {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid grey;
  line-height: 0.1em;
  margin: 10px 0 20px;
}

h7 span {
  background: #fff;
  padding: 0 10px;
}

.message-item:hover {
  opacity: 1;
  background-color: rgb(204, 204, 204);
}
</style>