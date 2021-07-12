import React, { Component } from 'react'

export default class App extends Component {

    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        }
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addTask(e){
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Task Edited'})
                this.setState({
                    title: '',
                    description: ''
                })
                this.fetchTasks()
            })
        } else{
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({html: 'Task Saved'})
                    this.setState({
                        title: '',
                        description: ''
                    })
                    this.fetchTasks()
                })
                .catch(err => console.log(err));
        }
        e.preventDefault();
    }

    componentDidMount(){
        this.fetchTasks()
    }

    fetchTasks(){
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({tasks: data})
            })
    }

    editTask(id){
        fetch(`/api/tasks/${id}`,)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                })
            })
    }

    deleteTask(id) {
        if (confirm("Are you sure you want to delete this task?")){
            fetch(`/api/tasks/${id}`,{
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({html: 'Task Deleted'})
                    this.fetchTasks()
                })
        }
    }

    handleChange(e){
        const { name, value} = e.target;
        this.setState({
            [name] : value
        })
    }

    render() {
        return (
            <div>
                <nav className="light-blue darken-4">
                    <div className="container" style={{"paddingLeft":"40px","position":"fixed"}}>
                        <a className="brand-logo" href="/" >Mern Stack</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Task Title" value={this.state.title} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} placeholder="Task Description" className="materialize-textarea" value={this.state.description} ></textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <button className="btn light-blue darken-4 col s12" type="submit">Send</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td style={{"width": "200px"}} >{task.title}</td>
                                                    <td style={{"width": "400px"}} >{task.description}</td>
                                                    <td className="button-td">
                                                        <button className="btn light-blue darken-4" onClick={() => this.editTask(task._id)} >
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4" style={{"marginLeft": "4px"}} onClick={() => this.deleteTask(task._id)} >
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
