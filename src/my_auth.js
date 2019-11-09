import React from 'react'
import firebase from './firebase'
const obtengoToken = localStorage.getItem('token')
export const AuthContext = React.createContext({})

export const AuthContextConsumer = AuthContext.Consumer;

export class AuthContextProvider extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            isLoggedIn: false,
            authReady: false,
            email: null,
            checkEmail: false,
            password: '',
            token: ''
        }
    }
    
    componentDidMount(){

        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {           
                // User is signed in.      
                if(user.emailVerified === true){
                    console.log(obtengoToken)
                    this.setState({isLoggedIn: true,authReady:true, email: user.email, checkEmail: user.emailVerified, token:obtengoToken})
                    console.log(this.state)
                    fetch('http://localhost:3001/signin',{
                        method: 'POST',
                        body: JSON.stringify(this.state),
                        headers:{
                            'Accepte': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }).then(res => res.json())
                    .then(data => {
                        if(data.token){
                            localStorage.setItem('token', data.token)
                            const test = localStorage.getItem('token')    
                            this.setState({isLoggedIn: true,authReady:true, email: user.email, checkEmail: user.emailVerified, token:test})
                            console.log(data)
                            console.log(this.state)
                        }
                    }).catch(error => console.log(error))
                }else{
                    this.setState({isLoggedIn: false,authReady:true, email:"No estas logeado", checkEmail:false, token: ''})
                    firebase.auth().signOut()
                }

            } else {
                this.setState({isLoggedIn: false,authReady:true, email:"No estas logeado",password:'', checkEmail:false, token: 'empty' })
                // User is signed out.
                console.log(this.state)
            }
          });
               
     } 
     componentWillUnmount() {
         this.unsubscribe();
    }
    
    render() {
        return (
            <AuthContext.Provider value={this.state}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}