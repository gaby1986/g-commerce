import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../my_auth'

class Home extends Component{
    static contextType = AuthContext
    
        state = {
           
            products:[]
        }
    

    showProducts(){
        fetch('http://localhost:3001/productos',{
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.context.token
            }
                }).then(res => res.json())
        .then(data =>{
            console.log(data)
            if(data){
                this.setState({products: data});
            }
        }).catch(error =>{
            console.log(error)
        })
    }
    componentDidMount(){
        this.showProducts()
    }
    render(){  
        return(
            <div className="container">
                <h1>Home</h1>
                <span>{this.context.email}</span>
                    <div className="row">
                {
                    this.context.token !== 'empty' ?
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
                    <div>Bien!</div>
                }
                </div>
            </div>
        )
    }
}

export default Home;