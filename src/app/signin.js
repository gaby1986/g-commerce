import React, {Component} from 'react'
import {Link,Redirect} from 'react-router-dom'
import firebase from '../firebase'
import {AuthContext} from '../my_auth'



class Signin extends Component{
    static contextType = AuthContext
    constructor(props){
        super(props)
        this.state={
                email:'',
                pass:'',
                error: null,
                redirect: false,
                checkEmail: '',
        }
        this.handleInput = this.handleInput.bind(this)
        this.login = this.login.bind(this)
       
    }
    handleInput(e){
        //console.log(e.currentTarget)
        this.setState({
                ...this.state,
                [e.currentTarget.name]: e.currentTarget.value
        })
        e.preventDefault()
    }
    
    login(e){
        e.preventDefault()
        this.setState({error:null})
        firebase.auth()
        .signInWithEmailAndPassword(
            this.state.email,this.state.pass
            ).then(a=>{
                //console.log("ingreso correcto");
                var user = firebase.auth().currentUser;
                if (a.user.emailVerified===true) {
                    // User is signed in.
                    this.setState({user})
                    console.log(this.state)
                    this.props.history.push("/")
                } else {
                    this.setState({user})
                    console.log(this.state)
                    console.log(this.state)
                    // No user is signed in.
                    console.log("email invalido")
                }
            }).catch(error=>{
                this.setState({error})
                console.log(error)
            })
    }
    
   

    render(){
        if (this.state.redirect) {
            return <Redirect push to="/" data={this.state.redirect}/>;
        }

        return(
            <div className="container">
                <div className="row">
                    <div className="col s12 m4">
                        <h1>Ingresar</h1>
                        <p className="text-danger">
                            {this.state.error ? this.state.error.message : ' '}
                        </p>
                        <div className="card">
                            <div className="card-image">
                                <img alt="hola" src="http://placeimg.com/400/100/any" />
                                <span className="card-title">Card Title</span>
                            </div>
                            <div className="card-content">
                                <form onSubmit={this.login}>
                                    <div className="row">
                                        <div className="col s12">
                                            <div className="input-field col s12">    
                                                <input type="text" onChange={this.handleInput} value={this.state.email} name="email" placeholder="Email"/>
                                            </div>
                                            <div className="input-field col s12">
                                                <input type="password" onChange={this.handleInput} value={this.state.pass} name="pass" placeholder="Contraseña"/>
                                            </div>                       
                                            <button type="submit" className="btn light-blue darken-4">Ingresar</button>
                                            <div>
                                                <span>¿No tenes cuenta?</span>
                                                <Link to="/signup">Registrarme</Link>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signin;