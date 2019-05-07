import React, { Component } from 'react';
import PagedrawComponent1 from './pagedraw/component_1';
import $ from 'jquery';

const tasksURI = 'http://localhost:5000/todo/api/v1.0/tasks';
const ajax = function(uri, method, data) {
    var request = {
        url: uri,
        type: method,
        contentType: "application/json",
        accepts: "application/json",
        cache: false,
        crossDomain: true,
        dataType: 'json',
        data: JSON.stringify(data),
        error: function(jqXHR) {
            console.log("ajax error " + jqXHR.status);
        }
    };
    return $.ajax(request);
}

const addTask = (task, callback) => {
    ajax(tasksURI, 'POST', task).done(callback);
};

const fetchTasks = (callback) => {
    ajax(tasksURI, 'GET', {}).done(callback);
};

/* React bit */
class App extends Component {
  constructor() {
      super();
      this.state = {
          tasks: [],
          formDisplaying: false, 
          newTask: "",
          newText: ""
      }

      this.displayForm = this.displayForm.bind(this)
      this.addNewTask = this.addNewTask.bind(this);
      this.handleChange = this.handleChange.bind(this)

  }

    componentWillMount() {
      fetchTasks((data) => {
          this.setState({tasks: data.tasks});
      });
  }

    addNewTask(event) {
    event.preventDefault()
      const newTask = this.state.newTask
        event.target.reset()
      addTask({title: newTask}, (data) => {
          this.setState({tasks: [].concat(this.state.tasks, [data.task])});
      });
  }

    displayForm() {
        const newState = this.state.formDisplaying === false ? true : false
        let newText
        if (newState === false){
            newText = "Add task"
        }
        else{
            newText = "Entering task"
        }

        this.setState({
            formDisplaying: newState,
            newText: newText
            
        })
   
  }


handleChange(event){
    this.setState({[event.target.name]: event.target.value})
}

  render() {
    return (
    <PagedrawComponent1 
        text = {this.state.newText}
        formDisplaying={this.state.formDisplaying}
        handleChange= {this.handleChange} 
        addNewTask={this.addNewTask}  
        tasks={this.state.tasks} 
        displayForm={this.displayForm} 
        addNewTask={this.addNewTask} />
    )
  }
}

export default App;
