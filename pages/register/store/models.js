

export const user = {
  state: {
    phone: '',
    name: '',
    password: '',
    repeatPassword: ''
  },

  reducers: {
    setPhone(state, phone) {
      return {...state, phone};
    },
    setName(state, name) {
      return {...state, name};
    },
    setPassword(state, password) {
      return {...state, password};
    },
    setRepeatPassword(state, repeatPassword) {
      return {...state, repeatPassword};
    }
  }
};
