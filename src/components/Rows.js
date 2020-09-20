import React, {Component} from 'react';
import Filter from './Filter';
import GetDate from './Getdate'
import {Media,Modal,Button,Table} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class Rows extends Component {
    constructor(props){
        super(props);
        this.state ={
            show:false,
            M_ele: {},
            dt_ch:false,
            dt_ele:{}
        }
    }
    date_diff_indays = function( date2) {
        let dt1 = new Date();
        let dt2 = new Date(date2);
        let diff =  Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
        if (diff == 0 )
            return 'today';
        else if (diff > 0)
            return Math.abs(diff) +' days later';    
        else 
            return Math.abs(diff) +' days ago';  
    }
    componentDidUpdate(){
        if(document.getElementById('cal'))
        document.getElementById('cal').click();

    }
    handleClose = ( ) =>{
        this.setState({show:false})
    }
    setmod = ele =>{
        this.setState({M_ele : ele})
        this.setState({show:true})
    }
    dt_pick =(el) =>{
        this.setState({dt_ele:el})
        this.setState({dt_ch:true})
    }
    dt_change =(date) =>{
        let temp  = JSON.parse(localStorage.getItem('data'));
        for (let i=0; i<temp.length ;i++){
            if(this.state.dt_ele.name === temp[i].name){
                temp[i].createdOn = date;
            }
        }
        localStorage.removeItem("data");
        localStorage.setItem("data",JSON.stringify(temp) )
        this.setState({dt_ele:{}})
    }
    render(){
        return(
                <div style ={{marginLeft:'10vw',marginRight:'10vw',marginTop:'5vh'}}>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Media>
                                        <img
                                            width={58}
                                            height={58}
                                            className="mr-3"
                                            src= {this.state.M_ele.image_url}
                                            alt="placeholder"
                                        />
                                        <Media.Body>
                                            <h5>{this.state.M_ele.name}</h5>
                                            <p>{this.state.M_ele.region}</p>
                                        </Media.Body>
                                    </Media>
                        </Modal.Header>
                        <Modal.Body >
                            <h3> Pricing</h3>
                            <Table borderless='true'>
                                <tr>
                                    <td>1 week - 1 month</td>
                                    <td style={{alignContent:'right'}}> {this.state.M_ele.price }</td>
                                </tr>
                                <tr>
                                    <td>6 months</td>
                                    <td style={{alignContent:'right'}}>{this.state.M_ele.price*5}  </td>
                                </tr>
                                <tr>
                                    <td>1 year </td>
                                    <td style={{alignContent:'right'}}> {this.state.M_ele.price*9 }</td>
                                </tr>
                            </Table>
                        </Modal.Body>
                        <Button variant="light" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal>
                    <Table responsive="sm" style={{border:'3px solid lightgrey'}}>
                        <thead style={{backgroundColor:'lightgrey'}}>
                        <tr style={{backgroundColor:'lightgrey'}}>
                            <th style ={{width:'12vw'}}>Date</th>
                            <th style ={{width:'25vw'}}>Campaign</th>
                            <th style ={{width:'15vw'}}>View</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {Filter(this.props.show).map(ele => {
                                return(<tr>
                                    <td>
                                        <h5>{GetDate(ele.createdOn)}</h5>
                                        <p>{this.date_diff_indays(ele.createdOn) }</p>
                                    </td>
                                    <td>
                                    <Media>
                                        <img
                                            width={58}
                                            height={58}
                                            className="mr-3"
                                            src= {ele.image_url}
                                            alt="placeholder"
                                        />
                                        <Media.Body>
                                            <h5>{ele.name}</h5>
                                            <p>{ele.region}</p>
                                        </Media.Body>
                                    </Media>
                                    </td>
                                    <td >
                                    <img onClick = {()=> {this.setmod(ele)}}
                                            width={20}
                                            height={20}
                                            className="mr-1"
                                            src= '/Price.png'
                                            alt="placeholder"
                                        />
                                        <p onClick = {()=> {this.setmod(ele)}} className="mr-1" style ={{display:"inline"}}>View Pricing</p>
                                    </td>
                                    <td>
                                    <img
                                            width={20}
                                            height={20}
                                            className="mr-1"
                                            src= '/file.png'
                                            alt="placeholder"
                                        />
                                        <p className="mr-3" style ={{display:"inline", fontSize:'2vh',marginLeft:'1vh'}}>CSV</p>
                                        <img
                                            width={20}
                                            height={20}
                                            className="mr-1"
                                            src= '/statistics-report.png'
                                            alt="placeholder"
                                        />
                                        <p  className="mr-3" style ={{display:"inline"}}>Report</p>
                                        {(this.state.dt_ch === false|| this.state.dt_ele.name !=ele.name ) ?<div style ={{display:"inline"}}>
                                            <img onClick ={()=>{this.dt_pick(ele)}}
                                            width={20}
                                            height={20}
                                            className="mr-1"
                                            src= '/calendar.png'
                                            alt="placeholder"
                                        />
                                        <p  onClick ={()=>{this.dt_pick(ele)}} style ={{display:"inline"}}>Schedule Again</p></div>:
                                        <DatePicker id='cal' style={{width:'3vw'}}
                                            selected = {new Date(ele.createdOn)}
                                            onChange = {this.dt_change}
                                        />}
                                    </td>
                                    
                                </tr>)
                            })}
                        </tbody>
                    </Table>
                </div>
        )
    }

}