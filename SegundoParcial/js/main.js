import Vehiculo from './Vehiculo.js';
import Auto from './Auto.js';
import Camioneta from './Camioneta.js';

function $(valorId) {
    return document.getElementById(valorId);
}

//Variables
let vehiculos;


function CargarTabla(vehiculos) {

    removerListado($("listado"));
    let tabla = $("tabla");

    if (tabla == null) {
        tabla = document.createElement("table");
        tabla.setAttribute("id", "tabla");
        tabla.setAttribute("class", "grilla");
        let contenedor = $("listado");
        contenedor.appendChild(tabla);

        let fila = document.createElement("tr");
        fila.setAttribute("id", "cabecera");

        if ($("chk_id").checked == true) {
            let auxId = document.createElement("th");
            let txt = document.createTextNode("Id");
            auxId.appendChild(txt);
            fila.appendChild(auxId);
        }

        if ($("chk_marca").checked == true) {
            let auxMarca = document.createElement("th");
            let txt = document.createTextNode("Marca");
            auxMarca.appendChild(txt);
            fila.appendChild(auxMarca);
        }

        if ($("chk_modelo").checked == true) {
            let auxModelo = document.createElement("th");
            let txt = document.createTextNode("Modelo");
            auxModelo.appendChild(txt);
            fila.appendChild(auxModelo);
        }

        if ($("chk_precio").checked == true) {
            let auxPrecio = document.createElement("th");
            let txt = document.createTextNode("Precio");
            auxPrecio.appendChild(txt);
            fila.appendChild(auxPrecio);
        }

        tabla.appendChild(fila);

    }

    vehiculos.forEach((vehiculo) => {
        let fila = document.createElement("tr");
        fila.setAttribute("id", vehiculo.id);

        if ($("chk_id").checked == true) {
            let celda = document.createElement("td");
            celda.appendChild(document.createTextNode(vehiculo.id))
            fila.appendChild(celda);
        }

        if ($("chk_marca").checked == true) {
            let celda = document.createElement("td");
            celda.appendChild(document.createTextNode(vehiculo.marca))
            fila.appendChild(celda);
        }

        if ($("chk_modelo").checked == true) {
            let celda = document.createElement("td");
            celda.appendChild(document.createTextNode(vehiculo.modelo));
            fila.appendChild(celda);
        }

        if ($("chk_precio").checked == true) {
            let celda = document.createElement("td");
            celda.appendChild(document.createTextNode(vehiculo.precio));
            fila.appendChild(celda);
        }

        fila.addEventListener("dblclick", cargaFormulario);

        tabla.appendChild(fila);
    });

    $("listado").appendChild(tabla);

}


async function GetVehiculos() {
    try {
        let respuesta = await fetch("http://localhost:3001/vehiculos", { method: 'GET', headers: { 'Content-Type': 'application/json' } });

        if (respuesta.status == 200 && respuesta.ok) {
            respuesta.json().then(elementos => {
                vehiculos = new Array();
                TraerVehiculos(elementos);
                CargarTabla(vehiculos);
            });
        }
    } catch (error) {
        console.log("Con Error:" + error);

    }
}

function TraerVehiculos(elementos) {

    elementos.forEach(item => {

        if (item.cuatroXcuatro != undefined) {
            let c = new Camioneta(item.id, item.make, item.model, item.price, item.cuatroXcuatro);
            vehiculos.push(c);
        }

        if (item.cantidadPuertas != undefined) {
            let a = new Auto(item.id, item.make, item.model, item.price, item.cantidadPuertas);
            vehiculos.push(a);
        }
    })

}


function cargaFormulario(e) {

    let formulario = $("formulario");
    let id = e.currentTarget.id;
    formulario.style.visibility = "visible";
    cargarVehiculosPorId(id);

}

function cargarVehiculosPorId(id) {

    vehiculos.forEach((vehiculo) => {

        if (vehiculo.id.toString() == id) {
            $("txtId").value = vehiculo.id;
            $("txtMarca").value = vehiculo.marca;
            $("txtModelo").value = vehiculo.modelo;
            $("txtPrecio").value = vehiculo.precio;
            $("tipo").value = vehiculo.tipo;
            $("txtMarca").setAttribute("movil", vehiculo.id);

            $("txtMarca").style.borderColor = "white";
            $("txtModelo").style.borderColor = "white";

        };
    })

}

function mayorId() {

    return vehiculos.reduce((idMax, item) => {
        if (item.id > idMax) {
            return item.id;;
        } else {
            return idMax;
        }
    }, 0);

};


function ValidarCampos() {

    let retorno = true;

    if ($("txtMarca").value.length <= 2) {

        $("txtMarca").style.borderColor = "red";
        retorno = false;
    } else {
        $("txtMarca").style.borderColor = "green";
    }

    if ($("txtModelo").value.length <= 2) {

        $("txtModelo").style.borderColor = "red";
        retorno = false;
    } else {
        $("txtModelo").style.borderColor = "green";
    }

    return retorno;

}


function crearVehiculoPorId(id) {

    let marca = $("txtMarca").value;
    let modelo = $("txtModelo").value;
    let precio = $("txtPrecio").value;
    let tipo = $("tipo").value;
    let vehiculo;

    if (ValidarCampos()) {

        if (tipo == "Camioneta") {
            vehiculo = new Camioneta(id, marca, modelo, parseInt(precio));
        }

        if (tipo == "Auto") {
            vehiculo = new Auto(id, marca, modelo, parseInt(precio));
        }

        return vehiculo;
    }

}

function EliminarFila() {

    let v = jsonEliminar();
    RemoverDelListado(v);
    eliminarElemento();
}


function RemoverDelListado(object) {

    for (let i = 0; i < vehiculos.length; i++) {
        if (object.id == vehiculos[i].id) {
            vehiculos.splice(i, 1);
            console.log("comprobación Id removido");
        }
    }
}

function jsonEliminar() {

    let id = $("txtMarca").getAttribute("movil");

    let json = { "id": id };

    return json;

}

function eliminarElemento() {
    let id = $("txtMarca").getAttribute("movil");
    let fila = $(id);
    let tabla = $("tabla");
    tabla.removeChild(fila);
}


function FiltrarVehiculos() {

    if ($("filtros").value == "0") {
        ;
        return vehiculos;

    }

    if ($("filtros").value == "1") {

        return vehiculos.filter(e => {

            return e.tipo == "Camioneta";

        })
    }

    if ($("filtros").value == "2") {
        return vehiculos.filter(e => {

            return e.tipo == "Auto";

        })
    }

};

function filtrarListado() {
    let listado = FiltrarVehiculos();
    CargarTabla(listado);
}


function limpiarTabla() {

    let tabla = $('tabla');
    let filasCount = tabla.rows.length;
    for (var i = 1; i < filasCount; i++) {
        tabla.deleteRow(1);
    }

}

function removerListado(nodo) {

    while (nodo.firstChild) {
        nodo.removeChild(nodo.firstChild);
    }
}


function PromedioPrecio() {

    let p = FiltrarVehiculos();
    return (p.reduce(function (total, item) {
        return total += item.precio;
    }, 0) / p.length).toFixed(2);

};

window.addEventListener("load", () => {

    GetVehiculos();

    $("btnAgregar").addEventListener("click", (e) => {

        if (ValidarCampos()) {
            let id = mayorId();
            id++;
            let vehiculo = crearVehiculoPorId(id);
            vehiculos.push(vehiculo);
            CargarTabla(vehiculos);
        }

    });

    $("btnEliminar").addEventListener("click", (e) => {

        EliminarFila();
    });

    $("btnLimpiar").addEventListener("click", () => {
        limpiarTabla();
    });

    $("btnPromedio").addEventListener("click", () => {

        $("promPrecio").value = PromedioPrecio();
    });

    $("filtros").addEventListener("click", () => {

        let listaAuxiliar;
        listaAuxiliar = FiltrarVehiculos();
        limpiarTabla();
        CargarTabla(listaAuxiliar);
    });

    $("chk_id").addEventListener("change", filtrarListado);
    $("chk_modelo").addEventListener("change", filtrarListado);
    $("chk_marca").addEventListener("change", filtrarListado);
    $("chk_precio").addEventListener("change", filtrarListado);

});