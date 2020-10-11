function validarFraccion(num){
	return +num.split("/").reduce((a,b) => a/(+b||1))
	
}

function crearMatrizCuadrada( numEcuacionesDin){
    if (numEcuacionesDin >= 2 && numEcuacionesDin <= 50) { 
        var matrizADinamica = new Array(numEcuacionesDin)
        for (let filaDinamica = 0; filaDinamica < matrizADinamica.length; filaDinamica++){        
            for (let columnaDinamica = 0; columnaDinamica < matrizADinamica.length; columnaDinamica++){
                matrizADinamica[filaDinamica] = new Array(numEcuacionesDin)
            }
        }

        for(let i = 0; i < numEcuacionesDin; i++){
            for (let j = 0; j < numEcuacionesDin; j++){
                let celda = document.getElementById(`celdaA${i+1}${j+1}`)
                if (celda.value == "" || celda.value == null || celda.value == undefined || celda.value.isNaN || celda.value == "NaN" ){
                    celda.value = 0 ;                    
                } else {
                    try {
                        valorcelda = validarFraccion(celda.value)                              // CORREGIR VALIDACION !!!

                    } catch (error) {
                        console.error("Se genero un error:" + error)
                        alert("error: "+ error)
                    }
                }
                celda.value = parseFloat(validarFraccion(celda.value))
                matrizADinamica[i][j] = parseFloat(validarFraccion(celda.value))
            }
        }
        return matrizADinamica;
    
    } else {
        console.log("No se pudo crear la matriz. Tamaño Invalido")
    }
}

function crearMatrizB(numEcuacionesDin){
    if (numEcuacionesDin >= 2 && numEcuacionesDin <= 50) { 
        var matrizBDinamica = new Array(numEcuacionesDin)

        for (let fila = 0; fila < numEcuacionesDin; fila++){
            let celda = document.getElementById(`celdaB${fila+1}`)
                if (celda.value == "" || celda.value == null || celda.value == undefined){
                    celda.value = 0;                    
                } else {
                    try {
                        valorcelda = eval(celda.value)                              // CORREGIR VALIDACION !!!

                    } catch (error) {
                        console.error("Se genero un error:" + error)
                        alert("error: "+ error)
                    }
                }
                matrizBDinamica[fila] = parseFloat(celda.value)
        }

        return matrizBDinamica;
    } else {
        console.log("No se pudo crear la matriz. Tamaño Invalido")
        return []
    }    
}

function crearInputMatriz(){

    var inputNumEc = document.getElementById("numecuaciones");
    var numEcuaciones = parseInt(inputNumEc.value);

    var divMatrizA = document.getElementById("matrizA");
    divMatrizA.innerHTML = ""
    for (let i = 1; i <= numEcuaciones; i++){
        
        let uncFila = "\\u208"+ i.toString()

        let filaMatriz = document.createElement("div");
        filaMatriz.className = "control has-text-centered";

        for (let j = 1; j <= numEcuaciones; j++){

           
            uncColumna = "\\u208"+ j.toString()
            

            let celdaCoef = document.createElement("input");
            celdaCoef.className = "input is-2 has-text-centered";
            celdaCoef.setAttribute("type","text");
            celdaCoef.setAttribute("id",`celdaA${i}${j}`)
            celdaCoef.setAttribute("pattern","^-?\\d+(?:\\.\\d+|\\/\\d+)?$")
            celdaCoef.setAttribute("placeholder", `a${eval("'"+uncFila+"'")}${eval("'"+uncColumna+"'")}`);
            //celdaCoef.setAttribute("value","0");
            filaMatriz.appendChild(celdaCoef);

        }

        let celdaMatrizB = document.createElement("input");
        celdaMatrizB.className = "input ml-5 has-text-centered";
        celdaMatrizB.setAttribute("id",`celdaB${i}`)
        celdaMatrizB.setAttribute("pattern","^-?\\d+(?:\\.\\d+|\\/\\d+)?$")
        celdaMatrizB.setAttribute("placeholder", `b${eval("'"+uncFila+"'")}`);
        filaMatriz.appendChild(celdaMatrizB);

        divMatrizA.appendChild(filaMatriz);

    }


}

function jacobi(numEcuaciones, matrizA, matrizB, vectorXInicial, epsilon, maxIteraciones, numiteramostrar = 4){
    var textJacobi = document.getElementById("jacobi")
    var textResultados = document.getElementById("resultadositer")
    
    //var vectorXInicial = [0,0,0,0];
    var vectorXResultado = new Array(numEcuaciones);
    vectorXResultado = [0]
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
        
        if (iteraciones <= numiteramostrar){
            
            console.log (`Vector Solucion obtenido en ${iteraciones} iteraciones:\n(${vectorXResultado.map( x => {return x.toFixed(4)})})\n`)
            if (iteraciones <= 1) textResultados.innerText = "============ METODO JACOBI =============";
            textResultados.innerText +=`\nIteracion ${iteraciones}:\n(${vectorXResultado.map( x => {return x.toFixed(4)})})\n`
            /*
            vectorXResultado.forEach(xres => {
                textResultados.innerText += "\n" + xres.toFixed(4)    
            });*/
        }
        
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


function gaussSeidel(numEcuaciones, matrizA, matrizB, vectorXInicial, epsilon, maxIteraciones){

    //var vectorXInicial = [0,0,0,0];
    var vectorXResultado = new Array(numEcuaciones);
    vectorXResultado = [0]
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


function matrizDominante(numEcuaciones, matrizA) {
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


function elementosDominante(numEcuaciones, matrizA){

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


function ordenarMatrizDominante(numEcuaciones, matrizA, matrizB){

    indicesAOrdenar = elementosDominante(numEcuaciones ,matrizA)

    if (indicesUnicos(indicesAOrdenar)){
        var auxMatrizA = matrizA.slice()
        var auxMatrizB = matrizB.slice()

        for (let i = 0; i < numEcuaciones; i++){
            auxMatrizA[indicesAOrdenar[i]] = matrizA[i].slice()
            auxMatrizB[indicesAOrdenar[i]] = matrizB[i]
        }
        /*
        matrizA = auxMatrizA.slice()
        matrizB = auxMatrizB.slice()
        */

        matrices = {
            mA : auxMatrizA.slice(),
            mB : auxMatrizB.slice()
        }

        return matrices


    } else {
        alert("La Matriz dada no puede ser ordena dominante por fila")
        console.log("La Matriz dada no puede ser ordena dominante por fila")
    }

    


}

function crearVectorInicial(entrada, numEcuaciones){
	var vector = entrada.value.split(",")
	var arr = new Array(numEcuaciones)
	for (let i = 0; i<numEcuaciones; i++){ arr[i] = 0;}
	if ( vector.length === 1 && vector[0] == ""){
		//for (let i = 0; i<numEcuaciones; i++){ arr[i] = 0;}
		entrada.value = arr;
		return arr;
	} else {
		
		for (let i = 0; i<numEcuaciones; i++){
			try {
				if ( vector[i] =="" || vector[i] == null || vector[i].isNaN || vector[i] == undefined){ arr[i] = 0; }
				else { arr[i] = parseFloat(vector[i])}
			} catch(error){
	/*			if(error === ReferenceError){ 
					arr[i] = 0;
					
					console.log("El vetor inicial ingresado es menor al numero de ecuaciones, se completó con ceros")
					
				}*/
				console.log(error)
			}
		}
		entrada.value = arr;
		return	arr 
		
	}
}


//========================  MAIN  function ============================

crearmatriz = document.getElementById("crearMatriz");
crearmatriz.addEventListener("click", ()=>{crearInputMatriz();});

calcular = document.getElementById("calcular");
calcular.addEventListener("click",

() => {

    //  Solucion para Matrices de Orden n  
    //var matrizADinamica = crearMatrizCuadrada(numEcuaciones)

   // var textJacobi = document.getElementById("jacobi")

    //================ Variables ====================

    var inputNumEc = document.getElementById("numecuaciones");
    var numeroEcuaciones = parseInt(inputNumEc.value);

   /* matrizAOriginal =  [[-3, 9,-1, 3],              // ORIGINAL
                        [ 2,-1,13,-1],
                        [ 5,-1, 2, 8],
                        [ 6, 3,-1,-2]];
*/

    var inputVectorInicial = document.getElementById("vectorinicial");
    var vectorInicial = crearVectorInicial(inputVectorInicial, numeroEcuaciones);
    console.log(vectorInicial);
    //var vectorInicial = [0,0,0,0];
    //console.log(vectorISeparado);
    //var vectorInicial = vectorISeparado.map();

   // var matrizSolucion = [21,-11,-7,5];

    //var vectorXResultado = [0,0,0,0];

    var inputmaxIteraciones = document.getElementById("maxiteraciones");
    var maxIteraciones = parseInt(inputmaxIteraciones.value);


    //expError
    var inputepsilon = document.getElementById("epsilon");
    var epsilonPrecision = Math.pow(10,parseInt(inputepsilon.value));

    var inputnumiteramostrar = document.getElementById("numiteramostrar");
    numIteraciones = parseInt(inputnumiteramostrar.value)
 // ===================================================

    matrizAOriginal = crearMatrizCuadrada(numeroEcuaciones)
    matrizSolucion = crearMatrizB(numeroEcuaciones)

    if (matrizDominante(numeroEcuaciones,matrizAOriginal)) {
    
        resultadoJacobi = jacobi(numeroEcuaciones, matrizAOriginal, matrizSolucion, vectorInicial, epsilonPrecision, maxIteraciones, numIteraciones);
        console.log(resultadoJacobi)
        resultadoGauss = gaussSeidel(numeroEcuaciones, matrizAOriginal, matrizSolucion, vectorInicial, epsilonPrecision, maxIteraciones);
        console.log(resultadoGauss)
    
    } else { 
        matrizOrdenada = ordenarMatrizDominante( numeroEcuaciones, matrizAOriginal, matrizSolucion)
        console.log("MATRIZ ORDENADA!\n")
        resultadoJacobi = jacobi(numeroEcuaciones, matrizOrdenada.mA, matrizOrdenada.mB, vectorInicial, epsilonPrecision, maxIteraciones, numIteraciones);
        console.log(resultadoJacobi)
        resultadoGauss = gaussSeidel(numeroEcuaciones, matrizOrdenada.mA, matrizOrdenada.mB, vectorInicial, epsilonPrecision, maxIteraciones);
        console.log(resultadoGauss)
    
    }
    
/*
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
*/
}

);



















