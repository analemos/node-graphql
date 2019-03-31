var express 		= require('express');
var graphHTTP 		= require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(
		'type Query { hi: String }'
	);

var root = { hi: () => 'Hello World' };

var app = express();
app.use('/graphql', graphHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true,
		formatError: error => ({
		  message: error.message,
		  locations: error.locations,
		  stack: error.stack ? error.stack.split('\n') : [],
		  path: error.path
		})
	})
);

app.listen(4000, () => console.log('Browse to localhost:4000/graphql'));