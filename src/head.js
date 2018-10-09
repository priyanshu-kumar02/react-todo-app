import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import axios from 'axios';

//return a unique 4-digit id
function guid() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}

export default class  Head extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      task:'c',
    };
  }

  handleChange(event){
    console.log(event.target.value);
    this.setState({ task : event.target.value});
  }
 

  returnObject(task){
    let taskObject = {
      key: guid(),
      task_details: task,
      status: 'pending',
    };
    this.props.onSubmit(taskObject);
  }

  render(){
    
    return (
      <div className="header">
      <h2 className="heading">{this.props.heading}</h2>

      <input 
      type="text" 
      placeholder="Enter new task details" 
      className="inputbox" 
      onChange={this.handleChange.bind(this)} 
      />

      <button 
      type="button" 
      className="btn btn-primary btn_" 
      onClick={()=>this.returnObject(this.state.task)}>Submit
      </button>
      </div>
    );
  }
}
