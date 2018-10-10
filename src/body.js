import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import axios from 'axios';

export default class Body extends React.Component{
  constructor(props) {
    super(props);
  }

  createListRows(list){
    let listRows=[];
    for(let i = 0; i<list.length ; i++){
      listRows.push(
      <tr key={list[i].key}>
          <td>{i+1}</td>
          <td>{list[i].task_details}</td>
          <td>{list[i].status}</td>
          <td>
          
          <button type="button" className="btn btn-success btn_" 
          onClick={() => this.props.onMarkDone(list[i])}>
           Mark Done
          </button>
          <button type="button" className="btn btn-danger btn_" 
          onClick={() => this.props.onDelete(list[i])}>
            Delete
          </button>
          <button type="button" className="btn btn-primary  btn_" 
          onClick={() => this.props.onEdit(list[i])}>
           Edit
          </button>
          </td>
       </tr>
       );
    }
    return listRows;
  }  

  render()
  {
    let list =this.props.list;
    let listRows = this.createListRows(list);
    return(
    <table className="table-hover table">
    <thead><tr><th>S.No</th><th>Task Details</th><th>Status</th><th colSpan={2}>Options</th></tr></thead>
    <tbody>{listRows}</tbody>
    </table>
    );
  }
}
