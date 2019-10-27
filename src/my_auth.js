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
        }
    }
    
    componentDidMount(){
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            //console.log(user)
            if (user) {           
              // User is signed in.
              this.setState({isLoggedIn: true,authReady:true, userName: user.email, checkEmail: user.emailVerified})
              //console.log(this.state) 
            } else {
                // User is signed out.
                this.setState({isLoggedIn: false,authReady:true, userName:"No estas logeado", checkEmail:false})
                //console.log(this.state)
            }
                //console.log(user) 
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