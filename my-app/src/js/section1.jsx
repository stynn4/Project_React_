import React from 'react';
import CodeBox from './codeBox.jsx';
import TextTyper from './textTyper.jsx';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierSavannaDark } from 'react-syntax-highlighter/styles/hljs';
import { Scrollbars } from 'react-custom-scrollbars';
import pencil from '../img/icons8-pencil-50.png';


//section1  =>       TextTyper + EventBox
//          =>       TextTyper
//          =>       EventBox => => ToDoList + CodeBox
//          => =>    TodoList
//          => =>    CodeBox

class Section1 extends React.Component {
    render(){
        
        return (
            <section className='container section1'>
                <TextTyper text={text}/>
                <EventBox/>
            </section>
        )
    }
}

class EventBox extends React.Component {
    render(){
        return (
            
            <div className='eventBox'>
                <div className='react'>
                    <ToDoList/>
                </div>
                <div className='codeBox'>
                    <CodeBox brokenCode={codeStringBroken} fullCode={codeStringFull}/>   
                </div>
            </div>
        )
    }
}

class ToDoList extends React.Component {
    constructor(props){
        super(props)
        
        tasks = JSON.parse(localStorage.getItem('tasks'))
        
        let tasks = tasks;
        let lastElmnt;
        let lastId;

        if(tasks === null){
            tasks = []
            lastId = 0
        } else {

            lastElmnt = tasks.slice(-1)
            lastId = lastElmnt[0].id
        }
        console.log(tasks)

        this.state = {
            tasks: tasks,
            task: {
                taskDescription: '',
                id: ''
            },
            formClassName: 'hideForm',
            newTaskClassName: 'showButton',
            nextId: lastId,
            editedTask: 'false'
        } 
    }

    showForm = () => {
        this.setState({
            formClassName: 'showForm',
            newTaskClassName: 'hideButton',
            nextId: Number(this.state.nextId) + 1
        })
    }

    handleInput = (e) => {
        let task = this.state.task
        
        this.setState({
            task: {
                taskDescription: e.target.value,
                id: this.state.nextId
            }   
        })  
    }

    addNewTask = () => { 

        this.setState({
            task: {
                taskDescription: this.state.taskDescription
            },
            formClassName: 'hideForm',
            newTaskClassName: 'showButton'
        })

        this.state.tasks.push(this.state.task)
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks))
        console.log(this.state.tasks)
    }

    editTask = (e, task) => {

        this.setState({
            editedTask: 'false'
        })
    }

    removeTask = (task) => {
       
        const tasksAfterRemove = this.state.tasks.filter((element) => {
            return element !== task
        })

        this.setState({
            tasks: tasksAfterRemove
        })

        let indexToRemove = this.state.tasks.indexOf(task)
        this.state.tasks.splice(indexToRemove, 1)
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks))
        
    }

    render(){
        
        return (
            <div className='toDoList'>
                <div className='newTask'>
                    <button className={this.state.newTaskClassName} onClick={this.showForm}>nowe zadanie</button>
                    <form className={this.state.formClassName}>
                        <input 
                        type='text'
                        value={this.state.taskDescription}
                        onChange={this.handleInput}
                        id='taskDescription'
                        placeholder='wpisz nowe zadanie'
                        />
                        <button onClick={this.addNewTask}>dodaj zadanie</button>
                    </form>
                </div>

                <div className='taskList'>
                    <h2>Lista rzeczy do zrobienia</h2>
                    <Scrollbars>
                        <ul>
                            {
                                this.state.tasks.map((task) => {
                                    return (
                                    
                                        <li key={task.id} >
                                            <div /*contentEditable={this.state.editedTask}*/>{task.taskDescription}</div>
                                            <div>
                                            <img src={pencil} 
                                            alt='pencil'
                                            onClick={ (e) => this.editTask(task, e) }/>    
                                            <button onClick={ (e) => this.removeTask(task, e) }>x</button>
                                            </div>
                                        </li> 

                                    )
                                })
                            }
                        </ul>
                    </Scrollbars>
                </div>
            </div>
        )
    }
}


// text for textTyper
const text = `************************ //pole do wpisania zadania po naciśnięciu
przycisku nowe zadanie// ************************ //przycisk dodaj zadanie => dodanie 
nowego elementu do tablicy tasks oraz wygenerowanie nowego elementu listy w sekcji
Lista rzeczy do zrobienia// ************************ //w planach local storage// 
************************`

// brokenCode for CodeBox
let codeStringBroken = `
class ApiBox extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            data: false
        }`


//fullCode for CodeBox
let codeStringFull = `
class ToDoList extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            tasks: [],
            newTask: {
                taskDescription: ''
            },
            formClassName: 'hideForm',
            newTaskClassName: 'showButton'
        } 
    }

    showForm = () => {
        this.setState({
            formClassName: 'showForm',
            newTaskClassName: 'hideButton'
        })
    }

    handleInput = (e) => {
        this.setState({
            newTask: {
                taskDescription: e.target.value
            }
        })  
    }

    addNewTask = () => { 

        this.state.tasks.push(this.state.newTask)

        this.setState({
            newTask: {
               taskDescription: ''
            },
            formClassName: 'hideForm',
            newTaskClassName: 'showButton'
        })
    }


    render(){
        
        return (
            <div className='toDoList'>
                <div className='newTask'>
                    <button className={this.state.newTaskClassName} onClick={this.showForm}>nowe zadanie</button>
                    <form className={this.state.formClassName}>
                        <input 
                        type='text'
                        value={this.state.taskDescription}
                        onChange={this.handleInput}
                        id='taskDescription'
                        placeholder='wpisz nowe zadanie'
                        />
                        <button onClick={this.addNewTask}>dodaj zadanie</button>
                    </form>
                </div>

                <div className='taskList'>
                    <h2>Lista rzeczy do zrobienia</h2>
                    <Scrollbars>
                        <ul>
                            {
                                this.state.tasks.map((task, index) => {
                                    return (
                                    
                                        <li key={index} className={this.state.notesClassname}>
                                            <div>{task.taskDescription}</div>
                                            <div>
                                            <button>x</button>
                                            </div>
                                        </li> 
                                    )
                                })
                            }
                        </ul>
                    </Scrollbars>
                </div>
            </div>
        )
    }
}`

export default Section1;

// https://icons8.com/icon/1057/pencil
