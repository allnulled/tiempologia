<template>
  <div class="data-manager-component">
    <div>
      <div class="form-label">
        Sección de datos de «{{ targetModel.toLowerCase() }}»
      </div>
      <div class="h-border"></div>
    </div>
    <table class="no-border-table" data-ref="data-manager-main-table">
      <tbody>
        <tr>
          <td style="width: 100%">
            <div style="display: none">
              Gestionar «{{ targetModel.toLowerCase() }}»
            </div>
          </td>
          <td
            class="see-cell"
            :class="{ underline: mode === 'see' }"
            v-on:click="selectMode('see')"
          >
            Ver
          </td>
          <td
            class="add-cell"
            :class="{ underline: mode === 'add' }"
            v-on:click="selectMode('add')"
          >
            Añadir
          </td>
        </tr>
        <tr v-if="targetModel !== 'Prototipos' && mode === 'see'">
          <td colspan="3">
            <table class="no-border-table width-100-x100">
              <tbody>
                <tr>
                  <td>
                    <div class="form-input-deployer-container">
                      <div class="form-input-deployer-icon">
                        <img
                          class="form-input-deployer"
                          v-on:click="decreaseDate"
                          src="@/components/Forms/icons/previous.png"
                        />
                      </div>
                    </div>
                  </td>
                  <td class="width-100-x100 text-align-center">
                    <div class="text-label" style="font-size: 10px">
                      {{ formatDate(selectedDate).replace(/-/g, "/") }}
                    </div>
                    <div class="text-label" style="font-size: 9px">
                      {{ formatToDiaSemana(selectedDate) }},
                      {{ selectedDate.getDate() }} de
                      {{ formatToMesDelAno(selectedDate).toLowerCase() }} del
                      {{ selectedDate.getFullYear() }}
                    </div>
                  </td>
                  <td>
                    <div class="form-input-deployer-container">
                      <div class="form-input-deployer-icon">
                        <img
                          class="form-input-deployer"
                          v-on:click="increaseDate"
                          src="@/components/Forms/icons/next.png"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <table
      class="no-border-table data-table data-manager-filter-table"
      v-if="mode === 'see'"
      data-ref="data-manager-to_see-table"
    >
      <tbody v-if="!modelsData || !modelsData.length">
        <tr>
          <td>
            <div class="error-box">
              No se encontraron elementos en «{{ targetModel.toLowerCase() }}».
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="10">
            <div class="filter-box" style="border: 0px solid transparent">
              <input
                class="form-input"
                type="text"
                v-model="searchValue"
                placeholder="Filtro de texto"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table
      class="no-border-table data-manager-table"
      v-if="mode === 'see'">
      <tbody
        v-for="(modelData, modelIndex) in modelsData"
        v-bind:key="modelIndex"
        class="table-group"
        :class="{
          ['tipo-' + modelData.tipo.toLowerCase()]: true,
          hidden:
            searchValue.length > 0 &&
            JSON.stringify(modelData)
              .toLowerCase()
              .indexOf(searchValue.toLowerCase()) === -1,
        }"
      >
        <tr
          v-if="
            targetModel === 'Prototipos' ||
            (modelData.momento_efectivo &&
              modelData.momento_efectivo.split(' ')[0] ===
                formatDateReversed(selectedDate))
          "
          class="nombre-row"
          :class="{ selected: selectedModel === modelIndex }"
        >
          <td
            class="nombre-cell width-100-x100"
            :colspan="selectedModel === modelIndex ? 9 : 10"
            v-on:click="selectModel(modelIndex)"
          >
            <b
              >{{ modelData.nombre.replace(REGEX_FOR_DATE_IN_THE_END, "") }}
            </b>
            <span v-if="targetModel !== 'Prototipos'" class="underline"
              >({{
                modelData.nombre
                  .replace(REGEX_FOR_DATE_IN_THE_END, "ððð a las $4:$5")
                  .replace(/[^ð]+ððð /g, "")
              }})</span
            >
          </td>
          <td v-if="selectedModel === modelIndex">
            <div class="form-button sm danger-button">
              <img
                class="form-icon"
                src="@/components/Forms/icons/trash.png"
                v-on:click="confirmDelete(selectedModel)"
              />
            </div>
          </td>
        </tr>
        <tr class="propiedades-row" v-if="selectedModel === modelIndex">
          <td colspan="10">
            <table
              class="no-border-table"
              data-ref="data-manager-propiedades_de_modelo-table"
            >
              <tbody>
                <tr
                  v-for="(value, propert) in sortedFields(modelData)"
                  v-bind:key="modelIndex + '+' + propert"
                >
                  <td class="property-cell">
                    {{
                      propert.substr(0, 1).toUpperCase() +
                      propert.substr(1).replace(/_/g, " ")
                    }}:
                  </td>
                  <td
                    class="value-cell"
                    v-on:click="changeValue(modelData, propert)"
                  >
                    {{ value }}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <table
      class="data-table"
      v-else-if="mode === 'add'"
      data-ref="data-manager-to_add-table"
    >
      <tbody>
        <tr>
          <td>
            <FormSelector
              v-if="targetModel === 'Prototipos'"
              :root="root"
              label-preset="Tipo:"
              :possible-values-preset="dataTipos"
              property-to-show-preset="nombre"
              :on-change-preset="setTipo"
              ref="Tipo"
            />
            <FormSelector
              v-else
              :root="root"
              label-preset="Prototipo rápido:"
              :possible-values-preset="dataPrototiposPropios"
              property-to-show-preset="nombre"
              :on-change-preset="fulfillPrototipo"
              ref="Prototipo"
            />
            <FormInput
              :root="root"
              label-preset="Nombre:"
              :on-change-preset="setNombre"
              ref="Nombre"
            />
            <FormTextarea
              :root="root"
              label-preset="Detalles:"
              :on-change-preset="setDetalles"
              ref="Detalles"
            />
            <FormTextarea
              :root="root"
              label-preset="Reflexiones:"
              :on-change-preset="setReflexiones"
              ref="Reflexiones"
            />
            <div v-if="targetModel !== 'Prototipos'">
              <FormMoment
                :root="root"
                label-preset="Momento:"
                :on-change-preset="setMomento_efectivo"
                :internal-value-for-date-preset="formatDate(selectedDate)"
                :internal-value-for-time-preset="formatTime(selectedDate)"
                ref="Momento_efectivo"
              />
            </div>
            <div class="form-item" v-if="targetModel !== 'Objetivos'">
              <div class="form-label">Objetivos asociados:</div>
              <div>
                <div>
                  <div
                    class="no-border-table"
                    v-if="
                      !internalValue ||
                      !internalValue.puntuacion_de_objetivos ||
                      !internalValue.puntuacion_de_objetivos.length
                    "
                  >
                    <div class="form-label">
                      No hay objetivos asociados actualmente a este elemento.
                    </div>
                  </div>
                  <table
                    class="no-border-table"
                    v-if="
                      internalValue &&
                      internalValue.puntuacion_de_objetivos &&
                      internalValue.puntuacion_de_objetivos.length
                    "
                    data-ref="data-manager-objetivos_asociados-table"
                  >
                    <tbody
                      v-for="(
                        puntuacion, indexPuntuacion
                      ) in internalValue.puntuacion_de_objetivos"
                      v-bind:key="indexPuntuacion"
                    >
                      <tr>
                        <td class="width-100-x100">
                          {{ puntuacion.nombre }}
                          {{
                            typeof puntuacion.intensidad === "number"
                              ? `[x${puntuacion.intensidad}]`
                              : ""
                          }}
                        </td>
                        <td
                          style="min-width: 30px"
                          v-on:click="deleteObjetivoAsociado(indexPuntuacion)"
                          v-if="selectedObjetivo === indexPuntuacion"
                        >
                          <div>
                            <div class="form-input-deployer-container">
                              <div class="form-input-deployer-icon">
                                <img
                                  class="form-input-deployer"
                                  src="@/components/Forms/icons/trash.png"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td v-else></td>
                        <td
                          style="min-width: 30px"
                          v-on:click="
                            selectedObjetivo =
                              selectedObjetivo === indexPuntuacion
                                ? -1
                                : indexPuntuacion
                          "
                        >
                          <div>
                            <div class="form-input-deployer-container">
                              <div class="form-input-deployer-icon">
                                <img
                                  v-if="selectedObjetivo === indexPuntuacion"
                                  class="form-input-deployer"
                                  style="background-color: #d0d0ff"
                                  src="@/components/Forms/icons/eye.png"
                                />
                                <img
                                  v-else
                                  class="form-input-deployer"
                                  src="@/components/Forms/icons/dot.png"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="selectedObjetivo === indexPuntuacion">
                        <td colspan="10" class="propiedades-de-objetivo-cell">
                          <div class="propiedades-de-objetivo-box">
                            <table
                              class="no-border-table width-100-x100"
                              data-ref="data-manager-propiedades_de_objetivo_asociado-table"
                            >
                              <tbody>
                                <tr>
                                  <td class="width-100-x100" colspan="3">
                                    <FormSelector
                                      :root="root"
                                      label-preset="Objetivo:"
                                      :possible-values-preset="
                                        dataPrototiposDeObjetivos
                                      "
                                      property-to-show-preset="nombre"
                                      :on-change-preset="
                                        setPuntuacionNombre(indexPuntuacion)
                                      "
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <table
                                      class="no-border-table width-100-x100"
                                    >
                                      <tbody>
                                        <tr>
                                          <td>
                                            <div
                                              class="
                                                form-input-deployer-container
                                              "
                                            >
                                              <div
                                                class="form-input-deployer-icon"
                                              >
                                                <img
                                                  class="form-input-deployer"
                                                  src="@/components/Forms/icons/minus.png"
                                                  v-on:click="
                                                    decreasePuntuacionIntensidad(
                                                      indexPuntuacion
                                                    )
                                                  "
                                                />
                                              </div>
                                            </div>
                                          </td>
                                          <td class="width-100-x100">
                                            <input
                                              type="text"
                                              class="form-input"
                                              style="text-align: center"
                                              v-model="puntuacion.intensidad"
                                            />
                                          </td>
                                          <td>
                                            <div
                                              class="
                                                form-input-deployer-container
                                              "
                                            >
                                              <div
                                                class="form-input-deployer-icon"
                                              >
                                                <img
                                                  class="form-input-deployer"
                                                  src="@/components/Forms/icons/plus.png"
                                                  v-on:click="
                                                    increasePuntuacionIntensidad(
                                                      indexPuntuacion
                                                    )
                                                  "
                                                />
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div style="padding-top: 5px"></div>
              <button
                class="form-button sm width-100-x100"
                type="button"
                v-on:click="internalValue.puntuacion_de_objetivos.push({})"
              >
                <img
                  class="form-icon sm vertical-align-middle"
                  src="@/components/Forms/icons/plus.png"
                  v-on:click="increasePuntuacionIntensidad(indexPuntuacion)"
                />
              </button>
            </div>
            <div class="h-border"></div>
            <div class="text-align-center">
              <div
                class="error-box"
                v-if="formErrorMessage"
                style="margin-top: 15px"
              >
                {{ formErrorMessage }}
              </div>
              <FormButton
                :root="root"
                label-preset="Guardar"
                :on-click-preset="submitForm"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import store from "@/assets/js/store.js";
import formsUtils from "@/assets/js/forms-utils.js";

const { REGEX_FOR_DATE_IN_THE_END } = store;
const TABLAS_DE_DATOS = {
  Prototipos: {
    singular: "prototipo",
  },
  Planes: {
    singular: "plan",
  },
  Eventos: {
    singular: "evento",
  },
  Objetivos: {
    singular: "objetivo",
  },
};

export default {
  name: "DataManager",
  components: {},
  props: {
    root: {
      type: Object,
      required: true,
    },
    targetModel: {
      type: String,
      required: true,
    },
    modelsDataPreset: {
      type: String,
      required: false,
    },
    modePreset: {
      type: String,
      required: false,
    },
  },
  mounted: async function () {
    try {
      await this.refreshData();
    } catch (error) {
      console.error("Error on beforeCreate:", error);
      throw error;
    }
  },
  data() {
    return {
      REGEX_FOR_DATE_IN_THE_END,
      searchValue: "",
      internalValue: this.generateFreshValue(),
      mode: this.modePreset || "see",
      modelsData: this.modelsDataPreset || [],
      dataPrototipos: [],
      dataPrototiposDeObjetivos: [],
      dataPrototiposDePlanes: [],
      dataPrototiposDeEventos: [],
      dataPrototiposPropios: [],
      dataPlanes: [],
      dataEventos: [],
      dataObjetivos: [],
      dataTipos: [
        { nombre: "Evento", id: "Eventos" },
        { nombre: "Objetivo", id: "Objetivos" },
      ],
      selectedDate: new Date(),
      selectedModel: -1,
      selectedObjetivo: -1,
      selectablePrototipos: [],
      selectablePlanes: [],
      selectableEventos: [],
      selectableObjetivos: [],
      formErrorMessage: undefined,
    };
  },
  watch: {
    dataPrototipos(newValue) {
      this.dataPrototiposDeObjetivos = newValue.filter(
        (i) => i.tipo === "Objetivo"
      );
      this.dataPrototiposDeEventos = newValue.filter(
        (i) => i.tipo === "Evento"
      );
      this.dataPrototiposDePlanes = this.dataPrototiposDeEventos;
      this.dataPrototiposPropios = this["dataPrototiposDe" + this.targetModel];
    },
  },
  methods: {
    async refreshData() {
      try {
        window.dm = this;
        this.resultObjetivos = await store.select("Objetivos");
        this.resultPrototipos = await store.select("Prototipos");
        this.resultPlanes = await store.select("Planes");
        this.resultEventos = await store.select("Eventos");
        this.dataPrototipos = this.resultPrototipos;
        this.modelsData = [
          ...this["result" + this.targetModel].map((x) => this.sortedFields(x)),
        ].sort((a, b) => {
          if (!b.momento_efectivo) return -1;
          if (!a.momento_efectivo) return 1;
          return a.momento_efectivo >= b.momento_efectivo ? -1 : 1;
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    selectMode(mode) {
      this.mode = mode;
      if (mode === "see") {
        this.refreshData();
      } else if (mode === "add") {
        setTimeout(() => {
          if (!("Momento_efectivo" in this.$refs)) {
            return;
          }
          this.$refs.Momento_efectivo.internalValueForDate =
            this.formatDateReversed(this.selectedDate);
          this.$refs.Momento_efectivo.internalValueForTime = this.formatTime(
            this.selectedDate
          );
        }, 50);
      }
    },
    setNombre(nombre) {
      this.internalValue.nombre = nombre;
      this.$forceUpdate();
    },
    setDetalles(detalles) {
      this.internalValue.detalles = detalles;
      this.$forceUpdate();
    },
    setReflexiones(reflexiones) {
      this.internalValue.reflexiones = reflexiones;
      this.$forceUpdate();
    },
    setMomento_efectivo(momento_efectivo) {
      const [dateBrute, timeBrute] = momento_efectivo.split(" ");
      this.$refs.Momento_efectivo.internalValueForDate = dateBrute;
      this.$refs.Momento_efectivo.internalValueForTime = timeBrute;
      this.internalValue.momento_efectivo = `${dateBrute} ${timeBrute}`;
      this.$forceUpdate();
    },
    async submitForm() {
      try {
        console.log("1", this.targetModel);
        let isValid = "";
        if (this.$refs.Nombre) {
          this.$refs.Nombre.errorMessage = false;
        }
        if (this.$refs.Momento_efectivo) {
          this.$refs.Momento_efectivo.errorMessage = false;
        }
        if (
          !this.internalValue.nombre ||
          this.internalValue.nombre.length === 0
        ) {
          this.$refs.Nombre.errorMessage = "* Este campo es obligatorio";
          isValid += ":Nombre";
        }
        if (
          this.targetModel !== "Prototipos" &&
          (!this.internalValue.nombre ||
            this.internalValue.momento_efectivo.length === 0)
        ) {
          this.$refs.Momento_efectivo.errorMessage =
            "* Este campo es obligatorio";
          isValid += ":Momento_efectivo";
        }
        if (this.targetModel === "Prototipos" && !this.internalValue.tipo) {
          this.$refs.Tipo.errorMessage = "* Este campo es obligatorio";
          isValid += ":Tipo";
        } else if (this.targetModel === "Prototipos") {
          // @EMPTY
        } else {
          this.internalValue.tipo = TABLAS_DE_DATOS[this.targetModel].singular;
        }
        if (isValid !== "") {
          throw new Error("FormNotValidError:" + isValid);
        }
        let adaptedValue = undefined;
        if (this.targetModel === "Prototipos") {
          adaptedValue = { ...this.internalValue };
          delete adaptedValue.momento_efectivo;
        } else {
          adaptedValue = { ...this.internalValue };
        }

        const results = [];
        const result = await store.insertAnyInCascade(
          adaptedValue,
          this.dataPrototiposDeObjetivos,
          this.targetModel
        );
        results.push(result);

        console.log("INSERT RESULT:", results);
        this.internalValue = this.generateFreshValue();
        this.mode = "see";
        this.refreshData();
      } catch (error) {
        console.error(error);
        this.formErrorMessage = error;
        throw error;
      }
    },
    deleteObjetivoAsociado(index) {
      this.internalValue.puntuacion_de_objetivos.splice(index, 1);
      this.selectedObjetivo = -1;
    },
    setTipo(tipo) {
      this.internalValue.tipo = tipo;
    },
    fulfillPrototipo(prototipo) {
      const prototipoItem = this.dataPrototipos.filter(
        (p) =>
          p.nombre === prototipo ||
          p.nombre.replace(store.REGEX_FOR_DATE_IN_THE_END, "") === prototipo
      )[0];
      Object.keys(prototipoItem).forEach((propertyPrototipo) => {
        const p =
          propertyPrototipo.substr(0, 1).toUpperCase() +
          propertyPrototipo.substr(1).toLowerCase();
        if (p === "Id") {
          return;
        }
        const tempValue =
          typeof prototipoItem[propertyPrototipo] === "string"
            ? prototipoItem[propertyPrototipo].replace(
                store.REGEX_FOR_DATE_IN_THE_END,
                ""
              )
            : prototipoItem[propertyPrototipo];
        if (p in this.$refs) {
          this.$refs[p].internalValue = tempValue;
        } else {
          this.internalValue[propertyPrototipo] = tempValue;
        }
      });
    },
    sortedFields(item) {
      const reitem = {};
      const keys = Object.keys(item);
      const ORDER = {
        nombre: 1,
        id: 2,
        tipo: 3,
        detalles: 4,
        reflexiones: 5,
        momento_efectivo: 6,
        puntuacion_de_objetivos: 7,
      };
      const sortedKeys = keys.sort((key1, key2) => {
        const order1 = key1 in ORDER ? ORDER[key1] : 0;
        const order2 = key2 in ORDER ? ORDER[key2] : 0;
        return order1 - order2 < 1 ? -1 : 1;
      });
      for (let index = 0; index < sortedKeys.length; index++) {
        const key = sortedKeys[index];
        const value = item[key];
        reitem[key] = value;
      }
      return reitem;
    },
    selectModel(index) {
      this.selectedModel = this.selectedModel === index ? -1 : index;
    },
    generateFreshValue() {
      return {
        tipo: null,
        nombre: "",
        detalles: "",
        reflexiones: "",
        momento_efectivo: new Date(),
        puntuacion_de_objetivos: [],
      };
    },
    setPuntuacionNombre(indexPuntuacion) {
      return (v) => {
        this.internalValue.puntuacion_de_objetivos[indexPuntuacion].nombre = v;
      };
    },
    setPuntuacionIntensidad(indexPuntuacion) {
      return (v) => {
        this.internalValue.puntuacion_de_objetivos[indexPuntuacion].intensidad =
          v;
      };
    },
    increasePuntuacionIntensidad(indexPuntuacion) {
      if (
        !this.internalValue.puntuacion_de_objetivos[indexPuntuacion].intensidad
      ) {
        this.internalValue.puntuacion_de_objetivos[
          indexPuntuacion
        ].intensidad = 0;
      }
      this.internalValue.puntuacion_de_objetivos[indexPuntuacion].intensidad =
        0 +
        1 +
        parseInt(
          this.internalValue.puntuacion_de_objetivos[indexPuntuacion].intensidad
        );
      this.$forceUpdate();
    },
    decreasePuntuacionIntensidad(indexPuntuacion) {
      if (
        !this.internalValue.puntuacion_de_objetivos[indexPuntuacion].intensidad
      ) {
        this.internalValue.puntuacion_de_objetivos[
          indexPuntuacion
        ].intensidad = 0;
      }
      this.internalValue.puntuacion_de_objetivos[indexPuntuacion].intensidad =
        0 -
        1 +
        parseInt(
          this.internalValue.puntuacion_de_objetivos[indexPuntuacion].intensidad
        );
      this.$forceUpdate();
    },
    decreaseDate() {
      const currentDate = new Date(this.selectedDate);
      currentDate.setDate(this.selectedDate.getDate() - 1);
      this.selectedDate = currentDate;
      this.selectedModel = -1;
    },
    increaseDate() {
      const currentDate = new Date(this.selectedDate);
      currentDate.setDate(this.selectedDate.getDate() + 1);
      this.selectedDate = currentDate;
      this.selectedModel = -1;
    },
    confirmDelete(index) {
      const dataItem = this.modelsData[index];
      const isConfirmed = window.confirm(
        `Quieres eliminar el «${dataItem.tipo.toLowerCase()}»: ${JSON.stringify(
          dataItem,
          null,
          4
        )}?`
      );
      if (isConfirmed) {
        store.delete(this.targetModel, dataItem.id);
        this.selectedModel = -1;
        return this.refreshData();
      }
    },
    async changeValue(item, propert) {
      try {
        let value = undefined;
        if (typeof item[propert] !== "string") {
          value = window.prompt(
            `Establece un nuevo valor para:\n\n  «${this.targetModel}#${item.id}.${propert}»\n\n`,
            JSON.stringify(item[propert])
          );
          try {
            value = JSON.parse(value);
          } catch (error) {
            window.alert(error.name + ": " + error.message);
            throw error;
          }
        } else {
          value = window.prompt(
            `Establece un nuevo valor para:\n\n  «${this.targetModel}#${item.id}.${propert}»\n\n`,
            item[propert]
          );
        }
        if (item[propert] !== value && typeof value === "string") {
          item[propert] = value;
          await store.update(this.targetModel, item.id, item);
          await this.refreshData();
        } else if (typeof value !== "undefined" && value !== null) {
          item[propert] = value;
          await store.update(this.targetModel, item.id, item);
          await this.refreshData();
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    ...formsUtils,
  },
};
</script>

<style>
</style>