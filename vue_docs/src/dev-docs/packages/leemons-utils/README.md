# leemons-utils

leemons-utils is the package where all the helper functions are stored for your use.

For using leemons-util in your packages, you first need to install it:

:::: tabs type:border-card
::: tab yarn

```bash
yarn add leemons-utils
```

:::
::: tab npm

```bash
npm install leemons-utils
```

:::
::::

## env

The env function returns the value of the desired environment value if it exists. If not, returns the default value specified.

```js
const {env} = require('leemons-utils');

// If node_env is not defined, it returns 'development'
env('NODE_ENV', 'development');
```

## getModel

Returns the desired model if it exists. If it does not exists, it returns null.

```js
const {getModel} = require('leemons-utils');

getModel('leemons::users');
```

If an array of models is provided, it searches for the model in the given array.

```js
const {getModel} = require('leemons-utils');

const models = [
  model1: {...},
  model2: {...},
  ...
];

getModel('model1', models);
```

## generateModelName

It generates a model name based on the target and original name.

```js
const {generateModelName} = require('leemons-utils');

const modelName = generateModelName('plugins.users', 'roles');

console.log(modelName); // > plugins_users::roles
```

## parseFilters

It parses the [filters](../leemons-database/#filters) into a json useful for [buildQuery](#buildQuery).

The filters and defaults are JSONs for [filtering](../leemons-database/#filters) the query

```js
const {parseFilters} = require('leemons-utils');

const filters = {
  $or: [
    { name_$contains: 'John' },
    { name_$contains: 'Jane' }
  ]
};

const defaults = {
  $limit: 5
};

const filters = parseFilters({ filters, defaults, model });
```

## buildQuery

It calls the query builder from the current model's connector.

* The model is the one you want to build the query for.
* The [filters](../leemons-database/#filters) you want to use in your [query](../leemons-database/#queries).
* Other parameters required by your [connector](../leemons-database/#connectors)

```js
const {buildQuery} = require('leemons-utils');

// The filters you want to use in the query

const query = buildQuery(model, filters, ...rest);
```
