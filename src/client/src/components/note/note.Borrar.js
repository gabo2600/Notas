import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useParams } from "react-router-dom";
import Msg from '../extra/msg';


const NB = (props)=>{
    let {idNote} = useParams();
    let url = "http://localhost:4000/api/note/"+props.hash+"/"+idNote;
    let url2 = "http://localhost:4000/api/note/ver/"+props.hash+"/"+idNote;

    const [data,setData] = useState(undefined);
    const [msg,setMsg] = useState(undefined);
    const [err,setErr] = useState(undefined);

    useEffect(() => {
        let fetchdata = async () =>{ 
            console.log(url2);

            let tmp = await axios.get(url2);
            tmp = tmp.data.msg;
            setData(tmp);
        }
        fetchdata();
    }, []);

    const submit = async(ev)=>{
        ev.preventDefault();
        let res = await axios.delete(url)
        switch(res.data.code){
            case 200:
                setMsg({
                    msg:res.data.msg,
                    redirect:"/",
                    redirectMsg:"Aceptar"
                });
                break;
            default:
                setErr(<div id='err'>{res.data.msg}</div>);    
                break;
        }
    }


    if (data!= undefined && data!='Nota no encontrada'){
        if (msg=== undefined)
        return (
            <main>
                {err}
                <h1>Desea borrar esta nota</h1>
                <h2>{data.nameN}</h2>
                <pre>{data.cont}</pre>
                <form onSubmit={submit}>
                <div className="options">
                    <button type="submit">Proceder</button>
                    <Link to="/">Volver</Link>
                </div>
                </form>
            </main>
        );
        else
            return (<Msg data={msg} />);

    }else {
        return(
        <main>
            <h2>{data}</h2>
            <Link to="/">Pagina principal</Link>
        </main>);
    }
}


export default NB;