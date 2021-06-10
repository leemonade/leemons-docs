# leemons-database

leemons-database es un paquete para la estandarización de todo lo relacionado a las bases de datos. Administra las conexiones, consultas y modelos, además, utiliza los conectores que especifiques para comunicarse con las diferentes bases de datos.

## Conectores

Los conectores son paquetes que transforman la información estandarizada en instrucciones específicas para un ORM.

Por ejemplo, un conector es capaz de traducir una consulta de leemons en una consulta SQL, igual con los modelos, que los transforma en una tabla SQL.

::: danger CONVENCIÓN DE NOMENCLATURA

Todos los conectores deben de llamarse de la siguiente forma: `leemons-connector-NOMBRE_CONECTOR`.
:::

Ningún conector viene instalado por defecto, por lo que necesitarás instalar tu favorito dependiendo de la base de datos que vayas a utilizar:

:::: tabs type:border-card
::: tab yarn

```bash
yarn add leemons-connector-NOMBRE_CONECTOR
```

:::
::: tab npm

```bash
npm install leemons-connector-NOMBRE_CONECTOR
```

:::
::::

## Database Manager

El Database Manager es el punto de entrada a este paquete, contiene un [Registro de Conectores](#registro-de-conectores), el cual inicializa cada conexión contra las diferentes bases de datos definidas.

El Database Manager también es el responsable de contruir las consultas y administrar los diferentes conectores.

::: tip CONSEJO
Puedes acceder al Database Manager desde `leemons.db`.
:::

## Registro de Conectores

El Registro de Conectores es una función auxiliar que permite administrar todos los conectores, te provee de los siguientes métodos:

:::: tabs

::: tab load

`load`

Registra los diferentes conectores que utiliza cada conexión en `connectorRegistry.connectors`.

El Registro importa cada conector para usarlo cuando sea requerido.

```js
connectorRegistry.connectors.load();
```

::: warning RECUERDA
Debes de tener instalados los conectores que uses.
:::

::: tab init
`init`

El Registro llama a la función de inicialización de cada conector y guarda el modelo resultante en `databaseManager.models`.

Los modelos del ORM no deben de ser accesibles, y son guardados en `leemons.db.models` de forma privada.

```js
connectorRegistry.connectors.init();
```

:::
::: tab getAll
`getAll`

Obtiene un array con todos los conectores.

```js
connectorRegistry.connectors.getAll();
```

:::

::: tab get
`get`

Obtiene el objeto del conector especificado.

```js
connectorRegistry.connectors.get('nombre del conector');
```

:::

::: tab getFromConnection
`getFromConnection`

Obtiene el conector usado en la conexión especificada.

```js
connectorRegistry.connectors.getFromConnection('nombre de la conexión');
```

:::

::: tab default
`default`

Obtiene el conector usado en la conexión por defecto.

```js
connectorRegistry.connectors.default;
```

:::

::: tab set
`set`

Establece el valor dado en `databaseManager.connector[clave dada]`.

```js
connectorRegistry.connectors.set('nombre del conector', nuevoValor);
```

::::

## Constructor de consultas

El constructor de consultas se encarga de reunir todas las consultas a un modelo en un mismo objeto, así como resolver el conector encargado de resolver dicha petición.

::: tip INFO
El constructor busca los modelos en `databaseManager.models`.
:::

Una vez se llama al constructor de consultas, genera un objeto con las posibles peticiones y lo guarda en cache para evitar volver a generarlo en próximas llamadas con el mismo modelo.

### Consultas

Las consultas son la única manera de interactuar con la base de datos, estas son una estandarización de las instrucciones propias de los motores de base de datos, estas son posteriormente interpretadas por los conectores.

::: warning ATENCIÓN

Otro tipo de consultas pueden existir dependiendo de tu conector.
Actualmente no se pueden ejecutar consultas personalizadas pues supone una vulnerabilidad a la base de datos.
:::

Las consultas provistas pueden variar dependiendo de tu conector, consulta la documentación de tu conector para más información.

::: tip consultas *Many
Las consultas \*many se ejecutan en transacciones, esto significa que si una consulta falla, el resto de consultas hacen rollback (vuelven al estado anterior).
:::

:::: tabs

::: tab create

`create`

Crea una nueva entrada en la base de datos con el objeto provisto. Una vez el objeto ha sido registrado, la promesa es resuelta con la nueva entrada en la colección. En caso de haber un error, la promesa es rechazada con este.

```js
leemons.query('usuarios').create({
 nombre: 'Jane',
 email: 'janedoe@leemons.io'
});
```

:::

::: tab createMany

`createMany`

Funciona igual que la consulta `create`, pero en lugar de recibir un objeto, requiere un array de objetos para crearlos en la colección, estas inserciones ocurren en una transacción.

Una vez todas las inserciones ocurren, un array con todos los objetos resuelve la promesa, si ocurre un error, la promesa es rechazada con el error devuelto por la base de datos.

```js
leemons.query('usuarios').createMany([
 { nombre: 'Jane', email: 'janedoe@leemons.io' },
 { nombre: 'John', email: 'johndoe@leemons.io' }
]);
```

:::

::: tab update

`update`

Actualiza una entrada ya existente dentro de la colección. Para indicar la entrada a modificar debes usar los [filtros](#filtros), a continuación describe los nuevos valores del objeto.

Una vez la entrada ha sido actualizada, la promesa es resuelta con el objeto actualizado. En caso de que suceda un error, la promesa es rechazada con este.

```js
leemons.query('usuarios').update(
 { id: 1 },
 { nombre: 'Janie' }
);
```

:::

::: tab updateMany

`updateMany`

También puedes actualizar varias entradas al mismo tiempo, para ello provee un filtro y los nuevos datos:

* Un [Filtro](#filtros) Para seleccionar la entrada a actualizar.
* Los nuevos valores de los objeto.

La actualización sucede en todos los elementos a la vez, cuando se completa la consulta, la promesa se resuelve con un json que indica el número de elementos actualizados `{ count: number }`, en caso de error, la promesa es rechazada con este.

```js
// Actualiza el apellido de ambos usuarios a 'Doe'
leemons.query('usuarios').updateMany({ id_$in: [1, 2] }, { apellido: 'Doe' });
```

:::

::: tab set

`set`

Habrá veces en las que necesites actualizar un elemento existenteo crearlo si no existe previamente, para ello `set` es muy útil. Funciona igual que la consulta `update`, pero en caso de no encontrar el elemento consultado, se creará uno nuevo con la información provista.

```js
// Si un usuario con el email 'janedoe@leemons.io' existe,
// actualiza su nombre a 'Jane Doe'.

// Si por el contrario, este no existe,
// crea un usuario cuyo nombre sea 'Jane Doe'.
// Los filtros iniciales son ignorados en la creación.
leemons.query('usuarios').set(
 { email: 'JaneDoe@leemons.io' },
 { nombre: 'Jane Doe' }
);
```

:::
::: tab delete

`delete`

Elimina la entrada que cumpla con los [filtros](#filtros), en caso de encontrar más de una, elimina tan solo la primera.

Una vez la entrada ha sido eliminada, la promesa es resuelta con un objeto vacío, si un error ocurre, la promesa es rechazada con este.

```js
leemons.query('usuarios').delete({ id: 1 });
```

:::

::: tab deleteMany

`deleteMany`

Funciona exactamente igual que `delete`, excepto que se quita la protección de eliminar un solo elemento.

Si los [filtros](#filtros) provistos seleccionan más de una entrada, todas ellas son eliminadas.

Una vez las entradas han sido eliminadas, la promesa es resuelta con un objeto que indica el número de elementos eliminados `{ count: number }`, si un error ocurre, la promesa es rechazada con este.

```js
leemons.query('usuarios').deleteMany({ nombre: 'Jane' });
```

:::

::: tab find
 `find`

Selecciona todas las entradas de la base de datos que cumplan con los [filtros](#filtros).

Cuando se encuentren resultados, la promesa será resuelta con un array con dichos resultados, si no, la promesa se resuelve con un array vacío.

Si ocurre un error, la promesa es rechazada con dicho error.

```js
leemons.query('usuarios').find({ nombre: 'Jane' });
```

:::

::: tab findOne
 `findOne`

La consulta `findOne` es la misma que `find`, solo que se añade el [filtro](#filtros) `$limit = 1`.

```js
leemons.query('usuarios').findOne({ nombre: 'Jane' });
```

:::

::: tab count
`count`

Devuelve el numero de elementos encontrados para los filtros aplicados.

```js
leemons.query('usuarios').count({ nombre: 'Jane' });
```

:::

::: tab transaction
`transaction`

Una transacción es una consulta compleja a la base de datos, en la cual se aseguran dos cosas:

* Todas las consultas descritas dentro de la transacción se van a ejecutar en la misma llamada.
* Ninguna consulta va a encontrar datos a medio manipular, es decir, cuando todavía no se hayan ejecutado todas las instrucciones o alguna haya fallado).

De esta forma, puedes asegurarte que no va a haber errores o datos inconsistentes en tu base de datos, puesto que si alguna consulta en la transacción falla, se hace un rollback; la base de datos vuelve al estado previo a la transacción.

La consulta `transaction` acepta una función como parámetro que se ejecutará en la transacción propia del ORM usado. Esta función recibe como parámetro la información de la transacción que deberás usar en las consultas en su interior. Si no utilizas este parámetro, la consulta no se ejecutará dentro de la transacción.

La transacción devuelve una promesa con los valores devueltos dentro de la función provista.

Consulta la documentación de tu conector para más información.

```js
// En la transacción el modelo es irrelevante.
leemons.query('usuarios').transaction(async (transacting) => {
   // Primero se crea un usuario dentro de la transacción.
   const usuario = await leemons.query('usuarios').create({
     nombre: 'Jane',
     email: 'janedoe@leemons.io'
   }, {transacting});
   // Si el usuario existe, se le asigna una nota dentro de la transacción
     await leemons.query('notas-usuarios').create({
       id_usuario: usuario.id,
       notas: NULL
     }. {transacting });
   // Se resuelve la promesa con la información del usuario
   return usuario;
});

// En caso de que la creación del usuario falle,
// la promesa será rechazada con el error.

// Si el usuario se crea correctamente pero no sus notas,
// entonces la promesa también será rechazada con el error
// y se volverá al estado anterior (el usuario no se crea).
```

No hace falta usar las transacciones para crear datos dependientes, también puedes hacer varias instrucciones sin relación.

```js
// Así funciona createMany por dentro.
leemons.query('usuarios').transaction(async (transacting) => {
 return Promise.all([
   leemons.query('usuarios').create({
     nombre: 'Jane',
     email: 'janedoe@leemons.io
   }, {transacting}),

   leemons.query('usuarios').create({
     nombre: 'John',
     email: 'johndoe@leemons.io
   }, {transacting})
 ])
});

// Si alguno de los dos usuarios no puede ser creado,
// la transacción hace rollback y ninguno de los dos se crea.

// Si ambos pueden ser creados, se devuelve un array con ambos usuarios.
```

:::

::::

### Filtros

Los filtros son una abstracción de la forma de seleccionar propia de un lenguaje de base de datos, de forma que estos no dependan de un lenguaje en concreto.

Los filtros están divididos en tres grupos fundamentales: [visualización](#visualizacion), [lógica](#logica) y [comparación](#comparacion).

#### Visualización

Con los filtros de visualización puedes modificar como se representan los datos.

:::: tabs

::: tab sort

`sort`

Puedes ordenar los datos obtenidos de forma ascendente o descendente en base a los diferentes campos. El ordenado se hace en el motor de base de datos, esto significa que el orden resultante puede variar dependiendo del conector que uses, así como del motor de la base de datos.

El filtro `$sort` acepta un valor en forma de string separado por comas con los diferentes campos y direcciones.

```js
leemons.query('users').find({ $sort: 'name:ASC, email:DESC' });
```

:::

::: tab offset

`offset`

En ciertas ocasiones necesitas saltarte algunos resultados, para ello se puede usar este filtro.

El filtro `$offset` acepta un valor numérico, también lo puedes usar como `$start`.

```js
// Se salta los primeros 10 resultados
leemons.query('usuarios').find({ $offset: 10 });
```

:::

::: tab limit

`limit`

Este filtro permite limitar el número de resultados que vamos a obtener.

`$limit` acepta un valor numérico.

```js
// Devuelve un máximo de 42 resultados
leemons.query('usuarios').find({ $limit: 42 });
```

:::

::::

#### Lógica

Los filtros de lógica sirven para aplicar los diferentes operadores lógicos a tus consultas.

:::: tabs

::: tab donde

`donde`

El filtro `$where` permite recoger los diferentes [filtros de comparación](#comparacion).

```js
// Selecciona al usuario cuyo id sea igual a 1
leemons.query('usuarios').find({
 $where: { id: 1 }
});
```

También puedes usar el filtro `$where` para aplicar la lógica de un `AND`.

```js
// Selecciona aquellos usuarios que estén en segundo y sean delegados
leemons.query('usuarios').find({
 $where: [
   { curso: '2' },
   { rol: 'delegado' }
 ]
});
```

:::

::: tab o

`o`

Puedes usar la instrucción `$or` para encontrar aquellas entradas que contengan unos valores u otros.

```js
// Selecciona aquellos usuarios que:
// sean de segundo y delegados
// o sean profesores
leemons.query('usuarios').find({
 $or: [
   { curso: '2', rol: 'delegado' },
   { rol: 'profesor' }
 ]
});
```

:::

::::

#### Comparación

:::: tabs

::: tab igual

`igual`

Busca aquellas entradas en la base de datos cuyos campos sean iguales a los especificados.

Simplemente indica los campos y sus valores (por ejemplo: `{ id: 1 }`)

```js
// Selecciona aquellos usuarios cuyo id sea 1 y su nombre 'Jane'
leemons.query('usuarios').find({ id: 1, name: 'Jane' });
```

:::

::: tab diferente

`diferente`

Selecciona aquellos usuarios cuyos campos no sean iguales a los especificados.

Para usarlo, especifica el nombre de la columna con el sufijo `_$ne`.

```js
// Encuentra aquellos usuarios cuyo rol no sea alumno
leemons.query('usuarios').find({ rol_$ne: 'alumno' });
```

:::

::: tab en

`en`

Este filtro sirve para evitar el uso redundante de or, de forma que puedas buscar aquellas entradas que tengan un campo con uno de los valores especificados.

Especifica el nombre de la columna con el sufijo `_$in`.

```js
// Selecciona aquello usuarios que sean alumnos o delegados
leemons.query('usuarios').find({ rol_$in: ['alumno', 'delegado'] });
```

:::

::: tab no en

`no en`

Este filtro es la negación del `_$in`, por lo cual, busca aquellos datos que no contengan los valores especificados.

Especifica el nombre de la columna con el sufijo `_$nin`.

```js
// Selecciona aquellos usuarios que no sean ni alumnos ni delegados.
leemons.query('usuarios').find({ rol_$nin: ['alumno', 'delegado'] });
```

:::

::: tab contiene

`contiene`

Selecciona aquellos datos cuyo campo especificado contenga el texto dado, este texto ignora las mayúsculas.

Especifica el nombre de la columna con el sufijo `_$contains`.

```js
// Selecciona aquellos usuarios cuyo nombre contenga una a.
leemons.query('usuarios').find({ nombre_$contains: 'a' });
```

:::

::: tab no contiene

`no contiene`

Selecciona aquellos datos cuyo campo especificado no contenga el texto dado, este texto ignora las mayúsculas.

Especifica el nombre de la columna con el sufijo `_$contains`.

```js
// Selecciona aquellos usuarios cuyo nombre no contenga una a.
leemons.query('usuarios').find({ nombre_$ncontains: 'a' });
```

:::

::: tab contiene estrictamente

`contiene estrictamente`

Busca aquellas entradas que contengan el texto especificado respetando las mayúsculas.

Especifica el nombre de la columna con el sufijo `_$containss`.

```js
// Selecciona aquellos usuarios cuyo nombre contenga una S mayúscula.
leemons.query('users').find({ name_$containss: 'S' });
```

:::

::: tab no contiene estrictamente

`no contiene estrictamente`

Busca aquellas entradas que no contengan el texto especificado respetando las mayúsculas.

Especifica el nombre de la columna con el sufijo `_$ncontainss`.

```js
// Selecciona aquellos usuarios cuyo nombre no contenga una S mayúscula.
leemons.query('users').find({ name_$ncontainss: 'S' });
```

:::

::: tab empieza por

`empieza por`

Selecciona aquellos datos cuyo campo especificado empieza por el texto dado, este texto ignora las mayúsculas.

Especifica el nombre de la columna con el sufijo `_$startsWith`.

```js
// Selecciona aquellos usuarios cuyo nombre comience con una a.
leemons.query('usuarios').find({ nombre_$startsWith: 'a' });
```

:::

::: tab no empieza por

`no empieza por`

Selecciona aquellos datos cuyo campo especificado no empiece con el texto dado, este texto ignora las mayúsculas.

Especifica el nombre de la columna con el sufijo `_$nstartsWith`.

```js
// Selecciona aquellos usuarios cuyo nombre no empiecen con una a.
leemons.query('usuarios').find({ nombre_$nstartsWith: 'a' });
```

:::

::: tab empieza estrictamente por

`empieza estrictamente por`

Busca aquellas entradas que empiecen con el texto especificado respetando las mayúsculas.

Especifica el nombre de la columna con el sufijo `_$startssWith`.

```js
// Selecciona aquellos usuarios cuyo nombre empiece por una S mayúscula.
leemons.query('users').find({ name_$startssWith: 'S' });
```

:::

::: tab no empieza estrictamente por

`no empieza estrictamente por`

Busca aquellas entradas que no empiece con el texto especificado respetando las mayúsculas.

Especifica el nombre de la columna con el sufijo `_$nstartssWith`.

```js
// Selecciona aquellos usuarios cuyo nombre no empiece con una S mayúscula.
leemons.query('users').find({ name_$nstartssWith: 'S' });
```

:::

::: tab termina por

`termina por`

Selecciona aquellos datos cuyo campo especificado termine por el texto dado, este texto ignora las mayúsculas.

Especifica el nombre de la columna con el sufijo `_$endsWith`.

```js
// Selecciona aquellos usuarios cuyo nombre termine con una a.
leemons.query('usuarios').find({ nombre_$endsWith: 'a' });
```

:::

::: tab no termina por

`no termina por`

Selecciona aquellos datos cuyo campo especificado no termine con el texto dado, este texto ignora las mayúsculas.

Especifica el nombre de la columna con el sufijo `_$nendsWith`.

```js
// Selecciona aquellos usuarios cuyo nombre no termine con una a.
leemons.query('usuarios').find({ nombre_$nendsWith: 'a' });
```

:::

::: tab termina estrictamente por

`termina estrictamente por`

Busca aquellas entradas que terminen con el texto especificado respetando las mayúsculas.

Especifica el nombre de la columna con el sufijo `_$endssWith`.

```js
// Selecciona aquellos usuarios cuyo nombre termine por una S mayúscula.
leemons.query('users').find({ name_$endssWith: 'S' });
```

:::

::: tab no termina estrictamente por

`no termina estrictamente por`

Busca aquellas entradas que no terminen con el texto especificado respetando las mayúsculas.

Especifica el nombre de la columna con el sufijo `_$nendssWith`.

```js
// Selecciona aquellos usuarios cuyo nombre no terminen con una S mayúscula.
leemons.query('users').find({ name_$nendssWith: 'S' });
```

:::

::: tab menor que

`menor que`

Busca aquellas entradas cuyos valores sean menores que el valor especificado.

Especifica el nombre de la columna con el sufijo `_$lt`.

```js
// Selecciona aquellos usuarios cuya nota sea menor de 5.
leemons.query('notas_usuarios').find({ nota_$lt: 5 });
```

:::

::: tab menor o igual que

`menor o igual que`

Busca aquellos datos cuyo valor sea menor o igual al valor designado.

Especifica el nombre de la columna con el sufijo `_$lte`.

```js
// Selecciona aquellos usuarios cuya nota sea 4 o menos.
leemons.query('notas_usuarios').find({ nota_$lte: 4 });
```

:::

::: tab mayor que

`mayor que`

Busca aquellas entradas cuyos valores sean mayores que el valor especificado.

Especifica el nombre de la columna con el sufijo `_$gt`.

```js
// Selecciona aquellos usuarios cuya nota sea mayor de 5.
leemons.query('users_grades').find({ grade_$gt: 5 });
```

:::

::: tab mayor o igual que

`mayor o igual que`

Busca aquellos datos cuyo valor sea mayor o igual al valor designado.

Especifica el nombre de la columna con el sufijo `_$gte`.

```js
// Selecciona aquellos usuarios cuya nota sea 5 o más.
leemons.query('users_grades').find({ grade_$gte: 5 });
```

:::

::: tab es NULL

Selecciona aquellos registros cuyo valor sea null (true) o no sea null (false).

Especifica el nombre de la columna con el sufijo `_$null`.

```js
// Selecciona aquellos usuarios cuyo email sea null y su teléfono no lo sea.
leemons.query('usuarios').find({ email_$null: true, telefono_$null: false });
```

:::

::::
