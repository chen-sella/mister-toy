import { httpService } from './http.service.js';

const REV_URL = 'review/';

export const reviewService = {
  query,
  addReview
};

async function query(filterBy) {
  try {
    const queryStr = (!filterBy)? '': `?toyId=${filterBy.toyId}`
    const reviews = await httpService.get('review'+queryStr);
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
