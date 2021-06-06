import Dexie from "dexie";
import utils from "./forms-utils.js";

const db = new Dexie("Tiempologia");

const MODELS = "Prototipos;Planes;Eventos;Objetivos".split(";");

const REGEX_FOR_DATE_IN_THE_END = /\[([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9]) ([0-9][0-9]):([0-9][0-9]):([0-9][0-9])(\.[0-9][0-9][0-9])?\]( \[[A-Za-z0-9]+\])?$/g;

db.version(5).stores({
    Prototipos: "++id,[tipo+nombre],detalles,reflexiones,puntuacion_de_objetivos",
    Planes: "++id,&nombre,detalles,reflexiones,puntuacion_de_objetivos,momento_efectivo",
    Eventos: "++id,&nombre,detalles,reflexiones,puntuacion_de_objetivos,momento_efectivo",
    Objetivos: "++id,&nombre,detalles,reflexiones,puntuacion_de_objetivos,momento_efectivo,intensidad",
});

const apiSelect = async function (model) {
    try {
        if(!(model in db)) {
            throw new Error("ModelNotFoundError: model «" + model + "» is not found");
        }
        return await db[model].toArray();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
const apiInsert = async function(model, ...args) {
    try {
        if(!(model in db)) {
            throw new Error("ModelNotFoundError: model «" + model + "» is not found");
        }
        return await db[model].bulkAdd(...args);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
const apiUpdate = async function (model, id, values) {
    try {
        if(!(model in db)) {
            throw new Error("ModelNotFoundError: model «" + model + "» is not found");
        }
        return await db[model].update(id, values);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
const apiDelete = async function (model, id) {
    try {
        if(!(model in db)) {
            throw new Error("ModelNotFoundError: model «" + model + "» is not found");
        }
        return await db[model].delete(id);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const importDatabase = async function (dataToImport) {
    try {
        const allResults = {};
        for(let model in dataToImport) {
            const modelData = dataToImport[model];
            if(!(model in db)) {
                throw new Error(`Model «${model}» was not found in database on import.`);
            }
            const result = await db[model].bulkAdd(modelData);
            allResults[model] = result;
        }
        return allResults;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const exportDatabase = async function () {
    try {
        const allData = {};
        for (let index = 0; index < MODELS.length; index++) {
            const model = MODELS[index];
            if (!(model in db)) {
                throw new Error(`Model «${model}» was not found in database on export.`);
            }
            console.log(db, model, Object.keys(db[model]));
            const tableData = await db[model].toArray();
            allData[model] = tableData;
        }
        return allData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const insertAnyInCascade = async function (dataObject, prototiposDeObjetivos=[], tipoEspecifico = undefined) {
    try {
        delete dataObject.id;
        const currentTable = utils.fromTipoToTable(dataObject.tipo);
        if (currentTable !== "Prototipos") {
          dataObject.nombre += ` [${utils.formatDateAsUID(new Date())}]`;
        }
        dataObject.puntuacion_de_objetivos = (
          dataObject.puntuacion_de_objetivos || []
        ).filter((i) => typeof i.nombre === "string" && i.nombre.length);
        const results = [];
        if (currentTable !== "Prototipos") {
          const objs = dataObject.puntuacion_de_objetivos;
          for (let indexObj = 0; indexObj < objs.length; indexObj++) {
            const obj = objs[indexObj];
            const objPrototipo = prototiposDeObjetivos.filter(
              (ob) => ob.nombre === obj.nombre && ob.tipo === 'Objetivo'
            )[0];
            const obj2 = Object.assign({}, objPrototipo, obj);
            obj2.momento_efectivo = dataObject.momento_efectivo;
            if(!obj2.nombre.match(REGEX_FOR_DATE_IN_THE_END)) {
              obj2.nombre += ` [${utils.formatDateAsUID(new Date)}]`;
            }
            obj2.tipo = "Objetivo";
            if(!obj2.intensidad) {
                obj2.intensidad = 1;
            }
            delete obj2.id;
            if(currentTable === "Eventos") {
                const tempResult = await this.insert("Objetivos", [obj2]);
                results.push(tempResult);
            }
          }
        }
        const tablename = utils.fromTipoToTable(tipoEspecifico || dataObject.tipo);
        const result = await this.insert(tablename, [dataObject]);
        results.push(result);
        return results;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default {
    db,
    select: apiSelect,
    insert: apiInsert,
    update: apiUpdate,
    delete: apiDelete,
    importDatabase,
    exportDatabase,
    MODELS,
    insertAnyInCascade,
    REGEX_FOR_DATE_IN_THE_END,
};