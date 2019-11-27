import React, {Component} from 'react';
import AppHeader from '../AppHeader/app-header';
import SearchPanel from '../SearchPanel/search-panel';
import TodoList from '../UserList/todo-list';
import ItemStatusFilter from '../ItemStatusFilter/item-status-filter';
import AddItem from '../AddItem/addItem';
import './app.css';

class App extends Component {
    maxId = 1;
    state={
        todoData: [
            this.createTodoItem("Learn React"),
            this.createTodoItem("Create React App"),
            this.createTodoItem("Drink Coffee"),
            this.createTodoItem("Get Offer"),
            this.createTodoItem("To Be Happy"),
        ],
        term: '',
        filter: 'all'
    };

    createTodoItem(label){
        return{
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id)=>{
        this.setState(({ todoData })=>{
            const index = todoData.findIndex((el) => el.id === id);

            const newArr=[
                ...todoData.slice(0, index),
                ...todoData.slice(index+1)
            ];
            return{
                todoData: newArr
            };
        });
    };

    addItem = (text)=>{
        const newItem = this.createTodoItem(text);
        this.setState(({ todoData })=>{
            const newArr =[
                ...todoData,
                newItem
            ];
            return{
                todoData: newArr
            };
        });
    };

    toggleProperty(arr, id, propName) {
        const index = arr.findIndex((el) => el.id === id);

        const oldItem = arr[index];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

       return [
            ...arr.slice(0, index),
            newItem,
            ...arr.slice(index+1)
        ];
    }

    onToggleImportant = (id)=>{
        this.setState(({todoData})=>{
            return{
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    };

    onToggleDone = (id)=>{
        this.setState(({todoData})=>{
           return{
               todoData: this.toggleProperty(todoData, id, 'done')
           }
        });
    };

    search(items, term){
        if(term.length === 0) return items;

        return items.filter((item)=>{
            return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        });
    };

    onSearchChange = (term) =>{
        this.setState({term});
    };

    onFilterChange = (filter) =>{
        this.setState({filter});
    };

    filter(items, filter){
        switch (filter) {
            case 'all': return items;
            case 'active': return items.filter((item) => !item.done);
            case 'done': return items.filter((item) => item.done);
            default: return items;
        }
    }

    render() {
        const {todoData, term, filter} = this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-md-6 todo-app'}>
                        <AppHeader
                            title={"Todo List"}
                            to={todoCount}
                            done={doneCount}
                        />
                        <div className="top-panel d-flex">
                            <SearchPanel
                                onSearchChange={this.onSearchChange}
                            />
                            <ItemStatusFilter
                                filter={filter}
                                onFilterChange={this.onFilterChange}
                            />
                        </div>
                        <TodoList
                            listItem = {visibleItems}
                            onDeleted={ this.deleteItem }
                            onToggleImportant={this.onToggleImportant}
                            onToggleDone={this.onToggleDone}
                        />
                        <AddItem newItem={this.addItem}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default App;