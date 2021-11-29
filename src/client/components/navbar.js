import React from "react";
import { Link } from "react-router-dom";


class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hash:this.props.hash
        }
    }

    render(){
        var navbar;
        
        if (this.props.hash !== undefined)
            navbar = (<header>
                <div id="title_c">
                    <h1 id="capital">N</h1><h1>otas</h1>
                </div>
                <div>
                    <Link to="/user" className="button">Perfil</Link>
                    <Link to="/logout" className="button">Cerrar sesión</Link>
                </div>
            </header>);
        else
        navbar =(
            <header>
                <Link to="/" id="title_c">
                    <h1 id="capital">N</h1><h1>otas</h1>
                </Link>                
                <div className="options">
                    <Link to="/user">Perfil</Link>
                    <Link to="/logout">Cerrar sesion</Link>
                </div>            
            </header>);

        return(navbar);
    }
}
export default Main;