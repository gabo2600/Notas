import React from "react";
import axios from "axios";
import Msg from "../extra/msg";

let url = "http://localhost:4000/api/user/login"

class UL extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hash:this.props.hash,

            //params
            email:'',
            pass:'',

            err: undefined,

            msg:undefined
        }
    }

    submit = async (event)=>{
        event.preventDefault();
        axios.post(url, {
            email: this.state.email,
            pass: this.state.pass
        }).then((res)=> {
            switch(res.data.code){
                case 200:
                    this.setState({ msg: <Msg data={{msg:"Sesion iniciada",redirect:"/",redirectMsg:"ir a pagina principal"}}/>})
                    this.props.login(res.data.msg);
                    break;
                default:
                        this.setState({err:<div id='err'>{"Error:"+res.data.msg}</div>})
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
            default:
        }
    }
    
    render(){
        let cont;

        if (this.state.msg!==undefined){
            cont = this.state.msg;
        }else
            cont = (<form onSubmit={this.submit}>
                <h1>Iniciar sesion</h1>
                    {this.state.err}
                    <label>email</label>
                    <input type="email" name="email" onChange={this.cambios}/>
                    <label>contraseña</label>
                    <input type="password" name="pass" onChange={this.cambios}/>
                    <br />
                    <button type="submit">Ingresar</button>
                </form>);

        return(<main> 
            {cont}
        </main>)
    }
}
export default UL;