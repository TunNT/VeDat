import ActionTypes from "./action-types";
import MutationTypes from "./mutation-types";

const actions = {
  async [ActionTypes.OWNER_LIST]({ commit }, payload) {
    commit(MutationTypes.SET_LOADING, true);
    try {
      const response = await this.$axios.$get("/admin/owners", {
        params: payload
      });
      commit(MutationTypes.SET_OWNERS, response);
    } catch (err) {
      // handle error
      commit(MutationTypes.SET_OWNERS, {});
    } finally {
      commit(MutationTypes.SET_LOADING, false);
    }
  },

  async [ActionTypes.OWNER_CREATE]({ commit }, payload) {
    commit(MutationTypes.SET_LOADING, true);
    let response;
    try {
        response = await this.$axios.$post("/admin/owners", {
            ...payload,
        });
    } catch (err) {
        // handle error
    } finally {
        commit(MutationTypes.SET_LOADING, false);
        return response;
    }
},

  async [ActionTypes.OWNER_DETAIL]({ commit }, payload) {
    commit(MutationTypes.SET_LOADING, true);
    let site = {};
    try {
      site = {}; // await [call api get site depend on payload]
      commit(MutationTypes.SET_USER, { site });
    } catch (err) {
      // handle error
    } finally {
      commit(MutationTypes.SET_LOADING, false);
    }
    return site;
  },

  async [ActionTypes.OWNER_UPDATE](_, payload) {
    const { status, name, address, phone, notes } = payload;
    const response = await this.$axios.$put(`/admin/owners/${payload.id}`,{ status, name, address, phone, notes });
    return response;
  },

  async [ActionTypes.OWNER_DELETE](_, id) {
    const response = await this.$axios.$delete(`/admin/sites/${id}`);
    return response;
  }
};

export default actions;