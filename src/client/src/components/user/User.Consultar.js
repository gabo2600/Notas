import React from "react";
//import axios from "axios";

class UC extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hash:this.props.hash
        }
    }

    render(){

        return(<main>
            <h1>Consultar</h1>
        </main>);
    }
}
export default UC;