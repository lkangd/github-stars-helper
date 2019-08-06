import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    controller: null,
    isInstalled: false,
    affectedRepo: '',
  },
  getters: {
    store: state => state.controller.store,
  },
  actions: {
    async INSTALL_CONTROLLER({ commit, state }, controller) {
      if (state.isInstalled) return;

      await controller.init();
      state.controller = controller;
      state.isInstalled = true;
    },
    ADD({ dispatch, commit, getters, rootState, state }, remark) {
      state.controller.add(remark);
    },
    UPDATE({ dispatch, commit, getters, rootState, state }, remark) {
      state.controller.update(remark);
      dispatch('UPDATE_AFFECTED_REPO', remark.id);
    },
    DELETE({ dispatch, commit, getters, rootState, state }, id) {
      state.controller.delete(id);
    },
    async REVERT_STORE({ dispatch, commit, getters, rootState, state }, store) {
      await state.controller.revertStore(store);
    },
    UPDATE_AFFECTED_REPO({ state }, id) {
      state.affectedRepo = id;
      setTimeout(() => {
        state.affectedRepo = '';
      }, 0);
    },
  },
};