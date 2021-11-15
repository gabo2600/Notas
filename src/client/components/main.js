import React from "react";
import '../css/root.css';
import Navbar from "./navbar";
import Index from "./index";
import Cookies from 'universal-cookie';
const cookies = new Cookies();


import axios from "axios";



class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            msg:"Cookie: "
        }

    }
    componentDidMount() {
        if (cookies.get('myCat')== undefined){
            cookies.set('myCat', 'Pacman', { path: '/' });
            this.setState({msg:"Cookie : sin cookie"});
        }else
            this.setState({msg:"Cookie : "+cookies.get('myCat')});
        //console.log(cookies.get('myCat'));
    }

    /*
    async componentDidMount() {
        var res;
        try{
            res = await axios.get('api/model');
            res = res.data.res;
        }catch(e){
            console.log(e);
        }
        this.setState({msg:res});
    }*/

    render(){
        return <div> 
            {this.state.msg} 
            <Navbar />
            <Index />
        </div>
        
    }
}
export default Main;