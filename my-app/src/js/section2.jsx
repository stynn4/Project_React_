import React from 'react';
import CodeBox from './codeBox.jsx';
import TextTyper from './textTyper.jsx';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierSavannaDark } from 'react-syntax-highlighter/styles/hljs';

//section2  =>       TextTyper + EventBox
//          =>       TextTyper
//          =>       EventBox => => AddressBook + CodeBox
//          => =>    AddressBook
//          => =>    CodeBox
//          => => => AddressBook => => => AddressBookForm + AddressBookList



class Section2 extends React.Component {
    render() {

        return (
            <section className='container section2'>
                <TextTyper text={text} />
                <EventBox />
            </section>
        )
    }
}


class EventBox extends React.Component {
    render() {
        return (
            <div className='eventBox'>
                <div className='react'>
                    <AddressBook/>
                </div>
                <div className='codeBox'>
                    <CodeBox brokenCode={codeStringBroken} fullCode={codeStringFull} />
                </div>
            </div>
        )
    }
}

class AddressBook extends React.Component {
    render() {
        return (
            <div>
                <AddressBookForm />
                <AddressBookList />
            </div>
        )
    }
}

class AddressBookForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            person: {
                name: '',
                surname: '',
                phoneNumber: '',
                email: ''
            }
        }
    }

    handleInput = (e) => {

        let person = this.state.person

        let name = e.target.name
        let surname = e.target.surname
        let phoneNumber = e.target.phoneNumber
        let email = e.target.email
        let value = e.target.value

        person[name] = value;

        this.setState({
            person
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // form validation

        let error = false
        let messages = []

        if (this.state.person.name.length === 0) {
            error = true
            messages.push(<div key='nameError'>Wpisz imię; </div>)
        }

        if (this.state.person.surname.length === 0) {
            error = true
            messages.push(<div key='surnameError'>Wpisz nazwisko; </div>)
        }

        if (this.state.person.phoneNumber.length !== 9) {
            error = true
            messages.push(<div key='phoneNumberError'>Numer musi posiadać 9 cyfr; </div>)
        }

        if(this.state.person.email.indexOf('@') === -1) {
            error = true
            messages.push(<div key='emailError'>Wpisz email</div>)
        }

        if (error === false) {
            messages.push(<div key='success'>Dodano nowe dane kontaktowe</div>)

            let people = []

            people.push(this.state.person)

            const obj = {
                "name": people[0].name,
                "surname": people[0].surname,
                "phoneNumber": people[0].phoneNumber,
                "email": people[0].email
            }

            fetch('http://localhost:3000/addressBook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            }).then(function (data) {
                console.log('Request success: ', data);
            })
                .catch(function (error) {
                    console.log('Request failure: ', error);
                });

        }

        this.setState({
            validationMessages: messages,
            validationError: error
        })
    }


    render() {

        let style = {
            color: this.state.validationError ? 'rgb(220, 30, 30)' : 'rgb(10, 82, 52)'
        }

        return (
            <div className='addressBookForm'>
            
                <h3>Formularz</h3>

                <div style={style}>
                    {this.state.validationMessages}
                </div>

                <form onSubmit={this.handleSubmit}>

                    <label>
                        Imię:
                        <input type='text'
                            value={this.state.name}
                            onChange={this.handleInput}
                            id='name'
                            name='name'
                            placeholder='podaj imię' />
                    </label>

                    <label>
                        Nazwisko:
                        <input type='text'
                            value={this.state.surname}
                            onChange={this.handleInput}
                            id='surname'
                            name='surname'
                            placeholder='podaj nazwisko' />
                    </label>

                    <label>
                        Numer telefonu:
                        <input type='text'
                        pattern='[0-9]*'
                            value={this.state.phoneNumber}
                            onChange={this.handleInput}
                            id='phoneNumber'
                            name='phoneNumber'
                            placeholder='podaj numer telefonu' />
                    </label>

                    <label>
                        Adres mailowy:
                        <input type='text'
                            value={this.state.email}
                            onChange={this.handleInput}
                            id='email'
                            name='email'
                            placeholder='podaj email' />
                    </label>

                    <input type='submit' value='zatwierdź' />
                </form>
            </div>
        )
    }
}

class AddressBookList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: false
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/addressBook').then(response => {
            return response.json()
        }).then(data => {
            console.log(data)
            this.setState({
                data: data
            })/*.catch(err => {
                console.log(err)
            })*/
        })
    }

    render() {

        if (this.state.data === false) {
            return <h1 style={{ color: 'rgba(45, 130, 130, 0.5)' }}>pobieram dane ...</h1>
        } else {
            return (
                <div className='addressBookList'>
                    <h3>Lista danych kontaktowych</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>imię</th>
                                <th>nazwisko</th>
                                <th>numer tel.</th>
                                <th>email</th>
                                <th>usuń dane</th>
                            </tr>
                        </thead>
                        <tbody>    
                            {
                                this.state.data.map((person) => {
                                    return (
                                        <tr key={person.id}>
                                            <td>{person.id}</td>
                                            <td>{person.name}</td>
                                            <td>{person.surname}</td>
                                            <td>{person.phoneNumber}</td>
                                            <td>{person.email}</td>
                                            <td><DeleteButton index={person.id} /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

class DeleteButton extends React.Component {

    handleClick = () => {
        fetch('http://localhost:3000/addressBook/' + this.props.index, {
            method: 'DELETE'
        }).then(function (data) {
            console.log('Request success: ', data);
        }).catch(function (error) {
            console.log('Request failure: ', error);
        });
    }

    render() {
        return (
            <button onClick={() => { this.handleClick(this.props.index) }}>X</button>
        )
    }
}


// text for textTyper
const text = `************************ //formularz z danymi kontaktowymi jako kontrolowany
komponent// ************************ //podstawowa walidacja formularza// 
************************ //po zatwierdzeniu dane kontaktowe przesyłane na serwer lokalny 
przy użyciu metody fetch()//
************************ //dane kontaktowe pobierane z lokalnego serwera przy użyciu metody
fetch() podczas załadowania strony// ************************`


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
class AddressBookForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            person: {
                name: '',
                surname: '',
                phoneNumber: '',
                email: ''
            }
        }
    }

    handleInput = (e) => {

        let person = this.state.person

        let name = e.target.name
        let surname = e.target.surname
        let phoneNumber = e.target.phoneNumber
        let email = e.target.email
        let value = e.target.value

        person[name] = value;

        this.setState({
            person
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // form validation

        let error = false
        let messages = []

        if (this.state.person.name.length === 0) {
            error = true
            messages.push(<span key='nameError'>Wpisz imię; </span>)
        }

        if (this.state.person.surname.length === 0) {
            error = true
            messages.push(<span key='surnameError'>Wpisz nazwisko; </span>)
        }

        if (this.state.person.phoneNumber.length !== 9) {
            error = true
            messages.push(<span key='phoneNumberError'>Numer musi posiadać 9 cyfr; </span>)
        }

        if(this.state.person.email.indexOf('@') === -1) {
            error = true
            messages.push(<span key='emailError'>Wpisz email</span>)
        }

        if (error === false) {
            messages.push(<span key='success'>Dodano nowe dane kontaktowe</span>)

            let people = []

            people.push(this.state.person)

            const obj = {
                "name": people[0].name,
                "surname": people[0].surname,
                "phoneNumber": people[0].phoneNumber,
                "email": people[0].email
            }

            fetch('http://localhost:3000/addressBook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            }).then(function (data) {
                console.log('Request success: ', data);
            })
                .catch(function (error) {
                    console.log('Request failure: ', error);
                });

        }

        this.setState({
            validationMessages: messages,
            validationError: error
        })
    }


    render() {

        let style = {
            color: this.state.validationError ? 'rgb(220, 30, 30)' : 'rgb(10, 82, 52)'
        }

        return (
            <div className='addressBookForm'>
                <div style={style}>
                    {this.state.validationMessages}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Imię:
                        <input type='text'
                            value={this.state.name}
                            onChange={this.handleInput}
                            id='name'
                            name='name'
                            placeholder='podaj imię' />
                    </label>

                    <label>
                        Nazwisko:
                        <input type='text'
                            value={this.state.surname}
                            onChange={this.handleInput}
                            id='surname'
                            name='surname'
                            placeholder='podaj nazwisko' />
                    </label>

                    <label>
                        Numer telefonu:
                        <input type='text'
                        pattern='[0-9]*'
                            value={this.state.phoneNumber}
                            onChange={this.handleInput}
                            id='phoneNumber'
                            name='phoneNumber'
                            placeholder='podaj numer telefonu' />
                    </label>

                    <label>
                        Adres mailowy:
                        <input type='text'
                            value={this.state.email}
                            onChange={this.handleInput}
                            id='email'
                            name='email'
                            placeholder='podaj email' />
                    </label>

                    <input type='submit' value='zatwierdź' />
                </form>
            </div>
        )
    }
}

class AddressBookList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: false
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/addressBook').then(response => {
            return response.json()
        }).then(data => {
            console.log(data)
            this.setState({
                data: data
            })/*.catch(err => {
                console.log(err)
            })*/
        })
    }

    render() {

        if (this.state.data === false) {
            return <h1 style={{ color: 'rgba(45, 130, 130, 0.5)' }}>pobieram dane ...</h1>
        } else {
            return (
                <div className='addressBookList'>
                    <table>
                        <tbody>
                            <tr>
                                <th>id</th>
                                <th>imię</th>
                                <th>nazwisko</th>
                                <th>numer tel.</th>
                                <th>email</th>
                                <th>usuń dane</th>
                            </tr>
                            {
                                this.state.data.map((person) => {
                                    return (
                                        <tr key={person.id}>
                                            <td>{person.id}</td>
                                            <td>{person.name}</td>
                                            <td>{person.surname}</td>
                                            <td>{person.phoneNumber}</td>
                                            <td>{person.email}</td>
                                            <td><DeleteButton index={person.id} /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

class DeleteButton extends React.Component {

    handleClick = () => {
        fetch('http://localhost:3000/addressBook/' + this.props.index, {
            method: 'DELETE'
        }).then(function (data) {
            console.log('Request success: ', data);
        }).catch(function (error) {
            console.log('Request failure: ', error);
        });
    }

    render() {
        return (
            <button onClick={() => { this.handleClick(this.props.index) }}>X</button>
        )
    }
}
`


export default Section2;

