import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import firebase from '../firebase'
import {AuthContext} from '../my_auth'
import { Button, Card, Row, Col,Dropdown,Divider,Icon} from 'react-materialize';
import M from 'materialize-css'; 
const userActual = firebase.auth().currentUser;

class Menu extends Component {
    static contextType = AuthContext
    constructor(props){
        super(props)
        this.state = {
            login: false,
            validar: false,
            userName: 'Inicio el estado',
        }
         this.isSignOut = this.isSignOut.bind(this)
    }   
         
         isSignOut(){
             firebase.auth().signOut().then(()=> {
                 // Sign-out successful.
                 this.setState({
                     login: false,
                     userName: 'te fuiste'
            });
            sessionStorage.removeItem('key')
            sessionStorage.removeItem('token')
            console.log(this.state)
            }).catch(function(error) {
              // An error happened.
              console.log(error)
            })    
        } 
       
    render() {
        console.log(this.props)
        return (           
                <nav className="light-blue darken-4">
                    <div className="nav-wrapper">
                        <Link to="/" className="brand-logo">gaby</Link>               
                        <ul className="right hide-on-med-and-down">
                            <li><Link to="/signup">Signup</Link></li>
                            <li>
                                {
                                    this.props.valid &&  this.props.ing ?
                                        <Dropdown trigger={<a>Menu<i className="material-icons right">arrow_drop_down</i></a>}>
                                            <Link to="#!">{this.context.email}</Link>                                    
                                            <Link to="/admin">Admin</Link>
                                            <Link to="/protected">Protected</Link>
                                            <Divider/>
                                            <Link to="#!" onClick={this.isSignOut}>Salir</Link>
                                        </Dropdown>:
                                        <Link to="/signin">Login</Link>
                                }
                            </li>
                        </ul>
                    </div>
                </nav>
        );
    }
}

export default Menu;
