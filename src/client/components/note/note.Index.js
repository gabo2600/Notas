import React from "react";
import axios from "axios";

class NI extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hash:this.props.hash
        }
    }

    render(){

        return(<main>
            <h1>Index</h1>
        </main>)
    }
}
export default NI;