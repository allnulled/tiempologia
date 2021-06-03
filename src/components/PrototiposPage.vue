<template>
  <div class="prototipos-page-component">
    <DataManager :root="root" target-model="Prototipos" />
  </div>
</template>

<script>
export default {
  name: "PrototiposPage",
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