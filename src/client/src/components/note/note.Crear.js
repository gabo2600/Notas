import React, { useState } from "react";
import axios from "axios";
import Msg from '../extra/msg';
import { Link } from "react-router-dom";

//EVENTOS*****************************************************************

const NCr = (props)=>{
    let url = "/api/note";

    const [nameN,setName] = useState('');
    const [cont,setCont] = useState('');
    const [pub,setPub] = useState(false);
    const [err,setErr] = useState(undefined);
    const [msg,setMsg] = useState(undefined);


    const cambio = event => {
        switch(event.target.name){
            case 'nameN':
                setName(event.target.value);
                break;
            case 'cont':
                setCont(event.target.value);
                break;
    
            case 'pub':
                if (event.target.value === 'true'){
                    setPub(true);
                }else
                    setPub(false);
                break;
            default:
                
    }
    }
    
    const submit = async (event)=>{
        event.preventDefault();
        axios.post(url+'', {
            token: props.hash,
            nameN: nameN,
            cont: cont,
            pub: pub,
        })
        .then((res)=> {
            switch(res.data.code){
                case 200:
                    setMsg({
                        msg:res.data.msg,
                        redirect:"/",
                        redirectMsg:"Aceptar"
                    });
                    break;
                default:
                    setErr(<div id='err'>{"Error:"+res.data.msg}</div>);    
                    break;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    if (msg== undefined)
        return (
            <main>
                <form onSubmit={submit}>
                <h1>Nueva nota</h1>
                    {err}
                    <label >Nombre de la nota</label>
                    <input type="text" name="nameN" onChange={cambio}/>

                    <label >Contenido de la nota</label>
                    <textarea name="cont" onChange={cambio}></textarea>
                    <br/>
                    <div>
                    Nota publico
                    <select name="pub" defaultValue={"false"} onChange={cambio}>
                        <option value="true" >si</option>
                        <option value="false">no</option>
                    </select>
                    </div>
                    <br />
                    <div className="options">
                        <button type="submit">Guardar</button>
                        <Link to="/">Volver</Link>
                    </div>

            </form>
        </main>);
    else
        return (<Msg data={msg} />);
}



export default NCr;

/*

"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOjEsImVtYWlsIjoiYUBhLmMiLCJ1c2VybmFtZSI6IjEyMyIsImlhdCI6MTYzODE3MzUzNCwiZXhwIjoxNjM4NDMyNzM0fQ.hCc6iYv-CawoNM5-U3TLGxD64PGfOvMIX7nA49EUVpY",
	"nameN":"Nota 4",
	"cont":"dsklsdfsdjfklsdfjkldsfklsfj",
	"pub":false
*/