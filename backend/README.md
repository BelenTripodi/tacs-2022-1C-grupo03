# tacs-2022-1C-grupo03

## Cómo correr la app en un contenedor

### Paso 1 - Build
Asegurarse de tener el .jar generador en 
```bash
/build/libs/demo-0.0.1-SNAPSHOT.jar
```
Si no está, correr
```bash
gradle build
```
o usando el build de intellij.

Para comprobar que esté el build hecho se puede o bien revisar la carpeta o correr
```bash
java -jar build/libs/demo-0.0.1-SNAPSHOT.jar
```

### Paso 2 - Crear la imagen
Correr
```bash
docker build --tag app .
```

### Paso 3 - Correr el contenedor
```bash
docker run -p 8080:8080 app
```

### Paso 4 - Acceder desde el navegador

[http://localhost:8080/some_resource](http://localhost:8080/some_resource)
