# Acciones de permisos

Antes de añadir permisos es necesario que existan acciones a realizar por dichos permisos,
por ejemplo:

  El permiso ``` plugins.users.profiles ``` tienes la acciones:
    
- Ver *```(view)```*
- Actualizar *```(update)```*
- Crear *```(create)```*
- etc...

Entonces por ejemplo cuando quieras comprobar si un usuario tiene acceso a ver el listado de
perfiles, tendras que comprobar si tiene el permiso ``` plugins.users.profiles ``` con la
accion Ver *```(view)```*

## Añadir acción

Añade un nuevo tipo de accion que podran tener los permisos

```js
leemons.plugins.users.services.actions
  .add({
    // Nombre usado en el backend
    actionName: 'view', 
    // Orden en el que se mostrara en los listados de permisos en el frontend
    order: 1, 
    // Nombre del permiso para pintar en el frontend en los distintos idiomas 
    localizationName: { 'es-ES': 'Ver', en: 'View' } 
  });

/**
 * @return {actionName: 'view', order: 1}
 * */
```

## Añadir muchas acciones

Igual que ``` .add ``` pero para añadir muchas acciones a la vez

```js
leemons.plugins.users.services.actions
  .addMany([
    { order: 1, actionName: 'view', localizationName: { 'es-ES': 'Ver', en: 'View' } },
    { order: 21, actionName: 'update', localizationName: { 'es-ES': 'Actualizar', en: 'Update' } }
  ]);

/**
 * @return { 
 *      items: [{actionName: 'view', order: 1}, {actionName: 'update', order: 21}],
 *      count: 2,
 *      warnings: null
 * }
 * @return { 
 *      items: [{actionName: 'update', order: 21}],
 *      count: 1,
 *      warnings: {
 *          errors: [ Error ]
 *      }
 * }
 * */
```

## Existe accion

Comprueba si ya existe dicha acción

```js
leemons.plugins.users.services.actions
  .exist('view');

/**
 * @return boolean
 * */
```
