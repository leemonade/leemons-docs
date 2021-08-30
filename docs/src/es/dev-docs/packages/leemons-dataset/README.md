# leemons-dataset

Los dataset sirven para que puedas permitir a los usuarios de la plataforma leemons extender 
tus schemas y formularios y te brinda todas las herramientas para poder hacer esto facilmente.

Lo primero que hay que hacer es registrar una (o mas) localizaciones de donde van a ir tus datasets.

Por ejemplo tu plugin es de clases y cuando un profesor invita a un alumno a una clase este alumno 
tiene que rellenar un formulario donde (por ejemplo) se le pide su nombre y edad por que tu plugin 
asi lo require, pero adicionalmente quieres que el administrador de la plataforma pueda agregar mas 
campos para que por ejemplo le pregunte que tipo de instrumento toca (En caso de que sea una academia de musica)

Y mas adelante mostrarle los campos adicionales en algun lugar.

## Localizaciones

Una localizacion es una referencia de en que sitio del plugin va a ir localizado un dataset

### Añadir localización

Añade una nueva localizacion para un dataset, pasandole un nombre y descripcion para que el administrador
luego desde frontend pueda saber que se va a usar dicho dataset.

```js

const name = {
  'es-ES': 'Invitar usuario a clase',
  en: 'Invite user to class',
}

const description = {
  'es-ES': 'Añade datos que solicitar a los usuarios cuando se registren a una clase',
    en: 'Add data to prompt users when they register for a class',
}

const locationName = 'register-user-in-class';
const pluginName = 'plugins.classrooms';

leemons.plugins.dataset.services.dataset
  .addLocation({ name, description, locationName, pluginName });

/**
 * @return { name, description, locationName, pluginName }
 * */
```

### Actualizar localización

Actualiza el nombre y descripción de la localizacion

```js

const name = {
  'es-ES': 'Invitar usuario a clase',
  en: 'Invite user to class',
}

const description = {
  'es-ES': 'Añade datos que solicitar a los usuarios cuando se registren a una clase',
    en: 'Add data to prompt users when they register for a class',
}

const locationName = 'register-user-in-class';
const pluginName = 'plugins.classrooms';

leemons.plugins.dataset.services.dataset
  .updateLocation({ name, description, locationName, pluginName });

/**
 * @return { name, description, locationName, pluginName }
 * */
```

### Borrar localización

Borra todo lo que tiene que ver con la localizacion menos los datos almacenados

```js
const locationName = 'register-user-in-class';
const pluginName = 'plugins.classrooms';

leemons.plugins.dataset.services.dataset
  .deleteLocation(locationName, pluginName);

/**
 * @return boolean
 * */
```

### Existe localización

Comprueba si existe la localizacion

```js
const locationName = 'register-user-in-class';
const pluginName = 'plugins.classrooms';

leemons.plugins.dataset.services.dataset
  .existLocation(locationName, pluginName);

/**
 * @return boolean
 * */
```

### Recuperar localización

Si existe la localizacion la devuelve con su nombre y descripcion.

Si se le especifica el idioma a devolver el nombre y la descripcion llegaran ya traducidos al idioma
solicitado si dicha traduccion existe.

Si no se le especifica el idioma devolvera el nombre y la descripcion como objetos con todos los 
idiomas que tenga disponibles

```js
const locationName = 'register-user-in-class';
const pluginName = 'plugins.classrooms';
const locale = 'es-ES';

leemons.plugins.dataset.services.dataset
  .getLocation(locationName, pluginName, {locale});

/**
 * @return { 
 *      name: 'Invitar usuario a clase',
 *      description: 'Añade datos que solicitar a los usuarios cuando se registren a una clase',
 *      locationName: 'register-user-in-class',
 *      pluginName: 'plugins.classrooms'
 * }
 * */

leemons.plugins.dataset.services.dataset
  .getLocation(locationName, pluginName);

/**
 * @return { 
 *      name: {
 *          'es-ES': 'Invitar usuario a clase',
 *          en: 'Invite user to class',
 *      },
 *      description: {
 *          'es-ES': 'Añade datos que solicitar a los usuarios cuando se registren a una clase',
 *           en: 'Add data to prompt users when they register for a class',
 *      },
 *      locationName: 'register-user-in-class',
 *      pluginName: 'plugins.classrooms'
 * }
 * */
```

## Schemas

[react-jsonschema-form]: https://github.com/rjsf-team/react-jsonschema-form

Los schemas son dos objetos (jsonSchema y jsonUI) de configuración donde se define que campos va a 
tener el formulario y que condiciones debe cumplir cada campo para ser valido y como se tiene que
mostrar en el frotend (apariencia) 

Puedes ver ejemplos de los schemas en [react-jsonschema-form]

### Explicación añadir schema

Para poder añadir un Schema primero hay entender que el schema debe de poder ser usado para 
muchos idiomas y esto añade una complejidad extra y es que hay que tener separado lo que es el schema
en si y los textos que se pueden traducir en objetos diferentes, ya que el schema siempre tiene que ser
igual independientemente del idioma pero los textos pueden variar, por ejemplo el Label del campo
Nombre deberia de ser Name en ingles

Vamos a ver como añadiriamos un schema/ui basicos:

Pongamos para entenderlo mejor que tenemos estos json de schema y ui finales en ingles y queremos
añadir los schemas

```js
const jsonSchema = {
  title: 'A registration form',
  description: 'A simple form example.',
  type: 'object',
  required: ['firstName', 'lastName'],
  properties: {
    firstName: {
      type: 'string',
      title: 'First name',
      default: 'Chuck',
    },
    lastName: {
      type: 'string',
      title: 'Last name',
    },
    age: {
      type: 'number',
    },
    telephone: {
      type: 'string',
      title: 'Telephone',
      minLength: 10,
    },
  },
};

const jsonUI = {
  firstName: {
    'ui:autofocus': true,
    'ui:emptyValue': '',
    'ui:autocomplete': 'family-name',
  },
  lastName: {
    'ui:emptyValue': '',
    'ui:autocomplete': 'given-name',
  },
  age: {
    'ui:widget': 'updown',
    'ui:title': 'Age of person',
    'ui:description': '(earthian year)'
  },
  telephone: {
    'ui:options': {
      inputType: 'tel',
    },
  },
};
 ```

[squirrelly.js]: https://squirrelly.js.org/

Lo que al final deberiamos de añadir son los siguientes json, y tener en otro par de objetos las 
traducciones para posteriormente compilarlos con [squirrelly.js] y obtener de nuevo los json
finales en el idioma necesario.

Mas adelante veremos como añadir las traducciones y una función de ayuda que transforma los json
finales (schema/ui) en los schemas preparados y los datos de las traducciones.

```js
const jsonSchema = {
  title: '{{it.title}}',
  description: '{{it.description}}',
  type: 'object',
  required: [ 'firstName', 'lastName' ],
  properties: {
    firstName: {
      type: 'string',
      title: '{{it.properties.firstName.title}}',
      default: '{{it.properties.firstName.default}}'
    },
    lastName: { type: 'string', title: '{{it.properties.lastName.title}}' },
    age: { type: 'number' },
    telephone: {
      type: 'string',
      title: '{{it.properties.telephone.title}}',
      minLength: 10
    }
  }
};

const jsonUI = {
  firstName: {
    'ui:autofocus': true,
    'ui:emptyValue': '',
    'ui:autocomplete': 'family-name'
  },
  lastName: { 'ui:emptyValue': '', 'ui:autocomplete': 'given-name' },
  age: {
    'ui:widget': 'updown',
    'ui:title': '{{it.age.ui_title}}',
    'ui:description': '{{it.age.ui_description}}'
  },
  telephone: { 'ui:options': { inputType: 'tel' } }
}
 ```

### Añadir schema

[explicacion schema]: /es/dev-docs/packages/leemons-dataset/#explicacion-anadir-schema

Para cualquier duda ver [explicacion schema]

```js
const locationName = 'register-user-in-class';
const pluginName = 'plugins.classrooms';

leemons.plugins.dataset.services.dataset
  .addSchema({
    jsonSchema, // Los mencionados en [explicacion schema]
    jsonUI, // Los mencionados en [explicacion schema]
    locationName,
    pluginName,
  });

/**
 * @return {jsonSchema, jsonUI, locationName, pluginName}
 * */
 ```

### Actualizar schema

Igual que  ``` .addSchema  ``` solo que si no existia de antes un schema da error

```js
const locationName = 'register-user-in-class';
const pluginName = 'plugins.classrooms';

leemons.plugins.dataset.services.dataset
  .updateSchema({
    jsonSchema, // Los mencionados en [explicacion schema]
    jsonUI, // Los mencionados en [explicacion schema]
    locationName,
    pluginName,
  });

/**
 * @return {jsonSchema, jsonUI, locationName, pluginName}
 * */
 ```

### Borrar schema

Borra el schema y todas las traducciones

```js
const locationName = 'register-user-in-class';
const pluginName = 'plugins.classrooms';

leemons.plugins.dataset.services.dataset
  .deleteSchema(locationName, pluginName);

/**
 * @return boolean
 * */
 ```

### Existe schema

Comprueba si ya esta configurado el schema para la localizacion

```js
const locationName = 'register-user-in-class';
const pluginName = 'plugins.classrooms';

leemons.plugins.dataset.services.dataset
  .existSchema(locationName, pluginName);

/**
 * @return boolean
 * */
 ```

### Recuperar schema

Si existe el schema lo devuelve

```js
const locationName = 'register-user-in-class';
const pluginName = 'plugins.classrooms';

leemons.plugins.dataset.services.dataset
  .getSchema(locationName, pluginName);

/**
 * @return {jsonSchema, jsonUI, locationName, pluginName}
 * */
 ```

### Recuperar schema compilado a un idioma

Si existe el schema y la traduccion compila el schema y lo devuelve
Antes hay que añadir la traduccio, que se ve mas adelante

```js
const locationName = 'register-user-in-class';
const pluginName = 'plugins.classrooms';
const locale = 'en';

leemons.plugins.dataset.services.dataset
  .getSchemaWithLocale(locationName, pluginName, locale);

/**
 * @return {
 *      jsonSchema,
 *      jsonUI,
 *      locationName,
 *      pluginName,
 *      schemaData,
 *      uiData,
 *      compileJsonSchema,
 *      compileJsonUI
 * }
 * */
 ```


### Traducciones schema

### Explicacion traduccion de schema

Continuamos la explicacion de [explicacion schema] para ver como añadir las traducciones.

Dados los schemas vistos anteriormente hace falta almacenar los datos en los distintos idiomas para que
[squirrelly.js] luego lo pueda compilar, entonces quedarian asi:

```js
const schemaData = {
  title: 'A registration form',
  description: 'A simple form example.',
  properties: {
    firstName: { title: 'First name', default: 'Chuck' },
    lastName: { title: 'Last name' },
    telephone: { title: 'Telephone' }
  }
};

const uiData = {
  age: { ui_title: 'Age of person', ui_description: '(earthian year)' },
  password: { ui_help: 'Hint: Make it strong!' }
}
```

### Añadir traduccion de schema

Añade los datos de los schemas para un idioma en concreto

```js
const locationName = 'register-user-in-class';
const pluginName = 'plugins.classrooms';
const locale = 'en';

leemons.plugins.dataset.services.dataset
  .addSchemaLocale({locationName, pluginName, schemaData, uiData, locale});

/**
 * @return {locationName, pluginName, schemaData, uiData, locale}
 * */
 ```


### Actualiza traduccion de schema

Igual que  ```.addSchemaLocale ``` solo que da error si no existia la traduccion ya de antes

```js
const locationName = 'register-user-in-class';
const pluginName = 'plugins.classrooms';
const locale = 'en';

leemons.plugins.dataset.services.dataset
  .addSchemaLocale({locationName, pluginName, schemaData, uiData, locale});

/**
 * @return {locationName, pluginName, schemaData, uiData, locale}
 * */
 ```

### Borrar traduccion de schema

Elimina una traduccion para un schema

```js
const locationName = 'register-user-in-class';
const pluginName = 'plugins.classrooms';
const locale = 'en';

leemons.plugins.dataset.services.dataset
  .deleteSchemaLocale({locationName, pluginName, locale});

/**
 * @return boolean
 * */
 ```

### Existe traduccion de schema

Comprueba si existe la traduccion del schema

```js
const locationName = 'register-user-in-class';
const pluginName = 'plugins.classrooms';
const locale = 'en';

leemons.plugins.dataset.services.dataset
  .existSchemaLocale(locationName, pluginName, locale);

/**
 * @return boolean
 * */
 ```

### Recuperar traduccion de schema

Devuelve las traducciones del schema si existe en el idioma solicitado

```js
const locationName = 'register-user-in-class';
const pluginName = 'plugins.classrooms';
const locale = 'en';

leemons.plugins.dataset.services.dataset
  .getSchemaLocale(locationName, pluginName, locale);

/**
 * @return {locationName, pluginName, schemaData, uiData, locale}
 * */
 ```


## Utilidades

### Transformar schema final en schema y traduccion

Se le pasa un schema de [react-jsonschema-form] y devuelve dos objetos uno el schema para compilarse 
con [squirrelly.js] y otro con los textos para almacenarlos como traduccion

```js
leemons.plugins.dataset.services.dataset
  .transformJsonSchema(jsonSchema);

/**
 * @return {
    values, // Valores a almacenar como traduccion
    json, // Schema en formato [squirrelly.js]
  }
 * */
 ```

### Transformar ui final en ui y traduccion

Se le pasa un ui de [react-jsonschema-form] y devuelve dos objetos uno el ui para compilarse
con [squirrelly.js] y otro con los textos para almacenarlos como traduccion

```js
leemons.plugins.dataset.services.dataset
  .transformUiSchema(jsonSchema);

/**
 * @return {
    values, // Valores a almacenar como traduccion
    json, // Schema en formato [squirrelly.js]
  }
 * */
 ```

 ## Valores

 ### Añadir valores

 Guarda los valores de un formulario de dataset validando si cumple las condiciones del schema.

 Opcionalmente esos valores se pueden vincularse con lo que se quiera, por ejemplo, vamos a 
 almacenar datos extras de un usuario y queremos vincular dicho datos a ese usuario para recuperarlos mas tarde.

 Para eso se usa el parametro opcional ``` target ``` donde especificaremos (en este caso) la id del usuario

 ```js
const locationName = 'register-user-in-class';
const pluginName = 'plugins.classrooms';
const target = 'user-id';
const formData = {
  firstName: 'Chuck',
  lastName: 'Norris',
  telephone: '1234567890',
};

leemons.plugins.dataset.services.dataset
  .addValues(
    locationName,
    pluginName,
    formData,
    {target} // Opcional
  );

/**
 * @return formData
 * */
 ```

### Actualizar valores

Igual que ``` .addValues ``` solo que para actualizar los valores, y si no existian valores de antes da error


 ```js
const locationName = 'register-user-in-class';
const pluginName = 'plugins.classrooms';
const target = 'user-id';
const formData = {
  firstName: 'Chuck',
  lastName: 'Norris',
  telephone: '1234567890',
};

leemons.plugins.dataset.services.dataset
  .updateValues(
    locationName,
    pluginName,
    formData,
    {target} // Opcional
  );

/**
 * @return formData
 * */
 ```

 ### Borrar valores

 Elimina todos los valores segun los datos pasados si existen valores

 ```js
const locationName = 'register-user-in-class';
const pluginName = 'plugins.classrooms';
const target = 'user-id';

leemons.plugins.dataset.services.dataset
  .deleteValues(
    locationName,
    pluginName,
    {target} // Opcional
  );

/**
 * @return boolean
 * */
 ```

### Existen valores

Comprueba si existen valores para los datos pasados

```js
const locationName = 'register-user-in-class';
const pluginName = 'plugins.classrooms';
const target = 'user-id';

leemons.plugins.dataset.services.dataset
  .existValues(
    locationName,
    pluginName,
    {target} // Opcional
  );

/**
 * @return boolean
 * */
 ```

 ### Recuperar valores

 A la hora de recuperar los valores almacenados se puede decidir si solo recuperar alguna de las claves o todas

 ```js
const locationName = 'register-user-in-class';
const pluginName = 'plugins.classrooms';
const target = 'user-id';
const keys = ['name', 'surname'];

leemons.plugins.dataset.services.dataset
  .getValues(
    locationName,
    pluginName,
    {
      target, // Opcional
      keys // Opcional
    } 
  );

/**
 * @return {name: 'string', surname: 'string'}
 * */
 ```