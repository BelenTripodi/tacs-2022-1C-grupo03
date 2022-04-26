# tacs-2022-1C-grupo03

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

### Paso 3 - Acceder desde el navegador

[http://localhost:8080/some_resource](http://localhost:8080/some_resource)