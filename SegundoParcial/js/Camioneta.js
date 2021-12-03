import Vehiculo from './Vehiculo.js';

class Camioneta extends Vehiculo{
    
    constructor (id,marca, modelo,precio,cuatroPorcuatro){
        super(id,marca,modelo,precio);
        this.cuatroXcuatro = cuatroPorcuatro;
        this.tipo = "Camioneta"; 
    }

}

export default Camioneta;