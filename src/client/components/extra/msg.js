import React from 'react'
import { Link } from 'react-router-dom';

const Msg = (props) => {
    const d = props.data;
    return(
        <main> 
            <h3>{d.msg}</h3>
            <Link to={d.redirect}>
                {d.redirectMsg}
            </Link>
        </main>
    );
}
  
export default Msg;
