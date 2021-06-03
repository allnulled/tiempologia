<template>
  <div class="reality-page-component">
    <DataManager :root="root" target-model="Eventos" />
  </div>
</template>

<script>
export default {
  name: "EventosPage",
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