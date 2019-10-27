import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import firebase from '../firebase'



class Signup extends Component{
    constructor(props){
        super(props)
        this.state = {
            name:'',
            email:'',
            pass:'',
            confirm_pass:'',
            error:null
        }
        this.handleChange = this.handleChange.bind(this)
        this.register = this.register.bind(this)
        //console.log(props)
    }
    
    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
     }
    register(e){
        e.preventDefault()

        fetch('http://localhost:3001/signup',{
            method:'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            //this.setState({data})
            //console.log(this.state)
        })
        .catch(err => console.log(err))

        firebase.auth()
            .createUserWithEmailAndPassword(
                this.state.email,this.state.pass
            )
            .then(a=>{
                firebase.auth().currentUser.sendEmailVerification().then(function(){
                    console.log('Se envio la autentificación')
                    console.log(a.user.emailVerified)
                })
                this.setState({a})
                console.log(this.state)
            }).then(a=>{
                firebase.auth().signOut()
            })
            .catch(error=>{
                console.log(error)
                this.setState({error})
                console.log(this.state)
            })

    }

    render(){
        /*const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer === true) {
            return  <Redirect to="/signin" />
        }*/
        return(
            <div className="container">
                <h1>Formulario de registro</h1>
                <div className="card">
                    <div className="card-content">
                        <form onSubmit={this.register}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input type="text" name="name" onChange={this.handleChange} value={this.state.name} placeholder="Nombre y apellido"/>
                                </div>
                                <div className="input-field col s12">    
                                    <input type="text" name="email" onChange={this.handleChange} value={this.state.email} placeholder="Email"/>
                                </div>
                                <div className="input-field col s12">
                                    <input type="password" name="pass" onChange={this.handleChange} value={this.state.pass} placeholder="Contraseña"/>
                                </div>
                                <div className="input-field col s12">
                                    <input type="password" name="confirm_pass" onChange={this.handleChange} value={this.state.confirm_pass} placeholder="Confirmar contraseña"/>
                                </div>
                                
                                <button type="submit" className="btn light-blue darken-4">Registrarme</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;