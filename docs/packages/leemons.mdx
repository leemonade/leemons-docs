---
sidebar_position: 1
---

# leemons

The leemons package is the core, where all the logic is done, from server set-up to model standardization.

## CLI

leemons comes with a CLI (Command Line Interface), which lets you run the app quickly.

### Commands

`$ leemons start` Starts the app.

When you start the app, you can use leemons with all the features but won't detect code changes until you restart the server.

`$ leemons dev` Starts the app in development mode.

When the app starts in development mode, the server is restarted every time a file change occurs.

## App

<!-- TODO: Add link to config -->

The server is started through a class instantiation; this loads all the configuration from the `config's directory`, then a new server is initialized.

Once the app is constructed, you need to load it with `leemons.load()`, which will load the [models](#models) and initialize the [Database Manager](../leemons-database/#database-manager) (which will create the database schema).

:::tip ACCESSING THE MODELS
You can access the database manager through `leemons.db` and the models with `leemons.db.models`.
:::

Once everything is loaded, you can start the app with `leemons.start()`, where the server starts listening.

:::tip SHORTHAND
You can directly start the app. It loads everything before starting.
:::

### Config

The configuration will always be stored in `leemons.config`, this will include all the configuration you set in `configDirectory/*.js` or `configDirectory/*.json`, every file will be stored under `leemons.config.FILE_NAME`.

:::tip
The config directory will be:

```js
env('CONFIG_DIR', 'config');
```

[See env specification](../leemons-utils/#env)
:::

:::tip
You can use the config helpers created by the ConfigProvider:

```js
get: (key, defaultValue) => lodash.get(config, key, defaultValue),
has: (key)               => lodash.has(config, key),
set: (key, value)        => lodash.set(config, key, value)
```

[Lodash documentation](https://lodash.com/docs/)
:::

### Server

We use [KOA.js](https://koajs.com/) for the server because of its usability and middleware support. For the routing, we use [koa-router](https://github.com/koajs/router). Both are exposed for your use in `leemons.app` and `leemons.router`, respectively.

### Models

The models are the basic unit for a database schema. They are JSON objects which are parsed into an easier to use structure:

1. All the fields are completed with a default model:

<details>
<summary>Show the default model</summary>

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

</details>

1. The names are standardized to avoid name repetition.

<details>
<summary>See standardization guide</summary>

Every model is stored in `leemons` on a property based on the model's origin

e.g., you have a plugin called user-administration, then your models are stored under:
`leemons.plugins.user-administration.models` and your model names and collection names will be transformed to: `plugins_user-administration::OriginalName`.

</details>

1. The data is structured

<details>
<summary>See structure</summary>

```js
const model = {
  connection,
  modelName,
  type,
  target

  schema: { // used in schema and model creation (connector)
    collectionName,
    options,
    attributes,
    primaryKey
  }

  allAttributes: { // used in the queryBuilders
    // All the attributes that are not many to many relations
  }
}
```

</details>

:::info Note
You can find some extra information in your final model as a result of a connector
:::
