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

        return(<main>
            <h1>Notas a la mano</h1>
            <h2 id="capital">G</h2>
            <h4 id="capital">A</h4>
             <h1 id="capital">B</h1>
            <h3 id="capital">O</h3>
            <br/><br/><br/><br/>
        </main>)
    }
}
export default Main;
