# Usuarios - Permisos


## Recuperar todos los permisos del agente

Devuelve todos los permisos que tiene el/los agente/s especificado/s

```js

// Normalmente sacaras el agente del contexto que da koa
const userAgentObjects = ctx.state.userSession.userAgents;

leemons.plugins.users.services.users
  .getUserAgentPermissions(userAgentObjects);

/**
 * @return [{
 *  permissionName: 'leemons.families.families-config',
 *  actionNames: ['view'],
 *  role: null,
 *  target: null,
 *  center: null
 * }]
 * */
```

## Ver si tiene un permiso

Devuelve true si alguno de los ids de user agent tiene permiso

```js

// Normalmente sacaras el agente del contexto que da koa
const userAgentObjects = ctx.state.userSession.userAgents;

leemons.plugins.users.services.users
  .userAgentHasPermission(
      _.map(userAgentObjects, 'id'),
    {permissionName: 'leemons.families.families-config', actionNames: ['view']}
  );

/**
 * @return boolean true
 * */
```

## Ver si tiene un permiso custom

Igual que userAgentHasPermission solo que solo con los permisos customs.

```js

// Normalmente sacaras el agente del contexto que da koa
const userAgentObjects = ctx.state.userSession.userAgents;

leemons.plugins.users.services.users
  .userAgentHasCustomPermission(
      _.map(userAgentObjects, 'id'),
    {permissionName: 'leemons.families.families-config', actionNames: ['view']}
  );

/**
 * @return boolean true
 * */
```

## Añadir permiso custom

Añade un permiso custom al/los agente/s especificado/s

```js

// Normalmente sacaras el agente del contexto que da koa
const userAgentObjects = ctx.state.userSession.userAgents;

leemons.plugins.users.services.users
  .addCustomPermissionToUserAgent(
      _.map(userAgentObjects, 'id'),
    {permissionName: 'leemons.families.families-config', actionNames: ['view']}
  );

/**
 * @return boolean true
 * */
```


## Borrar permiso custom

Borra un permiso custom al/los agente/s especificado/s

```js

// Normalmente sacaras el agente del contexto que da koa
const userAgentObjects = ctx.state.userSession.userAgents;

leemons.plugins.users.services.users
  .removeCustomUserAgentPermission(
      _.map(userAgentObjects, 'id'),
    {permissionName: 'leemons.families.families-config'}
  );

/**
 * @return boolean true
 * */
```
