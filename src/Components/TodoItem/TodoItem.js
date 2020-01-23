import React, {Component} from 'react';

class TodoItem extends Component {
    render() {
        const {id, title, description, completed} = this.props.todo;
        const todoContent = (
            <>
                <h3>{title}</h3>
                <p>{description}</p>
                <button onClick={this.props.deleteTodo.bind(id)}>X</button>
            </>
        );

        if (completed) {
            return (
                <li>
                    <s>
                        {todoContent}
                    </s>
                </li>
            )
        } else {
            return (
                <li>
                    {todoContent}
                </li>
            )
        }
    }
}

export default TodoItem;
