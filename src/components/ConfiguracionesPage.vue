<template>
  <div class="reality-page-component">

    <div class="settings-section">
      <div>
        <FormSelector
          :root="root"
          label-preset="Selecciona una sección de configuraciones:"
          :possible-values-preset="posiblesSecciones"
          property-to-show-preset="nombre"
          internal-value-preset=""
          :on-change-preset="setSeccion"
          ref="Seccion"
        />
      </div>
    </div>

    <div class="settings-section" v-if="seccionSeleccionada === 'Sincronización de datos'">
      <div>
        <div class="h-border"></div>
        <b class="form-label underline">Sincronización de datos</b>
        <table>
          <tbody>
            <tr>
              <td class="width-100-x100"></td>
              <td
                class="see-cell"
                :class="{ underline: modo === 'importar' }"
                v-on:click="modo = 'importar'"
              >
                Importar
              </td>
              <td
                class="add-cell"
                :class="{ underline: modo === 'exportar' }"
                v-on:click="modo = 'exportar'"
              >
                Exportar
              </td>
            </tr>
          </tbody>
          <tbody v-if="modo === 'importar'">
            <tr>
              <td colspan="100">
                <div class="form-label">
                  <span>Datos a importar: (JSON array)</span>
                </div>
                <textarea
                  v-model="scriptParaImportar"
                  class="form-input width-100-x100 monospaced"
                ></textarea>
                <div class="text-align-right" style="margin-top: 5px">
                  <span>
                    <button
                      class="form-button form-sm float-right"
                      type="button"
                      v-on:click="validarScriptParaImportar"
                    >
                      Validar
                    </button>
                  </span>
                  <span>
                    <button
                      style="margin-right: 3px"
                      class="form-button form-sm float-right"
                      type="button"
                      v-on:click="importarScript"
                    >
                      Importar
                    </button>
                  </span>
                </div>
                <div
                  class="error-box"
                  v-if="errorAlImportar"
                  style="margin-top: 1px"
                >
                  {{ errorAlImportar }}
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-if="modo === 'exportar'">
            <tr>
              <td colspan="100">
                <div class="form-label">
                  <span>Datos a exportar: </span>
                </div>
                <textarea
                  v-model="scriptParaExportar"
                  disabled
                  class="form-input width-100-x100 monospaced"
                ></textarea>
                <span>
                  <button
                    style="margin-top: 3px"
                    class="form-button form-sm float-right"
                    type="button"
                    v-on:click="exportarScript"
                  >
                    Exportar
                  </button>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="settings-section" v-if="seccionSeleccionada === 'Idioma'">
      <div class="h-border"></div>
      <b class="form-label underline">Idioma</b>
      <table>
        <tbody>
          <tr>
            <td colspan="100">
              <div class="form-label">Disculpen las molestias. Esta aplicación está de momento solamente en castellano.</div>
              <div class="display-none">
              <FormSelector
                :root="root"
                label-preset="Selecciona un idioma:"
                :possible-values-preset="posiblesIdiomas"
                property-to-show-preset="nombre"
                internal-value-preset="Español"
                :on-change-preset="setLanguage"
                ref="Language"
              />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="settings-section" v-if="seccionSeleccionada === 'Licencia'">
      <div class="h-border"></div>
      <b class="form-label underline">Licencia de este software</b>
      <div class="form-label">
        Este software está registrado bajo la licencia de software
        <a href="#">WTFPL</a> y que significa que puedes hacer lo que quieras
        con él.
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/assets/js/store.js";

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
      modo: "exportar",
      posiblesIdiomas: [
        { nombre: "Català", iso: "ca" },
        { nombre: "Español", iso: "es" },
        { nombre: "Inglés", iso: "en" },
      ],
      idiomaSeleccionado: "Español",
      posiblesSecciones: [
        { nombre: "Sincronización de datos" },
        { nombre: "Idioma" },
        { nombre: "Licencia" }
      ],
      seccionSeleccionada: undefined,
      scriptParaImportar: "",
      scriptParaExportar: "",
      errorAlImportar: undefined,
      errorAlExportar: undefined,
    };
  },
  watch: {},
  methods: {
    alCambiarIdioma(v) {
      this.idiomaSeleccionado = v;
    },
    async importarScript() {
      try {
        const esValido = this.validarScriptParaImportar();
        if (!esValido) {
          return;
        }
        const dataToImport = JSON.parse(this.scriptParaImportar);
        const results = await store.importDatabase(dataToImport);
        this.scriptParaImportar = "";
        console.log(results);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async exportarScript() {
      try {
        const database = await store.exportDatabase();
        this.scriptParaExportar = JSON.stringify(database, null, 2);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    validarScriptParaImportar() {
      try {
        const data = JSON.parse(this.scriptParaImportar);
        if (typeof data !== "object") {
          throw new Error("El valor a importar debe ser un objeto");
        }
        const tables = Object.keys(data);
        for (let index = 0; index < tables.length; index++) {
          const table = tables[index];
          if (store.MODELS.indexOf(table) === -1) {
            throw new Error(
              `No existe ninguna tabla «${table}» en la actual base de datos.`
            );
          }
          if (!Array.isArray(data[table])) {
            throw new Error(`Los datos para «${table}» deben ser un array.`);
          }
        }
        this.errorAlImportar = false;
        return true;
      } catch (error) {
        this.errorAlImportar = error;
      }
    },
    setLanguage(lang) {
      try {
        console.log(lang);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    setSeccion(value) {
      this.seccionSeleccionada = value;
    },
  },
};
</script>

<style>
</style>