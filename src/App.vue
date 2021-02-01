<template>
<div id="app">
  <h1>ToDoリスト</h1>
  <div>
    <div>
      <label><input type="radio" id="all" v-model="radio" value="すべて">すべて</label>
      <label><input type="radio" id="working" v-model="radio" value="作業中">作業中</label>
      <label><input type="radio" id="complete" v-model="radio" value="完了">完了</label>
    </div>
    <table>
      <tr>
        <th>ID</th>
        <th>コメント</th>
        <th>状態</th>
      </tr>
      <tr v-for="(todo, index) in checkState" :key="index">
        <td>{{ todo['id'] }}</td>
        <td>{{ todo['Comment'] }}</td>
        <td><button type="button" @click="changeState">{{ todo['State'] }}</button></td>
        <td><button type="button" @click="deleteTodo">削除</button></td>
      </tr>
    </table>
    <h2>新規タスクの追加</h2>
    <form>
      <input type="text" v-model="comment">
      <button type="button" @click="addTodo(comment); deleteText()">追加</button>
    </form>
  </div>
</div>
</template>

<script>
import { todos, addID } from './store/index.js'
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  data: () => {
    return {
      todos,
      addID,
      radio: 'すべて',
      comment: ''
    }
  },
  methods: {
    ...mapMutations(['addTodo', 'deleteTodo', 'changeState']),
    deleteText() {
      this.comment = ''
    }
  },
  computed: {
    checkState() {
      const TodoList = this.$store.getters.getTodos
      return TodoList.filter(todo => {
        if (this.radio === 'すべて') {
          return todo
        } else if (this.radio === '作業中') {
          return todo['State'] === '作業中'
        } else if (this.radio === '完了') {
          return todo['State'] === '完了'
        }
      })
    }
  }
}
</script>

<style>

</style>
