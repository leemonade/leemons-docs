# Usuarios


## Detalle desde token

Recupera el detalle del usuario desde un token jwt obtenido anteriormente mediante login

```js
leemons.plugins.users.services.users
  .detailForJWT('jwtToken');

/**
 * @return {
 * id: 'user-id or user-auth-id',
 * user: 'user-id',
 * name: 'Juan',
 * email: 'leemons@leemons.io',
 * language: 'es-ES'
 * }
 * */
```

## Comprobar si tiene permiso

Para que se devuelva true el usuario tiene que tener de todos los permisos 
especificados algunas de las acciones especificadas

```js

// detailForJWT result
const user = {
    id: 'user-id or user-auth-id',
  user: 'user-id',
  name: 'Juan',
  email: 'leemons@leemons.io',
  language: 'es-ES'
};

leemons.plugins.users.services.users
  .havePermission(
      user,
    {
      'plugins.users.users': {
        actions: ['view', 'update'],
      },
  });

/**
 * @return boolean
 * */
```
