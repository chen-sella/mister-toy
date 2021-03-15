import Vue from 'vue';
import Vuex from 'vuex';
import { userService } from '../services/user-service.js';
import { toyStore } from './toy-store.js';
import { reviewService } from '../services/review-service.js';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    user: null,
    reviews: null,
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    loggedInUser(state) {
      return state.user;
    },
    reviewsToShow(state) {
      return state.reviews;
    },
  },
  mutations: {
    setLoading(state, { isLoading }) {
      state.isLoading = isLoading;
    },
    nextPage(state, { pageIdx }) {
      console.log('state.filterBy', state.filterBy);
      state.filterBy.pageIdx = pageIdx;
    },
    updateMaxPage(state, { maxPage }) {
      state.maxPageIdx = maxPage;
    },
    user(state, { user }) {
      state.user = user;
      console.log(state.user);
    },
    setReviews(state, { reviews }) {
      state.reviews = reviews;
    },
    postReview(state, { review }) {
      state.reviews.push(review);
    },
    removeReview(state, { id }) {
      const idx = state.reviews.findIndex((rev) => rev._id === id);
      state.reviews.splice(idx, 1);
    },
  },
  actions: {
    async login({ commit }, { user }) {
      const newUser = await userService.login(user);
      console.log(newUser);
      commit({ type: 'user', user: newUser });
    },
    async signUp({ commit }, { user }) {
      const newUser = await userService.signUp(user);
      console.log(newUser);
      commit({ type: 'user', user: newUser });
    },
    async logout({ commit }) {
      try {
        await userService.logout();
        commit({ type: 'user', user: null });
      } catch (err) {
        console.log('cannot log out', err);
      }
    },
    async loadReviews({ commit }, { filterBy = {} }) {
      try {
        const reviews = await reviewService.query(filterBy);
        commit({ type: 'setReviews', reviews });
        console.log(reviews);
      } catch (err) {
        console.log('couldnt get reviews', err);
      }
    },
    async addReview({ commit }, { review }) {
      try {
        const savedReview = await reviewService.addReview(review);
        commit({ type: 'postReview', review: savedReview });
      } catch (err) {
        console.log('couldnt post review', err);
      }
    },
    async removeReview({ commit }, { id }) {
      try {
       const res = await reviewService.removeReview(id);
       console.log(res);
        commit({ type: 'removeReview', id });
      } catch (err) {
        console.log('cannot remove review', err);
      }
    },
  },
  modules: {
    toyStore,
  },
});
