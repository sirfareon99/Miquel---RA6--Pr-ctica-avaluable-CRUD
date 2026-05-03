let lista_prestamos = []
let indice_edicion = null

const campo_nombre_alumno = document.getElementById('nombre_alumno')
const campo_material = document.getElementById('material')
const boton_guardar = document.getElementById('boton_guardar')
const cuerpo_tabla_prestamos = document.getElementById('cuerpo_tabla_prestamos')

boton_guardar.addEventListener('click', guardar_prestamo)

function guardar_prestamo(){
    const nombre_alumno = campo_nombre_alumno.value.trim()
    const material = campo_material.value
    const turno_seleccionado = document.querySelector('input[name="turno"]:checked')
    const devuelto = document.getElementById('devuelto').checked

    if(nombre_alumno === "" || material === "" || !turno_seleccionado){
        alert("Debes completar todos los campos")
        return
    }

    const nuevo_prestamo = {
        nombre: nombre_alumno,
        material: material,
        turno: turno_seleccionado.value,
        devuelto: devuelto
    }

    if(indice_edicion === null){
        lista_prestamos.push(nuevo_prestamo)
    } else {
        lista_prestamos[indice_edicion] = nuevo_prestamo
        indice_edicion = null
        boton_guardar.textContent = "Añadir préstamo"
        boton_guardar.classList.remove('btn-warning')
        boton_guardar.classList.add('btn-outline-info')
    }

    limpiar_formulario()
    mostrar_prestamos()
}

function mostrar_prestamos(){
    cuerpo_tabla_prestamos.innerHTML = ""

    if(lista_prestamos.length === 0){
        cuerpo_tabla_prestamos.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">No hay préstamos registrados</td>
            </tr>
        `
        return
    }

    lista_prestamos.forEach((prestamo, indice) => {
        let estado = prestamo.devuelto ? "Sí" : "No"
        let clase_estado = prestamo.devuelto ? "text-success" : "text-danger"

        cuerpo_tabla_prestamos.innerHTML += `
        <tr>
            <td>${prestamo.nombre}</td>
            <td>${prestamo.material}</td>
            <td>${prestamo.turno}</td>
            <td class="${clase_estado}">${estado}</td>
            <td>
                <button class="btn btn-warning" onclick="editar_prestamo(${indice})">Editar</button>
                <button class="btn btn-danger" onclick="borrar_prestamo(${indice})">Borrar</button>
            </td>
        </tr>
        `
    })
}

function limpiar_formulario(){
    campo_nombre_alumno.value = ""
    campo_material.value = ""
    document.querySelectorAll('input[name="turno"]').forEach(radio => {
        radio.checked = false
    })
    document.getElementById('devuelto').checked = false
}

function borrar_prestamo(indice){
    lista_prestamos.splice(indice, 1)
    mostrar_prestamos()
}

function editar_prestamo(indice){
    const prestamo = lista_prestamos[indice]

    campo_nombre_alumno.value = prestamo.nombre
    campo_material.value = prestamo.material

    const radio = document.querySelector(`input[name="turno"][value="${prestamo.turno}"]`)
    if(radio) radio.checked = true

    document.getElementById('devuelto').checked = prestamo.devuelto

    indice_edicion = indice
    boton_guardar.textContent = "Guardar cambios"
    boton_guardar.classList.remove('btn-outline-info')
    boton_guardar.classList.add('btn-warning')
}