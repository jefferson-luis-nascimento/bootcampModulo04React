import React, { Component } from 'react';

import TechItem from './TechItem';


class ThechList extends Component{

  state = {
    newTech: '',
    techs: []
  }

  handleInputChange = e => {
    this.setState({ newTech: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState({techs: [...this.state.techs, this.state.newTech]});
    this.setState({newTech: ''});
    document.getElementById('tech').focus();
  }

  handleDelete = tech => {
    this.setState({techs: this.state.techs.filter(t => t !== tech)});
  }

  componentDidMount() {
    const techs = localStorage.getItem('techs');

    if(techs) {
      this.setState({techs: JSON.parse(techs)});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.techs !== this.state.techs) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs));
    }
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          id="tech"
          type="text" 
          onChange={this.handleInputChange} 
          onFocus={this.handleFocus}
          value={this.state.newTech} 
        />
        <button type="submit">Enviar</button>
        <ul>
          {this.state.techs.map(tech => 
            <TechItem 
              key={tech} 
              tech={tech}
              onDelete={() => this.handleDelete(tech)}
            />
          )}     
        </ul>
      </form>
    )
  }
}

export default ThechList;