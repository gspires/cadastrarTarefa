import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
    constructor(props){
        super(props)
        this.state = {
            description: '',
            list : []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.reflesh()
    }
    handleMarkAsPending(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done:false})
        .then(resp => this.reflesh(this.state.description))
    }
    handleMarkAsDone(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done:true})
        .then(resp => this.reflesh(this.state.description))
    }
    handleRemove(todo){
        axios.delete(`${URL}/${todo._id}`)
        .then(resp => this.reflesh(this.state.description))
    }

    reflesh(description = ''){
        const search = description ? `&description__regex=/${description }/` : ''
        console.log(search)
        axios.get(`${URL}?sort=-createdAt${search}`)
        .then(resp => this.setState({...this.state, description, list: resp.data}))
    }

    handleSearch(){
        this.reflesh(this.state.description)
    }

    handleAdd(){
       const description = this.state.description
       axios.post(URL, { description } )
       .then(resp=> this.reflesh())
    }
    handleChange(e){
        this.setState({...this.state, description: e.target.value})
    }
    render(){
        return(
            <div>
                <PageHeader name='tarefas' small='cadastro' />
                <TodoForm description={this.state.description} handleSearch={this.handleSearch} handleAdd={this.handleAdd} handleChange={this.handleChange}/>
                <TodoList list={this.state.list} 
                handleRemove={this.handleRemove} 
                handleMarkAsDone={this.handleMarkAsDone} 
                handleMarkAsPending={this.handleMarkAsPending}/>
            </div>
        )
    }
}