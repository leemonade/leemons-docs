# leemons-connector-bookshelf

The leemons-connector-bookshelf is a package for managing the SQL database connections.

We use an ORM called [bookshelf.js](http://bookshelfjs.org/) and the [knex.js](https://knexjs.org/) query builder.

## Initialization

When the connector is initialized, we go over each connection with the bookshelf connector and initialize a knex object with the provided configuration.

The supported SQL engines are MySQL, Postgres, and sqlite3.

Once all the knex objects are initialized, we create a new instance of Bookshelf for each connection, responsible for creating the database schema and handling the queries.

## Model generation

The first thing done is creating the schema, which checks which tables do not exist or have been modified, and tries to create or update them.

When a table needs to be created or updated, we register this change in the `core_store` for the next starts.

Once the tables are generated, we create the [bookshelf models](https://bookshelfjs.org/api.html#Bookshelf-instance-model), which contains all the relations between tables and all the things needed for querying the database.

Finally, we generate the foreign keys to optimize the data fetching.
