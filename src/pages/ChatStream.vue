<template>
  <q-page>
    <q-list class="column reverse" style="height: 400px;">
      <q-item class="message-item" v-for="item in messages" :key="item.id">
        <div class="row items-center q-mt-md" style="margin-left:10px">
          <q-icon class="col-0.5 q-mr-sm" name="far fa-meh-blank" size="lg" />
          <div class="col">
            <div class="text-bold text-subtitle1">
              {{item.senderName}}
              <span class="text-caption">{{item.createdAt}}</span>
            </div>
            <div class="text-body1 q-mr-lg">{{item.stuff}}</div>
          </div>
        </div>
      </q-item>
    </q-list>
    <q-footer>
      <q-toolbar class="bg-grey-3 text-black row">
        <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
        <q-input
          rounded
          outlined
          dense
          class="WAL__field col-grow q-mr-sm"
          bg-color="white"
          v-model="message"
          placeholder="Type a message"
        />
        <q-btn color="blue-grey-10" type="sent" label="보내기" @click="send()" />
      </q-toolbar>
    </q-footer>
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
      // messages: []
      messages: [
        {
          id: "1231352373472",
          stuff: "신규메시징",
          senderName: "larry",
          createdAt: "2020년 02월 11일 23:22:12"
        },
        {
          id: "1231352",
          stuff: "리스트로는 제일 상단, 뷰에서는 가장 아래",
          senderName: "larry",
          createdAt: "2020년 02월 11일 23:22:12"
        },
        {
          id: "12312",
          stuff: "뷰 두번째",
          senderName: "larry",
          createdAt: "2020년 02월 11일 23:22:12"
        },
        {
          id: "123122",
          stuff: "hello",
          senderName: "larry",
          createdAt: "2020년 02월 11일 23:22:12"
        },
        {
          id: "12312363",
          stuff: "hello",
          senderName: "larry",
          createdAt: "2020년 02월 11일 23:22:12"
        },
        {
          id: "1231274723",
          stuff: "hello",
          senderName: "larry",
          createdAt: "2020년 02월 11일 23:22:12"
        },
        // {
        //   id: "1231343252",
        //   stuff:
        //     "우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따",
        //   senderName: "larry",
        //   createdAt: "2020년 02월 11일 23:22:12"
        // },
        // {
        //   id: "123123622",
        //   stuff: "hello",
        //   senderName: "larry",
        //   createdAt: "2020년 02월 11일 23:22:12"
        // },
        // {
        //   id: "123122727363",
        //   stuff: "hello",
        //   senderName: "larry",
        //   createdAt: "2020년 02월 11일 23:22:12"
        // },
        // {
        //   id: "123123452747",
        //   stuff: "hello",
        //   senderName: "larry",
        //   createdAt: "2020년 02월 11일 23:22:12"
        // },
        // {
        //   id: "12545312",
        //   stuff:
        //     "우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따우따",
        //   senderName: "larry",
        //   createdAt: "2020년 02월 11일 23:22:12"
        // },
        // {
        //   id: "12314635522",
        //   stuff: "hello",
        //   senderName: "larry",
        //   createdAt: "2020년 02월 11일 23:22:12"
        // },
        // {
        //   id: "123125472363",
        //   stuff: "hello",
        //   senderName: "larry",
        //   createdAt: "2020년 02월 11일 23:22:12"
        // },
        // {
        //   id: "123172282747",
        //   stuff: "hello",
        //   senderName: "larry",
        //   createdAt: "2020년 02월 11일 23:22:12"
        // }
      ]
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
    // registEventSource(this);
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