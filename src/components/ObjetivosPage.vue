<template>
  <div class="objetivos-page-component">
    <DataManager :root="root" target-model="Objetivos" />
  </div>
</template>

<script>

export default {
  name: "ObjetivosPage",
  components: {},
  props: {
    root: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      
    };
  },
  watch: {}
};
</script>

<style>
</style>