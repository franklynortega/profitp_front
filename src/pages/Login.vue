<template>
  <q-img
    src="../assets/logo.svg"
    style="width: 296px; height: 55px"
    :ratio="16 / 9"
    class="fixed-right q-mt-xl q-mr-xl"
  ></q-img>
  <div class="row items-center">
    <div class="col-12 col-md-4 login-box">
      <div class="row q-ml-md">
        <p class="text-white text-h4 text-weight-bold bienvenido">
          Bienvenido(a)
        </p>
      </div>
      <div class="row q-ml-md">
        <p class="text-white text-h5 text-weight-bold sub-title">
          al portal de CUNAPRO
        </p>
      </div>
      <q-card class="my-card login-card">
        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              v-model="email"
              filled
              type="email"
              label="Correo electrónico"
              lazy-rules
              dense
              :rules="[
                (val) => val.length > 0 || 'este campo es obligatorio',
                (val) =>
                  (val.includes('@') && val.includes('.')) ||
                  'Formato de correo inválido',
              ]"
            >
              <template v-slot:append>
                <q-icon name="mail" color="grey" />
              </template>
            </q-input>

            <q-input
              v-model="password"
              filled
              :type="isPwd ? 'password' : 'text'"
              label="Contraseña"
              lazy-rules
              dense
              class=""
              :rules="[(val) => val.length > 0 || 'este campo es obligatorio']"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <div class="row column">
              <q-btn
                rounded
                label="Iniciar sesión"
                type="submit"
                color="primary"
              />
            </div>
            <div class="row justify-between">
              <q-btn
                no-caps
                label="Registrarme"
                flat
                rounded
                color="primary"
                to="/register"
              />
              <q-btn
                no-caps
                to="/forgot_password"
                flat
                rounded
                color="primary"
                label="olvidé mi contraseña!"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<style lang="sass">
@media only screen and (max-width: 719px)
  .login-box
    margin-top: 215px
    background-color: rgba(0, 0, 0, 0.47)
  .bienvenido
    margin-top: 15px
    margin-bottom: -3px !important
@media only screen and (min-width: 720px)
  .login-box
    margin-left: 200px
    margin-top: 300px
    background-color: rgba(0, 0, 0, 0.47)
  .bienvenido
    margin-top: 15px
    margin-bottom: -3px !important
</style>

<script>
import { defineComponent, ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PageLogin",
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    let email = ref("");
    let password = ref("");
    let isPwd = ref(true);

    function onSubmit() {
      api
        .post(
          "login",
          {
            email: email.value,
            password: password.value,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then(async (res) => {
          // console.log(res.data);
          $q.notify({
            type: "positive",
            message: "Acceso exitoso",
          });
          localStorage.setItem(
            "cunaproClientToken",
            JSON.stringify(res.data.authorization.token)
          );
          localStorage.setItem(
            "cunaproUserData",
            JSON.stringify(res.data.user)
          );
          router.push({ path: "/" });
        })
        .catch((e) => {
          $q.notify({
            type: "negative",
            message: "Las credenciales no coinciden con nuestros registros.",
          });
        });
    }

    return {
      email,
      password,
      isPwd,
      onSubmit,
    };
  },
});
</script>
