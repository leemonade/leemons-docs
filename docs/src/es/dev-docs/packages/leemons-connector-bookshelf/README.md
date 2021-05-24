# leemons-connector-bookshelf

El paquete `leemons-connector-bookshelf` es una capa de abstracción de SQL, el cual se va a encargar de administrar las conexiones y consultas con la base de datos.

Para realizar esta abstracción, utilizamos el ORM de [bookshelf.js](https://bookshelfjs.org) y el creador de consultas [knex.js.](https://knexjs.org)

## Inicialización

Cuando el conector es inicializado, este conecta leemons con cada una de las conexiones a la base de datos especificada.

* ¿Con qué motores de base de datos es compatible?

   Actualmente hemos comprobado la compatibilidad con [MySql](https://www.mysql.com/), [PostgreSQL](https://www.postgresql.org/) y [SQLite3](https://sqlite.org/).

* Pero, ¿cómo funciona?

   Pues bien, lo primero de todo es inicializar un objeto de knex con los datos de conexión a la base de datos, una vez todo está listo, se procede a crear el esquema a partir de los modelos provistos. Durante la creación del esquema, se crean las relaciones entre tablas y se instancian los modelos de bookshelf para administrar las consultas.

## Generación de los modelos

Para generar la base de datos, lo primero es comprobar el esquema actual de la base de datos, lo cual realizamos de la siguiente forma:

1. Se obtienen los [modelos definidos por el usuario](../leemons/#declaracion-de-modelos).
2. Se inicia una transacción para mantener un hilo abierto y poder volver al estado anterior en caso de que suceda algún fallo.
3. Por cada modelo definido se comprueba si existe una tabla correspondiente en la base de datos.
4. Se comprueba si el modelo ha sido alterado desde la anterior ejecución, lo cual es guardado en el [core_store.]()
5. Se crean o modifican las tablas que lo necesiten (en base a los puntos 2 y 3).
6. Se genera el [modelo de bookshelf.](https://bookshelfjs.org/api.html#Bookshelf-instance-model)
7. Se crean las claves foráneas.

## Definición de modelos

Los modelos sirven para definir la estructura de tus tablas, para ello es necesario [definirlos como se indica en la documentación de leemons](../leemons/#declaracion-de-modelos). A continuación, debes definir las diferentes columnas que va a tener tu tabla, esto se hace en la propiedad `attributes` pudiendo elegir uno de los [tipos de datos](#tipos-de-datos) definidos o establecer un [tipo específico](#tipos-de-datos-especificos), junto a estos, podemos especificar unas [opciones por dato](#opciones). En lugar de un dato, puedes definir una relación con otra tabla, esto se consigue mediante la [declaración de relaciones](#relaciones-entre-tablas).

Por ejemplo: En la tabla de usuarios tenemos los campos: nombre, apellidos y curso.

```json
{
 "modelName": "usuarios",
 "attributes": {
   "nombre": {
     "type": "string"
   },
   "apellidos": {
     "type": "string"
   },
   "curso": {
     "type": "integer"
   }
 }
}
```

### Tipos de datos

Hemos seleccionado la mayoría de tipos de datos provistos por Knex.js, tratando de conseguir el uso de los tipos de datos más eficientes, estos son los siguientes:

* [string/text/richtext](https://knexjs.org/#Schema-string)

 Especifica el uso de strings de la longitud especificada (por defecto 255 caracteres).

 ```json
 {
   "attributes": {
     // El nombre es un string de hasta 255 caracteres
     "nombre": {
       "type": "string",
       "length": 255
     }
   }
 }
 ```

* [enum/enu/enumeration](https://knexjs.org/#Schema-enum)

 Define los posibles valores que puede tener un campo:

 ```json
 {
   "attributes": {
     // El rol puede ser solo alumno, profesor o admin.
     "rol": {
       "type": "enum",
       "enum": ["alumno", "profesor", "admin"]
     }
   }
 }
 ```

* [json/jsonb](https://knexjs.org/#Schema-jsonb)

 Permite usar el tipo de dato JSON propio del motor de base de datos, obteniendo así algunas funcionalidades extras del motor.

 ```json
 {
   "attributes": {
     // Los metadatos pueden ser un json que permite consultas
     // más eficientes a ciertas propiedades del mismo.
     "metadatos": {
       "type": "json"
     }
   }
 }
 ```

* [int/integer](https://knexjs.org/#Schema-integer)

 Especifica que el dato es un número.

 ```json
 {
   "attributes": {
     // El curso debe de ser un número.
     "curso": {
       "type": "int"
     }
   }
 }
 ```

* [bigint/biginteger](https://knexjs.org/#Schema-bigInteger)

 También puedes usar números más grandes (tienen un límite mucho mayor).

 ```json
 {
   "attributes": {
     // Un número que es tan grande que en JavaScript
     // se debe de tratar como un string.
     "bigInt": {
       "type": "bigInt"
     }
   }
 }
 ```

* [float](https://knexjs.org/#Schema-float)

 Permite declarar un float con una precisión y una escala.

 ```json
 {
   "attributes": {
     "nota": {
       "type": "float",
       "precision": 8,
       "scale": 2
     }
   }
 }
 ```

* [decimal](https://knexjs.org/#Schema-decimal)

 Permite declarar un número decimal con una precisión y una escala.

 ```json
 {
   "attributes": {
     "nota": {
       "type": "decimal",
       "precision": 8,
       "scale": 2
     }
   }
 }
 ```

* [binary](https://knexjs.org/#Schema-binary)

 Establece un campo binario con una longitud especificada.

 ```json
 {
   "attributes": {
     "binario": {
       "type": "binary",
       "length": 255
     }
   }
 }
 ```

* [boolean](https://knexjs.org/#Schema-boolean)

 Establece un campo booleano (true o false)

 ```json
 {
   "attributes": {
     "asistencia": {
       "type": "boolean"
     }
   }
 }

* [uuid](https://knexjs.org/#Schema-uuid)

 Permite declarar un UUID (Identificador Único Universal).

 ```json
 {
   "attributes": {
     "matricula": {
       "type": "uuid"
     }
   }
 }
 ```

### Opciones

Además de especificar el tipo de dato, podemos especificar algunas opciones más concretas dentro del atributo con la propiedad `options`, existen las siguientes opciones:

* [unique](https://knexjs.org/#Schema-unique)

 Indica si la columna debe de tener un valor único en toda la tabla.

 ```json
 {
   "attributes": {
     "titulo": {
       "type": "string",
       "options": {
         "unique": true
       }
     }
   }
 }
 ```

* [defaultTo](https://knexjs.org/#Schema-defaultTo)

 Indica el valor por defecto en caso de no especificar un valor en la inserción.

 ```json
 {
   "attributes": {
     // Si no se especifica un rol, este se rellena como 'alumno'
     "rol": {
       "type": "string",
       "options": {
         "defaultTo": "alumno"
       }
     }
   }
 }
 ```

* [unsigned](https://knexjs.org/#Schema-unsigned)

 Indica si el valor del campo debe de tener signo o no (aplicable para lo valores numéricos)

 ```json
 {
   "attributes": {
     // En este caso se aceptan valores numéricos positivos (>= 0)
     "id": {
       "type": "int",
       "options": {
         "unsigned": true
       }
     }
   }
 }
 ```

* [notNull/notNullable](https://knexjs.org/#Schema-notNullable)

 Especifica si el campo puede (true) o no puede ser null (false) (por defecto si puede (false)).

   ```json
 {
   "attributes": {
     // El email es obligatorio (no puede ser null)
     "email": {
       "type": "string",
       "options": {
         "notNull": true
       }
     },
     // Mientras que el teléfono es opcional (puede ser null)
     "telefono": {
       "type": "int",
       "options": {
         "notNull": false
       }
     }
   }
 }
 ```

### Tipos de datos específicos

Si prefieres usar un tipo de dato no provisto, también puedes usar uno más específico mediante la propiedad `specificType` siguiendo [las instrucciones de Knex.js](https://knexjs.org/#Schema-specificType)

### Relaciones entre tablas

En ciertas ocasiones necesitarás relacionar varias tablas, lo hemos hecho lo más fácil posible sin perder la esencia original, para ello, en lugar de definir un tipo en un atributo de la tabla, defines una referencia:

Vamos a ver cómo se definiría una relación entre la tabla de usuarios y de roles.

```json
{
 "modelName": "usuarios",
 "attributes": {
   "roles": {
     "references": {
       "collection": "roles"
     }
   }
 }
}
```

#### Relaciones

Las relaciones entre tablas son una característica muy importante en las bases de datos SQL, permiten crear relaciones entre los datos evitando la redundancia en la mayoría de lo posible.

Si ya has trabajado con SQL ya conocerás las diferentes relaciones. A continuación te mostramos las diferentes relaciones y cómo establecerlas:

**uno a uno**

En este tipo de relación, **un dato** en una tabla A se relaciona directamente con **un dato** en otra tabla B, además, solo puede existir una relación por cada dato de la tabla A y solo una por cada dato de la tabla B. En este tipo de relación se dice que un dato pertenece a otro.

Por ejemplo: un alumno tiene una taquilla y una taquilla tan solo pertenece a un alumno. Como la taquilla pertenece al alumno, será esta tabla la que cree la relación, en la tabla de las taquillas no se especifica la relación.

```json
{
 "modelName": "alumnos",
 "attributes": {
   "taquilla": {
     // Se podría leer como: una taquilla pertenece a un único alumno
     "references": {
       "collection": "taquillas",
       "relation": "one to one"
     }
   }
 }
}
```

¿Qué está pasando por dentro?

Por dentro, se está creando un campo en la tabla alumnos llamado "taquilla" (como se ha especificado), este es una clave foránea de la tabla "taquillas", además, se crea una clave única para preservar la singularidad.

**uno a muchos**

La relación uno a muchos relaciona directamente **un dato** en una tabla A con **varios** de una tabla B, pueden existir tantas relaciones por cada dato de A como datos haya en B, pero cada dato de B tan solo se puede relacionar con uno de A.

Por ejemplo: un alumno pertenece a una sola clase, pero una clase es de varios alumnos. En este caso, sería la clase la que tiene la relación uno a muchos, pero tratando de conservar todas las relaciones en la misma tabla, sería la tabla de alumnos la que crea la relación.

```json
{
 "modelName": "alumnos",
 "attributes": {
   "clase": {
     // Se podría leer como: una clase tiene varios alumnos
     "references": {
       "collection": "clases",
       "relation": "one to many"
     }
   }
 }
}
```

¿Qué está pasando por dentro?

Por detrás se está creando un campo en la tabla alumnos llamado "clase" (como se ha especificado), este es una clave foránea de la tabla "clases".

**muchos a muchos**

Finalmente, puedes tener situaciones en las que **varios datos** de la tabla A se relacionen con **varios datos** de la tabla B. En este caso, se necesita una tercera tabla que almacene las relaciones.

Por ejemplo: Un alumno puede estar inscrito en varias asignaturas, y a su vez, una asignatura puede ser dada por varios alumnos, en este caso es irrelevante quien declare la relación, pero como siempre, recomendamos crear el máximo número posible de relaciones en el mismo modelo.

```json
{
 "modelName": "alumnos",
 "attributes": {
   "asignaturas": {
     // Se podría leer como: varias asignaturas son dadas por varios alumnos
     "references": {
       "collection": "asignaturas",
       "relation": "many to many"
     }
   }
 }
}
```

¿Qué está pasando por dentro?

Por dentro se crea una tabla que contiene una clave foránea a las otras dos tablas, siendo así una tabla de unión, esta tabla almacena las relaciones entre las otras dos tablas.

:::tip CONSEJO
A la hora de decidir quien debe definir la relación, toma siempre la siguiente consigna:

* La segunda tabla que mencionas suele declarar la relación (una taquilla pertenece a un único alumno)
* Siempre debemos optar por tener el mayor número de relaciones recogidas en la misma tabla, para ello es recomendable empezar a declarar las relaciones en el orden: uno-a-muchos, uno-a-uno y por último muchos-a-muchos
* Las uno-a-muchos se suelen declarar en la tabla de los muchos y no en la del uno. (muchos alumnos en una clase, una clase muchos alumnos. Siempre en la tabla alumnos).
:::
