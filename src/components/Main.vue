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
html {
  background-color: #333;
}
div {
  color: #FFFFFF;
}
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
  border: 0px solid transparent;
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
  border: 0px solid transparent;
  border-radius: 0pt;
  padding: 10px;
  background-color: #D0D0D0;
  cursor: pointer;
  transition: background-color 0.2s linear;
}
.form-button:hover {
  background-color: #E0E0E0;
}
.form-icon {
  vertical-align: middle;
}
.form-button.sm {
  padding: 5px;
}
.form-button.xs {
  padding: 5px;
}
.form-button.sm .form-icon {
  width: 22px;
  height: 22px;
}
.form-button.xs .form-icon {
  width: 16px;
  height: 16px;
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
  border: 0px solid transparent;
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
  border: 0px solid transparent;
  /*background-color: #F8F8F8;*/
}
.propiedades-de-objetivo-box {
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



.danger-button {
  background-color: #ffe0e0;
}
.danger-button:hover {
  background-color: #ffaaaa;
}
.edition-button {
  background-color: #e0e0ff;
}
.edition-button:hover {
  background-color: #aaaaff;
}
.success-button {
  background-color: #e0ffe0;
}
.success-button:hover {
  background-color: #aaffaa;
}


.selectable {
  background-color: #D0D0D0;
  transition: background-color .2s linear;
  cursor: pointer;
}
.selectable:hover {
  background-color: #E0E0E0;
}
.selectable.selected {
  background-color: #FFFFFF;
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
.float-right {
  float: right;
}


.data-manager-table > .tipo-evento tr.nombre-row > td,
.horario-table > .tipo-evento tr.nombre-row > td,
.vista-general-table.tipo-evento .moment-cell {
  background-color: #A0EFB0;
}
.data-manager-table > .tipo-objetivo tr.nombre-row > td,
.horario-table > .tipo-objetivo tr.nombre-row > td,
.vista-general-table.tipo-objetivo .moment-cell {
  background-color: #ADB3DB;
}
.data-manager-table > .tipo-plan tr.nombre-row > td,
.horario-table > .tipo-plan tr.nombre-row > td,
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

.form-sm {
  font-size: 10px;
  padding: 5px;
}

.monospaced {
  font-family: monospace;
  font-size: 10px;
}

input, textarea, button, .curved {
  border-radius: 0pt !important;
}

.overflow-hidden {
  overflow: hidden;
}
.bg-transparent {
  background-color: transparent !important;
}
.display-none {
  display: none;
}








html {
  background-color: #f8f8f8;
}
div {
  color: #000;
}
button, input, textarea,
  .form-input-deployer,
  .form-button,
  .form-input,
  .navigation-item-contents,
  .options-item,
  .volcado-box,
  .propiedades-de-objetivo-box,
  .error-box,
  .data-manager-table,
  .table-horario,
  .vista-general-table {
  box-shadow: 1px 1px 1px 1px #D0D0D0 !important;
}

.volcado-box {
  margin-top: 5px;
}

.volcado-box, .propiedades-de-objetivo-box {
  padding: 5px;
}

.error-box,
.data-manager-filter-table,
.data-manager-table,
.vista-general-table,
.options-list {
  margin-top: 5px;
}

.propiedades-de-objetivo-box {
  margin-bottom: 5px;
}

.volcado-box {
  background-color: white;
}

.options-item {
  margin-top: 4px;
  border-left: 2px solid #333;
}

.separador-vertical {
  height: 5px;
  min-height: 5px;
  max-height: 5px;
}

* {
    -webkit-tap-highlight-color: transparent;
}

.form-input-deployer,
.options-item {
  color: #333;
  background-color: #D0D0D0;
}
.form-input-deployer:hover,
.options-item:hover {
  background-color: #E0E0E0;
}
.form-input-deployer:focus,
.options-item:focus {
  background-color: white;
}
.error-box, .form-input, .property-cell, .moment-cell, .value-cell, .nombre-cell {
  color: black;
}
.table-horario {
  margin-top: 5px;
}
.table-horario .moment-cell,
.table-horario .value-cell,
.table-horario .property-cell {
  border-top: 0px solid transparent !important;
}


</style>
