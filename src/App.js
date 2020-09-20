import React from 'react';
import './App.css';
import ListItems from './ListItems'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items:[],
      currentItem:{
        task:'',
        key:'',
        bucket:''
      }
    }
    this.addItem = this.addItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }
  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.task !==""  && newItem.bucket!==""){
      const items = [...this.state.items, newItem];
    this.setState({
      items: items,
      currentItem:{
        task:'',
        key:'',
       bucket:''
      }
    })
    }
  }
  handleChange(e){
    this.setState({
      currentItem:{
        [e.target.name]: e.target.value,
        key: Date.now()    }
    })
  }
  
  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })

  }
  setUpdate(task,key,bucket){
    console.log("items:"+this.state.items);
    const items = this.state.items;
     items.map(item=>{      
      if(item.key===key){
        console.log(item.key +"    "+key)
        item.task= task;
       item.bucket=bucket;
       return true;
      }
      else return false;
    })
    this.setState({
      items: items
    })
    
   
  }
 render(){
  return (
    <div className="App">
      <header>
        <form id="to-do-form" onSubmit={this.addItem}>
        <input type="text" placeholder="Enter bucket name" name="bucket" value= {this.state.currentItem.bucket} onChange={this.handleChange}></input>
          <input type="text" placeholder="Enter task" name="task" value= {this.state.currentItem.task} onChange={this.handleChange}></input>
          <br/>
          <button type="submit">Add</button>
        </form>
        <p>{this.state.items.bucket}</p>
        <p>{this.state.items.task}</p>
     
        
          <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
        
      </header>
    </div>
  );
 }
}


export default App;
