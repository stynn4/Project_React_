import React from 'react';
import CodeBox from './codeBox.jsx';
import TextTyper from './textTyper.jsx';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierSavannaDark } from 'react-syntax-highlighter/styles/hljs';
import { Scrollbars } from 'react-custom-scrollbars';



class Section1 extends React.Component {
    render(){
        
        const text = '=> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'

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
            }
        } 
    }

    handleInput = (e) => {
        this.setState({
            newTask: {
                taskDescription: e.target.value,
                status: 'do zrobienia'
            }
        })
        
    }

    handleClick = () => { 

        this.state.tasks.push(this.state.newTask)

        this.setState({
            newTask: {
               taskDescription: ''
            }
        })
     console.log(this.state.tasks)
        
    }

    render(){
        
        return (
            <div className='toDoList'>
                <div className='newTask'>
                    <button>Dodaj zadanie</button>
                    <input 
                    type='text'
                    value={this.state.taskDescription}
                    onChange={this.handleInput}
                    id='taskDescription'
                    placeholder='wpisz nowe zadanie'
                    />
                    <button onClick={this.handleClick}>nowe zadanie</button>
                </div>

                <div className='taskList'>
                    <h2>Lista rzeczy do zrobienia</h2>
                    <ul>
                        {
                            this.state.tasks.map((task, index) => {
                                return (
                                
                                    <li key={index}>
                                        <p>{task.taskDescription}</p>
                                        <span>Status: {task.status}</span>
                                        <button >usuń</button>
                                    </li> 
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}


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
class ApiBox extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            data: false
        }
    }
 
    componentDidMount(){
        
        fetch('https://api.nasa.gov/planetary/apod?api_key=HcI9D0bdacVk9icon6WnwhapN5GAhXM28Rx9YuH3').then(response => {
            return response.json()
        }).then(data => {
            console.log(data)
            
            this.setState({
                data:data
            })/*.catch(err => {
                console.log(err)
            })*/
        })
    }

    mouseEnter = () => {
        this.setState({
            text: 'powiększ zdjęcie'
        })
    }

    mouseLeave = () => {
        this.setState({
            text: ''
        })
    }
        

    render(){

        if(this.state.data === false){
            return <h1 style={{color: 'rgba(45, 130, 130, 0.5)'}}>pobieram dane ...</h1>
        } else {
            return (
                <div className='apiBox'>
                    <p>Tytuł zdjęcia: {this.state.data.title}</p>
                    <div>

                        <a href={this.state.data.url}
                        onMouseEnter={this.mouseEnter} 
                        onMouseLeave={this.mouseLeave}>
                            <img src={this.state.data.url} 
                            alt='nasaImageOfTheDay'/>
                        </a>

                        <p className='textBeforeImg'>{this.state.text}</p>
                        <h4>Zdjęcie dnia: </h4>
                        <p>{this.state.data.date}</p>
                        <h4>Copyright: </h4>
                        <p>{this.state.data.copyright}</p>

                    </div>

                    <div>

                        <h4>Opis: </h4>
                        <Scrollbars style={{height: 255}}>
                            <p>{this.state.data.explanation}</p>
                        </Scrollbars>

                    </div>
                </div>
		    )         
        }
    }
}`

export default Section1;

           


