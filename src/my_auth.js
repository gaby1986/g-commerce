import React from 'react'
import firebase from './firebase'
//const obtengoToken = localStorage.getItem('token')
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
            products: [],
            token: 'empty'
        }
    }
    login1=(state)=>{
        let promise= new Promise((resolve,reject)=>{
            fetch('http://localhost:3001/signin',{
            method: 'POST',
            body: JSON.stringify(state),
            headers:{
                'Accepte': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            if(data.token){            
                console.log(data.token)
                this.setToken(data.token)
                return resolve(data);
            }
        }).catch(error=>{
            return error
        })
    })
        return promise
    }
    componentDidMount(){
        
        //console.log(obtengoToken)
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {           
                // User is signed in.      
                if(user.emailVerified === true){
                    this.setState({isLoggedIn: true,authReady:true, email: user.email, checkEmail: user.emailVerified, token: localStorage.getItem("token")})
                    //console.log(this.state)                   
                    this.login1(this.state)
                        .then(resolve => {
                            this.setState({token:resolve.token})
                            console.log(this.state);
                      });
                }else{
                    this.setState({isLoggedIn: false,authReady:true, email:"No estas logeado", checkEmail:false, token: 'empty'})
                    firebase.auth().signOut()
                }

            } else {
                this.setState({isLoggedIn: false,authReady:true, email:"No estas logeado",password:'', checkEmail:false, token: 'empty' })
                // User is signed out.
                console.log(this.state)
            }
          });
               
     } 

     setToken = idToken => {
        // Saves user token to localStorage
        localStorage.setItem("token", idToken);
      };
      loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken(); // Getting token from localstorage
        return !!token; // handwaiving here
      };
      getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem("token");
      };
    


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