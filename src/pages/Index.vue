<template>
  <q-page class="flex flex-center">
    <div class="column items-center">
      <q-icon class="col q-mb-md" color="brown-10" name="far fa-smile" size="100px" />
      <div class="col text-h6">반갑습니다.</div>
      <div class="col text-h6">모두 코로나 정보 공유에 힘써 주세요!</div>
      <q-btn v-if="!this.$store.state.auth.isLogin" class="col text-h6 q-mt-lg" to="/login">로그인하기</q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      showLoginBtn: false
    }
  }
};
</script>
