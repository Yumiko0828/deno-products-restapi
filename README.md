# Deno products Rest API

Una API REST de productos con las operaciones básicas de Crear, Leer, Actualizar y Eliminar (CRUD) productos. Utilizando TypeScript con [Deno](https://deno.com/runtime) y [MongoDB](https://www.mongodb.com/).

# Configuración

Para empezar a probar este proyecto, clonalo localmente utilizando Git:

```bash
git clone https://github.com/Yumiko0828/deno-products-restapi.git
```

Para poder ejecutar el proyecto debes tener instalado Deno, caso contrario puedes mirar la [documentación](https://deno.com/manual@v1.34.3/getting_started/installation). Finalmente abre una nueva terminal y ejecuta el siguiente comando:

```bash
deno -V # Muestra por consola tu versión de Deno instalada.
```

Para configurar MongoDB, crea el archivo `.env` y dentro coloca lo siguiente:

> Esto es solo para entornos de desarrollo, más no de producción.

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<host_url>/<db_name>?authMechanism=SCRAM-SHA-1
```

No de olvides de reemplazar lo que este entre `< >` por las credenciales de tu base de datos.

# Ejecución

Deno tiene soporte para TypeScript por defecto, por lo que no es necesario compilar código como en Node.js.

### Para producción:

```bash
deno task start
```

### Para desarrollo:

```bash
deno task dev
```

# Licencia

Este proyecto esta bajo la [Licencia MIT](https://github.com/Yumiko0828/deno-products-restapi/blob/main/LICENSE).
