<template>
  <div class="footer-component">
    <div class="footer-label text-align-right">
      Esta <a href="https://allnulled.github.io/allinout">app</a> fue creada con ❤ por <a href="https://github.com/allnulled">allnulled</a>
    </div>
  </div>
</template>

<script>

export default {
  name: "Footer",
  components: {},
  props: {},
  data() {
    return {
      
    };
  },
  watch: {}
};
</script>

<style>
.footer-component {
  border-top: 1px solid #E0E0E0;
  margin-top: 30px;
}
.footer-label {
  font-size: 9px;
  color: #AAA;
  
}
.footer-label > a {
  text-decoration: underline;
  color: inherit;
}
</style>