var textJacobi = document.getElementById("jacobi")

//================ Variables ====================

numEcuaciones = 4;
/*
matrizA =  [[ 6, 3,-1,-2],              // Ordenada por Fila
            [-3, 9,-1, 3],
            [ 2,-1,13,-1],
            [ 5,-1, 2, 8]
            ];

//*/
matrizA =  [[-3, 9,-1, 3],              // ORIGINAL
            [ 2,-1,13,-1],
            [ 5,-1, 2, 8],
            [ 6, 3,-1,-2]];
/*
matrizA =  [[-3, 9,-1, 3],              // TESTEO
            [ 2,-1,13,-1],
            [ 8, 5,-1, 2],
            [ 6, 3,-1,-2]];


//
matrizA =  [[  9, -1, 3,-3],            // Ordenada por Columna
            [ -1, 13,-1, 2],
            [ -1,  2, 8, 5],
            [  3, -1,-2, 6]];
*/
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


//var vectorXInicial = [0,0,0,0];

var matrizB = [21,-11,-7,5];

//var vectorXResultado = [0,0,0,0];

var maxIteraciones = 200;
var iteraciones = 0;

//expError
epsilon = 1e-3;



function jacobi(){
  //  var textJacobi = document.getElementById("jacobi")
    var vectorXInicial = [0,0,0,0];
    var vectorXResultado = [0,0,0,0];
    var iteraciones = 1;
    while (iteraciones <= maxIteraciones) {
        
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
                vectorXResultado.forEach(xres => {
                    textJacobi.innerText += "\n" + xres.toFixed(4)    
                });
                console.log (`Vector Solucion obtenido en ${iteraciones} iteraciones:\n${vectorXResultado}`)
                return vectorXResultado;
            }
        }
        
        if (iteraciones <= 4){console.log (`Vector Solucion obtenido en ${iteraciones} iteraciones:\n${vectorXResultado.map( x => {return x.toFixed(4)})}`)}
        
        vectorXInicial = vectorXResultado.slice();
        iteraciones++;

    }

    alert("No se alcanzó la convergencia!")

    console.log ("No se alcanzo la convergencia!")
    console.log (`La ultima aproximacion al vector solucion obtenida en ${iteraciones} iteraciones:\n${vectorXResultado}`)
    textJacobi.innerText = `La ultima aproximacion al vector solucion obtenida en ${iteraciones} iteraciones:`
                vectorXResultado.forEach(element => {
                    textJacobi.innerText += "\n" + element.toFixed(4)       
                });

    return new Array(numEcuaciones);

}


function gaussSeidel(){

    var vectorXInicial = [0,0,0,0];
    var vectorXResultado = [0,0,0,0];
    var iteraciones = 1;
    var textGauss = document.getElementById("gauss")
    
      while (iteraciones <= maxIteraciones) {
        //vectorXResultado = vectorXInicial.slice()
        let fila = 0;        
        while (fila < numEcuaciones) {
            let suma1 = 0;
            let suma2 = 0
          /*let columna = 0;
            while (columna < numEcuaciones ) {
                if (columna === 1 ){
                    suma += vectorXInicial[columna] * matrizA[fila][columna]
                } else {
                    suma += (vectorXResultado[columna]*matrizA[fila][columna]) (vectorXInicial[columna] * matrizA[fila][columna])
                }
                columna++;            
            }*/

            for (let columna = 0; columna <= fila-1; columna++){
                suma1 += (vectorXResultado[columna]*matrizA[fila][columna])
            }

            for (let columna = fila+1; columna < numEcuaciones; columna++){
                suma2 += (vectorXInicial[columna]*matrizA[fila][columna])
            }
            vectorXResultado[fila] = ((matrizB[fila]-suma1-suma2)/matrizA[fila][fila]);
            fila++;
        }    
        
        let aproximados = 0;
        for (let i = 0; i < vectorXResultado.length; i++){
            let errorAprox = Math.abs(vectorXResultado[i] - vectorXInicial[i])
            if (errorAprox > epsilon) break;
            aproximados++;
            if (aproximados == numEcuaciones) {

                //IMPRIME RESULTADOS EN LA PAGINA
                textGauss.innerText = `Vector Solucion obtenido en ${iteraciones} iteraciones:`
                vectorXResultado.forEach(element => {
                textGauss.innerText += "\n" + element.toFixed(4)       
                });
                console.log (`Vector Solucion obtenido en ${iteraciones} iteraciones:\n${vectorXResultado}`)
                return vectorXResultado;
            }
        }
    
        if (iteraciones <= 4){console.log (`Vector Solucion obtenido en ${iteraciones} iteraciones:\n${vectorXResultado.map( x => {return x.toFixed(4)})}`)}
        vectorXInicial = vectorXResultado.slice();
        iteraciones++;
  
      }
  
      alert("No se alcanzó la convergencia!")
  
      console.log ("No se alcanzo la convergencia!")
      console.log (`La ultima aproximacion al vector solucion obtenida en ${iteraciones} iteraciones:\n${vectorXResultado}`)
      textGauss.innerText = `La ultima aproximacion al vector solucion obtenida en ${iteraciones} iteraciones:`
                  vectorXResultado.forEach(element => {
                    textGauss.innerText += "\n" + element.toFixed(3)       
                  });

    return new Array(numEcuaciones);
        
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
        if (Math.abs(matrizA[i][i]) < sumatoria) break;  //diagonal debilmente dominante
        dominante++;
        if (dominante == numEcuaciones) {
            console.log("La matriz dada SI es diagonalmente dominante.")
            return true
        }
        
    }
    console.log("La matriz dada no es diagonalmente dominante.")
    return false
}


function ordenarMatrizDominante(){

    indicesAOrdenar = elementosDominante()

    if (indicesUnicos(indicesAOrdenar)){
        var auxMatrizA = matrizA.slice()
        var auxMatrizB = matrizB.slice()

        for (let i = 0; i < numEcuaciones; i++){
            auxMatrizA[indicesAOrdenar[i]] = matrizA[i].slice()
            auxMatrizB[indicesAOrdenar[i]] = matrizB[i]
        }

        matrizA = auxMatrizA.slice()
        matrizB = auxMatrizB.slice()

    } else {
        alert("La Matriz dada no puede ser ordena dominante por fila")
        console.log("La Matriz dada no puede ser ordena dominante por fila")
    }

    


}



function elementosDominante(){

    var indicesDominantes =  new Array(numEcuaciones)
    //let mayor = -1*Infinity
    for (let row = 0; row < numEcuaciones; row++){
    let mayor = Math.abs(matrizA[row][0])
    let suma = 0
    
        for( let col = 0; col < numEcuaciones; col++){
            if (Math.abs(matrizA[row][col]) >= mayor){
                mayor = Math.abs(matrizA[row][col])
                indicesDominantes[row] = col

            }
        
            suma += Math.abs(matrizA[row][col])
        }

        if (mayor < suma-mayor) return indicesDominantes.slice();
    }

    return indicesDominantes.slice();

}

function indicesUnicos(arrayIndices){
    
    for (let i = 0; i < arrayIndices.length; i++){
        for ( let j = i+1; j < arrayIndices.length; j++){
            if (arrayIndices[i] === arrayIndices[j]) return false;
        }
    }

    return true


}








if (matrizDominante()) {
    
    resultadoJacobi = jacobi();
    console.log(resultadoJacobi)
    resultadoGauss = gaussSeidel();
    console.log(resultadoGauss)

} else { 
    ordenarMatrizDominante()
    console.log("MATRIZ ORDENADA!\n")
    resultadoJacobi = jacobi();
    console.log(resultadoJacobi)
    resultadoGauss = gaussSeidel();
    console.log(resultadoGauss)

}






















console.log("============ METODO JACOBI =============")
//resultadoJacobi = jacobi();
//console.log(resultadoJacobi)

valor = (-3*resultadoJacobi[0])+(9*resultadoJacobi[1])+(-1*resultadoJacobi[2])+(3*resultadoJacobi[3])
console.log("Solucion Ec1 = " + valor)

valor = (2*resultadoJacobi[0])+(-1*resultadoJacobi[1])+(13*resultadoJacobi[2])+(-1*resultadoJacobi[3])
console.log("Solucion Ec2 = " + valor)

valor = (5*resultadoJacobi[0])+(-1*resultadoJacobi[1])+(2*resultadoJacobi[2])+(8*resultadoJacobi[3])
console.log("Solucion Ec3 = " + valor)

valor = (6*resultadoJacobi[0])+(3*resultadoJacobi[1])+(-1*resultadoJacobi[2])+(-2*resultadoJacobi[3])
console.log("Solucion Ec4 = " + valor)


console.log("============ METODO GAUSS-SEIDEL ==============")
//resultadoGauss = gaussSeidel();
//console.log(resultadoGauss)

valor = (-3*resultadoGauss[0])+(9*resultadoGauss[1])+(-1*resultadoGauss[2])+(3*resultadoGauss[3])
console.log("Solucion Ec1 = " + valor)

valor = (2*resultadoGauss[0])+(-1*resultadoGauss[1])+(13*resultadoGauss[2])+(-1*resultadoGauss[3])
console.log("Solucion Ec2 = " + valor)

valor = (5*resultadoGauss[0])+(-1*resultadoGauss[1])+(2*resultadoGauss[2])+(8*resultadoGauss[3])
console.log("Solucion Ec3 = " + valor)

valor = (6*resultadoGauss[0])+(3*resultadoGauss[1])+(-1*resultadoGauss[2])+(-2*resultadoGauss[3])
console.log("Solucion Ec4 = " + valor)


