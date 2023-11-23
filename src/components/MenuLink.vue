<template>
  <q-item clickable @click="navigateTo()">
    <!-- <q-item clickable tag="a" target="_blank" :href="link"> -->
    <q-item-section v-if="icon" avatar>
      <q-icon class="text-secondary" :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "MenuLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
      to: "/",
    },

    icon: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const router = useRouter();
    function navigateTo() {
      router.push({ path: this.link });
    }
    return {
      navigateTo,
    };
  },
});
</script>
