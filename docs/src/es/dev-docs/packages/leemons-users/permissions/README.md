# Permisos

[acciones]: /es/dev-docs/packages/leemons-users/actions/

Antes de añadir permisos primero deben de existir [acciones].

::: warning ATENCIÓN
El nombre de los permisos siempre tiene que tener la siguiente estructura:

plugins.(nombre-de-tu-plugin).(clave-que-quieras-especificar)
:::

## Añadir permiso

Si no existe ya un nombre con dicho permiso lo crea y lo vincula con las acciones especificadas

```js
leemons.plugins.users.services.permissions
  .add({
    // Nombre del permiso con el prefijo de plugin
    permissionName: 'plugins.users.users',
    // Acciones que quiero vincular
    actions: ['view', 'update', 'create', 'delete', 'admin'],
    // Nombre del permiso en multiples idiomas para mostrar en el frontend
    localizationName: { 'es-ES': 'Usuarios', en: 'Users' },
  });

/**
 * @return {permissionName: 'plugins.users.users', pluginName: 'plugins.users'}
 * */
```

## Añadir muchos permisos

Igual que ``` .add ``` pero añadiendo multiples permisos a la vez

```js
leemons.plugins.users.services.permissions
  .addMany({
      permissionName: 'plugins.users.users',
      actions: ['view', 'update', 'create', 'delete', 'admin'],
      localizationName: { 'es-ES': 'Usuarios', en: 'Users' },
    },
    {
      permissionName: 'plugins.users.profiles',
      actions: ['view', 'update', 'create', 'delete', 'admin'],
      localizationName: { 'es-ES': 'Perfiles', en: 'profiles' },
    });

/**
 * @return { 
 *      items: [
 *          {permissionName: 'plugins.users.users', pluginName: 'plugins.users'},
 *          {permissionName: 'plugins.users.profiles', pluginName: 'plugins.users'}
 *      ],
 *      count: 2,
 *      warnings: null
 * }
 * 
 * @return { 
 *      items: [{permissionName: 'plugins.users.profiles', pluginName: 'plugins.users'}],
 *      count: 1,
 *      warnings: {
 *          errors: [ Error ]
 *      }
 * }
 * */
```

## Actualizar permiso

Actualiza el nombre para frontend del permiso y las acciones del permiso
Si el nombre del permiso no existe se lanza un error,

```js
leemons.plugins.users.services.permissions
  .update({
    permissionName: 'plugins.users.users',
    actions: ['view', 'update', 'create', 'delete', 'admin'],
    localizationName: { 'es-ES': 'Usuarios', en: 'Users' },
  });

/**
 * @return {permissionName: 'plugins.users.users', pluginName: 'plugins.users'}
 * */
```

## Actualizar muchos permisos

Igual que ``` .update ``` pero para actualizar muchos permisos

```js
leemons.plugins.users.services.permissions
  .updateMany({
      permissionName: 'plugins.users.users',
      actions: ['view', 'update', 'create', 'delete', 'admin'],
      localizationName: { 'es-ES': 'Usuarios', en: 'Users' },
    },
    {
      permissionName: 'plugins.users.profiles',
      actions: ['view', 'update', 'create', 'delete', 'admin'],
      localizationName: { 'es-ES': 'Perfiles', en: 'profiles' },
    });

/**
 * @return { 
 *      items: [
 *          {permissionName: 'plugins.users.users', pluginName: 'plugins.users'},
 *          {permissionName: 'plugins.users.profiles', pluginName: 'plugins.users'}
 *      ],
 *      count: 2,
 *      warnings: null
 * }
 *
 * @return { 
 *      items: [{permissionName: 'plugins.users.profiles', pluginName: 'plugins.users'}],
 *      count: 1,
 *      warnings: {
 *          errors: [ Error ]
 *      }
 * }
 * */
```

## Borrar permiso

Elimina el permiso y sus relaciones con las acciones

```js
leemons.plugins.users.services.permissions
  .remove('plugins.users.users');

/**
 * @return {permissionName: 'plugins.users.users', pluginName: 'plugins.users'}
 * */
```


## Borrar muchos permisos

Igual que ``` .remove ``` pero para borrar muchos permisos a la vez

```js
leemons.plugins.users.services.permissions
  .removeMany(['plugins.users.users', 'plugins.users.profiles']);

/**
 * @return { 
 *      items: [
 *          {permissionName: 'plugins.users.users', pluginName: 'plugins.users'},
 *          {permissionName: 'plugins.users.profiles', pluginName: 'plugins.users'}
 *      ],
 *      count: 2,
 *      warnings: null
 * }
 *
 * @return { 
 *      items: [{permissionName: 'plugins.users.profiles', pluginName: 'plugins.users'}],
 *      count: 1,
 *      warnings: {
 *          errors: [ Error ]
 *      }
 * }
 * */
```

## Añadir acción a permiso

Añade la accion al permiso si todo esta correcto

```js
leemons.plugins.users.services.permissions
  .addAction('plugins.users.users', 'view');

/**
 * @return { permissionName: 'plugins.users.users', actionName: 'view' }
 * */
```

## Añadir multiples acciones a un permiso

Igual que ``` .addAction ``` pero para añadir varias a la vez

```js
leemons.plugins.users.services.permissions
  .addActionMany('plugins.users.users', ['view', 'update']);

/**
 * @return { 
 *      items: [
 *          { permissionName: 'plugins.users.users', actionName: 'view' },
 *          { permissionName: 'plugins.users.users', actionName: 'update' }
 *      ],
 *      count: 2,
 *      warnings: null
 * }
 *
 * @return { 
 *      items: [{ permissionName: 'plugins.users.users', actionName: 'update' }],
 *      count: 1,
 *      warnings: {
 *          errors: [ Error ]
 *      }
 * }
 * */
```

## Existe permiso

Comprueba si existe un permiso con el nombre especificado

```js
leemons.plugins.users.services.permissions
  .exist('plugins.users.users');

/**
 * @return boolean
 * */
```

## Existen muchos permisos

Comprueba si existen todos los permisos especificados

```js
leemons.plugins.users.services.permissions
  .existMany(['plugins.users.users', 'plugins.users.profiles']);

/**
 * @return boolean
 * */
```

## Permiso tiene acción

Comprueba si existe el permiso y si el permiso tiene esa acción

```js
leemons.plugins.users.services.permissions
  .hasAction('plugins.users.users', 'view');

/**
 * @return boolean
 * */
```

## Permiso tiene multiples acciones

Comprueba si existe el permiso y si el permiso tiene todas las acciones especificadas

```js
leemons.plugins.users.services.permissions
  .hasActionMany('plugins.users.users', ['view', 'update']);

/**
 * @return boolean
 * */
```

## Muchos permisos tiene multiples acciones

Comprueba si para cada permiso que le pasamos si tiene las acciones especificadas

```js
leemons.plugins.users.services.permissions
  .manyPermissionsHasManyActions([
      ['plugins.users.users', ['view', 'update']],
      ['plugins.users.profile', ['view', 'update']]
  ]);

/**
 * @return boolean
 * */
```
