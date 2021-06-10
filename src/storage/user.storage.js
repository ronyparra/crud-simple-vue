const USER = "USER";

export const user = {
  insert: (data) => {
    let userData = [];
    const currentData = user.get();
    currentData ? (userData = [...currentData, data]) : (userData = [data]);
    localStorage.setItem(USER, JSON.stringify(userData));
  },
  get: () => JSON.parse(localStorage.getItem(USER)),
  getById: (id) => this.get().find((userdata) => userdata.id === id),
  delete: (id) => {
    const userData = user.get();
    const userDelete = userData.find((u) => u.id === id);
    userData.splice(userData.indexOf(userDelete), 1);
    localStorage.setItem(USER, JSON.stringify(userData));
  },
};
