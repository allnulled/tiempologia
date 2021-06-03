<template>
  <div class="reality-page-component">
    <div>
        <div class="form-label">Sección de configuraciones</div>
        <div v-if="false">
          <div class="h-border"></div>
          <b class="form-label underline">Idioma del usuario</b>
          <FormSelector
              :root="root"
              label-preset="Idioma:"
              :possible-values-preset="posiblesIdiomas"
              property-to-show-preset="nombre"
              :on-change-preset="alCambiarIdioma"
          />
        </div>
        <div>
          <div class="h-border"></div>
          <b class="form-label underline">Licencia de este software</b>
          <div class="form-label">Este software está registrado bajo la licencia de software <a href="#">WTFPL</a> y que significa que puedes hacer lo que quieras con él.</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfiguracionesPage",
  components: {},
  props: {
    root: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
        posiblesIdiomas: [
            {nombre:'Català',iso:'ca'},
            {nombre:'Español',iso:'es'},
            {nombre:'Inglés',iso:'en'},
        ],
        idiomaSeleccionado: "es",
    };
  },
  watch: {},
  methods: {
      alCambiarIdioma(v) {
        this.idiomaSeleccionado = v;
      }
  }
};
</script>

<style>
</style>