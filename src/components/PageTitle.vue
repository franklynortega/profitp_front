<template>
  <q-page-sticky expand position="top">
    <div class="" style="width: 100%; background-color: white">
      <h4 class="q-ml-xl">
        <q-avatar
          rounded
          size="38px"
          color="secondary"
          text-color="white"
          :icon="icon"
          class="q-mr-sm"
        />
        {{ title }}
        <!-- <q-icon :name="icon" color="secondary" size="32px" class="q-mr-sm" />{{
        }} -->
      </h4>
      <q-separator style="margin: 0 20px 0 20px" />
    </div>
  </q-page-sticky>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageTitle",
  props: {
    title: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      default: "description",
    },
  },
});
</script>
