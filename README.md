# Smart Search Algorithm

The `nodeJs` project is built to manage DB runing server, DB connection, IN/OUT flows and test cases.
`The core logic is built in postgreSql Function/Procedure`.
Entire logic is a single compound query, runned inside of a function in postgreSql, in order to make the hard querys diretcly in DB without loading any extra data or making any extra calculation in nodejs.

About the `Query logic`:

1. The input search is fomated and splited into single words, and the conjunction words are filtered out (in / or / and) in order to have just the needed keywords in the query.
2. There're 4 selects from the distinguish-ed entities, queried with 'ILIKE' to have case-insesivity selection, also there're filtered out the NULL data, and the results are "UNION-ed ALL" with each other.
3. The results are combined and packaged as a wrapper JSON directly in DB level using JSONB
4. Entire logic is encapsulated into a DB Function called "smart_search" with an input parameter "query" and with JsonB array output.

`NodeJs`:

1. The used technologies: `nodejs / postgreSql / express / jest / dotenv`
2. Every functionality is modulated as per their purpose in order to keep it clean, and ready for expand (db->migrations->seeds / src->app/db/extract/helper / tests-> \*.test.js)
3. Environment variables are used dynamically through doenv library.
4. In package.json are configured running script for (start / test) the service.

`PostgreSQl`:

1. It's created a schema (User/DB/Tables & functions), with the tables needed, and the "name" attributes are indexed to have performant queries.
2. Logic query and calculations are encapsulated in DB level, no one can change the logic by mistake in nodeJs, also we can modify the query in runtime direclty in SQL, without redeploying the BE service.
3. Seed Data are used to populate the DB schema for test purpases.

Jest

```sh
1. There are built unit tests for testing functionality and specific test requirements.

```

## Setup

1. Install PostgreSQL and create a database.
2. Config default env variables or use your DB credentials:
   `DB_USER=postgres DB_PASSWORD=xxxxxxxx DB_HOST=localhost DB_PORT=5432 DB_NAME=postgres SERVER_HOST=localhost SERVER_PORT=3000 `
3. Run the migration and seed scripts to set up the database schema and initial data.

```sh
psql -U $DB_USER -d $DB_NAME -f db/migrations/create_tables.sql
psql -U $DB_USER -d $DB_NAME -f db/migrations/create_functions.sql
psql -U $DB_USER -d $DB_NAME -f db/seeds/seed_data.sql
```

## Starting & Testin the Service

```sh
4. Init the Project "npm install"
5. Start The Project "npm start"
6. Exe unit tests "npm test"
7. Call the service from a client: "http://{{SERVER_HOST}}:{{SERVER_PORT}}/query?query={{SEARCH_DATA}}"
```

`Next Release Suggestions`:

1. The BE Project could be reworked in typescript, to reduce the risk of runtime errors.
2. Will be calculated the running time of the query, to reduce the latency and recource usages.
3. The `smart_search` function should be reviewed to solve 100% of the requirements, to reduce some extra join, and to be more performant etc.
4. Add more comprehensive unit tests.
5. handle all error cases.

`@TODO To Be Fixed`

```sh
Currently are passed 5/8 unit tests. The result is returned okay, but the combinations of the objects are not wrapped 100% as are required, I could made it in nodejs, but I insisted on keeping all the logic in the DB level. So an extra enhancement is needed in DB level.
```

`Helper Commands`

1. Create User / DB and grant privilleges

```sql
ALTER USER postgres PASSWORD 'postgres!23';
sudo -u postgres psql;
CREATE USER foodstyles_user WITH PASSWORD 'xxxx';
CREATE DATABASE foodstyles;
GRANT ALL PRIVILEGES ON DATABASE foodstyles TO foodstyles_user;
```

2. Create Schema and load data seed

```sh
sudo -u postgres psql;
\i ./db/migrations/create_tables.sql
\i ./db/migrations/create_functions.sql
\i ./db/seeds/seed_data.sql
```

3. Check db data seed

```sql
select * from cities
union all
select * from brands
union all
select * from dish_types
union all
select * from diets;
```

4. Test the DB function direclty in DB query.

```sql
select \* from extractEntities('london or Manchester');
```
