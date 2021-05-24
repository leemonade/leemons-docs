# leemons

Leemons es el paquete principal de la aplicación, desde este se inicializan el resto de paquetes y librerías necesarias, se levanta el servidor y se compila el Frontend.

## CLI

Para hacer más sencillo el uso de leemons, hemos incluido una CLI (Interfaz de Línea de Comandos), esta consta de dos comandos.

### Comandos

`$ leemons start`: Inicia la aplicación en modo producción.

Cuando inicias la app en modo producción, puedes usar leemons con todas sus funcionalidades, pero la app no detectará los cambios hasta que se reinicie el proceso.

En modo producción, también se instalan las dependencias y se compila el Frontend (si no está compilado).

`$ leemons dev`: Inicia la aplicación en modo desarrollo.

Cuando inicias la app en modo desarrollo, se inicia la app por partes, en primera instancia se inicia un proceso que escuchará los cambios principales en la app, este proceso a su vez, inicia otro que tendrá la aplicación en sí.

Proceso Maestro:

- Escucha los cambios en los paquetes core
- Escucha los cambios en la configuración de la app
- Cuando hay cambios reinicia los procesos dependientes (workers)

Proceso Worker:

- Inicializa la configuración de la aplicación
- Escucha los cambios en el Frontend e inicia el servicio de Front (copia los archivos e inicia el modo desarrollo de [Next.js](https://nextjs.org/))
- Escucha los cambios en el Backend e inicia el servicio de Back.

De esta forma, se consigue optimizar al máximo el tiempo de espera entre los cambios y la actualización de la app.

## App

La aplicación consta de tres partes: configuración, Frontend y Backend, cada una de ellas, se inicia mediante la `clase Leemons`.

En la instanciación de la clase, se crea un servidor de [Koa.js](https://koajs.com/) y dos [Koa-Router](https://www.npmjs.com/package/koa-router) (uno para la app en general y otro para Backend). A continuación, es necesario cargar la configuración mediante el método `leemons.loadAppConfig`, la cual será usada tanto en la carga del Front como en la del Back.

Una vez está cargada la configuración de la app, es necesario cargar la configuración de los diferentes plugins, para ello, dispones del método `leemons.loadPluginsConfig`, pudiendo así, a continuación, comenzar a cargar el Back y el Front.

Ahora que toda la configuración está cargada, puedes cargar tanto el Back como el Front, es indiferente que servicio cargues antes, incluso los puedes cargar a la vez: `leemons.loadBack` y `leemons.loadFront`. Ahora está todo cargado y puedes iniciar la app con el método `leemons.start` (no sin antes indicar que todo está cargado `leemons.loaded = true`).

Si no quieres preocuparte en cómo se inicia la app por dentro, puedes optar por el método `leemons.load` que hará todos estos pasos por ti, o simplemente `leemons.start` que detectará que todavía no se ha cargado la app y la cargará antes de iniciarla.

### Configuración

La configuración de la app es realizada con el método `leemons.loadAppConfig`, el cual carga todos los archivos JavaScript y JSON en la carpeta de configuración.

::: tip CONSEJO
La carpeta de configuración se puede cambiar mediante la variable de entorno `CONFIG_DIR`, por defecto será `/config/`.
:::

Puedes encontrar la configuración en `leemons.config`, siguiendo la estructura de la carpeta de configuración:

`configDirectory/database.js` -> `leemons.config.database`

`configDirectory/config.json` -> `leemons.config.config`

::: tip INFO

El objeto de configuración es un ConfigProvider, el cual tiene los siguientes métodos auxiliares:

```js
get: (clave, valorPorDefecto) => lodash.get(config, clave, valorPorDefecto),
has: (clave)                  => lodash.has(config, clave),
set: (clave, valor)           => lodash.set(config, clave, valor)
```

[Lodash documentation](https://lodash.com/docs/)
:::

### Servicio de Backend

El servicio de Backend es el encargado de administrar el servidor, la aplicación y la base de datos. Lo primero que sucede es la carga de los modelos, una vez todos estén cargados, se procede a inicializar el [administrador de la base de datos](../leemons-database/#database-manager) (guardado en `leemons.db`), a continuación, se crea el esquema especificado en la base de datos y finalmente se inicializa el modelo del ORM usado en el [conector](../leemons-database/#conectores) instalado.

El punto de entrada al Backend es la API, esta es accesible mediante el endpoint `https://{url}/api/{endpoint}`. Exponiendo así los diferentes [controladores](#controladores) y [servicios](#servicios).

### Servicio de Frontend

El servicio de Frontend se encarga en primera instancia de recolectar todos los archivos necesarios para cargar la web, además instala las dependencias necesarias y compila la versión final, este servicio depende de [Next.js](https://nextjs.org/), obteniendo así Server-Side Rendering (Renderizado en el servidor) y páginas estáticas.

### Modelos

Los modelos son la unidad básica de un esquema de la base de datos. Son objetos JSON interpretados en una estructura más sencilla:

1. Todos los campos son completados con un modelo por defecto:

::: details Mostrar el modelo por defecto

```js
const defaultModel = {
  modelName: name,
  connection: leemons.config.get('database.defaultConnection'),
  collectionName: name,
  info: {
    name,
    description: ''
  },
  options: {
    useTimestamps: false
  },
  attributes: {},
  primaryKey: {
    name: 'id',
    type: 'int'
  },
  type: 'collection',
  target: 'global'
};
```

:::

2. Los nombres se estandarizan para evitar duplicados.

::: details Ver guía de estandarización
Todos los modelos son almacenados en `leemons` bajo una propiedad basada en el nombre del modelo.

Por ejemplo: Tienes un plugin llamado `user-administration`, estos modelos se guardan en:
`leemons.plugins.user-admin.models` y los nombres de tus modelos y colecciones se transforma en: `plugins_user-administration::NombreOriginal`.

:::

3. Los datos son estructurados

::: details Ver estructura

```js
const model = {
  connection,
  modelName,
  type,
  target

  schema: { // Usado en la creación del modelo y el esquema (conector)
    collectionName,
    options,
    attributes,
    primaryKey
  }

  allAttributes: { // Usado en los constructores de consultas (queries)
    // Todos los atributos que no son relaciones muchos-a-muchos
  }
}
```

:::

::: warning Nota
Se puede encontrar más información en un modelo final como resultado de un conector.
:::

## Plugins

Leemons funciona mediante plugins, estos son una extensión de código, permitiendo añadir más funcionalidad al Frontend o al Backend. Crear un plugin es súper sencillo, tan solo necesitarás seguir una estructura y el resto hacerlo como siempre.

Los plugins pueden ser instalados de dos formas, la primera de todas es con [NPM](npmjs.com); deben ser paquetes de NPM cuyo nombre sea `leemons-plugin-{NOMBRE_DEL_PLUGIN}`. La segunda forma es creando una carpeta dentro del directorio de plugins con el nombre del mismo.

Un plugin dependiendo de los servicios que extienda, debe contener unas carpetas u otras. Las funcionalidades que puede añadir un plugin son controladores, servicios, modelos y Frontend.

::: tip INFO
Todo el código de los plugins es ejecutado en un entorno seguro y no dispone de acceso al process.env de la aplicación, pero si al especificado en el .env del plugin.

Este archivo es ejecutado por Leemons en busca de un JSON
:::

### Controladores

Los controladores son un conjunto de funciones encargadas de atender una petición a la API, estas funciones tienen asociadas un endpoint (ruta de la API) y un método (GET, POST, DELETE...) al que atender.

Los controladores deben estar definidos en la carpeta de controladores, especificada en la configuración del plugin (por defecto es `/plugin/controllers/`), en su interior, un archivo `routes.js` o `routes.json` especificando los diferentes endpoints, junto a este, cada uno de los controladores `controlador.js`.

**¿Cómo definir un endpoint?**

Dentro del archivo `routes` se debe declarar un array atendiendo a la ruta, método y controlador:

```json
[
  {
    "path": "/user", // Recibe las peticiones del endpoint `POST /user`
    "method": "POST",
    "handler": "users.register" // Resuelve la petición con la función register del archivo `controllers/users.js`
  },
  {
    "path": "/user/:id", // Recibe las peticiones del endpoint `GET /user/:id`
    "method": "GET",
    "handler": "users.userInfo" // Resuelve la petición con la función userInfo del archivo `controllers.users.js`
  }
]
```

::: warning Atención
La ruta especificada no será el endpoint real, si no, que esta resolverá a lo siguiente: `/api/{NOMBRE_DEL_PLUGIN}/{RUTA_ESPECIFICADA}`
:::

**¿Cómo debe de ser la función controladora?**

La función del controlador, debe de ser la misma que usarías en KOA.js, esta recibirá un [Contexto](https://koajs.com/#context) con toda la información de la petición.

::: warning Middlewares
Actualmente un plugin no puede añadir middlewares, pero estamos trabajando en ello :D

:::

### Servicios

Los servicios son un conjunto de funciones al igual que los controladores, pero destinadas a uso general, por ejemplo, una función auxiliar que envíe un correo electrónico o una función auxiliar que calcule la nota final de curso.

Los servicios deben ser un archivo JavaScript descrito en la carpeta de servicios (por defecto `/services/`) y se almacena en `leemons.plugins.{NOMBRE_DEL_PLUGIN}.services.{NOMBRE_DEL_ARCHIVO}`. El contenido de este archivo es cargado en un entorno seguro (pero no se ejecuta si tu no lo haces, pudiendo exportar cualquier tipo de dato).

### Modelos

Un plugin puede necesitar usar la base de datos, para ello, puede crear [modelos](), estos son JSONs o JavaScripts en la carpeta de modelos (por defecto `/models/`).

Los modelos especificados, se pueden acceder mediante `leemons.plugins.{NOMBRE_DEL_PLUGIN}.models.{NOMBRE_DEL_MODELO}` o mediante `leemons.query({NOMBRE_DEL_MODELO})`.

### Frontend

Extender el Frontend es el proceso más sencillo, pues funciona como una app de Next.js a pequeña escala en la carpeta del Front (por defecto `/next/`).

Si quieres crear una nueva página, créala en `/{CARPETA_DE_FRONT}/pages/` y al iniciar la app, la página estará creada en `/{CARPETA_DE_NEXT}/pages/{NOMBRE_DEL_PLUGIN}/`.

El resto de archivos créalos dentro de la carpeta `src` y podrás importarlos con: `import {} from '@{NOMBRE_DEL_PLUGIN}/{RUTA_DESDE_SRC}'`.
