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

// =========================================================================
// ACCIONES DE LOS BOTONES (EVENT LISTENERS)
// =========================================================================
// BOTÓN REGISTRAR: Al hacer clic, procesa el depósito o retiro ingresado y actualiza el saldo en memoria.
btnRegistrar.addEventListener("click",function (e){
    registrarMovimiento()
})

// BOTÓN PRESENTAR: Al hacer clic, genera un historial de texto con todos los movimientos realizados.
btnPresentar.addEventListener("click",function (e){
    presentarMovimientos()
})

// BOTÓN CALCULAR: Al hacer clic, suma todos los depósitos, todos los retiros y muestra el estado de cuenta final.
btnCalcular.addEventListener("click",function (e){
    calcularTotales()
})


// BOTÓN LIMPIAR: Al hacer clic, borra el historial de la memoria y resetea las cajas de texto de la pantalla.
btnLimpiar.addEventListener("click",function (e){
    limpiar()
})

// =========================================================================
// FUNCIONES QUE EJECUTAN LOS BOTONES
// =========================================================================

/**
 * LÓGICA DEL BOTÓN REGISTRAR:
 * Captura el tipo de operación y el monto. Valida que el monto sea mayor a 0 
 * y que, en caso de ser un retiro, haya saldo suficiente. Luego, actualiza el saldo
 * global, guarda los datos en los arreglos y reinicia el campo del monto a 0.
 */
function registrarMovimiento(){
    const operacion = selectOperacion.value
    const monto = parseFloat(txtMonto.value)
    // Validación: No permite montos menores o iguales a cero
    if(monto <= 0){
        alert("Ingrese un monto válido")
        return
    }
    // Validación especial para retiros
    if(operacion == "Retiro"){
        if(monto > saldo){
            alert("Saldo insuficiente")
            return
        }
        saldo = saldo - monto // Resta el dinero del saldo total
    }
    else{
        saldo = saldo + monto // Suma el dinero al saldo total (Depósito)
    }
    
     // Guarda el registro en los arreglos
    operaciones[operaciones.length] = operacion
    montos[montos.length] = monto
    txtMonto.value = 0 // Resetea el cuadro de texto del monto
}

function existeMovimiento(){
    if(operaciones.length == 0){
        alert("No existen movimientos registrados")
        return false
    }
    return true
}


/**
 * LÓGICA DEL BOTÓN LIMPIAR:
 * Restablece todas las variables globales a cero/vacías y limpia los elementos visuales 
 * de la interfaz para iniciar un nuevo estado de cuenta.
 */
function limpiar(){
    operaciones = []
    montos = []
    saldo = 0
    txtListado.value = ""
    txtTotalDepositos.value = ""
    txtTotalRetiros.value = ""
    txtSaldo.value = ""
}

/**
 * LÓGICA DEL BOTÓN PRESENTAR:
 * Verifica si hay datos cargados. Si es así, recorre los arreglos con un ciclo 'for'
 * para redactar el historial de transacciones mostrando el tipo de operación y su monto,
 * imprimiendo el resultado en el cuadro de lista.
 */
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
            total = total + montos[i] // Suma acumulativa solo de depósitos
        }
    }
    return total
}

function calcularTotalRetiros(){
    let total = 0
    for(let i = 0; i < operaciones.length; i++){
        if(operaciones[i] == "Retiro"){
            total = total + montos[i] // Suma acumulativa solo de retiros
        }
    }
    return total
}

/**
 * LÓGICA DEL BOTÓN CALCULAR:
 * Valida la existencia de movimientos, obtiene las sumas de las funciones de apoyo
 * (total de depósitos y total de retiros) y los imprime junto al saldo acumulado,
 * formateando todos los números visibles a dos decimales (.toFixed(2)).
 */
function calcularTotales(){
    if(existeMovimiento() == false){
        txtTotalDepositos.value = ""
        txtTotalRetiros.value = ""
        txtSaldo.value = ""
        return
    }
    const totalDepositos = calcularTotalDepositos()
    const totalRetiros = calcularTotalRetiros()
     // Muestra los balances finales en la pantalla
    txtTotalDepositos.value = totalDepositos.toFixed(2)
    txtTotalRetiros.value = totalRetiros.toFixed(2)
    txtSaldo.value = saldo.toFixed(2)
}
