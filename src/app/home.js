import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../my_auth'

class Home extends Component{
    static contextType = AuthContext
    constructor(props){
        super(props)
        this.state = {
                token: '',
                products:[]
            }

    }
    getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem("token");
      };
    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken(); // Getting token from localstorage
        return !!token; // handwaiving here
      }; 

   showProducts(){   
        if(this.loggedIn()){
        fetch('http://localhost:3001/productos',{
                method: 'GET',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.getToken()
                }
            }).then(res => res.json())
                .then(data =>{         
                    console.log(data) 
                    this.setState({products:data})
                    //this.context.products = data                   
                }).catch(error =>{
                    console.log(error)
                })
        }
    }
    componentDidMount(){   
        this.showProducts()
    }
    componentWillReceiveProps(){
        this.showProducts()
    }
 
    render(){  
        return(
            <div className="container">
                <h1>Home</h1>
                <span>{this.context.email}</span>
                    <div className="row">
                {
                    this.loggedIn()  ?
                    this.state.products.map(product => {
                        return(
                            
                                    <div className="col s4 m3" key={product._id}>
                                        <div className="card">
                                            <div className="card-image">
                                                <img src="http://placeimg.com/300/350/any"></img>
                                                <span className="card-title">{product.title}</span>
                                            </div>
                                            <div className="card-content">
                                            <p>{product.description}</p>
                                            <p>${product.price}</p>
                                            </div>
                                            <div className="card-action">
                                            <a href="#">Ver</a>
                                                <i className="material-icons" style={{color:'red'}}>favorite</i>
                                            </div>
                                        </div>
                                    </div>
                        )
                    }):
                    <div>Bien</div>
                }
                </div>
            </div>
        )
    }
}

export default Home;