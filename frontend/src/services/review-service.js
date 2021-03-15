import { httpService } from './http.service.js';

const REV_URL = 'review/';

export const reviewService = {
  query,
  addReview,
  removeReview,
};

async function query(filterBy) {
  try {
    var queryStr;
    if (!filterBy) {
      queryStr = '';
    } else if (filterBy.toyId) {
      queryStr = `?toyId=${filterBy.toyId}`;
    } else {
      queryStr = `?userId=${filterBy.userId}`;
    }
    const reviews = await httpService.get(REV_URL + queryStr);
    return reviews;
  } catch (err) {
    console.log(err);
  }
}

async function addReview(review) {
  try {
    const savedReview = await httpService.post(REV_URL, review);
    return savedReview;
  } catch (err) {
    console.log(err);
  }
}

async function removeReview(id) {
  try {
    await httpService.delete(REV_URL + id);
  } catch (err) {
    throw new Error('Cant remove review', err);
  }
}
