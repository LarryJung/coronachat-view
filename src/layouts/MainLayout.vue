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
        <q-btn v-if="$store.state.auth.isLogin" @click="logout()" class="q-mr-md" color="brown-4">로그아웃</q-btn>
      </div>
      <q-scroll-area
        style="height: calc(100% - 81px); margin-top: 81px; border-right: 1px solid #ddd"
      >
        <q-list separator>
          <q-separator />
          <q-item class="flex items-center text-bold bg-blue-grey-3 text-grey-9"># 구독한 채널</q-item>
          <q-separator />
          <my-channel-list-item v-for="item in myChannels" :key="item.id" v-bind="item" />
          <q-item class="flex items-center text-bold bg-blue-grey-3 text-grey-9"># 전체 채널 목록</q-item>
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
  props: {
    showLogoutBtn: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      showLogoutBtn: false,
      leftDrawerOpen: false,
      myChannels: [
        {
          title: "대구 상황전파방",
          caption: "1",
          id: 1,
          unReadCount: 3
        },
        {
          title: "부평 소식모아요",
          caption: "1",
          id: 2,
          unReadCount: 26
        }
      ],
      channels: [
        {
          title: "대구 상황전파방",
          caption: "1",
          id: 1
        },
        {
          title: "부평 소식모아요",
          caption: "32",
          id: 2
        },
        {
          title: "해외주요 뉴스 전달합니다.",
          caption: "23",
          id: 3
        },
        {
          title: "인천대 코로나톡방",
          caption: "324",
          id: 4
        },
        {
          title: "서울시 집회현황체크",
          caption: "5",
          id: 5
        },
        {
          title: "코로나 뉴스 링크방",
          caption: "63",
          id: 6
        },
        {
          title: "대구 상황전파방",
          caption: "1",
          id: 7
        },
        {
          title: "부평 소식모아요",
          caption: "32",
          id: 8
        },
        {
          title: "해외주요 뉴스 전달합니다.",
          caption: "23",
          id: 9
        },
        {
          title: "인천대 코로나톡방",
          caption: "324",
          id: 10
        },
        {
          title: "서울시 집회현황체크",
          caption: "5",
          id: 11
        },
        {
          title: "코로나 뉴스 링크방",
          caption: "63",
          id: 12
        },
        {
          title: "대구 상황전파방",
          caption: "1",
          id: 13
        },
        {
          title: "부평 소식모아요",
          caption: "32",
          id: 14
        },
        {
          title: "해외주요 뉴스 전달합니다.",
          caption: "23",
          id: 15
        },
        {
          title: "인천대 코로나톡방",
          caption: "324",
          id: 16
        },
        {
          title: "서울시 집회현황체크",
          caption: "5",
          id: 17
        },
        {
          title: "코로나 뉴스 링크방",
          caption: "63",
          id: 18
        }
      ]
    };
  },
  methods: {
    logout: function() {
      requestLogout(this);
    }
  }
};
</script>
