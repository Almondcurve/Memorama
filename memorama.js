// INICIO DE JUEGO DE MEMORAMA
//1. Importación del módulo readline:
const { log } = require('console');
const readlineSync = require('readline-sync')
const readline = require('readline');

//Aquí, se importa el módulo readline de Node.js, que se utiliza para gestionar la entrada y salida de la línea de comandos.
 const rl = readline.createInterface ({
	input: process.stdin,
	output:process.stdout
 });

jugadores = ['1','2','3','4']
index = readlineSync.keyInSelect(jugadores,'cuantos jugadores seran?');
console.log('ok, ' + 'disfruten de la partida');

// 2. Creación de la interfaz readline:
// Se crea una interfaz readline que permite al usuario interactuar con el juego a través de la entrada estándar (teclado) y la salida estándar (pantalla).

//3. Definición de cartas y barajado:
const cards = ['A', 'B', 'C', 'D', 'Yellow', 'Blue', 'Green', 'Red', 'White',1,2,3,4,5,'A', 'B', 'C', 'D', 'Yellow', 'Blue', 'Green', 'Red', 'White',1,2,3,4,5];
const shuffledCards = shuffleArray(cards);
//Se definen las cartas disponibles en el juego como letras del alfabeto, y luego se barajan llamando a la función shuffleArray.

let revealedCards = [];
let matchedPairs = 0;
// 4. Función shuffleArray para barajar las cartas:
// Esta función utiliza el algoritmo de Fisher-Yates para barajar el arreglo de cartas de manera aleatoria.
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
// 5. Función displayBoard para mostrar el tablero de juego:
// Esta función se encarga de mostrar el estado actual del tablero de juego en la línea de comandos. Las cartas ocultas se representan como corchetes ([]), y las cartas reveladas se muestran como letras.
function displayBoard() {
  for (let i = 0; i < shuffledCards.length; i++) {
    if (i % 4 === 0 && i !== 0) {
      console.log('\n');
    }
    if (revealedCards.includes(i)) {
      process.stdout.write(shuffledCards[i] + '  ');
    } else {
      process.stdout.write('[]  ');
    }
  }
  console.log('\n');
  console.log("-----------------");
  console.log("  ");
}
// 6. Función checkMatch para verificar si dos cartas son iguales:
// Esta función verifica si las dos cartas seleccionadas por el usuario son iguales y, en caso afirmativo, aumenta la cantidad de pares coincidentes.
var contador=0;
function checkMatch(card1, card2) {
  if (shuffledCards[card1] === shuffledCards[card2]) {
    console.log('¡Coincidencia!');
    matchedPairs++;
        contador = contador + 1;        
        console.log('Contador : '+contador);
	//console.log('Peticion enviada');
    return true;
  } else {
    return false;
  }
}
// 7. Función main para iniciar el juego:
// Esta función inicia el juego mostrando el tablero y dando la bienvenida al jugador.
function main() {
  displayBoard();
  console.log('¡Bienvenido al juego de Memorama!');
  console.log('Ingrese dos números separados por espacios para revelar cartas (por ejemplo, "0 27").');
  play();
}

//8. Función play para gestionar la lógica del juego:
// Esta función se encarga de manejar la lógica principal del juego, incluyendo la interacción con el jugador, la verificación de coincidencias y la finalización del juego.
function play() {
  rl.question('Ingrese dos cartas para revelar: ', (input) => {
    const [card1, card2] = input.split(' ').map(Number);
    
    if (!Number.isNaN(card1) && !Number.isNaN(card2) && card1 !== card2 && card1 >= 0 && card2 >= 0 && card1 < shuffledCards.length && card2 < shuffledCards.length && !revealedCards.includes(card1) && !revealedCards.includes(card2)) {
      revealedCards.push(card1, card2);
      displayBoard();
      
      if (checkMatch(card1, card2)) {
        if (matchedPairs === shuffledCards.length / 2) {
          console.log('¡Felicidades! Has encontrado todas las coincidencias.');
          readlineSync.close();
        } else {
          play();
        }
      } else {
        setTimeout(() => {
          revealedCards = revealedCards.filter((card) => card !== card1 && card !== card2);
          displayBoard();
          play();
        }, 1000);
      }
    } else {
      console.log('Entrada inválida. Intente nuevamente.');
      play();
    }
  });
}

// 9. Lógica principal para iniciar el juego:
// Finalmente, el juego se inicia llamando a la función main, que a su vez llama a la función play para comenzar la lógica del juego.
main();

// El juego continúa hasta que se encuentren todas las cartas coincidentes, momento en el cual se muestra un mensaje de felicitación y se cierra el juego utilizando rl.close(). Si las cartas seleccionadas no coinciden, se ocultan nuevamente después de un breve retraso (1 segundo), y el jugador puede intentar nuevamente. El código maneja la entrada del usuario y asegura que las selecciones sean válidas.