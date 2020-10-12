function validarFraccion(num){		// Interpreta numeros racionales en la entrada y devuelve el decimal 
	return +num.split("/").reduce((a,b) => a/(+b||1))
	
}

function crearInputMatriz(){ 	//Crea dinamicamente los campos de entrada para los datos del sistema de ecuaciones

    var inputNumEc = document.getElementById("numecuaciones");
    var numEcuaciones = parseInt(inputNumEc.value);

    var divMatrizA = document.getElementById("matrizA");
    divMatrizA.innerHTML = ""  //Reinicia el espacio para los campos de entrada
    
    for (let i = 1; i <= numEcuaciones; i++){  // Ciclo en el que se crean los nuevos elementos html
        
        let uncFila = "\\u208"+ i.toString() 		// Genera el codigo unicode para los subindices 

        let filaMatriz = document.createElement("div");
        filaMatriz.className = "control has-text-centered";

        for (let j = 1; j <= numEcuaciones; j++){
           
            let uncColumna = "\\u208"+ j.toString()  // Genera el codigo unicode para los subindices 
            
            let celdaCoef = document.createElement("input");	// Objeto que se agrega al html
            celdaCoef.className = "input is-2 has-text-centered";
            celdaCoef.setAttribute("type","text");
            celdaCoef.setAttribute("id",`celdaA${i}${j}`)
            celdaCoef.setAttribute("pattern","^-?\\d+(?:\\.\\d+|\\/\\d+)?$")	// validacion html para ingresar fracciones o decimales
            celdaCoef.setAttribute("placeholder", `a${eval("'"+uncFila+"'")}${eval("'"+uncColumna+"'")}`);	//Indicativo de los coeficientes
            filaMatriz.appendChild(celdaCoef);

        }

        let celdaMatrizB = document.createElement("input"); 	// Objeto que se agrega al html
        celdaMatrizB.className = "input ml-5 has-text-centered";
        celdaMatrizB.setAttribute("id",`celdaB${i}`)
        celdaMatrizB.setAttribute("pattern","^-?\\d+(?:\\.\\d+|\\/\\d+)?$")
        celdaMatrizB.setAttribute("placeholder", `b${eval("'"+uncFila+"'")}`);
        filaMatriz.appendChild(celdaMatrizB);

        divMatrizA.appendChild(filaMatriz);

    }

}

function crearMatrizCuadrada( numEcuacionesDin){   //Crea arreglo bidimensional y asigna valores que representan la matriz de coeficientes del sistema de ecuaciones
    if (numEcuacionesDin >= 2 && numEcuacionesDin <= 50) { 
        var matrizADinamica = new Array(numEcuacionesDin)
        for (let filaDinamica = 0; filaDinamica < matrizADinamica.length; filaDinamica++){  // Crea el arreglo bidimensional para los coeficientes de la matriz 
            for (let columnaDinamica = 0; columnaDinamica < matrizADinamica.length; columnaDinamica++){
                matrizADinamica[filaDinamica] = new Array(numEcuacionesDin)
            }
        }

        for(let i = 0; i < numEcuacionesDin; i++){   // Lee los valores en los inputs creados en la pagina y los asigna al arreglo
            for (let j = 0; j < numEcuacionesDin; j++){
                let celda = document.getElementById(`celdaA${i+1}${j+1}`)
                if (celda.value == "" || celda.value == null || celda.value == undefined || celda.value.isNaN || celda.value == "NaN" ){
                    celda.value = 0 ;                    
                } else {
                    try {
                        valorcelda = validarFraccion(celda.value)      // Validacion simple para admitir entrada como decimal o fracción

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

function crearMatrizB(numEcuacionesDin){ // Crea arreglo y asigna los valores para el vector columna de coeficientes independientes
    if (numEcuacionesDin >= 2 && numEcuacionesDin <= 50) { 
        var matrizBDinamica = new Array(numEcuacionesDin)

        for (let fila = 0; fila < numEcuacionesDin; fila++){  //Lee los datos de input en el html
            let celda = document.getElementById(`celdaB${fila+1}`)
                if (celda.value == "" || celda.value == null || celda.value == undefined){
                    celda.value = 0;                    
                } else {
                    try {
                        valorcelda = parseFloat(validarFraccion(celda.value))

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


function matrizDominante(numEcuaciones, matrizA) { // Verifica si la matriz dada es dominante
    let dominante = 0;
    for (let i = 0; i < numEcuaciones; i++){
        
        let sumatoria = 0;
        for (let j = 0; j < numEcuaciones; j++){ 
            if (i !== j){
                sumatoria += Math.abs(matrizA[i][j])
            }
        }
        if (Math.abs(matrizA[i][i]) < sumatoria) break;  //diagonal estrictamente dominante
        dominante++;
        if (dominante == numEcuaciones) {
            console.log("La matriz dada SI es diagonalmente dominante.")
            return true
        }
        
    }
    console.log("La matriz dada no es diagonalmente dominante.")
    return false
}


function elementosDominante(numEcuaciones, matrizA){	//Devuelve un arreglo con coeficientes a evaluar
	// Funcion auxiliar para ordenar una matriz cuadrada para que sea dominante

    var indicesDominantes =  new Array(numEcuaciones)
    
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

function indicesUnicos(arrayIndices){	// Comprueba si los coeficientes por columna no se repiten
	// Funcion auxiliar para ordenar una matriz cuadrada para que sea dominante
    
    for (let i = 0; i < arrayIndices.length; i++){
        for ( let j = i+1; j < arrayIndices.length; j++){
            if (arrayIndices[i] === arrayIndices[j]) return false;
        }
    }

    return true

}


function ordenarMatrizDominante(numEcuaciones, matrizA, matrizB){  	//Ordena de ser posible la matriz dada en una dominante

    indicesAOrdenar = elementosDominante(numEcuaciones ,matrizA)		// El arreglo devuelto indica cual es el orden de las filas

    if (indicesUnicos(indicesAOrdenar)){
        var auxMatrizA = matrizA.slice()
        var auxMatrizB = matrizB.slice()

        for (let i = 0; i < numEcuaciones; i++){
            auxMatrizA[indicesAOrdenar[i]] = matrizA[i].slice()
            auxMatrizB[indicesAOrdenar[i]] = matrizB[i]
        }
        
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

function crearVectorInicial(entrada, numEcuaciones){	// Lee del campo input los valores separados por comas y asigna al vector inicial
	var vector = entrada.value.split(",")
	var arr = new Array(numEcuaciones)
	for (let i = 0; i<numEcuaciones; i++){ arr[i] = 0;}
	if ( vector.length === 1 && vector[0] == ""){
		
		entrada.value = arr;
		return arr;
	} else {
		
		for (let i = 0; i<numEcuaciones; i++){
			try {
				if ( vector[i] =="" || vector[i] == null || vector[i].isNaN || vector[i] == undefined){ arr[i] = 0; }
				else { arr[i] = parseFloat(vector[i])}
			} catch(error){
	
				console.log(error)
			}
		}
		entrada.value = arr;
		return	arr 
		
	}
}



function jacobi(numEcuaciones, matrizA, matrizB, vectorXInicial, epsilon, maxIteraciones, numiteramostrar){		//Implementacion del algoritmo de Jacobi
    
    /* Utiliza elementos del documento html para mostrar los resultados finales y en cada iteracion.
     * Asume una matriz cuadrada diagonalmente dominante
     * */        
    
    var textJacobi = document.getElementById("jacobi")
    var textResultados = document.getElementById("resultadositer")
        
    var vectorXResultado = new Array(numEcuaciones);
    vectorXResultado = [0]
    var iteraciones = 1;
    while (iteraciones <= maxIteraciones) {    // Limita el numero de iteraciones en caso de no conseguir una solucion
        
        let fila = 0;        
        while (fila < numEcuaciones) {
            let suma = 0;
            let columna = 0;
            while (columna < numEcuaciones ) {
                if (columna !== fila){
                 
                    suma += vectorXInicial[columna] * matrizA[fila][columna]
   
                }
                columna++;            
            }
            vectorXResultado[fila] = ((matrizB[fila]-suma)/matrizA[fila][fila]);	// Calcula el posible valor solución
            fila++;
        }    
        
        let aproximados = 0;
        for (let i = 0; i < vectorXResultado.length; i++){
            let errorAprox = Math.abs(vectorXResultado[i] - vectorXInicial[i])		
            if (errorAprox > epsilon) break;		//Verifica si el vector solucion es lo suficientemente preciso
            aproximados++;
            if (aproximados == numEcuaciones) {
				
				
                //IMPRIME RESULTADOS EN LA PAGINA
                textResultados.innerText = "__ MÉTODO JACOBI __";
                textResultados.innerText += `\nVector Solución obtenido en ${iteraciones-1} iteraciones:`
                vectorXResultado.forEach((xres,idx) => {
					let subindice = "\\u208"+ (idx+1).toString()
                    textResultados.innerText += "\n" +`X${eval("'"+subindice+"'")}`+" =\t "+ xres.toFixed(4)    
                });
                console.log (`Vector Solucion obtenido en ${iteraciones} iteraciones:\n${vectorXResultado}`)
                return vectorXResultado;
            }
        }
        
        if (iteraciones <= numiteramostrar){
            
            console.log (`Vector Solucion obtenido en ${iteraciones} iteraciones:\n(${vectorXResultado.map( x => {return x.toFixed(4)})})\n`)
            if (iteraciones <= 1) textJacobi.innerText = "";
            textJacobi.innerText +=`Iteración ${iteraciones}:\n(${vectorXResultado.map( x => {return x.toFixed(4)})})\n`
            
        }
        
        vectorXInicial = vectorXResultado.slice();
        iteraciones++;

    }

    alert("No se alcanzó la convergencia!")

    console.log ("No se alcanzo la convergencia!")
    console.log (`La ultima aproximacion al vector solucion obtenida en ${iteraciones} iteraciones:\n${vectorXResultado}`)
    textJacobi.innerText += `\nLa ultima aproximacion al vector solución obtenida en ${iteraciones-1} iteraciones:`
                vectorXResultado.forEach((element,idx) => {
					let subindice = "\\u208"+ (idx+1).toString()
                    textJacobi.innerText += "\n" +`X${eval("'"+subindice+"'")}`+" =\t "+ element.toFixed(4)    
                });
	
    return new Array(numEcuaciones);

}


function gaussSeidel(numEcuaciones, matrizA, matrizB, vectorXInicial, epsilon, maxIteraciones, numiteramostrar){  // Implementacion del Algoritmo de Gauss-Seidel

     /* Utiliza elementos del documento html para mostrar los resultados finales y en cada iteracion.
     * Asume una matriz cuadrada diagonalmente dominante
     * */
     
    var vectorXResultado = new Array(numEcuaciones);
    vectorXResultado = [0]
    var iteraciones = 1;
    var textGauss = document.getElementById("gauss")
    var textResultados = document.getElementById("resultadositer")
    
      while (iteraciones <= maxIteraciones) {
        
        let fila = 0;        
        while (fila < numEcuaciones) {
            let suma1 = 0;		// De acuerdo al algoritmo se requieren dos variable para las sumatorias
            let suma2 = 0
          
            for (let columna = 0; columna <= fila-1; columna++){
                suma1 += (vectorXResultado[columna]*matrizA[fila][columna])
            }

            for (let columna = fila+1; columna < numEcuaciones; columna++){
                suma2 += (vectorXInicial[columna]*matrizA[fila][columna])
            }
            vectorXResultado[fila] = ((matrizB[fila]-suma1-suma2)/matrizA[fila][fila]);		// Vector solucíon obtenido mejorando en cada ciclo
            fila++;
        }    
        
        let aproximados = 0;
        for (let i = 0; i < vectorXResultado.length; i++){
            let errorAprox = Math.abs(vectorXResultado[i] - vectorXInicial[i])
            if (errorAprox > epsilon) break;
            aproximados++;
            if (aproximados == numEcuaciones) {

                //IMPRIME RESULTADOS EN LA PAGINA
                textResultados.innerText += "\n\n__ MÉTODO GAUSS-SEIDEL __";
                textResultados.innerText += `\nVector Solución obtenido en ${iteraciones-1} iteraciones:`
                vectorXResultado.forEach((xres,idx) => {
					let subindice = "\\u208"+ (idx+1).toString()
                    textResultados.innerText += "\n" +`X${eval("'"+subindice+"'")}`+" =\t "+ xres.toFixed(4)    
                });
                console.log (`Vector Solucion obtenido en ${iteraciones} iteraciones:\n${vectorXResultado}`)
                return vectorXResultado;
            }
        }
        
        if (iteraciones <= numiteramostrar){
            
            console.log (`Vector Solucion obtenido en ${iteraciones} iteraciones:\n(${vectorXResultado.map( x => {return x.toFixed(4)})})\n`)
            if (iteraciones <= 1) textGauss.innerText = "";
            textGauss.innerText +=`Iteración ${iteraciones}:\n(${vectorXResultado.map( x => {return x.toFixed(4)})})\n`
           
        }
    
        
        vectorXInicial = vectorXResultado.slice();
        iteraciones++;
  
      }
  
      alert("No se alcanzó la convergencia!")
  
      console.log ("No se alcanzo la convergencia!")
      console.log (`La ultima aproximacion al vector solucion obtenida en ${iteraciones} iteraciones:\n${vectorXResultado}`)
      textGauss.innerText += `\nLa ultima aproximacion al vector solucion obtenida en ${iteraciones-1} iteraciones:`
                  vectorXResultado.forEach((element,idx) => {
					let subindice = "\\u208"+ (idx+1).toString()
                    textGauss.innerText += "\n" +`X${eval("'"+subindice+"'")}`+" =\t "+ element.toFixed(4)    
                  });

    return new Array(numEcuaciones);
        
}

//========================  MAIN  function ============================

var crearmatriz = document.getElementById("crearMatriz");
crearmatriz.addEventListener("click", ()=>{crearInputMatriz();});

var calcular = document.getElementById("calcular");
calcular.addEventListener("click",						// Ejecuta las funciones al hacer click en el boton "Calcular"
() => {

   
//================ Elementos de entrada/salida de datos en documento html ====================

    var inputNumEc = document.getElementById("numecuaciones");
    var numeroEcuaciones = parseInt(inputNumEc.value);

    var inputVectorInicial = document.getElementById("vectorinicial");
    var vectorInicial = crearVectorInicial(inputVectorInicial, numeroEcuaciones);
    
    var inputmaxIteraciones = document.getElementById("maxiteraciones");
    var maxIteraciones = parseInt(inputmaxIteraciones.value);
   
    var inputepsilon = document.getElementById("epsilon");
    var epsilonPrecision = Math.pow(10,parseInt(inputepsilon.value));

    var inputnumiteramostrar = document.getElementById("numiteramostrar");
    numIteraciones = parseInt(inputnumiteramostrar.value)
    
    var textResultados = document.getElementById("resultadositer")
    textResultados.innerText = ""
    
    var textJacobi = document.getElementById("jacobi")
    textJacobi.innerText = ""
    
    var textGauss = document.getElementById("gauss")
    textGauss.innerText = ""
 // ===================================================

    var matrizAOriginal = crearMatrizCuadrada(numeroEcuaciones)
    var matrizSolucion = crearMatrizB(numeroEcuaciones)

    if (matrizDominante(numeroEcuaciones,matrizAOriginal)) {
    
        resultadoJacobi = jacobi(numeroEcuaciones, matrizAOriginal, matrizSolucion, vectorInicial, epsilonPrecision, maxIteraciones, numIteraciones);
        console.log(resultadoJacobi)
        resultadoGauss = gaussSeidel(numeroEcuaciones, matrizAOriginal, matrizSolucion, vectorInicial, epsilonPrecision, maxIteraciones, numIteraciones);
        console.log(resultadoGauss)
    
    } else { 
        matrizOrdenada = ordenarMatrizDominante( numeroEcuaciones, matrizAOriginal, matrizSolucion)
        console.log("MATRIZ ORDENADA!\n")
        resultadoJacobi = jacobi(numeroEcuaciones, matrizOrdenada.mA, matrizOrdenada.mB, vectorInicial, epsilonPrecision, maxIteraciones, numIteraciones);
        console.log(resultadoJacobi)
        resultadoGauss = gaussSeidel(numeroEcuaciones, matrizOrdenada.mA, matrizOrdenada.mB, vectorInicial, epsilonPrecision, maxIteraciones, numIteraciones);
        console.log(resultadoGauss)
    
    }

});



















