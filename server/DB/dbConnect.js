/*jshint esversion:6*/

// To spin up local server use below instruction
//cd /Program Files/MongoDB/Server/4.0/bin \
//then run
//mongod.exe --dbpath /Users/adamp/mongo-data

// NOTE: Mongo DB native Documantation: http://mongodb.github.io/node-mongodb-native/

const {MongoClient, ObjectID} = require('mongodb');
const creds = require('./../config/creds');

//const localDB = 'mongodb://localhost:27017/maintReq';

const dataBase = creds.dataBase;
const databaseUrlSplit = dataBase.split('/');
const dbName = databaseUrlSplit[3];

//insert record into DB
const insertDB = (record, collection) => {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(dataBase, (err, client) => {
      if (err) {
        return console.log('Error: problem connecting to mongoDB');
      }
      console.log('Connected to mongoDB');
      const db = client.db(dbName);

      db.collection(collection).insertOne(record,(err, res) => {
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
    MongoClient.connect(dataBase, (err, client) => {
      if (err) {
        return console.log('Error: problem connecting to mongoDB');
      }
      console.log('connected to mongoDB');
      const db = client.db(dbName);

      db.collection('firstReq').findOneAndUpdate({
        _id: new ObjectID(id)
      },{
        $set: {
          status: record,
        }
      },{
        returnOriginal: false
      }).then((res) => {
        console.log('Record updated');
      })
      client.close();
    });
  });
};


const logDB = (id, logEntry) => {
return new Promise(function(resolve, reject) {
  MongoClient.connect(dataBase, (err, client) => {
    if (err) {
      return console.log('Error: problem connecting to mongoDB');
    }
    console.log('connected to mongoDB');
    const db = client.db(dbName);

    db.collection('firstReq').findOneAndUpdate({
      _id: new ObjectID(id)
    },{
      $push: {
        activity: {
          Date: new Date,
          activity:logEntry,

        },
      }
    },{
      returnOriginal: false
    }).then((res) => {
      console.log('Record updated');
    })
    client.close();
  });
});
};

// // ---------------------------get all records where service type matches-------------------------------------
// const getVendor = (location, serviceType) => {
//   return new Promise((resolve, reject) => {
//     MongoClient.connect(dataBase, (err, client) => {
//       if (err) {
//       return console.log('Error: problem connecting to mongoDB');
//       }
//       console.log('connected to mongoDB');
//       const db = client.db('crdo_req_test');
//       db.collection('vendors').find({'skillSet':{[serviceType]:true}}).toArray().then((value) => {
//         console.log(value);
//         resolve(value);
//       })
//     })
//   });
// }

// -------------------------------get one vendor that matches service type ---------------------------------------
const getVendor = (serviceType) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dataBase, (err, client) => {
      if (err) {
      return console.log('Error: problem connecting to mongoDB getVendor');
      }
      console.log('connected to mongoDB');
      const db = client.db(dbName);
      db.collection('vendors').findOne({'skillSet':{[serviceType]: true}}).then((value) => {
        resolve(value);
      })
    })
  });
}

const getServiceOrder = (ID) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dataBase, (err, client) => {
      if (err) {
      return console.log('Error: problem connecting to mongoDB getServiceOrder');
      }
      console.log('connected to mongoDB');
      const db = client.db(dbName);
      db.collection('firstReq').findOne({_id:new ObjectID(ID)}).then((value) => {
        resolve(value);
      })
    })
  });
}


module.exports = {insertDB, updateDB, logDB, getVendor, getServiceOrder};
