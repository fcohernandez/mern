import React from "react";
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import './Modal.css';

const Modal = ({ handleClose, show, libro, handleSubmit, handleChange, tipo}) => {
    return (
      <div className={show ? "modal " : "modal display-none"}>
        <section className="modal-main">
        <form onSubmit={(e)=>handleSubmit(e, tipo)}>
            <div>
            <FormControl align="center">
                <InputLabel htmlFor="codigo">Codigo</InputLabel>
                <Input id="codigo" name="codigo" value={libro.codigo || ''} onChange={handleChange} />
            </FormControl>
            </div>
            <div>
            <FormControl align="center">
                <InputLabel htmlFor="nombre">Nombre</InputLabel>
                <Input id="nombre" name="nombre" value={libro.nombre || ''} onChange={handleChange}  />
            </FormControl>
            </div>
            <div>
            <FormControl align="center">
                <InputLabel htmlFor="autor">Autor</InputLabel>
                <Input id="autor" name="autor" value={libro.autor || ''}  onChange={handleChange}/>
            </FormControl>
            </div>
            <div>
            <FormControl align="center">
                <InputLabel htmlFor="cantidad">Cantidad</InputLabel>
                <Input id="cantidad" name="cantidad" type="number" value={libro.cantidad || ''}  onChange={handleChange}/>
            </FormControl>
            </div>
        <div>
            <Fab color="secondary" aria-label="add" onClick={handleClose} >
                <CloseIcon />
            </Fab>
            <Fab color="primary" aria-label="add" type="submit">
                <SaveIcon />
            </Fab>
        </div>
        </form>
        
        </section>
      </div>
    );
  };


export default Modal;