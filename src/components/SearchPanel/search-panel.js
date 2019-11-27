import React, {Component} from 'react';
import './search-panel.css'

class SearchPanel extends Component{

    state = {
        term: ''
    };

    onSearchChange = (event)=>{
      const term = event.target.value;
      this.setState({
          term
      });
      this.props.onSearchChange(term);
    };

    render(){
        return (
            <div>
                <input type="text"
                       placeholder={"search"}
                       className="form-control search-panel"
                       value={this.state.term}
                       onChange={this.onSearchChange}
                />
            </div>
        );
    }
};

export default SearchPanel;