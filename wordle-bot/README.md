# UwUordle

Un timido bot para hacer de cliente a la aplicacion de TACS  **uwu**

## Comandos

### Sesion
1. /login <username> <password> : te logea en la aplicacion para poder usar el resto de los comandos.
2. /logout


### Diccionario
1. /dictionary <language> <word> : Busca la palabra en el diccionario segun el lenguaje ingresado.

*Restricciones*:
- Language: ('spanish', 'english')

### Modo ayuda
1. /newgame <language>: este comando indica que el usuario esta comenzando una nueva partida de wordle, en el idioma indicado. El bot crea un registro de los intentos realizados por el usuario.
2. /help <string>,<coloresDeCadaCaracter> : Cabe aclarar que el comando solo tiene un argumento, es un string entero separado por una coma ( ',' ). *string* representa la jugada realizada. *coloresDeCadaCaracter* es un string donde cada caracter representa el **color** del caracter de *string* en el mismo indice. Abajo se demuestra un ejemplo de uso

*Restricciones*:
- Colores: ('y','g','n'), donde 'y'=yellow. 'g'=green y 'n'='null' o el color gris.
- Ambas partes del string deben tener una longitud de 5 caracteres

Ejemplo: 

Si mi jugada fue la siguiente: 
* Letra a - color gris
* Letra b - color gris
* letra c - color verde
* letra d - color amarillo
* letra e - color gris
Si quiero pedir ayuda al bot, tendré que ejecutar **/help abcde,nngyn**

El bot ira guardando los intentos realizados, por cada usuario que se encuentre jugando, para poder hacer las request al backend.


1. /endgame : termina la partida actual. El bot borra el registro de intentos y el jugador puede empezar otra partida si asi lo desea.

### Daily score

Para hacer la carga de los resultados de tus partidas diarias, podes usar el siguiente comando

/dailyscore <score> <language>

*Restricciones*:

0<=**score**<=6


### Torneos

Para otra iteracion