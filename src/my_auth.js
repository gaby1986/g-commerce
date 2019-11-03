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
            userName: null,
            checkEmail: false,
            token: '',
            role: 'admin'
        }
    }
    
    componentDidMount(){
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {           
              // User is signed in.      
                if(user.emailVerified === true){
                    fetch('http://localhost:3001/signin',{
                        method: 'POST',
                        body: JSON.stringify(this.state),
                        headers:{
                            'Accepte': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }).then(res => res.json())
                    .then(data => {
                        this.setState({isLoggedIn: true,authReady:true, userName: user.email, checkEmail: user.emailVerified, token:data})
                        console.log(this.state)
                    }).catch(error => console.log(error))
                }else{
                    this.setState({isLoggedIn: false,authReady:true, userName:"No estas logeado", checkEmail:false, token: ''})
                    firebase.auth().signOut()
                }

            } else {
                this.setState({isLoggedIn: false,authReady:true, userName:"No estas logeado", checkEmail:false, token: '', role: 'admin'})
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