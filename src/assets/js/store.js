import Dexie from "dexie";

const db = new Dexie("Tiempologia");

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

export default {
    db,
    select: apiSelect,
    insert: apiInsert,
    update: apiUpdate,
    delete: apiDelete,
};