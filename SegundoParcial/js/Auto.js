import Vehiculo from './Vehiculo.js';

class Auto extends Vehiculo{
    
    constructor (id,marca, modelo,precio,cantidadPuertas){
        super(id,marca,modelo,precio);
        this.cantidadPuertas = cantidadPuertas || "N/C";
        this.tipo = "Auto"; 
    }

}

export default Auto;