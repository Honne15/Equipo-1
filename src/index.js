const input = document.getElementById("tareaInput");
const btnAgregar = document.getElementById("agregarBtn");
const lista = document.getElementById("listaTareas");

btnAgregar.addEventListener("click", agregarTarea);
lista.addEventListener("click", gestionarTarea);
document.addEventListener("DOMContentLoaded", cargarTareas);

function agregarTarea() {
    const texto = input.value.trim();
    if (texto === "") return alert("Escribe una tarea");

    const li = document.createElement("li");
    li.textContent = texto;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "X";
    btnEliminar.classList.add("eliminar");
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("editar");

    li.appendChild(btnEditar);
    li.appendChild(btnEliminar);
    lista.appendChild(li);
    input.value = "";

    guardarTareas();
}

function gestionarTarea(e) {
    console.log(e.target);
    if (e.target.tagName === "BUTTON") {
        if (e.target.textContent === "X") {
            e.target.parentElement.remove();
        } else if (e.target.textContent === "Editar") {
            const li = e.target.parentElement;
            const nuevoTexto = prompt("Edita tu tarea:", li.firstChild.textContent);
            if (nuevoTexto !== null) {
                li.firstChild.textContent = nuevoTexto;
            }
        }
    } else {
        e.target.classList.toggle("completada");
    }

    guardarTareas();
}

function guardarTareas() {
    const tareas = [];
    lista.querySelectorAll("li").forEach(li => {
        tareas.push({
            texto: li.firstChild.textContent,
            completada: li.classList.contains("completada")
        });
    });
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function cargarTareas() {
    lista.innerHTML = "";
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.forEach(tarea => {
        const li = document.createElement("li");
        li.textContent = tarea.texto;
        if (tarea.completada) {
            li.classList.add("completada");
        }

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.classList.add("eliminar");
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.classList.add("editar");

        li.appendChild(btnEditar);
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
}