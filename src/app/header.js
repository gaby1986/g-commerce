import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import firebase from '../firebase'
import {AuthContext} from '../my_auth'
import { Button, Card, Row, Col,Dropdown,Divider,Icon} from 'react-materialize';
import M from 'materialize-css'; 

class Menu extends Component {
    static contextType = AuthContext
   
        state = {
            login: false,
            userName: 'Inicio el estado',
		}
         isSignOut = this.isSignOut.bind(this)

    
    isSignOut(){
        firebase.auth().signOut().then(()=> {
              // Sign-out successful.
              this.setState({
                login: false,
                userName: 'te fuiste'
            });
              console.log(this.state)
              //this.props.history.push("/signin")
          }).catch(function(error) {
              // An error happened.
              console.log(error)
          })    
      } 
     
      
    render() {
        console.log(this.context)
        return (           
                <nav className="light-blue darken-4">
                    <div className="nav-wrapper">
                        <Link to="/" className="brand-logo">gaby</Link>               
                        <ul className="right hide-on-med-and-down">
                            <li><Link to="/signup">Signup</Link></li>
                            <li>
                                <Dropdown trigger={<a>Menu<i className="material-icons right">arrow_drop_down</i></a>}>
                                   
                                    <Link to="#!">{this.context.userName}</Link>
                                             
                                   
                                    <Link to="/signin">Login</Link>
                                    <Link to="/admin">Admin</Link>
                                    <Divider/>
                                    <Link to="#!" onClick={this.isSignOut}>Salir</Link>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                </nav>
        );
    }
}

export default Menu;
