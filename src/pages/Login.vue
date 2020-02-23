<template>
  <q-page class="row justify-center">
    <div class="col-lg-5 col-xs-10 q-mt-lg q-pt-lg">
      <div class="col">
        <div class="q-gutter-md">
          <div v-if="$store.state.auth.createdUser.password && !$store.state.auth.isLogin">가입되었습니다. 랜덤 비밀번호는 
            <span class="text-bold">{{$store.state.auth.createdUser.password}}</span> 입니다. 기억해 두세요!</div>
          <q-input
            square
            outlined
            clearable
            lazy-rules            
            autofocus
            v-model="email"
            type="email"
            label="email"
            :rules="[ val => val && val.length > 0 || '필수 입력입니다.', val => validateEmail(val) || '이메일 형식에 맞지 않습니다.']"
          />
          <q-input
            square
            outlined
            clearable
            lazy-rules            
            v-model="password"
            type="password"
            label="password"
            :rules="[ val => val && val.length > 0 || '필수 입력입니다.']"
          />
        </div>
        <q-btn
          unelevated
          color="blue-grey-7"
          type="submit"
          size="lg"
          class="full-width q-mt-sm"
          label="로그인"
          @click="submit()"
        />
        <p class="text-grey-6 q-mt-lg flex justify-end">
          회원이 아니신가요?&nbsp;
          <a href="/#/createAccount">계정을 생성하세요.</a>
        </p>
      </div>
    </div>
  </q-page>
</template>

<script>
async function login(payload, vueInstance) {
  try {
    const response = await vueInstance.$axios.post(
      "http://localhost:8080/users/login",
      payload
    );
    if (response.status == 200) {
      vueInstance.$store.commit("login");
      vueInstance.$router.push('/')
    } else {
      alert(response.status);
    }
  } catch (error) {
    alert(error);
  }
}

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    validateEmail: function(mail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
    },
    submit: function() {
      const payload = {
        email: this.email,
        password: this.password
      }
      login(payload, this)
    }
  },
  mounted() {
    this.email = this.$store.state.auth.createdUser.email
    this.password = this.$store.state.auth.createdUser.password
  }
};
</script>

<style>
</style>