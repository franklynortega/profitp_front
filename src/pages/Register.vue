<template>
  <div class="row items-center">
    <div class="col-12 col-md-4 login-box">
      <div class="row q-ml-md">
        <p class="text-white text-h4 text-weight-bold bienvenido">
          Formulario de registro
        </p>
      </div>
      <div class="row q-ml-md">
        <p class="text-white text-h5 text-weight-bold sub-title">
          Sólo le tomará unos segundos...
        </p>
      </div>
      <q-card class="my-card login-card" flat no-shadow>
        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              v-model="name"
              filled
              dense
              type="text"
              label="Nombre"
              lazy-rules
              :rules="[(val) => val.length > 0 || 'Este campo es obligatorio.']"
            >
              <template v-slot:append>
                <q-icon name="person" color="grey" />
              </template>
            </q-input>
            <q-input
              v-model="email"
              filled
              dense
              type="email"
              label="Email"
              lazy-rules
              :rules="[
                (val) => val.length > 0 || 'Este campo es obligatorio.',
                (val) =>
                  (val.includes('@') && val.includes('.')) ||
                  'Formato de correo inválido.',
              ]"
            >
              <template v-slot:append>
                <q-icon name="mail" color="grey" />
              </template>
            </q-input>

            <q-input
              v-model="password"
              filled
              dense
              :type="isPwd ? 'password' : 'text'"
              label="Contraseña"
              lazy-rules
              :rules="[
                (val) =>
                  val.length >= 8 ||
                  'La contraseña debe tener al menos ocho caracteres.',
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <q-input
              v-model="c_password"
              filled
              dense
              :type="isPwd ? 'password' : 'text'"
              label="Contraseña"
              lazy-rules
              :rules="[
                (val) => val == password || 'Las contraseñas no coinciden.',
              ]"
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
                label="Registrarme"
                type="submit"
                color="primary"
              />
            </div>
            <div class="row justify-center">
              <q-btn
                label="Ya tengo una cuenta"
                flat
                no-caps
                rounded
                color="primary"
                to="/login"
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
    let name = ref("");
    let email = ref("");
    let password = ref("");
    let c_password = ref("");
    let isPwd = ref(true);

    function onSubmit() {
      api
        .post(
          "register",
          {
            name: name.value,
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
          $q.notify({
            type: "positive",
            message: "Registro satisfactorio!",
          });
          router.push({ path: "/login" });
        })
        .catch((e) => {
          $q.notify({
            type: "negative",
            message: "No se pudo registrar! intentelo de nuevo.",
          });
        });
    }

    return {
      name,
      email,
      password,
      c_password,
      isPwd,
      onSubmit,
    };
  },
});
</script>
