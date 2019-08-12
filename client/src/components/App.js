import React from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Modal from './Modal';

class App extends React.Component {
  
  state = {
    libros: [],
    loading: true,
    show: false,
    librito: {},
    tipo: ''
  }


  componentDidMount(){
    this.getLibros();
  }

  getLibros(){
    axios.get('http://localhost:3001/libro')
      .then(res => {
        const libros = res.data.libros;
        this.setState({
          libros,
          loading: false
        });
      })
  }

  handleDelete = id => {
    if(window.confirm("¿Está seguro que quiere eliminar este registro?")){
      axios.delete(`http://localhost:3001/libro/${id}`)
        .then(()=> {
          this.getLibros();
        })
    }
  }

  handleSubmit = (e, tipo) => {
    e.preventDefault()
    const {codigo,nombre,autor,cantidad} = this.state.librito;
    if(!codigo || !nombre || !autor || !cantidad){
      alert("Hay campos vacíos. Debe llenar todos los campos");
      return;
    }
    this.setState({show: false})
    const datos = {
      codigo: this.state.librito.codigo,
      nombre: this.state.librito.nombre,
      autor: this.state.librito.autor,
      cantidad: this.state.librito.cantidad
    }

    if(tipo === "editar"){
      axios.put(`http://localhost:3001/libro/${this.state.librito._id}`, datos)
      .then(res => {
        alert("Campo modificado con éxito!");
        this.getLibros();
      })
    }
    if(tipo === "enviar"){
      axios.post(`http://localhost:3001/libro`, datos)
      .then(res => {
        alert("Campo ingresado con éxito!");
        this.getLibros();
      })
    }
  }

  handleChange = (e) => {
    let libro = {};
    
    if(e.target.name === "codigo"){
      libro = this.state.librito;
      libro.codigo = e.target.value;
      this.setState({librito: libro})
    }

    if(e.target.name === "nombre"){
      libro = this.state.librito;
      libro.nombre = e.target.value;
      this.setState({librito: libro})
    }

    if(e.target.name === "autor"){
      libro = this.state.librito;
      libro.autor = e.target.value;
      this.setState({librito: libro})
    }

    if(e.target.name === "cantidad"){
      libro = this.state.librito;
      libro.cantidad = e.target.value;
      this.setState({librito: libro})
    }
    
  }


  hideModal = () => {
    this.setState({show: false, librito: {}})
  }

  render(){
    
    return(
      <Paper >
      <Table >
        <TableHead>
          <TableRow>
            <TableCell align="center">Código</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Autor</TableCell>
            <TableCell align="center">Cantidad</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.libros.map(row => (
            <TableRow key={row._id}>
              <TableCell align="center">{row.codigo}</TableCell>
              <TableCell align="center">{row.nombre}</TableCell>
              <TableCell align="center">{row.autor}</TableCell>
              <TableCell align="center">{row.cantidad}</TableCell>
              <TableCell align="center">
              <Fab color="primary" aria-label="edit" onClick={()=>this.setState({show: true, librito: JSON.parse( JSON.stringify( row ) ), loading: false, tipo:"editar"})}>
                <EditIcon />
              </Fab>
              <Fab aria-label="delete" onClick={()=>this.handleDelete(row.codigo)}>
                <DeleteIcon />
              </Fab>
              
              
              <Modal 
                show={this.state.show} 
                handleClose={this.hideModal} 
                handleSubmit={this.handleSubmit}
                libro={this.state.librito}
                handleChange={this.handleChange}
                tipo={this.state.tipo}>    
              </Modal>
              
              </TableCell>
              
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
      <Fab color="primary" aria-label="add" onClick={()=>this.setState({show: true, tipo: "enviar"})}>
        <AddIcon />
      </Fab>
      
    </Paper>
    )
  }
}




export default App;
