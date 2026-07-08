const selectOperacion = document.getElementById("id-select-operacion")
const txtMonto = document.getElementById("id-txt-monto")
const btnRegistrar = document.getElementById("id-btn-registrar")
const btnPresentar = document.getElementById("id-btn-presentar")
const btnCalcular = document.getElementById("id-btn-calcular")
const btnLimpiar = document.getElementById("id-btn-limpiar")
const txtListado = document.getElementById("id-listado-movimientos")
const txtTotalDepositos = document.getElementById("id-txt-total-deposito")
const txtTotalRetiros = document.getElementById("id-txt-total-retiro")
const txtSaldo = document.getElementById("id-txt-saldo")

let operaciones = []
let montos = []
let saldo = 0

btnRegistrar.addEventListener("click",function (e){
    registrarMovimiento()
})

btnPresentar.addEventListener("click",function (e){
    presentarMovimientos()
})

btnCalcular.addEventListener("click",function (e){
    calcularTotales()
})

btnLimpiar.addEventListener("click",function (e){
    limpiar()
})

function registrarMovimiento(){
    const operacion = selectOperacion.value
    const monto = parseFloat(txtMonto.value)
    if(monto <= 0){
        alert("Ingrese un monto válido")
        return
    }
    if(operacion == "Retiro"){
        if(monto > saldo){
            alert("Saldo insuficiente")
            return
        }
        saldo = saldo - monto
    }
    else{
        saldo = saldo + monto
    }
    operaciones[operaciones.length] = operacion
    montos[montos.length] = monto
    txtMonto.value = 0
}

function existeMovimiento(){
    if(operaciones.length == 0){
        alert("No existen movimientos registrados")
        return false
    }
    return true
}

function limpiar(){
    operaciones = []
    montos = []
    saldo = 0
    txtListado.value = ""
    txtTotalDepositos.value = ""
    txtTotalRetiros.value = ""
    txtSaldo.value = ""
}

function presentarMovimientos(){
    if(existeMovimiento() == false){
        txtListado.value = ""
        return
    }
    let texto = ""
    for(let i = 0; i < operaciones.length; i++){
        texto += "Operacion : " + operaciones[i] + "\n"
        texto += "Monto : $" + montos[i].toFixed(2) + "\n"
        texto += "--------------------------\n"
    }
    txtListado.value = texto
}

function calcularTotalDepositos(){
    let total = 0
    for(let i = 0; i < operaciones.length; i++){
        if(operaciones[i] == "Deposito"){
            total = total + montos[i]
        }
    }
    return total
}

function calcularTotalRetiros(){
    let total = 0
    for(let i = 0; i < operaciones.length; i++){
        if(operaciones[i] == "Retiro"){
            total = total + montos[i]
        }
    }
    return total
}

function calcularTotales(){
    if(existeMovimiento() == false){
        txtTotalDepositos.value = ""
        txtTotalRetiros.value = ""
        txtSaldo.value = ""
        return
    }
    const totalDepositos = calcularTotalDepositos()
    const totalRetiros = calcularTotalRetiros()
    txtTotalDepositos.value = totalDepositos.toFixed(2)
    txtTotalRetiros.value = totalRetiros.toFixed(2)
    txtSaldo.value = saldo.toFixed(2)
}