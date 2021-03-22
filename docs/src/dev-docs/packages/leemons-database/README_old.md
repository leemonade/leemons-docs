# leemons-database

leemons-database is a package for standardizing the database-related stuff.

It manages all the connections, queries, models and connects with each connector.

## Connectors

Connectors are those packages that transform general information into ORM-specific instructions.

Every connector must be named as follows:
`leemons-connector-CONNECTOR_NAME`

Any connector comes installed by default, so you need to install your favorite one.

yarn:

```bash
 yarn add leemons-connector-CONNECTOR_NAME
```

npm:

```bash
npm install leemons-connector-CONNECTOR_NAME
```

## Database Manager

The Database Manager is the entry point for this package. It contains a [Connector Registry](#connector-registry) which initializes every connection.

The Database Manager is also responsible for building queries and manage the different connectors.

You can access the Database Manager through `leemons.db`

## Connector Registry

The connector registry is a function helper for managing all the connectors. It provides the following methods:

load

Registers the different connectors that database connections uses in `connectorRegistry.connectors`.

The registry imports each connector for using them when required.

```js
connectorRegistry.connectors.load();
```

REMEMBER
You should have installed the connectors

init
The registry calls every connector's initialization method and saves the resulting models in `databaseManager.models`.

You can access these models through `leemons.db.models`.

```js
connectorRegistry.connectors.init();
```

getAll
Gets all the connectors objects (without the names)

```js
connectorRegistry.connectors.getAll();
```

 get
Gets the specified connector object

```js
connectorRegistry.connectors.get('connector name');
```

getFromConnection
Gets the connector used in the given connection

```js
connectorRegistry.connectors.getFromConnection('connection name');
```

original
Gets the connector used in the default connection

```js
connectorRegistry.connectors.default;
```

set
Sets the given value on `databaseManager.connector[provided key]`

```js
connectorRegistry.connectors.set('connector name', newValue);
```

## Query Builder

When the user tries to query something from the database, it is sometimes difficult to find the desired model location. With the query builder, you can query a model just by its name.

INFO
The builder search for the models in `databaseManager.models`.

When you call the query builder, it gets your model and connector for generating an object with the queries. Once it's generated, it caches it for the following calls.

### Queries

The provided queries may change depending on the connector, see your connector's docs, but should be as follows:

*Many queries
The*many queries run in transactions, so if an entry fails, the whole query rollbacks (return to the previous state)

create
  This query creates a new entry in the database.

  ```js
    leemons.query('users').create({ name: 'Sarah' });
  ```

  The query returns a promise which resolves to the created object.

create-Many

  This query creates the specified entries in the database.

  ```js
    leemons.query('users').createMany([
      { name: 'Sarah' },
      { name: 'Michael' }
    ]);
  ```

  The query returns a promise which resolves to an array with the created objects.

update
  This query updates the queried entry in the database.

  ```js
    leemons.query('users').update({ id: 1 }, { name: 'Sarah' });
  ```

  The query returns a promise which resolves to the updated object.

update-Many
  This query updates the specified entries in the database.

  ```js
    leemons.query('users').updateMany([
      {
        query: { id: 1 },
        item: { name: 'Sarah' }
      },
      {
        query: { id: 2},
        item: { name: 'Michael' }
      }
    ]);
  ```

  The query returns a promise which resolves to an array with the updated objects.

delete
  This query deletes the queried entry in the database.

  ```js
    leemons.query('users').delete({ id: 1 });
  ```

  The query returns a promise which resolves to an empty object.

delete-Many
  This query deletes the specified entries in the database.

  ```js
    leemons.query('users').deleteMany({ name: 'Sarah' });
  ```

  The query returns a promise which resolves to an array.

find
  This query finds the queried entries in the database.

  ```js
    leemons.query('users').find({ name: 'Sarah' });
  ```

  The query returns a promise which resolves to an array with the matching objects.

find-One
  This query finds the specified entry in the database.

  ```js
    leemons.query('users').findOne({ name: 'Sarah' });
  ```

  The query returns a promise which resolves to the matching object or null.

### Querying data

You can query data with the provided custom filters. They are all specified into a JSON.

equals

`equals`

You can specify that.

```js
  this.query('users').find({id: 1, name: 'Sarah'})
```
