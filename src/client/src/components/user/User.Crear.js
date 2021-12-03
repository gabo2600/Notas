import React from "react";
import axios from "axios";
import Msg from "../extra/msg";

let url = "http://localhost:4000/api/user"

class UC extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hash:this.props.hash,

            email:'',
            user_name:'',
            pass:'',
            Rpass:'',
            pub:false,

            msg:undefined,
            err: undefined

        }
    }

    submit = async (event)=>{
        event.preventDefault();
        this.setState({err:undefined});
        axios.post(url+'', {
            email: this.state.email,
            user_name: this.state.user_name,
            pass: this.state.pass,
            Rpass: this.state.Rpass,
            pub: this.state.pub,
        })
          .then((res)=> {
            switch(res.data.code){
                case 200:
                    this.setState({msg:{
                        msg:res.data.msg,
                        redirect:"/login",
                        redirectMsg:"Aceptar"
                    }});
                    break;
                default:
                        this.setState({err: <div id='err'>{"Error:"+res.data.msg}</div>});    
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
            case 'user_name':
                this.setState({user_name:event.target.value});
                break;
            case 'pass':
                this.setState({pass:event.target.value});
                break;
            case 'Rpass':
                this.setState({Rpass:event.target.value});
                break;
            case 'pub':
                if (event.target.value === 'true'){
                    this.setState({pub:true});
                }else
                    this.setState({pub:false});
                break;
            default:
                
        }
    }


    render(){
        if (this.state.msg===undefined)
            return(<main>
                <form onSubmit={this.submit}>
                <h1>Registrarse</h1>
                    {this.state.err}
                    <label >Email</label>
                    <input type="email" name="email" onChange={this.cambios}/>
                    <label >Nombre de usuario</label>
                    <input type="text" name="user_name" onChange={this.cambios}/>
                    <label >Contraseña</label>
                    <input type="password" name="pass" onChange={this.cambios}/>
                    <label >Repetir contraseña</label>
                    <input type="password" name="Rpass" onChange={this.cambios}/>
                    <br/>
                    <div>
                    Perfil publico
                    <select name="pub" defaultValue={"false"} onChange={this.cambios}>
                        <option value="true" >si</option>
                        <option value="false">no</option>
                    </select>
                    </div>
                    <br />
                    <button type="submit">Guardar</button>

                </form>
            </main>);
        else{  
            return <Msg data={this.state.msg} />
        }
    }
}
export default UC;