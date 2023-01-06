const { MongoClient } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'products-management';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('unable to connect');
    }
    const db = client.db(databaseName);
    db.collection('products')
        .deleteOne({
            description: 'You need to add the product',
        })
        .then((result) => {
            console.log('SUCCESS', result);
        })
        .catch((err) => {
            console.log('ERROR', err);
        });
});
