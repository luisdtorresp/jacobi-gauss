var textJacobi = document.getElementById("jacobi")

//================ Variables ====================

numEcuaciones = 4;
/*
matrizA =  [[-3, 9,-1, 3],
            [ 2,-1,13,-1],
            [ 5,-1, 2, 8],
            [ 6, 3,-1,-2]];

*/
matrizA =  [[  9, -1, 3,-3],
            [ -1, 13,-1, 2],
            [ -1,  2, 8, 5],
            [  3, -1,-2, 6]];

//  Solucion para Matrices de Orden n  
/*
matrizADinamica = []
matrizADinamica.length

function crearMatrizCuadrada( numEcuacionesDin )
if (numEcuacionesDin >= 2 && numEcuacionesDin <= 50) { 
    matrizADinamica = new Array(numEcuacionesDin)
    for (let filaDinamica = 0; filaDinamica < matrizADinamica.length; filaDinamica++){        
        for (let columnaDinamica = 0; columnaDinamica < matrizADinamica.length; columnaDinamica++){
            matrizADinamica[filaDinamica] = new Array(numEcuacionesDin)
        }
    }
    return matrizADinamica;

} else {
    console.log("No se pudo crear la matriz. Tamaño Invalido")
}
*/


var vectorXInicial = [0,0,0,0];

var matrizB = [21,-11,-7,5];

var vectorXResultado = [0,0,0,0];

var maxIteraciones = 200;
var iteraciones = 0;

//expError
epsilon = 1e-3;

if (matrizDominante()) {

} else {
    
}

function jacobi(){
  //  var textJacobi = document.getElementById("jacobi")
  
    while (iteraciones < maxIteraciones) {
        let fila = 0;        
        while (fila < numEcuaciones) {
            let suma = 0;
            let columna = 0;
            while (columna < numEcuaciones ) {
                if (columna !== fila){
                    //vectorXInicial.forEach( x => { 
                    
                    suma += vectorXInicial[columna] * matrizA[fila][columna]
                    //}); 
                }
                columna++;            
            }
            vectorXResultado[fila] = ((matrizB[fila]-suma)/matrizA[fila][fila]);
            fila++;
        }    
        
        let aproximados = 0;
        for (let i = 0; i < vectorXResultado.length; i++){
            let errorAprox = Math.abs(vectorXResultado[i] - vectorXInicial[i])
            if (errorAprox > epsilon) break;
            aproximados++;
            if (aproximados == numEcuaciones) {

                //IMPRIME RESULTADOS EN LA PAGINA
                textJacobi.innerText = `Vector Solucion obtenido en ${iteraciones} iteraciones:`
                vectorXResultado.forEach(element => {
                    textJacobi.innerText += "\n" + element    
                });
                console.log (`Vector Solucion obtenido en ${iteraciones} iteraciones:\n${vectorXResultado}`)
                return vectorXResultado;
            }
        }
            
        vectorXInicial = vectorXResultado.slice();
        iteraciones++;

    }

    alert("No se alcanzó la convergencia!")

    console.log ("No se alcanzo la convergencia!")
    console.log (`La ultima aproximacion al vector solucion obtenido en ${iteraciones} iteraciones:\n${vectorXResultado}`)
    textJacobi.innerText = `Vector Solucion obtenido en ${iteraciones} iteraciones:`
                vectorXResultado.forEach(element => {
                    textJacobi.innerText += "\n" + element    
                });

}


function matrizDominante() {
    let dominante = 0;
    for (let i = 0; i < numEcuaciones; i++){
        
        let sumatoria = 0;
        for (let j = 0; j < numEcuaciones; j++){ 
            if (i !== j){
                sumatoria += Math.abs(matrizA[i][j])
            }
        }
        if (Math.abs(matrizA[i][i]) < sumatoria) break;
        dominante++;
        if (dominante == numEcuaciones) {
            console.log("La matriz dada SI es diagonalmente dominante.")
            return 0
        }
        
    }

    console.log("La matriz dada no es diagonalmente dominante.")
}

resultado = jacobi();
console.log(resultado)

valor = (-3*vectorXResultado[3])+(9*vectorXResultado[0])+(-1*vectorXResultado[1])+(3*vectorXResultado[2])
console.log("Solucion Ec1 = " + valor)

valor = (2*vectorXResultado[3])+(-1*vectorXResultado[0])+(13*vectorXResultado[1])+(-1*vectorXResultado[2])
console.log("Solucion Ec2 = " + valor)

valor = (5*vectorXResultado[3])+(-1*vectorXResultado[0])+(2*vectorXResultado[1])+(8*vectorXResultado[2])
console.log("Solucion Ec3 = " + valor)

valor = (6*vectorXResultado[3])+(3*vectorXResultado[0])+(-1*vectorXResultado[1])+(-2*vectorXResultado[2])
console.log("Solucion Ec4 = " + valor)