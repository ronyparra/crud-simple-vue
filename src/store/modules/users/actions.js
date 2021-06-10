import { FETCH } from "./contants";
import { uid } from "uid";
import { user } from "../../../storage/user.storage";
export default {
  async fetchUsers({ commit }) {
    const data = user.get() || [];
    commit(FETCH, data);
    return;
  },
  async createUser({ dispatch }, form) {
    const data = {
      id: uid(),
      ...form,
    };
    user.insert(data);
    dispatch("fetchUsers");
    return;
  },
  async deleteUser({ dispatch }, id) {
    user.delete(id);
    dispatch("fetchUsers");
    return;
  },
};
