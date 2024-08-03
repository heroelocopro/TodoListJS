export default class Lista{
    id = Number
    tarea = String
    estado = Boolean
    constructor(id,tarea,estado){
        this.id = id;
        this.tarea = tarea;
        this.estado = estado;
    }
    getTarea(){
        return this.tarea;
    }
    /**
     * @param {StringConstructor} tarea
     */
    setTarea(tarea){
        console.log('tarea modificada, anterior: ',this.tarea,' nueva: ',tarea);
        this.tarea = tarea;
    }
    getId(){
        return this.id;
    }
    /**
     * @param {NumberConstructor} id
     */
    setId(id){
        console.log('id modificado, anterior: ',this.id,' nuevo: ',id);
        this.id = id;
    }
    getEstado(){
        return this.estado;
    }
    setEstado(estado)
    {
        console.log('tarea modificada, anterior: ',this.estado,' nueva: ',estado);
        this.estado = estado;
    } 


}
