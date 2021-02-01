import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    addID: 0
  },
  getters: {
    getTodos: state => state.todos
  },
  mutations: {
    addTodo(state, comment) {
      if (comment) {
        state.todos.push({
          id: state.addID,
          Comment: comment,
          State: '作業中'
        })
        state.addID++
      }
    },
    deleteTodo(state, e) {
      const deleteID = e.target.parentNode.parentNode.firstChild.textContent
      let redefinitionID = 0
      state.todos.splice(deleteID, 1)
      state.addID--
      for (let todo of state.todos) {
        todo.id = redefinitionID
        redefinitionID++
      }
    },
    changeState(state, e) {
      const stateName = e.target.textContent
      const changeID = e.target.parentNode.parentNode.firstChild.textContent
      if (stateName === '作業中') {
        state.todos[changeID]['State'] = '完了'
      } else if (stateName === '完了') {
        state.todos[changeID]['State'] = '作業中'
      }
    }
  }
})
