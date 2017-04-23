module.exports = {
		development: {
		client: 'pg',
    connection: {
      host     : '127.0.0.1',
       user     : 'alex',
       password : 'moby',
       database : 'naturalistdb'
     }
		},

		production: {
		client: 'pg',
		connection: process.env.DATABASE_URL
		}
	};
