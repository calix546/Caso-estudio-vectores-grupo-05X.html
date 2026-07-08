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

btnAgregar.addEventListener("click", function(e){
    agregarProducto()
})

btnPresentar.addEventListener("click", function(e){
    presentarFactura()
})

btnCalcular.addEventListener("click", function(e){
    calcularFactura()
})

btnLimpiar.addEventListener("click", function(e){
    vaciarFactura()
})

function agregarProducto(){
    const dato = selectProducto.value
    const partes = dato.split("-")
    const producto = partes[0]
    const precio = parseFloat(partes[1])
    const cantidad = parseInt(txtCantidad.value)
    productos[productos.length] = producto
    precios[precios.length] = precio
    cantidades[cantidades.length] = cantidad
    txtCantidad.value = 1
}

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
    const iva = subtotal * 0.15
    return iva
}

function calcularDescuento(subtotal){
    let descuento = 0
    if(subtotal > 20){
        descuento = subtotal * 0.05
    }
    return descuento
}

function calcularTotal(subtotal, iva, descuento){
    const total = subtotal + iva - descuento
    return total
}

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
    txtSubtotal.value = subtotal.toFixed(2)
    txtIVA.value = iva.toFixed(2)
    txtDescuento.value = descuento.toFixed(2)
    txtTotal.value = total.toFixed(2)
}