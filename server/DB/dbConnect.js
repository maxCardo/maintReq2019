/*jshint esversion:6*/

// To spin up local server use below instruction
//cd /Program Files/MongoDB/Server/4.0/bin \
//then run
//mongod.exe --dbpath /Users/adamp/mongo-data

// NOTE: Mongo DB native Documantation: http://mongodb.github.io/node-mongodb-native/

const {MongoClient, ObjectID} = require('mongodb');

//db connection
//dep
const herkuDB = 'mongodb://heroku_jq2k8b5m:oteuiavf5t3k8t5olvdsp0e49h@ds145694.mlab.com:45694/heroku_jq2k8b5m';
//dev
const mlabDB = 'mongodb://user:mcgtest2018@ds145704.mlab.com:45704/crdo_req_test';
//test
const localDB = 'mongodb://localhost:27017/maintReq';


//insert record into DB
const insertDB = (record) => {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(mlabDB, (err, client) => {
      if (err) {
        return console.log('Error: problem connecting to mongoDB');
      }
      console.log('Connected to mongoDB');
      const db = client.db('crdo_req_test');

      db.collection('firstReq').insertOne(record,(err, res) => {
        if (err) {
          return console.log('Error: and error occurd on insertOne', err);
        }
        resolve(res.ops[0]);
      });
      client.close();
    });
  });
}

const updateDB = (id,record) => {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(mlabDB, (err, client) => {
      if (err) {
        return console.log('Error: problem connecting to mongoDB');
      }
      console.log('connected to mongoDB');
      const db = client.db('crdo_req_test');

      db.collection('firstReq').findOneAndUpdate({
        _id: new ObjectID(id)
      },{
        $set: {
          status: 'schedualed',
        }
      },{
        returnOriginal: false
      }).then((res) => {
        console.log(res);
      })

    });
      client.close();
  });
};

<<<<<<< HEAD
=======
// function(record) {
//   mongoClient.connect(mlabDB, (err, client) => {
//     if (err) {
//       return console.log('Error: problem connecting to mongoDB');
//     }
//     console.log('connected to mongoDB');
//     const db = client.db('crdo_req_test');
//
//     db.collection('firstReq').insertOne(record,(err, res) => {
//       if (err) {
//         return console.log('Error: and error occurd on insertOne', err);
//       }
//       console.log('record saved');
//     })
//     client.close();
//   });
// }
//
>>>>>>> e98dc0041ed3e33ffe997a82e9d4be462fb060ab


module.exports = {insertDB, updateDB};
