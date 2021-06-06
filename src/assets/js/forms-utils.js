const DEFAULT_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" 
    //+ "abcdefghijklmnopqrstuvwxyz"
    ;

export default {
    pad(pad, str, padLeft = true) {
        if (typeof str === "undefined") return pad;
        if (padLeft) {
            return (pad + str).slice(-pad.length);
        } else {
            return (str + pad).substring(0, pad.length);
        }
    },
    formatDateReversed(currentDate) {
        return `${currentDate.getFullYear()
            }-${this.pad("00", currentDate.getMonth() + 1, true)
            }-${this.pad("00", currentDate.getDate(), true)
            }`;
    },
    formatDate(currentDate) {
        return `${this.pad("00", currentDate.getDate(), true)}-${this.pad(
            "00",
            currentDate.getMonth() + 1,
            true
        )}-${currentDate.getFullYear()}`;
    },
    formatTime(currentDate) {
        return `${this.pad("00", currentDate.getHours(), true)}:${this.pad(
            "00",
            currentDate.getMinutes(),
            true
        )}:${this.pad("00", currentDate.getSeconds())}`;
    },
    formatPrecisedTime(currentDate) {
        return `${this.pad("00", currentDate.getHours(), true)}:${this.pad(
            "00",
            currentDate.getMinutes(),
            true
        )}:${this.pad("00", currentDate.getSeconds())
            }.${this.pad("000", currentDate.getMilliseconds())
            }`;
    },
    formatDateTime(currentDate) {
        return `${this.formatDate(currentDate)} ${this.formatTime(currentDate)}`
    },
    formatDateReversedTime(currentDate) {
        return `${this.formatDateReversed(currentDate)} ${this.formatTime(currentDate)}`
    },
    parseDateReversedTime(reversedTime) {
        const [year, month, date, hour, minutes, seconds] = reversedTime.split(/[- :.]/g);
        const d = new Date();
        d.setFullYear(year);
        d.setMonth(parseInt(month) - 1);
        d.setDate(parseInt(date));
        d.setHours(parseInt(hour));
        d.setMinutes(parseInt(minutes));
        d.setSeconds(parseInt(seconds));
        return d;
    },
    formatToDiaSemana(currentDate) {
        switch (currentDate.getDay()) {
            case 1:
                return "Lunes";
            case 2:
                return "Martes";
            case 3:
                return "Miércoles";
            case 4:
                return "Jueves";
            case 5:
                return "Viernes";
            case 6:
                return "Sábado";
            case 7:
            case 0:
            default:
                return "Domingo";
        }
    },
    formatToMesDelAno(currentDate) {
        switch (currentDate.getMonth()) {
            case 0:
                return "Enero";
            case 1:
                return "Febrero";
            case 2:
                return "Marzo";
            case 3:
                return "Abril";
            case 4:
                return "Mayo";
            case 5:
                return "Junio";
            case 6:
                return "Julio";
            case 7:
                return "Agosto";
            case 8:
                return "Septiembre";
            case 9:
                return "Octubre";
            case 10:
                return "Noviembre";
            case 11:
                return "Diciembre";
        }
    },
    fromTipoToTable(tipo) {
        switch (tipo) {
            case "Objetivo":
            case "Objetivos":
            case "objetivo":
            case "objetivos":
                return "Objetivos";
            case "Plan":
            case "Planes":
            case "plan":
            case "planes":
                return "Planes";
            case "Evento":
            case "Eventos":
            case "evento":
            case "eventos":
                return "Eventos";
            case "Prototipo":
            case "Prototipos":
            case "prototipo":
            case "prototipos":
                return "Prototipos";
            default:
                return tipo;
        }
    },
    fromSnakeToHuman(txt) {
        let word = txt.substr(0, 1).toUpperCase() + txt.substr(1).replace(/_[A-Za-z0-9]/g, m => " " + m.substr(1));
        word = word === "Momento efectivo" ? "Momento" : word;
        word = word === "Puntuacion de objetivos" ? "Objetivos" : word;
        return word;
    },
    parseDateFromMomentoEfectivo(t) {
        return this.parseDateReversedTime(t);
    },
    formatDateAsUID(currentDate) {
        return `${this.formatDateReversed(currentDate)} ${this.formatPrecisedTime(currentDate)}`
    },
    generateRandomString(len, chars = DEFAULT_ALPHABET) {
        let s = "";
        for(let index = 0; index < len; index++) {
            const c = chars[Math.floor(Math.random() * chars.length)];
            s += c;
        }
        return s;
    }
}