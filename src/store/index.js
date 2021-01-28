import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  mutations: {
    addTodo(state, comment) {
      if (comment) {
        state.todos.push({
          Comment: comment,
          State: '作業中'
        })
      }
    },
    deleteTodo(state, e) {
      const deleteID = e.target.parentNode.parentNode.firstChild.textContent
      state.todos.splice(deleteID, 1)
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
