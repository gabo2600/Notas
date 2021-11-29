import React from "react";
import axios from "axios";

import Cookies from 'universal-cookie';
const cookies = new Cookies();


class UL extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hash:this.props.hash,

            //params
            email:'',
            pass:'',

            err: undefined
        }
    }

    submit = async (event)=>{
        event.preventDefault();
        
        axios.post('/api/user/login', {
            email: this.state.email,
              pass: this.state.pass
        })
          .then((res)=> {
            switch(res.data.code){
                case 400:
                    this.setState({err:<div id='err'>{"Error:"+res.data.msg}</div>})
                    break;
                case 200:
                    cookies.set('hash', res.data.msg, { maxAge:3600*72 });
                    break;
            }
        })
          .catch(function (error) {
            console.log(error);
        });
    }

    cambios = event => {
        switch(event.target.name){
            case 'email':
                this.setState({email:event.target.value});
                break;
            case 'pass':
                this.setState({pass:event.target.value});
                break;
        }
    }
    
    render(){
        return(<main> 
            <form onSubmit={this.submit}>
            <h1>Iniciar sesion</h1>
                {this.state.err}
                <label>email</label>
                <input type="email" name="email" onChange={this.cambios}/>
                <label>contraseña</label>
                <input type="password" name="pass" onChange={this.cambios}/>
                <br />
                <button type="submit">Ingresar</button>
            </form>
        </main>)
    }
}
export default UL;