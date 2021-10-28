import React from "react";
import '../css/component.css';
import axios from "axios";

class Component extends React.Component{
    constructor(props){
        super(props);
        this.state = {

            msg:undefined
        }

    }
    async componentDidMount() {
        var res;
        try{
            res = await axios.get('api/model');
            res = res.data.res;
        }catch(e){
            console.log(e);
        }
        this.setState({msg:res});
    }   
    render(){
        return <h1>{this.state.msg}</h1>
    }
}
export default Component;