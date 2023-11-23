<template>
  <q-page class="" style="padding: 80px 20px 0 20px">
    <DataTable />
    <PageTitle title="Administrar Pólizas" icon="description" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import PageTitle from "src/components/PageTitle.vue";
import DataTable from "src/components/InsurrancePolicies/DataTable.vue";
export default defineComponent({
  name: "InsurancePolicies",

  components: {
    PageTitle,
    DataTable,
  },
  setup() {
    return {};
  },
});
</script>
