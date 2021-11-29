import React from "react";
import axios from "axios";

class UB extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hash:this.props.hash
        }
    }

    render(){

        return(<div className="confirm">
            
        </div>)
    }
}
export default UB;