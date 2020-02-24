<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-blue-grey-10">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title class="q-pa-lg text-h5">
          Corona Chat -
          <span class="text-h6">코로나소식 오픈채팅</span>
        </q-toolbar-title>

        <!-- <div class="text-light-blue-3">We will never surrender</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <div
        class="text-grey-8 text-h6 flex items-center bg-blue-grey-5 absolute-top flex justify-between"
        style="height: 81px"
      >
        <span class="text-white q-ml-sm"># 코로나 제보 채널</span>
        <q-btn
          v-if="$store.state.auth.isLogin"
          @click="logout()"
          class="q-mr-md"
          color="brown-4"
        >로그아웃</q-btn>
      </div>
      <q-scroll-area
        style="height: calc(100% - 81px); margin-top: 81px; border-right: 1px solid #ddd"
      >
        <q-list separator>
          <q-separator />
          <q-item class="flex items-center text-bold bg-blue-grey-3 text-grey-9"># 구독한 채널</q-item>
          <q-separator />
          <my-channel-list-item v-for="item in myChannels" :key="item.id" v-bind="item" />
          <q-item class="flex items-center text-bold bg-blue-grey-3 text-grey-9 justify-between">
            <div># 전체 채널 목록</div>
            <q-btn round dense color="deep-orange" icon="add" @click="createChannel()" />
          </q-item>

          <main-channel-list-item v-for="item in channels" :key="item.id" v-bind="item" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MainChannelListItem from "components/MainChannelListItem";
import MyChannelListItem from "components/MyChannelListItem";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";

import { Notify } from "quasar";

async function getChannels(vueInstance) {
  try {
    const response = await vueInstance.$axios.get(
      "http://localhost:8080/channels",
      { withCredentials: true }
    );
    if (response.status == 200) {
      vueInstance.channels = response.data;
    } else {
      alert(response.status);
    }
  } catch (error) {
    alert(error);
  }
}

async function createChannel(payload, vueInstance) {
  try {
    const response = await vueInstance.$axios.post(
      "http://localhost:8080/channels",
      payload,
      { withCredentials: true }
    );
    if (response.status == 200) {
      // my channel list trigger
      // all channel list trigger
      vueInstance.$router.push(`channels/${response.data.id}`);
    } else {
      alert(response.status);
    }
  } catch (error) {
    alert(error);
  }
}

async function requestLogout(vueInstance) {
  try {
    const response = await vueInstance.$axios.post(
      "http://localhost:8080/users/logout"
    );
    if (response.status == 200) {
      vueInstance.$store.commit("logout");
      vueInstance.$router.push("/");
    } else {
      alert(response.status);
    }
  } catch (error) {
    alert(error);
  }
}

export default {
  name: "MainLayout",

  components: {
    MainChannelListItem,
    MyChannelListItem
  },
  data() {
    return {
      leftDrawerOpen: false,
      myChannels: [],
      channels: []
    };
  },
  methods: {
    logout: function() {
      requestLogout(this);
    },
    createChannel: function() {
      if (!this.$store.state.auth.isLogin) {
        Notify.create("로그인이 필요합니다.");
        this.$router.push("/login");
      } else {
        this.$q
          .dialog({
            title: "채널 생성",
            message: "채널 이름을 적어주세요. (5글자 이상이어야 합니다.)",
            prompt: {
              model: "",
              isValid: val => val.length > 5, // << here is the magic
              type: "text" // optional
            },
            cancel: true,
            persistent: true
          })
          .onOk(data => {
            console.log(">>>> OK, received", data);
            const payload = {
              name: data
            };
            createChannel(payload, this);
          });
      }
    }
  },
  mounted() {
    getChannels(this);
  }
};
</script>
