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
        <tr v-for="(todo, index) in $store.state.todos" :key="index" v-show="checkState(todo)">
          <td>{{ index }}</td>
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
import { todos } from './store/index.js'
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  data: () => {
    return {
      todos,
      // 下記2つの定義値は一時的にしか使用にないためvuexで値を持たせる必要がないと判断した
      radio: 'すべて',
      comment: ''
    }
  },
  methods: {
    // ストアに定義してあるtodosを使う関数のみマッピングした
    // deleteText()とcheckState(todo)はtodosを使わないためマッピングの必要がないと判断した
    ...mapMutations(['addTodo', 'deleteTodo', 'changeState']),
    deleteText(){
      this.comment = ''
    },
    // ラジオボタンに応じて全てのtodoの状態を確認してソート
    checkState(todo){
      if(this.radio === 'すべて'){
        return true
      }else if(
        (this.radio === '作業中' && this.radio === todo['State'])
        ||(this.radio === '完了' && this.radio === todo['State'])
      ){
        return true
      }else{
        return false
      }
    }
  }
}
</script>

<style>

</style>
