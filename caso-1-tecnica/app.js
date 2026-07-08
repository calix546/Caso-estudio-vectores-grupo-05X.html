const selectProducto = document.getElementById("id-select-producto")
const txtCantidad = document.getElementById("id-txt-cantidad")
const btnAgregar = document.getElementById("id-btn-agregar")
const btnPresentar = document.getElementById("id-btn-presentar")
const btnCalcular = document.getElementById("id-btn-calcular")
const btnLimpiar = document.getElementById("id-btn-limpiar")
const txtListado = document.getElementById("id-listado-factura")
const txtSubtotal = document.getElementById("id-txt-subtotal")
const txtIVA = document.getElementById("id-txt-iva")
const txtDescuento = document.getElementById("id-txt-descuento")
const txtTotal = document.getElementById("id-txt-total")

let productos = []
let cantidades = []
let precios = []

// =========================================================================
// ACCIONES DE LOS BOTONES (EVENT LISTENERS)
// =========================================================================

//BOTON AGREGAR: Al hacer clic, activa la funcion para procesar y guardarel producto actual.
btnAgregar.addEventListener("click", function(e){
    agregarProducto()
})

//BOTON AGREGAR: Al hacer clic, activa la funcion para procesar y guardarel producto actual.
btnPresentar.addEventListener("click", function(e){
    presentarFactura()
})

//BOTON CALCULAR: Al acer clic, realiza los calculos matematicos finales (subtotal, IVA, etc.) y los muestra.
btnCalcular.addEventListener("click", function(e){
    calcularFactura()
})

//BOTON LIMPIAR: Al hacer clic, borra toda la informacion guardada y resetea los campos de la pantalla.
btnLimpiar.addEventListener("click", function(e){
    vaciarFactura()
})

// =========================================================================
// FUNCIONES QUE EJECUTAN LOS BOTONES
// =========================================================================

/**LOGICA DEL BOTON AGRGAR
* Obtiene el producto y precio desde el 'select'. lee la cantidad.
*guarda estros tres datos en su respectivo arreglo y reinicia la cantidad a 1. 
*/
function agregarProducto(){
    const dato = selectProducto.value
    const partes = dato.split("-")
    const producto = partes[0]
    const precio = parseFloat(partes[1])
    const cantidad = parseInt(txtCantidad.value)
    //Guarda los datos en la última posición de cada arreglo
    productos[productos.length] = producto
    precios[precios.length] = precio
    cantidades[cantidades.length] = cantidad
    txtCantidad.value = 1 // Restablece el campo de cantidad
}

/** LOGICA DEL BOTON AGREGAR:
 * vaciar por completo todo los areglos en la memoria y limpiar todo los campos de texto.
 * de la interfas para enpesar una nueva factura desde cero.
 */
function vaciarFactura(){
    productos = []
    precios = []
    cantidades = []
    txtListado.value = ""
    txtSubtotal.value = ""
    txtIVA.value = ""
    txtDescuento.value = ""
    txtTotal.value = ""
}

function totalProductos(){
    return productos.length
}

function existeFactura(){
    if(productos.length == 0){
        return false
    }
    return true
}

/**
 * LÓGICA DEL BOTÓN PRESENTAR:
 * Valida si hay productos. Si los hay, recorre los arreglos mediante un ciclo 'for'
 * para armar un texto detallado con el nombre, cantidad, precio y subtotal de cada ítem,
 * y finalmente lo muestra en el cuadro de listado.
 */
function presentarFactura(){
    if(existeFactura() == false){
        txtListado.value = "No existen productos."
        return
    }
    let texto = ""
    for(let i = 0; i < productos.length; i++){
        const subtotal = cantidades[i] * precios[i]
        texto += "Producto : " + productos[i] + "\n"
        texto += "Cantidad : " + cantidades[i] + "\n"
        texto += "Precio    : $" + precios[i].toFixed(2) + "\n"
        texto += "Subtotal : $" + subtotal.toFixed(2) + "\n"
        texto += "-----------------------------\n"
    }
    txtListado.value = texto
}

function calcularSubtotal(){
    let subtotal = 0
    for(let i = 0; i < productos.length; i++){
        subtotal = subtotal + (cantidades[i] * precios[i])
    }
    return subtotal
}

function calcularIVA(subtotal){
    const iva = subtotal * 0.15 // Calcula el 15% de IVA
    return iva
}

function calcularDescuento(subtotal){
    let descuento = 0
    if(subtotal > 20){
        descuento = subtotal * 0.05 // Aplica 5% de descuento si la compra supera los $20
    }
    return descuento
}

function calcularTotal(subtotal, iva, descuento){
    const total = subtotal + iva - descuento
    return total
}

/**
 * LÓGICA DEL BOTÓN CALCULAR:
 * Valida que existan productos cargados. Llama a las funciones matemáticas de apoyo,
 * obtiene los valores finales de la compra y los imprime formateados a dos decimales
 * en sus respectivas cajas de texto.
 */
function calcularFactura(){
    if(existeFactura() == false){
        txtSubtotal.value = ""
        txtIVA.value = ""
        txtDescuento.value = ""
        txtTotal.value = ""
        return
    }
    const subtotal = calcularSubtotal()
    const iva = calcularIVA(subtotal)
    const descuento = calcularDescuento(subtotal)
    const total = calcularTotal(subtotal, iva, descuento)
    // Muestra los resultados en la interfaz web fijando dos decimales (.toFixed(2))
    txtSubtotal.value = subtotal.toFixed(2)
    txtIVA.value = iva.toFixed(2)
    txtDescuento.value = descuento.toFixed(2)
    txtTotal.value = total.toFixed(2)
}
