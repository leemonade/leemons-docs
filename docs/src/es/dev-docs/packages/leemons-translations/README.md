# leemons-translations

## Idiomas

Por defecto ya viene preinstalados todos los idiomas conocidos

### Añadir idioma

Devuelve el idioma añadido

```js
leemons.plugins.multilanguage.services.locales.getProvider()
  .add('es-ES', 'Español (España)');

/**
 * @return [{code: 'es-ES', name: 'Español (España)'}]
 * */
```

### Añadir muchos idiomas

Devuelve el array de idiomas añadimos

```js
leemons.plugins.multilanguage.services.locales.getProvider()
  .addMany([
    ['es-ES', 'Español (España)']
]);

/**
 * @return [{code: 'es-ES', name: 'Español (España)'}]
 * */
```

### Editar nombre de idioma

Devuelve el idioma modificado

```js
leemons.plugins.multilanguage.services.locales.getProvider()
  .setName('es-ES', 'Español (España) [es-ES]');

/**
 * @return {code: 'es-ES', name: 'Español (España) [es-ES]'}
 * */
```

### Eliminar idioma

Devuelve true si se borro false si no

```js
leemons.plugins.multilanguage.services.locales.getProvider()
  .delete('es-ES');

/**
 * @return boolean
 * */
```

### Existe idioma

Devuelve true si existe false si no

```js
leemons.plugins.multilanguage.services.locales.getProvider()
  .has('es-ES');

/**
 * @return boolean
 * */
```

### Existen multiples idiomas

Devuelve para cada idioma si existe o no

```js
leemons.plugins.multilanguage.services.locales.getProvider()
  .hasMany(['es-ES', 'en']);

/**
 * @return { 'es-ES': true, 'en': false }
 * */
```

### Recuperar idioma

Devuelve el idioma especificado si existe si no null

```js
leemons.plugins.multilanguage.services.locales.getProvider()
  .get('es-ES');

/**
 * @return {code: 'es-ES', name: 'Español (España)'}
 * */
```

### Recuperar multiples idioma

Devuelve un array con los idiomas especificados si existen si alguno no existe no estar dentro del array

```js
leemons.plugins.multilanguage.services.locales.getProvider()
  .getMany(['es-ES', 'en']);

/**
 * @return [
 *      {code: 'es-ES', name: 'Español (España)'},
 *      {code: 'en', name: 'English'}
 * ]
 * */
```


## Traducciones

Hay dos maneras de almacenar los datos, de manera ***publica*** y ***privada***

Todo se usa igual la unica diferencia es que con la ***privada*** solo tu plugin podra acceder a lo que hayas almacenado

**Privada**: ``` leemons.plugins.multilanguage.services.contents.getProvider() ```

**Publica**: ``` leemons.plugins.multilanguage.services.common.getProvider() ```

::: warning ATENCIÓN
  De aquí en adelante las claves (key) tienen que seguir el siguiente formato:

  plugins.(Nombre de tu plugin).(Clave que quieras especificar)
:::

**EJEMPLO**

Si el paquete de mi plugin se llama **"leemons-plugin-users"** la clave (key) quedaria asi:

plugins.users.(Clave que quieras especificar)

plugins.users.settings

::: warning ATENCIÓN
  Todos los valores deben almacenarse como *string* si se pasa de valor cualquien otra cosa que no 
  sea un *string* dara un error
:::

### Añadir traduccion

Almacena un texto para tu plugin para el idioma especificado con la clave especificada

```js
const key = 'plugins.example.settings';
const locale = 'es-ES';
const value = 'configuración';

leemons.plugins.multilanguage.services.contents.getProvider()
  .add(key, locale, value);

/**
 * @return {key, locale, value}
 * */
```

### Añadir multiples traducciones para una misma clave

Igual que ``` .add ``` pero para almacenar multiples traducciones para una misma clave a la vez

```js
leemons.plugins.multilanguage.services.contents.getProvider()
  .addManyByKey('plugins.example.save', {
    en: 'Save',
    'es-ES': 'Guardar',
    'es-MX': 'Salvar',
});

/**
 * @return [
 *      {key: 'plugins.example.save', locale: 'en', value: 'Save'},
 *      {key: 'plugins.example.save', locale: 'es-ES', value: 'Guardar'},
 *      {key: 'plugins.example.save', locale: 'es-MX', value: 'Salvar'},
 * ]
 * */
```

### Añadir en bulk

Añade para muchos idiomas muchas claves con sus traducciones

```js
leemons.plugins.multilanguage.services.contents.getProvider()
  .addMany({
    en: {
        'plugins.example.save': 'Save',
        'plugins.example.config': 'Settings'
    },
    'es-ES': {
        'plugins.example.save': 'Guardar',
        'plugins.example.config': 'Configuración'
    }
});
```

### Editar traducción

Edita una traducción volviendo a setear su valor

```js
const key = 'plugins.example.settings';
const locale = 'es-ES';
const value = 'Configuración';

leemons.plugins.multilanguage.services.contents.getProvider()
  .setValue(key, locale, value);

/**
 * @return {key, locale, value}
 * */
```

### Editar multiples traducciones para una misma clave

Igual que ``` .setValue ``` pero para actualizar multiples traducciones para una misma clave a la vez


```js
leemons.plugins.multilanguage.services.contents.getProvider()
  .setKey('plugins.example.save', {
    en: 'Save',
    'es-ES': 'Guardar',
    'es-MX': 'Salvar',
});

/**
 * @return [
 *      {key: 'plugins.example.save', locale: 'en', value: 'Save'},
 *      {key: 'plugins.example.save', locale: 'es-ES', value: 'Guardar'},
 *      {key: 'plugins.example.save', locale: 'es-MX', value: 'Salvar'},
 * ]
 * */
```

### Editar en bulk

Edita para muchos idiomas muchas claves con sus traducciones

```js
leemons.plugins.multilanguage.services.contents.getProvider()
  .setMany({
    en: {
        'plugins.example.save': 'save',
        'plugins.example.config': 'configuration'
    },
    'es-ES': {
        'plugins.example.save': 'guardar',
        'plugins.example.config': 'configuración'
    }
});
```

### Eliminar traducción para un idioma

Elimina la traduccion de esa clave para ese idioma

```js
leemons.plugins.multilanguage.services.contents.getProvider()
  .delete('plugins.example.save', 'es-ES');

/**
 * @return boolean
 * */
```

### Eliminar traducción para todos los idiomas

Elimina todas las traducciones en todos los idiomas para la clave especificada

```js
leemons.plugins.multilanguage.services.contents.getProvider()
  .deleteAll({ key: 'plugins.example.save' });
```

### Eliminar traducción para todos los idiomas donde su clave empiece por un prefijo

Elimina todas las traducciones en todos los idiomas para la para las claves almacenadas que empiecen por el string especificado

```js
leemons.plugins.multilanguage.services.contents.getProvider()
  .deleteKeyStartsWith('plugin.example');
```

### Existe traducción 

Comprueba si existe una traduccion para esa clave y ese idioma

```js
const key = 'plugins.example.save';
const locale = 'es-ES';

leemons.plugins.multilanguage.services.contents.getProvider()
  .has(key, locale);

/**
 * @return boolean
 * */
```

### Cuenta traducciones

Devuelve el numero de traducciones que existen para la clave especificada

```js
const key = 'plugins.example.save'
leemons.plugins.multilanguage.services.contents.getProvider()
  .countLocalesWithKey(key);

/**
 * @return number
 * */
```

### Cuenta traducciones por prefijo e idioma

Devuelve el numero de traducciones que existe para ese prefijo en ese idioma

```js
const key = 'plugins.example';
const locale = 'es-ES';
leemons.plugins.multilanguage.services.contents.getProvider()
  .countKeyStartsWith(key, locale);

/**
 * @return number
 * */
```

### Recuperar traducción

Devuelve la traduccion si es que existe para la clave e idioma especificados

```js
const key = 'plugins.example.save';
const locale = 'es-ES';

leemons.plugins.multilanguage.services.contents.getProvider()
  .get(key, locale);

/**
 * @return {key, locale, value: 'Guardar'}
 * */
```

### Recuperar traducciones por clave

Dada una clave devuelve todas las traducciones en todos los idiomas que este.

```js
leemons.plugins.multilanguage.services.contents.getProvider()
  .getWithKey('plugins.example.save');

/**
 * @return [
 *      {key: 'plugins.example.save', locale: 'es-ES', value: 'Guardar'},
 *      {key: 'plugins.example.save', locale: 'en', value: 'Save'},
 *      {key: 'plugins.example.save', locale: 'es-MX', value: 'Salvar'}
 * ]
 * */
```

### Recuperar valor de la traducción

Igual que ``` .get ``` solo que ya devuelve el valor

```js
const key = 'plugins.example.save';
const locale = 'es-ES';

leemons.plugins.multilanguage.services.contents.getProvider()
  .getValue(key, locale);

/**
 * @return string Guardar
 * */
```

### Recuperar valores de traducciones por clave

Igual que ``` .getWithKey ``` solo que ya devuelve el valor por idioma

```js
leemons.plugins.multilanguage.services.contents.getProvider()
  .getLocaleValueWithKey('plugins.example.save');

/**
 * @return { 'es-ES': 'Guardar', 'en': 'Save', 'es-MX': 'Salvar' }
 * */
```

### Recuperar traducciones por idioma

Devuelve todas las traducciones dado un idioma

```js
leemons.plugins.multilanguage.services.contents.getProvider()
  .getKeyValueWithLocale('es-ES');

/**
 * @return { 'plugins.example.save': 'Guardar', 'plugins.example.config': 'Configuración' }
 * */
```

```js
leemons.plugins.multilanguage.services.contents.getProvider()
  .getWithLocale('es-ES');

/**
 * @return [
 *      {key: 'plugins.example.save', locale: 'es-ES', value: 'Guardar'},
 *      {key: 'plugins.example.config', locale: 'es-ES', value: 'Configuración'}
 * ]
 * */
```

### Recuperar traducciones por prefijo de clave

Devuelve todas las traducciones donde la clave empiece por el texto especificado para el idioma especificado

```js
leemons.plugins.multilanguage.services.contents.getProvider()
  .getKeyStartsWith('plugins.example', 'es-ES');

/**
 * @return [
 *      {key: 'plugins.example.save', locale: 'es-ES', value: 'Guardar'},
 *      {key: 'plugins.example.config', locale: 'es-ES', value: 'Configuración'}
 * ]
 * */
```

```js
localization.getKeyValueStartsWith('plugins.example', locale);

/**
 * @return { 'plugins.example.save': 'Guardar', 'plugins.example.config': 'Configuración' }
 * */
```
