import Lista from './Lista.js';
// boton que cambia el modo oscuro 
const botonModoOscuro = document.getElementById('botonModoOscuro');
// boton que despliega el form para agregar una lista
const btnFormAdd = document.getElementById('btnFormAdd');
// icono que cierra el form antes mencionado
const iconCloseForm = document.getElementById('iconCloseForm');
const iconCloseEditForm = document.getElementById('iconCloseEditForm');
// icono que agrega lista por form html
const iconAddForm = document.getElementById('iconAddForm');
// contenedor donde guardo todas las listas por hacer
const contenedorLista = document.getElementById('contenedorLista');
// iconos donde se dan click 
const iconsDelete = document.getElementsByClassName('iconDelete');
const iconsEdit = document.getElementsByClassName('iconEdit');
const iconEditForm = document.getElementById('iconEditForm');
const iconSuccess = document.getElementsByClassName('iconSuccess');
// declaramos variables que utilizaremos
// el id
// el array pa guardar las listas xd
let lista = [];
let id = 0;
// llamamos 3 funciones
// jsontolist que es un obtener datos y convertirlos otra vez
// actualizar que actualiza el id
// mostrar que muestra xd
JsonToList();
mostrarLista();


// desplegar form html add form
btnFormAdd.onclick = () =>{
    document.getElementById('formAdd').classList.remove('d-none');
    document.getElementById('formAdd').classList.add('d-block');
}
// cierra form html add
iconCloseForm.onclick = () =>{
    document.getElementById('formAdd').classList.remove('d-block');
    document.getElementById('formAdd').classList.add('d-none');
}
// cierra form edit html
iconCloseEditForm.onclick = () =>{
    document.getElementById('formEdit').classList.add('d-none');
    document.getElementById('formEdit').classList.remove('d-block');
}
// icono del form add que agrega lista
iconAddForm.onclick = () =>{
    let input = document.getElementById('inputAddList');
    if (input.value != 0 || input.value != null)
    {
        agregarLista(id,input.value);
    }
    document.getElementById('formAdd').classList.remove('d-block');
    document.getElementById('formAdd').classList.add('d-none');
    input.value = '';
}
// boton modo oscuro
botonModoOscuro.onclick = () => {
    if(botonModoOscuro.value == 'false')
    {
        document.getElementsByTagName('body')[0].classList.remove('bg-black');
        document.getElementsByTagName('body')[0].classList.remove('text-white');
        document.getElementsByTagName('body')[0].classList.add('bg-white');
        document.getElementsByTagName('body')[0].classList.add('text-black');
        botonModoOscuro.value = 'true';
    }
    else{
        document.getElementsByTagName('body')[0].classList.remove('bg-white');
        document.getElementsByTagName('body')[0].classList.remove('text-black');
        document.getElementsByTagName('body')[0].classList.add('bg-black');
        document.getElementsByTagName('body')[0].classList.add('text-white');
        botonModoOscuro.value = 'false';
    }
}

// cambia el estado de la tarea por defecto false cambia a true
function completarTarea(id)
{
    for(let i=0;i<lista.length;i++)
        {
            if(lista[i].id == id)
        {
            lista[i].setEstado(!lista[i].estado);
            guardarLista(lista);
        }
    }
}

// esta funcion se encarga de convertir los objetos JSON parseados a volverlos la clase Lista
//tambien carga los archivos directamente de el local a el archivo lista en JS
function JsonToList(){
    if (localStorage.getItem('todoList') != undefined)
    {
        if (JSON.parse(localStorage.getItem('todoList')).length > 0)
            {
                for(let i = 0;i < JSON.parse(localStorage.getItem('todoList')).length ;i++)
                    {
                        lista.push(new Lista(JSON.parse(localStorage.getItem('todoList'))[i].id,JSON.parse(localStorage.getItem('todoList'))[i].tarea,JSON.parse(localStorage.getItem('todoList'))[i].estado));
                    };
                };
    }
   }

// muestra la lista que tenemos actual en el archivo JS no en el local
function mostrarLista(){
    // console.clear();
    contenedorLista.innerHTML = '';
    for(let i = 0;i<lista.length;i++)
    {
        console.log(lista[i]);
        contenedorLista.innerHTML += `<div class="col-auto col-lg-3 border border-5 rounded-3 p-5 text-center mx-auto mx-lg-0  ${lista[i].estado == false ? '' : 'bg-success'}">
                <span id="${lista[i].id}" class="material-symbols-outlined text-warning fs-1 float-start iconEdit">edit </span>
                <span  id="${lista[i].id}" class="material-symbols-outlined text-danger fs-1 float-end iconDelete">delete  </span>
                <h3 class="mt-5 ${lista[i].estado == false ? 'text-decoration-none' : 'text-decoration-line-through'}">${lista[i].tarea}</h3><hr>
                <span id="${lista[i].id}" class="material-symbols-outlined text-success fs-1 border border-success rounded-5 iconSuccess ${lista[i].estado == false ? '' : 'bg-black'} ">check_small</span>
            </div>`
    }
    actualizarId();
    agregarEventoDelete(iconsDelete,'click');
    agregarEventoEdit(iconsEdit,'click');
    agregarEventoCheck(iconSuccess,'click');
}

// funcion que agrega una nueva tarea a la lista
// valida todo los id y tarea que no se repitan y ya
function agregarLista(id,tarea){
    for(let i =0;i < lista.length;i++)
    {
        if(lista[i].id == id)
        {
            console.log('lo lamento el id no se puede duplicar');
            return;
        }
        else if(lista[i].tarea == tarea)
            {
                console.log('lo lamento la tarea no se puede duplicar');
                return;
            }
    };
    lista.push(new Lista(id,tarea));
    guardarLista(lista);

}
// guarda la lista de JS en el storage con JSON y muestra la lista actual
function guardarLista(lista){
    if (lista.length != null)
    {
        localStorage.setItem('todoList',JSON.stringify(lista));
    }
    mostrarLista();
}

// elimina lista por id y guarda la lista
function eliminarLista(id){
    console.log(lista.length);
    for(let i = 0; i < lista.length;i++){
        console.log(id)
        if(lista[i].id == id)
        {
            console.log('lista borrada: ',lista[i]);
            lista.splice(i,1);
        };
    }
    guardarLista(lista);
}

// recorre un bucle y si encuentra el archivo a editar muestra el form donde se edita
function mostrarEditLista(id)
{
    for(let i = 0; i < lista.length;i++){
        if(lista[i].id == id)
        {
            let input = document.getElementById('inputEditList');
            input.value = lista[i].getTarea();
            document.getElementById('formEdit').classList.remove('d-none');
            document.getElementById('formEdit').classList.add('d-block');
            // asignamos al boton de editar onclick y le mandamos a editar lista la id la obtenemos por el target
            iconEditForm.onclick = () => editarLista(id);
        };
    }

}

// elimina lista por id y guarda la lista
function editarLista(id){
    for(let i = 0; i < lista.length;i++){
        if(lista[i].id == id)
        { 
            let input = document.getElementById('inputEditList');
            if(input.value != 0 || input.value != null)
            {
                lista[i].setTarea(input.value);
                guardarLista(lista);
                document.getElementById('formEdit').classList.add('d-none');
                document.getElementById('formEdit').classList.remove('d-block');
            }
        };
    }
    
}

// estos 3 agregan eventos especiales a las listas
function agregarEventoDelete(objetivos,evento)
{
    for(let i = 0;objetivos.length > i ;i++){
        objetivos[i].addEventListener(evento,(e) => {eliminarLista(e.target.id)}); 
    }
}

function agregarEventoEdit(objetivos,evento)
{
    for(let i = 0;objetivos.length > i ;i++){
        objetivos[i].addEventListener(evento,(e) => {mostrarEditLista(e.target.id)}); 
    }
}

function agregarEventoCheck(objetivos,evento)
{
    for(let i = 0;objetivos.length > i ;i++){
        objetivos[i].addEventListener(evento,(e) => {completarTarea(e.target.id)}); 
    }
}

// actualiza el id del archivo JS para la creacion de manera interna de nuevas Tareas
function actualizarId()
{
    if (lista.length != null || lista.length != 0)
        {
        for(let i=0;i<lista.length;i++)
            {
                if(lista[i].id >= id)
                    {
                    id = lista[i].id + 1;
                    }
            }
        }
}

