import React, {Component} from 'react';
import TodoItem from "./TodoItem/TodoItem";

class Todos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            completedCheckbox: false,
        };
        this.lastId = 0;

        this.addTodo = this.addTodo.bind(this);
        this.toggleCompleted = this.toggleCompleted.bind(this);
    }

    componentDidMount() {
        const exampleTodo = {
            id: this.lastId,
            title: "Hello",
            completed: false,
            description: "Example Description"
        };
        this.setState({todos: [...this.state.todos, exampleTodo]});
    }

    deleteTodo(id) {
        this.setState({todos: this.state.todos.filter(item => item.id !== id)});
    }

    getTodos() {
        return this.state.todos.map(todo => {
            return <TodoItem key={todo.id} todo={todo} deleteTodo={this.deleteTodo.bind(this, todo.id)}/>
        });
    }

    addTodo(ev) {
        ev.preventDefault();
        this.lastId = this.lastId + 1;
        const todo = {
            id: this.lastId,
            title: ev.target.title.value,
            completed: this.state.completedCheckbox,
            description: ev.target.description.value,
        };
        this.setState({todos: [...this.state.todos, todo]});
        ev.target.reset();
    }

    toggleCompleted(ev) {
        const value = ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
        this.setState({completedCheckbox: value});
    }

    render() {
        const todosElements = this.getTodos();
        return (
            <>
                <h1>Tasks</h1>
                <h2>View Tasks</h2>
                <ul>
                    {todosElements}
                </ul>
                <h2>Add Task</h2>
                <form onSubmit={this.addTodo}>
                    <div>
                        <label htmlFor="title">
                            Title:
                            <input id="title" name="title" type="text"/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="description">
                            Description:
                            <input id="description" name="description" type="text"/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="completed">
                            Completed?:
                            <input id="completed" name="completed" type="checkbox"
                                   checked={this.state.completedCheckbox} onChange={this.toggleCompleted}/>
                        </label>
                    </div>
                    <input type="submit" value="Submit Form"/>
                </form>
            </>
        )
    }
}

export default Todos;
