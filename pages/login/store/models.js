

export const user = {
  state: {
    phone: '',
    password: ''
  },

  reducers: {
    setPhone(state, phone) {
      return {...state, phone};
    },
    setPassword(state, password) {
      return {...state, password};
    }
  }
};
