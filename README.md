# hapi_rest_api

This application uses the hapi framework to create a simple CRUD application.

## One Rest Resource API

This is a simple one resource api.  The resource uses MongoDB as a database.  In order to
use MongoDB, please refer to [MongoDB Docs](https://docs.mongodb.org/manual/).

The default port for this application is ```process.env.PORT``` or ```3000```
Example,
```
localhost:3000/hero
```

### GET

A GET request will return all data in the appropriate collection.
```
/hero
```

### POST

A POST request will allow users to add a hero or villain to their collection. Posts should be made
to:
```
/hero
```

Use the following format:

Hero Schema:
```
{name:'string', powerLevel: <number 1-10>, superPower: [array of strings], archNemesis: 'string'}
```

### PUT / DELETE

PUT requests allow the user to update the information for an appropriate hero.
DELETE requests allow the user to delete the hero from the collection.

To make a PUT or DELETE, use the Mongo generated _id at then end of the path:
```
/hero/{id}
```
