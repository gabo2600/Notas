import React from 'react'
import { Link } from 'react-router-dom';

const Msg = (props) => {

    return(
        <main> 
            <h2>{props.err}</h2>
            <h5>{props.msg}</h5>
            <Link to="/">Volver a la pagina de inicio</Link>
        </main>
    );
}
  
export default Msg;