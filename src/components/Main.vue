<template>
  <div class="main-component">

    
    <div style="display: none">
      <FormSelector
        :root="this"
        :possible-values-preset="[]"
        property-to-show-preset="name"
      />
      <FormInput :root="this" />
      <FormTextarea :root="this" />
      <FormMoment :root="this" />
      <FormButton :root="this" />
    </div>

    <div class="intersitial" v-if="isLoading">
      <Intersitial :root="root" :on-touch-preset="() => {isLoading = false;}"/>
    </div>

    <div class="main-content">
      <FormNavigationSelector
        :root="this"
        :possible-values-preset="selectablePages"
        :on-change-preset="onChangeSelectedPage.bind(this)"
        property-to-show-preset="nombre"
        label-preset=""
        internal-value-preset="Inicio"
      />
      <div class="h-border"></div>
      <div class="page-container">
        <component :is="selectedPage + 'Page'" :root="this" />
      </div>
    </div>
    <FixedClock :root="root" />
  </div>
</template>

<script>

export default {
  name: "Main",
  components: {},
  props: {},
  data() {
    return {
      root: this,
      window: window,
      isLoading: true,
      selectedPage: "Inicio",
      selectablePages: [
        { name: "Home", nombre: "Inicio" },
        { name: "Reality", nombre: "Eventos" },
        { name: "Plan", nombre: "Planes" },
        { name: "Goals", nombre: "Objetivos" },
        { name: "Prototypes", nombre: "Prototipos" }, 
        { name: "Settings", nombre: "Configuraciones" },
      ],
    };
  },
  methods: {
    onChangeSelectedPage(v) {
      this.selectedPage = v;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
* {
  box-sizing: border-box;
  font-family: Roboto;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
textarea {
  resize: vertical;
}
table {
  width: 100%;
}
.text-align-center {
  text-align: center;
}
.text-align-right {
  text-align: right;
}
.h-border {
  margin-top: 5px;
  margin-bottom: 5px;
  border-top: 1px solid #E0E0E0;
}
.form-item {
}
.form-label {
  font-size: 11px;
  display: block;
  width: 100%;
  padding-top: 15px;
}
.form-input {
  font-size: 15px;
  display: block;
  width: 100%;
  border-radius: 0pt;
  border: 1px solid #d0d0d0;
  padding: 10px;
}

.form-selector-table {
  width: 100%;
}
.form-input-container-cell {
  width: 100%;
}
.form-input-container {
  width: 100%;
}
.form-input {
  width: 100%;
}

.form-button {
  border: 1px solid #d0d0d0;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s linear;
}
.form-button:hover {
  background-color: #e0e0e0;
}

.no-border-table {
  border-collapse: collapse;
}
.width-100-x100 {
  width: 100%;
}
.width-50-x100 {
  width: 50%;
}
.underline {
  text-decoration: underline;
}

.error-box {
  padding: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  border: 1px solid #E0E0E0;
  background-color: #FFDFDF;
  font-size: 10px;
}
.property-cell {
  font-weight: bold;
  text-align: right;
  width: auto;
  font-size: 9px;
  vertical-align: top;
  text-decoration: underline;
  padding-top: 5px;
  word-break: keep-all;
  /*white-space: nowrap;*/
  max-width: 80px;
}
.value-cell {
  width: 99%;
  padding-top: 5px;
  font-size: 9px;
  vertical-align: top;
  border-left: 0px solid white;
  border-bottom: 0px solid white;
  cursor: pointer;
}
.value-cell:hover {
  background-color: #D0D0D0;
}
.property-cell,
.value-cell {
  padding: 10px;
  border-top: 1px solid white;
}
.nombre-cell {
  border-bottom: 1px solid white;
  font-size: 11px;
  padding: 10px;
}

.nombre-row {
  background-color: #E0E0E0;
  cursor: pointer;
}
.nombre-row:hover {
  background-color: #D0D0D0;
}
.nombre-row.selected {
  background-color: #D0D0D0;
}
.propiedades-row {
  background-color: #E0E0E0;;
}
.table-group {
  border-bottom: 1px solid white;
  background-color: #E0E0E0;
}
.table-group > tr:hover {
  /*background-color: #D0D0D0;*/
}
.table-group > tr.row-puntuacion-de-objetivos {
  background-color: #E0E0E0;
}
.hidden {
  display: none;
}
.propiedades-de-objetivo-cell {
  border: 1px solid #E0E0E0;
  background-color: #F8F8F8;
}

.main-component {
  text-align: center;
}
.main-content {
  display: inline-block;
  width: 100%;
  max-width: 720px;
  text-align: left;
}
html {
  background-color: #F8F8F8;
}



.selectable {
  background-color: #D0D0D0;
  transition: background-color .2s linear;
  cursor: pointer;
}
.selectable:hover {
  background-color: #C0C0C0;
}
.selectable.selected {
  background-color: #C0C0C0;
}
.text-label {
  font-size: 11px;
}

.moment-cell {
  background-color: #E0E0E0;
  padding: 10px;
  margin-bottom: 0px;
  vertical-align: top;
}
.add-cell {
  border-left: 1px solid #D0D0D0;
  padding-left: 9px;
}
.add-cell,
.see-cell {
  min-width: 30px;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 11px;
}
.v-align-top {
  vertical-align: top;
}
.v-align-middle {
  vertical-align: middle !important;
}
.cursor-pointer {
  cursor: pointer;
}
.uppercased {
  text-transform: uppercase;
  font-size: 8px;
}
.display-inline-block {
  display: inline-block;
}


.horario-table > .tipo-evento .nombre-cell,
.vista-general-table.tipo-evento .moment-cell {
  background-color: #A0EFB0;
}
.horario-table > .tipo-objetivo .nombre-cell,
.vista-general-table.tipo-objetivo .moment-cell {
  background-color: #ADB3DB;
}
.horario-table > .tipo-plan .nombre-cell,
.vista-general-table.tipo-plan .moment-cell {
  background-color: #FFFFA1;
}

.value-cell {
  background-color: #F8F8F8;
  transition: background-color .2s linear;
}
.value-cell:hover {
  background-color: #FFFFFF;
}

</style>
