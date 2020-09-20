import React, { Component } from 'react';
import Rows from './components/Rows';
import {Nav} from 'react-bootstrap';


export default class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            display:'upcoming'
        };

    };
    componentDidMount(){
        document.getElementById('init').click()
    }
    render(){
        return(
            <div>
                <div style ={{backgroundColor:'#222d48',paddingTop:'1.2vh',paddingBottom:'1vh'}} >
                    <a href="https://www.bluestacks.com" title="BlueStacks"  style ={{marginLeft:'10vw'}}>
                        <img  src="https://cdn-www.bluestacks.com/bs-images/new-logo-white.png" height="50vh" width="166vh" alt='logo'/>
                    </a>    
                </div >
                <h1 style ={{color:'#222d48',marginLeft:'10vw',marginRight:'10vw',marginTop:'3vh',marginBottom:'2vh'}} >
                    Manage Campaigns
                </h1>
                <div >
                    <Nav variant="tabs" defaultActiveKey="/home" style ={{marginLeft:'10vw',marginRight:'10vw'}}>
                    <Nav.Item>
                        <Nav.Link id= 'init' eventKey= 'upcoming' onClick= {() =>{ this.setState({display:'upcoming'})}} >Upcoming Campaingns</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey= 'live' onClick= {() =>{ this.setState({display:'live'})}} >Live Campaingns</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey= 'past' onClick= {() =>{ this.setState({display:'past'})}} >Past Campaingns</Nav.Link>
                    </Nav.Item>
                    </Nav>
                </div>
                <Rows show ={this.state.display} />
                
            </div>
        ) 
    }
}