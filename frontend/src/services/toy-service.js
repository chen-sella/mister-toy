import { httpService } from './http.service.js';

const KEY = 'toysDB';
// const TOY_URL =
//   process.env.NODE_ENV !== 'development'
//     ? '/api/toy/'
//     : '//localhost:3000/api/toy/';
const TOY_URL = 'toy/';

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
};

async function query(filterBy) {
  try {
    const queryStr = `?filterBy=${JSON.stringify(filterBy)}`;
    const toys = await httpService.get(TOY_URL+queryStr);
    return toys;
  } catch (err) {
    console.log(err);
  }
}

async function getById(id) {
  try {
    const toy = await httpService.get(TOY_URL + id);
    return toy;
  } catch (err) {
    console.log('cannot get toy by id', err);
  }
}

async function remove(id) {
  try {
    const toy = await httpService.delete(TOY_URL + id);
    return toy;
  } catch (err) {
    console.log('cannot remove toy', err);
  }
}

async function save(toy) {
  var newToy;
  try {
    if (toy._id) {
      newToy = await httpService.put(TOY_URL + toy._id, toy);
    } else {
      newToy = await httpService.post(TOY_URL, toy);
    }
    return newToy;
  } catch (err) {
    console.log('cannot save toy', err);
  }
}

function getEmptyToy() {
  return {
    name: '',
    price: 0,
    type: '',
    code: 'general',
    createdAt: Date.now(),
    inStock: true,
    img: _randImg(),
  };
}

function _randImg() {
  const imgs = [
    'https://images.unsplash.com/photo-1545997281-2cfe4d4b740f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=967&q=80',
    'https://images.unsplash.com/photo-1473662711507-13345f9d447c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1595550903979-1969e5adeb92?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1051&q=80',
    'https://images.unsplash.com/photo-1568639837178-c794256b9b98?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1613771404721-1f92d799e49f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
  ];
  const randInt = _getRandomInt(0, imgs.length - 1);
  return imgs[randInt];
}

function _getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
