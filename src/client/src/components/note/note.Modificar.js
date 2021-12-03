import React, { useState, useEffect } from "react";
import axios from "axios";
import Msg from '../extra/msg';
import { Link,useParams } from "react-router-dom";

const NM = (props)=>{
    let url = "/api/note";
    let url2 = "/api/note/ver/"+props.hash;

    const [nameN,setName] = useState(undefined);
    const [cont,setCont] = useState(undefined);
    const [pub,setPub] = useState(undefined);

    const [err,setErr] = useState(undefined);
    const [msg,setMsg] = useState(undefined);

    const {idNote} = useParams();
    url2 = url2+"/"+idNote;


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

    useEffect(async () => {
        let tmp = await axios.get(url2);
        tmp = tmp.data.msg;
        setName(tmp.nameN);
        setCont(tmp.cont);
        setPub(tmp.pub);
        console.log(url2);

    },[]);
    
    const submit = async (event)=>{
        console.log(cont);
        event.preventDefault();
        axios.put(url+'', {
            token: props.hash,
            idNote: idNote,
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
        if (nameN!==undefined && cont!=undefined && pub!=undefined)
        return (
            <main>
                <form onSubmit={submit}>
                <h1>Modificar nota</h1>
                    {err}
                    <label >Nombre de la nota</label>
                    <input type="text" name="nameN" onChange={cambio} defaultValue={nameN} />

                    <label >Contenido de la nota</label>
                    <textarea name="cont" defaultValue={cont} onChange={cambio}></textarea>
                    <br/>
                    <div>
                    Nota publico
                    <select name="pub" defaultValue={pub} onChange={cambio}>
                        <option value="true" >si</option>
                        <option value="false">no</option>
                    </select>
                    </div>
                    <br />
                    <div className="options">
                    <button type="submit">Guardar</button>
                    <Link to="/" className="button">Volver</Link>
                    </div>
            </form>
        </main>);
        else
            return <div></div>
    else
        return (<Msg data={msg} />);
}



export default NM;

/*
    token = req.body.token;
    idNote = req.body.idNote;
    nameN = req.body.nameN;
    cont = req.body.cont;
    pub = req.body.pub;
*/