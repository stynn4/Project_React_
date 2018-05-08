import React from 'react';
import CodeBox from './codeBox.jsx';
import TextTyper from './textTyper.jsx';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierSavannaDark } from 'react-syntax-highlighter/styles/hljs';
import { Scrollbars } from 'react-custom-scrollbars';



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