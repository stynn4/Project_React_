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

        counter = localStorage.getItem('counter')
        tasksFromLclStrg = JSON.parse(localStorage.getItem('TasksArray'))

        let counter = counter
        let tasksFromLclStrg = tasksFromLclStrg;
        console.log(tasksFromLclStrg)
        

        

        this.state = {
            tasks: [],
            task: {
                taskDescription: '',
                id: ''
            },
            formClassName: 'hideForm',
            newTaskClassName: 'showButton',
            counter: counter,
            editedTask: 'false'
        } 
    }

    showForm = () => {
        this.setState({
            formClassName: 'showForm',
            newTaskClassName: 'hideButton',
            counter: Number(this.state.counter) + 1
        })
        localStorage.setItem('counter', this.state.counter)
    }

    handleInput = (e) => {
        let task = this.state.task
        
        this.setState({
            task: {
                taskDescription: e.target.value,
                id: this.state.counter
            }   
        })  
    }

    addNewTask = () => { 

        this.state.tasks.push(this.state.task)
        
        this.setState({
            task: {
                taskDescription: this.state.taskDescription,
                id: this.state.counter
            },
            formClassName: 'hideForm',
            newTaskClassName: 'showButton'
        })
        localStorage.setItem('tasksFromLclStrg', JSON.stringify(this.state.tasks))
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
