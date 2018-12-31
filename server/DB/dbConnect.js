/*jshint esversion:6*/

// To spin up local server use below instruction
//cd /Program Files/MongoDB/Server/4.0/bin \
//then run
//mongod.exe --dbpath /Users/adamp/mongo-data

// NOTE: Mongo DB native Documantation: http://mongodb.github.io/node-mongodb-native/

const mongoCliant = require('mongodb');

const testObj = {
  name: 'Daniella',
  age: 8,
  bff: 'Dahlia',
  favFood: 'candy'
};

const insertDB = function(record) {
  mongoCliant.connect('mongodb://localhost:27017/maintReq', (err, client) => {
    if (err) {
      return console.log('Error: problem connecting to mongoDB');
    }
    console.log('connected to mongoDB');
    const db = client.db('maintReq');

    db.collection('firstReq').insertOne(record,(err, res) => {
      if (err) {
        return console.log('Error: and error occurd on insertOne', err);
      }
      console.log('record saved');
    })
    client.close();
  });
}

module.exports = {insertDB};
