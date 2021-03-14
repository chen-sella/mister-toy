const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
const asyncLocalStorage = require('../../services/als.service');

module.exports = {
  query,
  getById,
  remove,
  save,
};

//Get all Toys with filtering:
async function query() {
  try {
    const collection = await dbService.getCollection('toys');
    const toys = await collection.find().toArray();
    return toys;
  } catch (err) {
    logger.error('cannot find toys', err);
    throw err;
  }
}

// Get Toy by Id
async function getById(toyId) {
  try {
    const collection = await dbService.getCollection('toys');
    const toy = await collection.findOne({ _id: ObjectId(toyId) });
    return toy;
  } catch (err) {
    logger.error('cannot find toys', err);
    throw err;
  }
}

// Add new Bug
async function save(toy) {
  try {
    var newToy;
    // const {toyToSave} = toy;
    const toyToSave={
      _id : ObjectId(toy._id),
      name:toy.name,
      price:toy.price,
      type:toy.type,
      inStock:toy.inStock,
      img: toy.img,
    }
    const collection = await dbService.getCollection('toys');
    if (toy._id) {
      newToy = await collection.updateOne({ _id: ObjectId(toyToSave._id) }, { $set: toyToSave });
    } else {
      newToy = await collection.insertOne( toy );
    }
    return newToy;
  } catch (err) {
    logger.error('cannot save toys', err);
    throw err;
  }
}

// Delete a Toy
async function remove(toyId) {
  try {
    const collection = await dbService.getCollection('toys')
    await collection.deleteOne({ _id: ObjectId(toyId) })
  } catch (err) {
    logger.error('cannot remove toys', err);
    throw err;
  }
}

// function _makeId(length = 5) {
//   var txt = '';
//   var possible =
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   for (var i = 0; i < length; i++) {
//     txt += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return txt;
// }

// function _saveToysToFile() {
//   return new Promise((resolve, reject) => {
//     const fs = require('fs');
//     fs.writeFile('data/toy.json', JSON.stringify(gToys, null, 2), (err) => {
//       if (err) reject(err);
//       else resolve();
//     });
//   });
// }