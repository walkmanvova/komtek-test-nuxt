import axios from "axios";
export default {
  state() {
    return {
      users: []
    }
  },
  actions: {
    async requestUsers(ctx) {
      try {
        const response = await axios.get('https://my-json-server.typicode.com/walkmanvova/komtek-test/users');
        const result = await response.data;
        ctx.commit('updateUsers', result)
      } catch (error) {
        console.log('error:', error)
      }
    }
  },
  mutations: {
    updateUsers(state, users) {
      state.users = users
    },
    deleteUser(state, userId) {
      state.users = state.users.filter(user => user.id !== userId)
    },
    addUser(state, newUser) {
      newUser.id = Math.max(...state.users.map(i => i.id)) + 1;
      state.users.push(newUser)
    },
    editUser(state, editableUser) {
      state.users.forEach(function(user, i, arr) {
        if(user.id === editableUser.id) {
          state.users[i] = editableUser
        }
      })
    }
  },
  getters: {
    allUsers(state) {
      return state.users
    },
    getCurrentUser: state => userId => {
      return state.users.find(item => item.id === userId)
    }
  }
}
