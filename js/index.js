//secciones y botones
var jugadores = document.getElementById("jugadores");
var juego = document.getElementById("juego");
var btnComienza = document.getElementById("btnComienza");
var bienvenido = document.getElementById("bienvenido");
var ganador = document.getElementById("ganador");
var btnVolverAJugar = document.getElementById("btnVolverAJugar");
var historial = document.getElementById("Historial");
var turno = document.getElementById("turno");

//historial
var tbJugador1 = document.getElementById("tbJugador1");
var tbJugador2 = document.getElementById("tbJugador2");
var tbGanados1 = document.getElementById("tbGanados1");
var tbGanados2 = document.getElementById("tbGanados2");
var tbEmpatados = document.getElementById("tbEmpatados");


//elementos
var nombre1 = document.getElementById("usr1");
var nombre2 = document.getElementById("usr2");
var ficha1 = document.getElementById("ficha1");
var ficha2 = document.getElementById("ficha2");
var celda = document.querySelectorAll('.celda');
//variables utiles
var hayGanador = false;
var movimientos = 0;
var currentTurn = 1;
//arrays ganadores
var winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

//contador de historial
var ganadorUsr1 = 0;
var ganadorUsr2 = 0;
var empates = 0;

function btnJugar() {
    nombre1.value = "";
    nombre2.value = "";
    jugadores.style.display = "block";
    jugadores.classList.add("animated", "fadeInDown");
    bienvenido.style.display = "none";
    var _valueFicha1 = ficha1.options[ficha1.selectedIndex].value;
    if (_valueFicha1 === 'X') {
        ficha2.value = 'O'
    } else ficha2.value = 'X';
}

function quitarAnimacion() {
    jugadores.classList.remove("animated", "fadeInDown");
    jugadores.classList.remove("animated", "fadeInRight");
    juego.classList.remove("animated", "fadeInRight", "fadeOutDown");
}

function comenzar() {
    var _validar1 = nombre1.checkValidity();
    var _validar2 = nombre2.checkValidity();
    var _validar3 = ficha1.checkValidity();
    if (_validar1 && _validar2 && _validar3) {
        jugadores.style.display = "none";
        juego.style.display = "block";
        juego.classList.add("animated", "fadeInRight");
        //tabla
        tbJugador1.innerHTML = nombre1.value;
        tbJugador2.innerHTML = nombre2.value;
        tbGanados1.innerHTML = ganadorUsr1;
        tbGanados2.innerHTML = ganadorUsr2;
        tbEmpatados.innerHTML = empates;
        //turno
        turno.innerHTML = "El turno es de " + nombre1.value;
    } else {
        document.getElementById("alert").classList.toggle('show');
    }
}
ficha1.addEventListener('change', (event) => {
    var _valueFicha1 = ficha1.options[ficha1.selectedIndex].value;
    if (_valueFicha1 === 'X') {
        ficha2.value = 'O'
    } else ficha2.value = 'X';
})

function btnReinicia() {
    juego.classList.add("fadeOutDown");
    setTimeout(function() {
        juego.style.display = "none";
        bienvenido.style.display = "block";
        quitarAnimacion();
    }, 700);
    vaciarTablero();
    currentTurn = 1;
    ganadorUsr1 = 0;
    ganadorUsr2 = 0;
    empates = 0;
}
celda.forEach(item => {
    item.addEventListener('click', event => {
        if (!hayGanador) {
            if (!event.target.innerHTML) {
                movimientos++;
                if (currentTurn % 2 === 1) {
                    event.target.innerHTML = ficha1.options[ficha1.selectedIndex].value;
                    event.target.style.color = "red";
                    turno.innerHTML = "El turno es de " + nombre2.value;
                    currentTurn++;
                } else {
                    event.target.innerHTML = ficha2.value;
                    event.target.style.color = "green";
                    turno.innerHTML = "El turno es de " + nombre1.value;
                    currentTurn--;
                }
                if (checkForWinner()) {
                    theWinner = currentTurn == 1 ? nombre2.value : nombre1.value;
                    turno.innerHTML = "";
                    declareWinner(theWinner);
                }
                if (!checkForWinner() && movimientos === 9) {
                    declareWinner("empate")
                }
            }
        }
    })
})

function vaciarTablero() {
    movimientos = 0;
    hayGanador = false;
    celda.forEach((m) => {
        m.innerHTML = "";
    });
    ganador.style.display = 'none';
}

function declareWinner(winner) {
    var _elGanador = "El ganador es ";
    if (nombre1.value === winner) {
        ganadorUsr1++;
        tbGanados1.innerHTML = ganadorUsr1;
    } else if (nombre2.value === winner) {
        ganadorUsr2++;
        tbGanados2.innerHTML = ganadorUsr2;
    } else {
        empates++
        _elGanador = "Es un ";
        tbEmpatados.innerHTML = empates;
    }
    turno.innerHTML = "";
    var _NombreGanador = document.getElementById("nombreGanador");
    ganador.style.display = 'block';
    _NombreGanador.innerHTML = _elGanador + winner;
}

function checkForWinner() {
    if (movimientos > 2) {
        if (recorrerArray()) {
            return true
        }
    }
}

function recorrerArray() {
    winningCombos.forEach(element => {
        var _elemento0 = document.getElementById(element[0]).innerHTML;
        var _elemento1 = document.getElementById(element[1]).innerHTML;
        var _elemento2 = document.getElementById(element[2]).innerHTML;
        if (_elemento0 === _elemento1 && _elemento1 === _elemento2 && _elemento0 !== "" && _elemento1 !== "" && _elemento2 !== "") {
            hayGanador = true;
            return
        }
    })
    return hayGanador;
}

function VolverAJugar() {
    currentTurn = 1;
    vaciarTablero();
    turno.innerHTML = "El turno es de " + nombre1.value;
}