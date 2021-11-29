import React from "react";
import axios from "axios";

class NB extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hash:this.props.hash
        }
    }

    render(){

        return(<div className="confirm">
            <h1>Index</h1>
        </div>)
    }
}
export default NB;