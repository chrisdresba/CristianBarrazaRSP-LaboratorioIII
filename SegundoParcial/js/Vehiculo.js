export default class Vehiculo{
    
    constructor (id,v_marca,v_modelo,v_precio){
        this.id = id||"N/C";
        this.marca = v_marca||"N/C";
        this.modelo = v_modelo||"N/C";
        this.precio = v_precio || 0;
    }

}
