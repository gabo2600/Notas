import { BrowserRouter ,Routes,Route } from "react-router-dom";

import React from "react";
import Cookies from 'universal-cookie';

//Components
import Main from './components/main';
import Error from './components/extra/error.js';
import Msg from './components/extra/msg';

//User Components
import UserLogin from "./components/user/User.Login";
import UserCrear from "./components/user/User.Crear";
import UserModificar from "./components/user/User.Modificar";
import UserConsultar from './components/user/User.Consultar';

//Note components

import NoteCrear from "./components/note/note.Crear";
import NoteModificar from "./components/note/note.Modificar";
import NoteConsultar from "./components/note/note.Consultar";
import NoteBorrar from "./components/note/note.Borrar";

import Navbar from './components/navbar';

const cookies = new Cookies();


class App extends React.Component {

  constructor(props){
    super();
    this.state = {
      hash:undefined
    }
  }


  LogoutCookie = ()=>{
    cookies.remove('hash');
    this.setState({ hash:undefined});
  }

  LoginCookie = (data)=>{
    cookies.set('hash', data, { maxAge:3600*72 , sameSite:"none" , secure:true});
    this.setState({hash: cookies.get('hash')});
  }

  componentDidMount(){
    if (cookies.get('hash')!== undefined){
      this.setState({ hash:cookies.get('hash') });
    }
  }

  render(){
    return (
      <BrowserRouter>
        <Navbar hash={this.state.hash} logout={this.LogoutCookie}/>
        <Routes>
          <Route path="*" element={<Error err='Error 404' msg="Pagina no encontrada" />} />

          <Route path="/" element={<Main hash={this.state.hash} />} />
          
          <Route path="/login" element={<UserLogin hash={this.state.hash} login={this.LoginCookie} /> } />
          <Route path="/logout" element={<Msg data={{msg:"Adios",redirect:"/",redirectMsg:"Volver a la pagina principal"}}/>}/>


          <Route path="/signin" element={<UserCrear hash={this.state.hash}/>} />
          <Route path="/user" element={<UserConsultar hash={this.state.hash}/>} />
          <Route path="/user/edit" element={<UserModificar hash={this.state.hash}/>} />

          <Route path="/note/borrar/:idNote" element={<NoteBorrar hash={this.state.hash}/>} />
          <Route path="/note/new" element={<NoteCrear hash={this.state.hash}/>} />
          <Route path="/note/edit/:idNote" element={<NoteModificar hash={this.state.hash}/>} />
          <Route path="/note/:idNote" element={<NoteConsultar/>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
