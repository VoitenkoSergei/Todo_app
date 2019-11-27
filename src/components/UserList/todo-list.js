import React from 'react';
import TodoListItem from './TodoListItem/todo-list-item';
import './todo-list.css';

const TodoList = ({listItem, onDeleted, onToggleImportant, onToggleDone} ) => {

    const elem = listItem.map( (item, index) => {
            return (
                <li key={item.id} className="list-group-item">
                    {(index<9)? '0'+(index+1) : index+1}
                    <TodoListItem
                        label={item.label}
                        onDeleted={()=> onDeleted(item.id)}
                        onToggleImportant={()=> onToggleImportant(item.id)}
                        onToggleDone={()=> onToggleDone(item.id)}
                        important={item.important}
                        done={item.done}
                    />
                </li>
            );
        }
    );

    return (
            <ul className="list-group todo-list">
                { elem }
            </ul>
    );
};

export default TodoList;