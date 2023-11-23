<template>
  <q-layout view="lHh Lpr lFf" class="container-app">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style lang="sass">
@media (max-width: $breakpoint-md-max)
  .back
    background: url(../assets/fondo_p.jpg) no-repeat
    background-attachment: fixed
    background-size: cover
@media (min-width: $breakpoint-lg-min)
  .back
    background: url(../assets/fondo_p.jpg) no-repeat
    background-attachment: fixed
    background-size: cover
  .back::before
    content: ""
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(10,40,100, 0.4 )
</style>

<script>
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "StartLayout",

  components: {},

  setup() {
    const router = useRouter();

    onMounted(() => {
      document.getElementById("body").classList.add("back");
      if (
        localStorage.getItem("cunaproUserData") &&
        localStorage.getItem("cunaproClientToken")
      ) {
        router.push({ path: "/" });
      }
    });

    return {};
  },
});
</script>
