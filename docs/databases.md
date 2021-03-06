## Databases

#### How do I run this app without a database?

Change the following:
```javascript
/*
 * server/config/appConfig.js
 */

DB_TYPE: process.env.DB_TYPE || DB_TYPES.NONE
```

#### How do I switch to a different database?

Currently, we support these DB_TYPES:

- MONGO
- POSTGRES
- NONE

We abstracted the DB config in `appConfig` to enable you to require the correct files if you were to use a different database, e.g. postgresql.

Please read [this PR](https://github.com/reactGo/reactGo/pull/190#issuecomment-210273745) for more context.

```javascript
/*
 * server/config/appConfig.js
 */

DB_TYPE: process.env.DB_TYPE || DB_TYPES.YOUR_DB
```

You will need to add a folder after `/db` with [may] contain the following ORM specific code:
- models
- controllers
- passport logic
- connecting to the database
- session stores
- deserialising users

##Setting up Postgres

#### Install Postgres as your database:

```bash
# Update brew formulae
brew update
# Install Postgres
brew install postgres
```

#### Run your Postgres server
```bash
postgres -D /usr/local/var/postgres
```

#### Setup your postgres database
```bash
createuser root
createdb react_webpack_node_development # or test/production
npm run sequelize db:migrate
```

#### Installing on Heroku
```bash
# https://devcenter.heroku.com/articles/heroku-postgresql#provisioning-the-add-on
heroku addons:create heroku-postgresql:<PLANNAME> --as POSTGRES_DB
heroku run bash
# once in bash
npm run sequelize db:migrate
# exit heroku bash
```
