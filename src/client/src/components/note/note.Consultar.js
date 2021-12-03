import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useParams } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();


const NC = (props)=>{
    let {idNote} = useParams();
    let url = "http://localhost:4000/api/note/ver/"

    const [data,setData] = useState(undefined);


    useEffect(() => {
        let hash =  cookies.get('hash');
        url = url+ hash+"/"+idNote;
        let fetchdata = async () =>{ 
            console.log(url);
            let tmp = await axios.get(url);
            tmp = tmp.data.msg;
            setData(tmp);
        }
        fetchdata();
    }, []);




    if (data!= undefined && data!='Nota no encontrada'){
        console.log(data);
        return (

            <main>
                <h2>{data.nameN}</h2>
                <pre>{data.cont}</pre>
                <Link to="/">Volver</Link>
            </main>
        );
    }else {

        return(
        <main>
            <h2>{data}</h2>
            <Link to="/">Pagina principal</Link>
        </main>);
    }
}


export default NC;