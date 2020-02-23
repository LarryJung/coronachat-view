<template>
  <q-page class="col justify-end">
    <div>채팅 {{ id }}</div>

    <div class="q-pa-md row justify-center">
      <h7>
        <span class="text-bold text-grey-9">Sunday, 19th</span>
      </h7>
    </div>
    <div class="q-ml-md row items-center q-mt-md" v-for="item in messages" :key="item.id">
      <q-icon class="q-mr-sm" name="far fa-meh-blank" size="lg"/>
      <div>
        <div class="text-bold text-subtitle1">
          {{item.sender}}
          <span class="text-caption">{{item.time}}</span>
        </div>
        <div class="text-body1">{{item.stuff}}</div>
      </div>
    </div>
    <q-input
      class="q-ma-md absolute-bottom"
      outlined
      autofocus
      v-model="stuff"
      @keyup.enter="send()"
    >
      <template v-slot:before>
        <q-icon name="face" />
      </template>
      <template v-slot:append>
        <q-btn color="blue-grey-10" type="sent" label="보내기" @click="send()" />
      </template>
    </q-input>
  </q-page>
</template>

<script>
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
      messages: [
        {
          id: "12312",
          stuff: "hello",
          sender: "larry",
          time: "2020년 02월 11일 23:22:12"
        },
        {
          id: "123122",
          stuff: "hello",
          sender: "larry",
          time: "2020년 02월 11일 23:22:12"
        },
        {
          id: "12312363",
          stuff: "hello",
          sender: "larry",
          time: "2020년 02월 11일 23:22:12"
        },
        {
          id: "12312747",
          stuff: "hello",
          sender: "larry",
          time: "2020년 02월 11일 23:22:12"
        }
      ]
    };
  },
  methods: {
    send: function() {
      alert(this.stuff);
    }
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
</style>