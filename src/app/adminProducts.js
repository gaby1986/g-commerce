import React, {Component} from  'react'
import {AuthContext} from '../my_auth'


class AdminProduct extends Component {
    static contextType = AuthContext;
    constructor(){
        //con super heredo todas las funcionalidades que me da el componente
        super();
        this.state ={
            title: '',
            description: '',
            price: '',
            products: [],
            _id: '',
            btnState: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.addProduct = this.addProduct.bind(this)
    }
    addProduct(e){
        if(this.state._id){
            fetch(`http://localhost:3001/productos/${this.state._id}`,{
                //Si se usa axios no es necesaria esta configuracion    
                method: 'PUT',
                    body: JSON.stringify(this.state),
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.context.token
                    }
            })
            //tradusco la respuesta en formato json
            .then(res => res.json())
            .then(data => {
                console.log(data)
                //M.toast({html: 'Product Updated'});
                this.setState({title:'',btnState: ! this.state.btnState, description:'',price:'',_id:''})
                this.fetchProducts();
            })
        }else{
            fetch('http://localhost:3001/productos',{
                method: 'POST',
                body: JSON.stringify(this.state),
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.context.token
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // 'M' es una variable global que nos da materialize  
                //M.toast({html: 'Product Saved'})
                this.setState({
                    title: '',
                    description: '',
                    price: '',
                    btnState: true,
                })
                this.fetchProducts();
            })
            .catch(err => console.log(err))
            //console.log(this.state);
           
        }
        e.preventDefault();
    }
    componentDidMount(){
        //console.log("nuestro componente fue montado")
        this.fetchProducts();
    }
    fetchProducts(){
        // el fetch por defecto viene con get
        fetch('http://localhost:3001/productos',{
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.context.token
            }
                }).then(res => res.json())
                .then(data => {
                    this.setState({products: data});
                    console.log(this.state.products)
                }).catch((error) => {
                    console.log(error);
                });
    }
    handleChange(e){
       const {name, value} = e.target;
       this.setState({
           [name]: value
       });
    }
    deleteProduct(id){
        if(window.confirm('Are yo sure you want to delete this product?')){
            console.log("get id: " + id)
            fetch(`http://localhost:3001/productos/${id}`,{
                method: 'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.context.token
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                //M.toast({html: 'Product Deleted'})
                this.fetchProducts();
            })
        }
    }
    editProduct(id){
        fetch(`http://localhost:3001/productos/${id}`,{
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.context.token
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    _id: data._id,
                    btnState: true,
                })
            })
    }
    render(){
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addProduct}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" value={this.state.title} placeholder="Product title" />
                                            </div>
                                            <div className="input-field col s12">
                                                <input name="price" onChange={this.handleChange} type="number" value={this.state.price} placeholder="Precio" />
                                            </div>
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} type="text" value={this.state.description} placeholder="Product description" className="materialize-textarea"></textarea>
                                            </div>
                                            {
                                                this.state.btnState ?
                                                    <button type="submit" className="btn light-blue darken-4">Actualizar</button>
                                                :
                                                    <button type="submit" className="btn light-blue darken-4">Guardar</button>
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Descripción</th>
                                            <th>Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.products.map(product => {
                                                return (
                                                    <tr key={product._id}>
                                                        <td>{product.title}</td>
                                                        <td>{product.description}</td>
                                                        <td>ARS${product.price}</td>
                                                        <td>
                                                            <button onClick={()=> this.editProduct(product._id)} className="btn light-blue darken-4" style={{margin:'4px'}}>
                                                                <i className="material-icons">edit</i>
                                                            </button>
                                                            <button onClick={() => this.deleteProduct(product._id)} className="btn light-blue darken-4" style={{margin:'4px'}}>
                                                                <i className="material-icons">delete</i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                        </div>
                    </div>
                </div>
            </div>
           
            
        )
    }
}

export default AdminProduct;