import { toyService } from '../services/toy-service.js';

export const toyStore = {
  strict: true,
  state: {
    toys: null,
    filterBy: { filter: 'all', searchStr: '', pageIdx: 0 },
    maxPageIdx: null,
  },
  getters: {
    toysForDisplay(state) {
      return state.toys;
    },
    maxPage(state) {
      return state.maxPageIdx;
    },
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys;
    },
    addToy(state, { toy }) {
      state.toys.push(toy);
    },
    updateToy(state, { toy }) {
      const idx = state.toys.findIndex((t) => t._id === toy._id);
      state.toys.splice(idx, 1, toy);
    },
    removeToy(state, { toyId }) {
      const idx = state.toys.findIndex((t) => t._id === toyId);
      state.toys.splice(idx, 1);
    },
    filter(state, { filterBy }) {
      console.log(filterBy);
      state.filterBy = filterBy;
    },
    nextPage(state, { pageIdx }) {
      console.log('state.filterBy', state.filterBy);
      state.filterBy.pageIdx = pageIdx;
    },
    updateMaxPage(state, { maxPage }) {
      state.maxPageIdx = maxPage;
    },
  },
  actions: {
    async loadToys({ commit, state }) {
      commit({ type: 'setLoading', isLoading: true });
      try {
        const toys = await toyService.query();
        console.log('toys', toys);
        commit({ type: 'setToys', toys });
        // commit({type:'updateMaxPage', maxPage})
        commit({ type: 'setLoading', isLoading: false });
      } catch (err) {
        console.log('cannot load toys', err);
      }
    },
    async saveToy({ commit }, { toyToSave }) {
      console.log('toyToSave', toyToSave);
      commit({ type: 'setLoading', isLoading: true });
      const type = toyToSave._id ? 'updateToy' : 'addToy';
      try {
        const savedToy = await toyService.save(toyToSave);
        commit({ type, toy: savedToy });
        commit({ type: 'setLoading', isLoading: false });
      } catch (err) {
        console.log('cannot save toy', err);
      }
    },
    async removeToy({ commit }, payload) {
      await toyService.remove(payload.toyId);
      commit(payload);
    },
  },
};
