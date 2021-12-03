import { Link } from "react-router-dom";


const Nav = (props)=>{
    var navbar;

       if (props.hash !== undefined){
        navbar = (<header>
            <Link to="/" id="title_c">
                <h1 id="capital">N</h1><h1>otas</h1>
            </Link> 
            <div>
               <input type="button" value="cerrar sesion"onClick={props.logout} />
            </div>
        </header>);
    }else{
    navbar =(
        <header>
            <Link to="/" id="title_c">
                <h1 id="capital">N</h1><h1>otas</h1>
            </Link>                
            <div className="options">
                    <Link to="/login">Iniciar Sesion</Link>
                  <Link to="/signin">Registrarse</Link>
                </div>            
        </header>);
    }
    return(navbar);
}
export default Nav;