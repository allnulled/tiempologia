<template>
  <div class="inicio-page-component">
    <div class="frase-motivacional" v-on:click="changeMotivacional">
      {{ fraseMotivacional }}
    </div>
    <div>
      <FormSelector
        :root="root"
        label-preset=""
        property-to-show-preset="nombre"
        internal-value-preset="Horario"
        :possible-values-preset="paginasDeInicio"
        :on-change-preset="(v) => seleccionarPagina(v)"
      />
    </div>
    <table class="no-border-table width-100-x100">
      <tbody>
        <tr>
          <td>
            <div class="form-input-deployer-container">
              <div class="form-input-deployer-icon">
                <img
                  class="form-input-deployer"
                  src="@/components/Forms/icons/previous.png"
                  v-on:click="decrementaFecha"
                />
              </div>
            </div>
          </td>
          <td class="text-align-center width-100-x100">
            <div class="text-label" style="font-size: 10px">
              {{ formatDate(fechaSeleccionada).replace(/-/g, "/") }}
            </div>
            <div class="text-label" style="font-size: 9px">
              {{ formatToDiaSemana(fechaSeleccionada) }},
              {{ fechaSeleccionada.getDate() }} de
              {{ formatToMesDelAno(fechaSeleccionada).toLowerCase() }} del
              {{ fechaSeleccionada.getFullYear() }}
            </div>
          </td>
          <td>
            <div class="form-input-deployer-container">
              <div class="form-input-deployer-icon">
                <img
                  class="form-input-deployer"
                  src="@/components/Forms/icons/next.png"
                  v-on:click="incrementaFecha"
                />
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table
      class="no-border-table"
      data-ref="tabla-inicio-completados"
      v-if="paginaSeleccionada === 'Vistazo'"
    >
      <tbody>
        <tr>
          <td colspan="100">
            <FormSelector
              :root="root"
              label-preset="Selecciona un tipo de dato:"
              property-to-show-preset="nombre"
              internal-value-preset="Todos"
              :possible-values-preset="tiposDeDato"
              :on-change-preset="(v) => seleccionarTipoDeDato(v)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="paginaSeleccionada === 'Vistazo' && resultadosSeleccionados">
      <table
        class="no-border-table width-100-x100 vista-general-table"
        :class="'tipo-' + item.tipo.toLowerCase()"
        v-for="(item, indexItem) in resultadosSeleccionados"
        v-bind:key="indexItem"
      >
        <tbody class="table-group" v-if="isInFechaSeleccionada(item)">
          <tr>
            <td class="text-align-left v-align-top">
              <div class="moment-cell text-label cursor-pointer">
                <div>{{ item.momento_efectivo.split(" ")[1] }}</div>
                <div class="text-align-center uppercased">{{ item.tipo }}</div>
              </div>
            </td>
            <td
              class="width-100-x100 nombre-cell selectable v-align-top"
              style="border-left: 1px solid #fff"
              v-on:click="seleccionarFila(indexItem)"
              :class="{ selected: filaSeleccionada === indexItem }"
            >
              {{
                item.nombre.replace(
                  / +\[[0-9]+\-[0-9]+\-[0-9]+ [0-9]+\:[0-9]+\:[0-9]+\]+$/g,
                  ""
                )
              }}
            </td>
          </tr>
          <tr v-if="filaSeleccionada === indexItem">
            <td colspan="100">
              <table class="no-border-table width-100-x100">
                <tbody
                  v-for="(value, prop) in item"
                  v-bind:key="indexItem + '+' + prop"
                >
                  <tr>
                    <td class="property-cell">{{ fromSnakeToHuman(prop) }}</td>
                    <td class="value-cell">{{ value }}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="paginaSeleccionada === 'Horario' && resultadosPorFranjas">
      <table class="no-border-table width-100-x100" style="margin-top: 10px;">
        <tbody
          v-for="(datosFranja, franja) in resultadosPorFranjas"
          v-bind:key="franja"
        >
          <tr v-if="datosFranja.length">
            <td
              class="property-cell moment-cell"
              :class="{ 'as-time-passed': esFranjaPasadaSegunHora(franja) }"
            >
              {{ franja }}
            </td>
            <td
              v-on:click="toggleHorarioRow(franja)"
              class="value-cell selectable"
              :class="{ selected: franjaSeleccionada === franja }"
            >
              {{ sumUpDatosFranja(datosFranja) }}
            </td>
          </tr>
          <tr v-if="datosFranja.length && franjaSeleccionada === franja">
            <td class="width-100-x100" colspan="100">
              <div style="height: 1px"></div>
              <table
                class="horario-table no-border-table width-100-x100"
                data-ref="inicio-table-horario"
              >
                <tbody
                  v-for="(itemFranja, itemIndex) in datosFranja"
                  v-bind:key="franja + '+' + itemIndex"
                  :class="'tipo-' + itemFranja.tipo.toLowerCase()"
                >
                  <tr class="nombre-row">
                    <td
                      class="nombre-cell"
                      colspan="100"
                      v-on:click="
                        itemDeFranjaSeleccionado =
                          itemDeFranjaSeleccionado === itemIndex
                            ? -1
                            : itemIndex
                      "
                    >
                      <span class="float-left">{{ itemFranja.nombre }}</span>
                      <span
                        class="form-button xs display-inline-block float-right danger-button"
                        style="margin-right: 4px"
                        v-on:click="eliminarItem($event, itemFranja, itemIndex)"
                      >
                        <img
                          class="form-icon"
                          src="@/components/Forms/icons/trash.png"
                        />
                      </span>
                      <span
                        class="form-button xs display-inline-block float-right success-button"
                        style="margin-right: 4px"
                        v-if="itemFranja.tipo.toLowerCase() === 'plan'"
                        v-on:click="insertarEventoSegunPlan($event, itemFranja, itemIndex)"
                      >
                        <img
                          class="form-icon"
                          src="@/components/Forms/icons/check.png"
                        />
                      </span>
                    </td>
                  </tr>
                  <tr
                    v-for="(itemValue, itemProperty) in itemFranja"
                    v-bind:key="franja + '+' + itemIndex + '+' + itemProperty"
                    :class="{ hidden: itemIndex !== itemDeFranjaSeleccionado }"
                  >
                    <td class="property-cell moment-cell">
                      {{ fromSnakeToHuman(itemProperty) }}:
                    </td>
                    <td class="value-cell">{{ itemValue }}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
        <tbody
          v-if="
            formatDateReversed(fechaSeleccionada) !==
            formatDateReversed(new Date())
          "
        >
          <tr>
            <td colspan="100" style="min-height: 5px"></td>
          </tr>
          <tr>
            <td style="min-height: 5px" colspan="100">
              <span class="float-right">
                <div class="form-input-deployer-container">
                  <div class="form-input-deployer-icon">
                    <img
                      class="form-input-deployer"
                      style="background-color: #e0e0e0"
                      src="@/components/Forms/icons/reusage.png"
                      v-on:click="reusaPlanesDelDia()"
                    />
                  </div>
                </div>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import store from "@/assets/js/store.js";
import formsUtils from "@/assets/js/forms-utils.js";
import motivacionales from "@/assets/js/motivationals.json";

const TIEMPO_x20_MINUTOS = 1000 * 60 * 20;
const SORT_BY_MOMENTO_EFECTIVO = function (a, b) {
  return a.momento_efectivo >= b.momento_efectivo ? -1 : 1;
};

export default {
  name: "InicioPage",
  components: {},
  props: {
    root: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    window.ini = this;
    this.refreshData().then((data) => {
      this.$forceUpdate(true);
      return data;
    });
  },
  data() {
    return {
      fraseMotivacional:
        motivacionales[Math.floor(Math.random() * motivacionales.length)],
      paginaSeleccionada: "Horario",
      paginasDeInicio: [{ nombre: "Horario" }, { nombre: "Vistazo" }],
      franjaSeleccionada: undefined,
      itemDeFranjaSeleccionado: -1,
      fechaSeleccionada: new Date(),
      intensidadEquivalenciaTiempo: TIEMPO_x20_MINUTOS,
      porcentajeDeEventosCompletados: "-",
      porcentajeDeObjetivosCompletados: "-",
      eventosCompletados: [],
      eventosPorCompletar: [],
      objetivosCompletados: [],
      objetivosPorCompletar: [],
      resultadosObjetivos: undefined,
      resultadosPrototipos: undefined,
      resultadosPlanes: undefined,
      resultadosPlanesDeEventos: undefined,
      resultadosPlanesDeObjetivos: undefined,
      resultadosEventos: undefined,
      resultadosSeleccionados: undefined,
      resultadosPorFranjas: undefined,
      filaSeleccionada: -1,
      fraseGeneradaPar: false,
      tipoDeDatoSeleccionado: "Todos",
      tiposDeDato: [
        {
          nombre: "Todos",
        },
        {
          nombre: "Planes",
        },
        {
          nombre: "Eventos",
        },
        {
          nombre: "Objetivos",
        },
      ],
    };
  },
  watch: {
    resultadosPlanes(newValue) {
      this.resultadosPlanesDeEventos = newValue.filter(
        (i) => i.tipo === "Evento"
      );
      this.resultadosPlanesDeObjetivos = newValue.filter(
        (i) => i.nombre === "Objetivo"
      );
    },
    tipoDeDatoSeleccionado(newValue) {
      if (typeof newValue !== "string") {
        this.resultadosSeleccionados = undefined;
      } else {
        this.resultadosSeleccionados = this["resultados" + newValue].sort(
          SORT_BY_MOMENTO_EFECTIVO
        );
      }
    },
  },
  methods: {
    decrementaFecha() {
      const currentDate = new Date(this.fechaSeleccionada);
      currentDate.setDate(this.fechaSeleccionada.getDate() - 1);
      this.fechaSeleccionada = currentDate;
      this.updateResultadosPorFranjas();
    },
    incrementaFecha() {
      const currentDate = new Date(this.fechaSeleccionada);
      currentDate.setDate(this.fechaSeleccionada.getDate() + 1);
      this.fechaSeleccionada = currentDate;
      this.franjaSeleccionada = undefined;
      this.updateResultadosPorFranjas();
    },
    async refreshData() {
      try {
        window.dm = this;
        this.resultadosObjetivos = await store.select("Objetivos");
        this.resultadosPrototipos = await store.select("Prototipos");
        this.resultadosPlanes = await store.select("Planes");
        this.resultadosEventos = await store.select("Eventos");
        this.resultadosTodos = [].concat(
          this.resultadosEventos,
          this.resultadosPlanes,
          this.resultadosObjetivos,
        ).sort(SORT_BY_MOMENTO_EFECTIVO);
        this.resultadosSeleccionados = this[
          "resultados" + this.tipoDeDatoSeleccionado
        ].sort(SORT_BY_MOMENTO_EFECTIVO);
        this.updateResultadosPorFranjas();
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    seleccionarPagina(pagina) {
      this.paginaSeleccionada = pagina;
    },
    seleccionarTipoDeDato(tipoDeDato) {
      this.tipoDeDatoSeleccionado = tipoDeDato;
    },
    seleccionarFila(filaSeleccionada) {
      if (this.filaSeleccionada === filaSeleccionada) {
        this.filaSeleccionada = -1;
      } else {
        this.filaSeleccionada = filaSeleccionada;
      }
    },
    isInFechaSeleccionada(item) {
      const dateO = this.fechaSeleccionada;
      const dateD = this.parseDateFromMomentoEfectivo(item.momento_efectivo);
      const date1 = `${dateO.getDate()}.${dateO.getMonth()}.${dateO.getFullYear()}`;
      const date2 = `${dateD.getDate()}.${dateD.getMonth()}.${dateD.getFullYear()}`;
      // console.log(date1, date2, item.momento_efectivo, dateD);
      return date1 === date2;
    },
    esFranjaPasadaSegunHora(franja) {
      franja.split(":").map((f) => parseInt(f))[0];
    },
    formatResultadosPorFranjas(resultados) {
      const fecha = this.fechaSeleccionada;
      const resultadosPorFranjas = {};
      for (let indexHoras = 0; indexHoras < 24; indexHoras++) {
        let baseFranja = this.pad("00", indexHoras, true);
        resultadosPorFranjas[`${baseFranja}:00`] = [];
        resultadosPorFranjas[`${baseFranja}:20`] = [];
        resultadosPorFranjas[`${baseFranja}:40`] = [];
        for (
          let indexResultados = 0;
          indexResultados < resultados.length;
          indexResultados++
        ) {
          const resultado = resultados[indexResultados];
          if (resultado.momento_efectivo) {
            const momento_intervalo_inicio = this.formatDateReversedTime(
              fecha
            ).replace(/[0-9]+$/g, "00");
            const [
              ano1str,
              mes1str,
              dia1str,
              hora1str,
              minuto1str,
            ] = resultado.momento_efectivo.split(/[-: ]/g);
            const ano1 = parseInt(ano1str);
            const mes1 = parseInt(mes1str);
            const dia1 = parseInt(dia1str);
            const hora1 = parseInt(hora1str);
            const minuto1 = parseInt(minuto1str);
            const [
              ano2str,
              mes2str,
              dia2str,
            ] = momento_intervalo_inicio
              .replace(/[0-9][0-9]:[0-9][0-9]$/g, "00:00")
              .split(/[-: ]/g);
            const ano2 = parseInt(ano2str);
            const mes2 = parseInt(mes2str);
            const dia2 = parseInt(dia2str);
            const hora2 = indexHoras;
            const minuto00 = 0;
            const minuto20 = 20;
            const minuto40 = 40;
            window.noop(minuto00, minuto20, minuto40);
            const isInFranja =
              ano1 === ano2 &&
              mes1 === mes2 &&
              dia1 === dia2 &&
              hora1 === hora2;
            /*
            console.log("1str:", resultado.momento_efectivo, ano1str, mes1str, dia1str, hora1str, momento_intervalo_inicio);
            console.log("1:", ano1, ano2 , mes1, mes2, dia1, dia2, hora1, hora2, momento_intervalo_inicio);
            //*/
            if (isInFranja) {
              if (minuto1 >= 0 && minuto1 <= 19) {
                resultadosPorFranjas[`${baseFranja}:00`].push(resultado);
              } else if (minuto1 >= 20 && minuto1 <= 39) {
                resultadosPorFranjas[`${baseFranja}:20`].push(resultado);
              } else if (minuto1 >= 40 && minuto1 <= 59) {
                resultadosPorFranjas[`${baseFranja}:40`].push(resultado);
              }
            }
          }
        }
      }
      return resultadosPorFranjas;
    },
    conteoDeFranja(datosDeFranja) {
      console.log(datosDeFranja);
    },
    updateResultadosPorFranjas() {
      this.resultadosPorFranjas = this.formatResultadosPorFranjas(
        this.resultadosTodos
      );
    },
    toggleHorarioRow(indice) {
      this.franjaSeleccionada =
        this.franjaSeleccionada === indice ? -1 : indice;
      this.itemDeFranjaSeleccionado = -1;
    },
    sumUpDatosFranja(datos) {
      const objetivos = [...datos].filter(
        (e) => e.tipo.toLowerCase() === "objetivo"
      ).length;
      const planes = [...datos].filter((e) => e.tipo.toLowerCase() === "plan")
        .length;
      const eventos = [...datos].filter(
        (e) => e.tipo.toLowerCase() === "evento"
      ).length;
      let messages = [];
      if (planes) {
        messages.push(planes > 1 ? `${planes} planes` : `${planes} plan`);
      }
      if (eventos) {
        messages.push(
          eventos > 1 ? `${eventos} eventos` : `${eventos} eventos`
        );
      }
      if (objetivos) {
        messages.push(
          objetivos > 1 ? `${objetivos} objetivos` : `${objetivos} objetivo`
        );
      }
      let message = "";
      if (messages.length) {
        message += "Hay ";
        for (let index = 0; index < messages.length; index++) {
          const messageUnit = messages[index];
          if (index === 0) {
            message += messageUnit;
          } else {
            if (index === messages.length - 1) {
              message += " y ";
              message += messageUnit;
            } else {
              message += ", ";
              message += messageUnit;
            }
          }
        }
      }
      return message;
    },
    changeMotivacional() {
      this.fraseMotivacional =
        motivacionales[Math.floor(Math.random() * motivacionales.length)];
    },
    async eliminarItem(event, item, indexItem) {
      try {
        console.log(event, item, indexItem);
        event.stopPropagation();
        const isConfirmed = window.confirm(
          `Quieres eliminar el «${item.tipo.toLowerCase()}»: ${JSON.stringify(
            item,
            null,
            4
          )}?`
        );
        if (isConfirmed) {
          const targetModel = this.fromTipoToTable(item.tipo);
          store.delete(targetModel, item.id);
          return this.refreshData();
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async insertarEventoSegunPlan(event, plan, indexPlan) {
      try {
        console.log(event, plan, indexPlan);
        event.stopPropagation();
        const supuestoEvento = {
          ...plan,
        };
        supuestoEvento.tipo = "evento";
        delete supuestoEvento.id;
        supuestoEvento.nombre = supuestoEvento.nombre.replace(store.REGEX_FOR_DATE_IN_THE_END, "");
        const isConfirmed = window.confirm(
          "¿Quieres crear un evento confirmando este plan? " +
            JSON.stringify(supuestoEvento, null, 4)
        );
        if (isConfirmed) {
          const resultado = await store.insertEventoInCascade(supuestoEvento, this.resultadosPrototipos.filter(x => x.tipo === "Objetivo"));
          console.log(resultado);
        }
        await this.refreshData();
        // @TODO:
        // @TODO:
        // @TODO:
        // @TODO:
        // @TODO:
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    reusaPlanesDelDia() {
      const planesDelDia = this.resultadosPlanes.filter(
        (x) =>
          x.momento_efectivo.substr(0, 10) ===
          this.formatDateReversed(this.fechaSeleccionada)
      );
      console.log(planesDelDia);
      // @TODO:
      // @TODO:
      // @TODO:
      // @TODO:
      // @TODO:
    },
    ...formsUtils,
  },
};
</script>

<style>
.frase-motivacional {
  display: block;
  font-size: 16px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 25px;
  padding-right: 25px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: bold;
  background-color: #333333;
  color: white;
  border-radius: 3pt;
  text-shadow: 0 0 1px white;
  font-style: italic;
  box-shadow: 0 0 2px black;
  line-height: 26px;
  cursor: pointer;
}
.satisfy-plan-button {
  background-color: #ffffff;
  transition: background-color 0.2s linear, color 0.2s linear;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid #333;
  padding-left: 10px;
  padding-right: 10px;
}
.satisfy-plan-button:hover {
  background-color: #333;
  color: white;
}
</style>