<template>
  <q-layout view="lHh Lpr lff" style="background: none">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> PGC Profit Manufactura </q-toolbar-title>

        <div>Version | 1.0 dev</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-scroll-area
        style="
          height: calc(100% - 110px);
          margin-top: 110px;
          /* border-right: 1px solid #ddd; */
        "
      >
        <q-list>
          <q-item-label header></q-item-label>

          <MenuLink v-for="link in linksList" :key="link.title" v-bind="link" />

          <q-item clickable @click="logout()">
            <q-item-section avatar>
              <q-icon class="text-secondary" name="logout" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Cerrar Sesión</q-item-label>
              <q-item-label caption>Salir de la App</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <div class="absolute-top" style="background-color: whitesmoke">
        <q-img
          class="q-mt-md q-ml-md"
          src="../assets/logo.svg"
          style="width: 180px; height: 60px"
          :ratio="16 / 9"
        >
        </q-img>
        <div style="margin: 10px 0 10px 20px">
          <div class="text-weight-bold text-primary">{{ user.name }}</div>
          <div class="text-secondary">{{ user.rol }}</div>
        </div>
        <q-separator />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import MenuLink from "src/components/MenuLink.vue";
import { useRouter } from "vue-router";

const linksList = [
  {
    title: "Pólizas",
    caption: "Administrar Pólizas",
    icon: "description",
    link: "/policies",
  },
  {
    title: "Clientes",
    caption: "Administrar Clientes",
    icon: "people",
    link: "/",
  },
  {
    title: "Cumpleaños",
    caption: "Administrar Cumpleaños",
    icon: "cake",
    link: "#",
  },
  // {
  //   title: "Cerrar Sesión",
  //   caption: "Salir de la App",
  //   icon: "logout",
  //   link: "#",
  // },
];
export default defineComponent({
  name: "MainLayout",

  components: {
    MenuLink,
  },

  setup() {
    const router = useRouter();
    const user = {
      name: "",
      rol: "",
    };
    const leftDrawerOpen = ref(false);

    function logout() {
      localStorage.removeItem("cunaproUserData");
      localStorage.removeItem("cunaproClientToken");
      router.push({ path: "/login" });
    }

    onMounted(() => {
      document.getElementById("body").classList.remove("back");
      if (
        localStorage.getItem("cunaproUserData") &&
        localStorage.getItem("cunaproClientToken")
      ) {
        let currentUser = JSON.parse(localStorage.getItem("cunaproUserData"));
        user.name = currentUser.name;
        user.rol = currentUser.email; // mientras no tenemos un rol asociado colocamos el email
      } else {
        router.push({ path: "/login" });
      }
    });

    return {
      linksList,
      leftDrawerOpen,
      user,
      logout,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
