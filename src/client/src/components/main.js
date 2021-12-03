import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import NotePrev from './note/note.Preview';

const URL = "http://localhost:4000/api/note"

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {notes:[]}
    }

    componentDidMount = async ()=>{
        if (this.props.hash!== undefined)
        {
            let url = URL+'/index/'+this.props.hash;
            let data = await axios.get(url);
            data = data.data.msg;
            this.setState({notes:data});
        }
    }
    render = ()=>{
        let cont = [];

        if (this.props.hash!==undefined){ //Si la sesion esta iniciada
            if (this.state.notes===undefined){
                this.setState({});
            }

            if (this.state.notes.forEach != undefined){ //Si hay notas
                this.state.notes.forEach(note => {
                    cont.push(<NotePrev data={note} hash={this.props.hash} />);
                });

                    
                cont = <div id="preview-container">
                    <div id="newNote-button-container">
                    <Link to="/note/new" className="button" >Nueva nota</Link>
                    </div>
                    {cont}
                </div>
            }
            else {
                cont  = <div id="preview-container">
                    <div id="newNote-button-container">
                    <Link to="/note/new" className="button" >Nueva nota</Link>
                    </div>
                    </div>
            }
        }
        else{
            cont = (
                <main>
                    <h1>Notas</h1>
                    <h3>Tus notas simepre a la mano</h3>
                    <Link className='button'to="/signin">Registrarse gratis</Link>
                </main>
            );
        }
        return(
        <main >
            {cont}
        </main>)
    }
}
export default Main;
