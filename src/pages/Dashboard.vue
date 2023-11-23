<template>
  <q-page class="flex flex-center" style="padding: 0px 20px 0 20px">
    <q-img
      src="../assets/logo.svg"
      style="width: 495px; height: 93px"
      :ratio="16 / 9"
    ></q-img>
    <PageTitle title="Dashboard" icon="description" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import PageTitle from "src/components/PageTitle.vue";
export default defineComponent({
  name: "IndexPage",
  components: {
    PageTitle,
  },
});
</script>
