import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../my_auth'

class Home extends Component{
    static contextType = AuthContext
    showProducts(){
        fetch('http://localhost:3001/productos',{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.context.token
            }

        }).then(res => res.json())
        .then(data =>{
            console.log(data)
        })
    }
    render(){  
        this.showProducts()
        return(
            <div className="container">
                <h1>Home</h1>
                <span>{this.context.email}</span>
            </div>
        )
    }
}

export default Home;