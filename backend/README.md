# tacs-2022-1C-grupo03


##Documentación Swagger

http://localhost:8080/swagger-ui/index.html

## Cómo correr la app en un contenedor

### Paso 1 - Crear la imagen
Correr
```bash
docker build --tag app .
```

### Paso 2 - Correr el contenedor
```bash
docker run -p 8080:8080 app
```

### Paso 3 - Acceder desde mediante login - signup

Si ya se cuenta con usuario: [http://localhost:8080/login](http://localhost:8080/login).


Creación de usuario: [http://localhost:8080/signup](http://localhost:8080/signup)

