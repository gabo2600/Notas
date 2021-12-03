import React from 'react'
import { Link } from 'react-router-dom';

const NoteP = (props) => {
    let data = props.data;
    data.f_crea = data.f_crea.slice(0,10);
    data.f_mod = data.f_mod.slice(0,10);


    return(//hash,nota
        <div className='note-preview'> 
                <h3>{data.nameN}</h3>
                <p>{data.cont}</p>
                <small>Fecha de creacion: {data.f_crea}</small>
                <small>Fecha de modificación: {data.f_mod}</small>
                <div className="options">
                <Link className="button" to={'/note/'+data.idNote} >Ver</Link>
                <Link className="button" to={'/note/edit/'+data.idNote} >Editar</Link>
                <Link className="button" to={'/note/borrar/'+data.idNote} >Borrar</Link>
                </div>
        </div>
    );
}

export default NoteP;

/*

      "idNote": 2,
      "nameN": "Nota 2",
      "cont": "dsklsdfsdjfklsdfjkldsfklsfj",
      "pub": 1,
      "f_crea": "2021-11-29T06:00:00.000Z",
      "f_mod": "2021-11-29T06:00:00.000Z",
      "del": 0,
      "idUser": 1

    */