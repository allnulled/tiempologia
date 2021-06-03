<template>
  <div class="planes-page-component">
    <DataManager :root="root" target-model="Planes" />
  </div>
</template>

<script>
export default {
  name: "PlanesPage",
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