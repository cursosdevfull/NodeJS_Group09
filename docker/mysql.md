# MySQL

### Crear un contenedor

```
docker run -d --name mysqlserver -p 5200:3306 -e MYSQL_ROOT_PASSWORD=12345 mysql:8
```

### Crear un volumen nombrado

```
docker volume create <nombre del volumen>
```

### Listar volúmenes

```
docker volume ls
```

### Eliminar volumen

```
docker volume rm <nombre del volumen>
```

### Crear un contenedor con un volumen nombrado

```
docker run -d --name mysqlserver -p 5200:3306 -e MYSQL_ROOT_PASSWORD=12345 -v vol-nodejs09:/var/lib/mysql mysql:8
```

### Para inspeccionar un volumen

```
docker volume inspect vol-nodejs09
```

### Crear un contenedor con un volumen nombrado y con una política de reinicio en caso de falla

```
docker run -d --name mysqlserver -p 5200:3306 -e MYSQL_ROOT_PASSWORD=12345 -v vol-nodejs09:/var/lib/mysql --restart on-failure mysql:8
```

_restart: on-failure, unless-stopped, always_

### Crear un contenedor con un volumen nombrado, con una política de reinicio en caso de falla y con límites de memoria y cpu

```
docker run -d --name mysqlserver -p 5200:3306 -e MYSQL_ROOT_PASSWORD=12345 -v vol-nodejs09:/var/lib/mysql --restart on-failure -m 500m --cpus=2 mysql:8
```

### Para revisar las estadísticas de uso de un contenedor

```
docker stats <nombre contenedor>
```
