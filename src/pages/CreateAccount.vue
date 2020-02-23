<template>
  <q-page class="row justify-center">
    <div class="col-lg-5 col-xs-10 q-mt-lg q-pt-lg">
      <div class="col">
        <div class="q-gutter-md">
          <q-input
            square
            outlined
            clearable
            lazy-rules
            autofocus
            v-model="email"
            type="email"
            label="이메일"
            :rules="[ val => val && val.length > 0 || '필수 입력입니다.', val => validateEmail(val) || '이메일 형식에 맞지 않습니다.']"
          />
          <q-input
            square
            outlined
            clearable
            v-model="name"
            label="닉네임"
            :rules="[ val => val && val.length > 0 || '필수 입력입니다.']"
          />
        </div>
        <q-btn
          unelevated
          color="blue-grey-7"
          type="submit"
          size="lg"
          class="full-width q-mt-sm"
          label="가입하기"
          @click="submit()"
        />
        <p class="text-grey-6 q-mt-lg">
          코로나챗은 누구나 이용 가능한 서비스입니다. 따라서 개인정보 노출 우려로 인해 발급되는&nbsp;
          <span
            class="text-bold text-grey-7"
          >임시 비밀번호</span>로 로그인 해 주세요.
        </p>
      </div>
    </div>
  </q-page>
</template>

<script>
async function createUser(payload, vueInstance) {
  try {
    const response = await vueInstance.$axios.post(
      "http://localhost:8080/users",
      payload
    );
    if (response.status == 201) {
      console.log("201");
      console.log(response.data);
      vueInstance.$store.commit("setCreatedUser", response.data);
      vueInstance.$router.push('/login')
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
      name: ""
    };
  },
  methods: {
    validateEmail: function(mail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
    },
    generatePassword: function() {
      var length = 10,
        charset =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()",
        retVal = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
      }
      return retVal;
    },
    submit: function() {
      const randomPwd = this.generatePassword();
      const payload = {
        name: this.name,
        email: this.email,
        password: randomPwd
      };
      createUser(payload, this);
    }
  }
};
</script>

<style>
</style>