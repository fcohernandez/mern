import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    libros: [],
    loading: true
  }

  componentDidMount(){
    axios.get('http://localhost:3000/libro')
      .then(res => {
        const libros = res.data;
        this.setState({
          libros,
          loading: false
        });
      })
  }

  renderLibros = () => {
    const libros = this.state.libros.libros;

    return libros.map(libro => {
      const nombre = libro.nombre;
      const id = libro._id;

      return(
        
        <p key={id}>{nombre}</p>
        
      )
    })
  }

  render(){
    const loading = this.state.loading;
    return(
      <div>
        {loading ? 'loading..' : this.renderLibros() }
      </div>
    )
  }
}




export default App;
