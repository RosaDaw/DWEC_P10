/*****************************************************************************************

classes.js

******************************************************************************************/

//Constructor de la classe classTabla
//objetoPadre
//nomTabla
//filas
//columnas
//texto
function classTabla(objetoPadre, nomTabla, filas, columnas, texto) {
	
	//Propietats de la classe classTabla	
	this.objTabla = document.createElement("table"); //Es crea l'HTML per la taula	
	this.objPadre = objetoPadre; //pare on s'afegirà la taula com a fill	
	this.numFilas = filas;
	this.numColumnas = columnas;
	//this.textoInicial = texto;
	
	//Mètodes de la classe classTabla		
	
	//Mètode que inserta una fila
	//numFila: A partir de quina fila s'inserta
	//textP: text que es posará en les cel·les
	this.insertaFila = function(numFila, textoP) {	
		
		if (this.numFilas >= 0 && numFila <= this.numFilas) {	
			var fila = this.objTabla.insertRow(numFila); //inserta fila
			var celda = {}; //variable pel bucle d'inserció de cel·les
			
			//insert les cel·les de la fila segons el número de columnes
			for (var i=0;i < this.numColumnas; i++) {
				celda = fila.insertCell(i);
				celda.innerHTML = textoP;
			}
			this.numFilas = this.objTabla.rows.length;
							
			return true; //tot ha anat bé
		} else {
			return false; //numFila és fora de rang	
		}
	
	}
	
	//Mètode que inserta moltes file
	//numFila: A partir de quina fila s'inserta
	//nRep número de files a insertar
	//textP: text que es posará en les cel·les
	this.insertaFilas = function(numFila, nRep, textoP) {	
		
		for (var i = 0; i < nRep; i++)	
			this.insertaFila(numFila, textoP);
	
	}
	
	//Mètode que inserta una columna
	//numFila: número fila on s'inserta
	//texto: texte que es posarà en les cel·les de la fila insertada
	//Retorna true si columna ben insertada, false en cas contrari
	this.insertaColumna = function (numColumna, texto) {
		if (numColumna >=0 && numColumna <= this.numColumnas) {	
		
			var celda = {}; //variable pel bucle d'inserció de cel·les
			
			//insert les cel·les de la fila segons el número de columnes
			for (var i=0;i < this.numFilas; i++) {
				celda = this.objTabla.rows[i].insertCell(numColumna);
				celda.innerHTML = texto;

			}
			this.numColumnas = this.objTabla.rows[0].cells.length;
			
			return true;
	    } else {
			return false;	
		}
	}
	
	//Mètode que esborra la columna en numColumna
	//numColumna: número columna on s'esborrarà
	this.borraColumna = function (numColumna) {

		//Comprovar que la columna a esborrar estigui enre 0 i el nombre de columnes
		if (numColumna >= 0 && numColumna < this.numColumnas) {
			for (var i = this.numFilas - 1; i >= 0; i--) {
			  this._borraCelda(i, numColumna);
			  this.numColumnas = this.objTabla.rows[0].cells.length;
			}
			return true;
		} else {
			return false;	
		}
	}

	//Mètode interna que esborra una cel·la
	//és privada, tot i que això no es pot definir en JS
	//no fer servir tota sola perquè desquadra this.numFilas i this.numColumnas
	this._borraCelda = function (numFila, numColumna) {
	
		//Comprovar que la fila estigui enre 0 i el nombre de columnes	
		//i que la columna estigui enre 0 i el nombre de columnes
		if (numFila >= 0 && numFila < this.numFilas &&
				numColumna >= 0 && numColumna < this.numColumnas) {
			  this.objTabla.rows[numFila].deleteCell(numColumna);
			  return true;	
		} else {
			return false;	
		}
	}

	//Mètode que esborra la fila en numFila
	//numFila: número fila on s'esborrarà
	this.borraFila = function (numFila) {

		//Comprovar que la fila a esborrar estigui enre 0 i el nombre de files
		//No deix esborrar capçaleres
		if (numFila >= 0 && numFila < this.numFilas) {
			//this.objTabla.deleteRow(numFila);
			this.objTabla.tBodies[0].deleteRow(numFila);
			this.numFilas = this.objTabla.rows.length;
			return true;
		} else {
			return false;	
		}
	}

	//Mètode que canvia el contingut d'una cel·la
	//numFila: número fila de la cel·la
	//numColumna: número columna de la cel·la	
	this.cambiaCelda = function (numFila, numColumna, texto) {
		if (this.objTabla.tBodies[0].rows[numFila].cells[numColumna].innerHTML = texto) {
			return true;
		} else {
			return false;
		}
		
	}
	
	//Mètode que canvia totes les cel·les de la taula per texto
	//texto: text que es posarà dins les cel·les
	this.cambiaCeldasTabla = function (texto) {
	
		for (var i = 0; i < this.numFilas; i++) {
			for (var j = 0; j < this.numColumnas; j++) {
				if (!this.cambiaCelda(i, j, texto)) {
					return false;
				}
			}
		}
		return true;
	}
	//Inicialitzar l'objecte
	
	//Mètode que canvia el color de fons de la taula per pColor
	//pColor: color
	this.cambiaFondo = function (pColor) {
		this.objTabla.style.backgroundColor = pColor;		
	}

	//Inicialitzar l'objecte
	this.objTabla.id = nomTabla;
	
	//insertar com a primer element del body;
	this.objPadre.insertBefore(this.objTabla,this.objPadre.childNodes[1]);
	//this.objPadre.appendChild(this.objTabla);//afegeix la taula al final del body
	//crear la taula inicial això com s'ha especificat en el constructor	
	this.insertaFilas(0, this.numFilas, texto);
	
}
