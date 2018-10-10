import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import axios from 'axios';
import Head from './head.js';
import Body from './body.js';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#app');

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        taskList:[
        { 
          key: 8000,
          task_details: 'Buy grocery',
          status: 'pending',
        },
        { 
          key: 8001,
          task_details: 'Wash clothes',
          status: 'pending',
        },
        { 
          key: 8002,
          task_details: 'Sell furniture',
          status: 'pending',
        },
        ],
        modal:{
          showModal:false,
          key:0,//taskKey being edited
          placeholder:'Enter updated task details',//task_details being edited   
        }
        
    };
  }
  
  handleSubmit(taskObject){
    let newList=this.state.taskList;
    newList.push(taskObject);
    this.setState({taskList:newList});
  }

  handleDelete(toDelete){
    let newList = this.state.taskList.filter(task => {return task.key !== toDelete.key;} );
    console.log(newList.length);
    this.setState({taskList:newList});
  }

  handleMarkDone(toMark){
    let index = this.state.taskList.findIndex(task => {return task.key === toMark.key});
    let newList = this.state.taskList;
    newList[index].status = 'Done';
    this.setState({taskList:newList});
  }

  configureModal(task){
    console.log("Edit clicked!");
    this.setState({
      modal:{
      showModal:true,
      placeholder:task.task_details,
      key:task.key,
    }});
    console.log(task.key);
  }
  updateModalPlaceholder(event){
    let updatedModalState = Object.assign({},this.state.modal);
    updatedModalState.placeholder = event.target.value;
    this.setState({modal : updatedModalState,});
  }
  
  handleEditSave(){
    let index = this.state.taskList.findIndex(task => {return task.key === this.state.modal.key});
    let newList = this.state.taskList;
    newList[index].task_details = this.state.modal.placeholder;
    this.setState({
      taskList:newList,
      modal:{
        showModal:false,
        key:0,
        placeholder:'',
      }
    });
  }

  handleClose(){
    let updatedModal = Object.assign({},this.state.modal);
    updatedModal.showModal = false;
    this.setState({modal:updatedModal});
  }

  render() {
    
    return (     
      <div className="main">
      <ReactModal isOpen={this.state.modal.showModal} className='modal'>
        <h2 className="header">Edit Task</h2>
        <input type="text" 
        value={this.state.modal.placeholder} 
        onChange={(e)=>this.updateModalPlaceholder(e)} />
        <button className="btn btn-primary btn_" onClick={()=>this.handleEditSave()}>Save</button>
        <button className="btn btn-danger btn_" onClick={()=>this.handleClose()}>Close</button>
      </ReactModal>

      <Head heading="Tasks" onSubmit={(obj)=>this.handleSubmit(obj)}></Head>

      <Body 
      list={this.state.taskList} 
      onDelete = { (toDelete) => this.handleDelete(toDelete) }
      onMarkDone = { (toMark) => this.handleMarkDone(toMark) }
      onEdit = { (toEdit) => this.configureModal(toEdit)}>
      </Body>
      </div>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
