<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en Modo Desarrollo (local)

1. Clonar el repositoriio
2. Ejecutar
```
yarn install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```


4. Levantar la base de datos
```
docker-compose up -d
```
5. Clonar el archivo ```.env.template``` y renombrar la copia  a ```.env```

6. Llenar las variables de entorno dfinidas  en el ```.env```

7. Ejecutar la aplicacion  en dev:
````
yarn stary:dev
````

8. Reconstruir la Bd con la semilla
```
localhost:3000/api/v2/seed
```
# Production Build

1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de produccion
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
````
4. Correr la imagen ejecutamos
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up

``` 


# Notas

Heroku redeploy con cambios:
```
git add .
git commit -m "cambios a giardar"
git push heroku <master|main>
```
Heroku redeploy sin cambios:
```
git commit --allow-empty -m "tigger Heroky deploy"
git push heroku <master|main>
```


## Stack usado
* Mongo Db
* Nest
* Heroku
* Docker