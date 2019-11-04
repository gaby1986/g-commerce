import React from 'react'
import firebase from './firebase'

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
        var obtengoToken = ''
        obtengoToken = sessionStorage.getItem('token')
        console.log(obtengoToken)
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {           
              // User is signed in.      
                if(user.emailVerified === true){
                    this.setState({isLoggedIn: true,authReady:true, email: user.email, checkEmail: user.emailVerified,password:sessionStorage.getItem('key'), token:obtengoToken})
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
                            sessionStorage.setItem('token', data.token)    
                        }
                            console.log(data)
                        this.setState({isLoggedIn: true,authReady:true, email: user.email, checkEmail: user.emailVerified, token:obtengoToken})
                        console.log(this.state)
                    }).catch(error => console.log(error))
                }else{
                    this.setState({isLoggedIn: false,authReady:true, email:"No estas logeado", checkEmail:false, token: ''})
                    firebase.auth().signOut()
                }

            } else {
                this.setState({isLoggedIn: false,authReady:true, email:"No estas logeado",password:'', checkEmail:false, token: ''})
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