import React, { Component } from 'react';
import * as api from './services/api';

class Category extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      category: '',
      y: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.goDown = this.goDown.bind(this);
    this.goUp = this.goUp.bind(this);
  }

  async componentDidMount() {
    this.fetchCategories();
  }

  async fetchCategories() {
    const response = await api.getCategories();
    this.setState({
      categories: response,
    });
  }

  goUp() {
    const additionalY = 115;
    const mintranslateY = 0;
    const maxtranslateY = 1495;
    const { y } = this.state;
    if (y === mintranslateY) this.setState({ y: y - maxtranslateY });
    else this.setState({ y: y + additionalY });
  }

  goDown() {
    const additionalY = 115;
    const maxtranslateY = 1495;
    const { y } = this.state;
    if (y === -maxtranslateY) this.setState({ y: y + maxtranslateY });
    else this.setState({ y: y - additionalY });
  }

  handleClick({ target }) {
    const { searchForCategory } = this.props;
    searchForCategory(target.id)
  }

  render() {
    const { categories, y } = this.state;
    return (
      <div className="category-container">
        <button type="button" id="goUp" onClick={ this.goUp }>
            {/* https://fontawesome.com/icons/chevron-up?style=solid */}
            <i class="fas fa-chevron-up"></i>
        </button>
        <div className="categories-div" >
          {categories.map((categoria, id) => (
            <div
            className="category-element"
            key={id}
            style={ { transform: `translateY(${y}%)` } }
            >
              <label name="category">
                <input
                  name="category"
                  htmlFor={id}
                  data-testid="category"
                  type="radio"
                  id={categoria.id}
                  onClick={ this.handleClick }
                />
                {categoria.name}
              </label>
            </div>
          ))}
        </div>
        <button type="button" id="goDown" onClick={ this.goDown }>
          {/* https://fontawesome.com/icons/chevron-down?style=solid */}
          <i class="fas fa-chevron-down"></i>
        </button>
      </div>
    );
  }
}

export default Category;
