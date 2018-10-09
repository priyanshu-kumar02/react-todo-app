import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import axios from 'axios';
import Head from './head.js';
import Body from './body.js';


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
        ],
    };
  }
  
  handleSubmit(taskObject){
    console.log("Submit called!");
    console.log(taskObject);
    console.log("After sub");
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
    let index = this.state.taskList.findIndex(task => {return task.key===toMark.key});
    let newList = this.state.taskList;
    newList[index].status = 'Done';
    this.setState({taskList:newList});
  }

  render() {
    return (
      <div className="main">
      <Head heading="Tasks" onSubmit={(obj)=>this.handleSubmit(obj)}></Head>
      <Body 
      list={this.state.taskList} 
      onDelete = { (toDelete) => this.handleDelete(toDelete) }
      onMarkDone = { (toMark) => this.handleMarkDone(toMark) }>
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
