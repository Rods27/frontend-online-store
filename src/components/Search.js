import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import ProductCard from './ProductCard';
import Category from '../Category';
import ToogleCart from './ToogleCart'
import { connect } from 'react-redux';
import ProductDetails from '../pages/ProductDetails';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      categoryInput: '',
      products: {},
      seachDone: false,
      x: 0,
    };
    this.goLeft = this.goLeft.bind(this);
    this.goRight = this.goRight.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toogleInOut = this.toogleInOut.bind(this);
    this.searchForCategory = this.searchForCategory.bind(this);
  }

  handleChange({ target }) {
    this.setState({ searchInput: target.value });
  }

  goLeft() {
    const additionalX = 105;
    const mintranslateX = 0;
    const maxtranslateX = 735;
    const { x } = this.state;
    if (x === mintranslateX) this.setState({ x: x - maxtranslateX });
    else this.setState({ x: x + additionalX });
  }

  goRight() {
    const additionalX = 105;
    const maxtranslateX = 735;
    const { x } = this.state;
    if (x === -maxtranslateX) this.setState({ x: x + maxtranslateX });
    else this.setState({ x: x - additionalX });
  }

  toogleInOut() {
    const classList = document.querySelector('.toogle-shoppingcart-container').classList
    if (classList.length < 2 ) {
      classList.add('toogle-in');
    } else {
      classList.remove('toogle-in');
    }
  }

  async handleClick() {
    const { searchInput, categoryInput } = this.state;
    const selectedInput = document.getElementById(`${categoryInput}`)
    if (searchInput !== '') {
      this.setState({ seachDone: true }, async () => {
        const productsList = await
        api.getProductsFromCategoryAndQuery(categoryInput, searchInput);
        this.setState({ products: productsList });
      });
      this.setState({searchInput: '', categoryInput: ''})
      if (selectedInput && selectedInput !== '') {
        selectedInput.checked = false
      }
    }
  }

  async searchForCategory(categoryId) {
    const { searchInput } = this.state;
    const resultado = await api.getProductsFromCategoryAndQuery(categoryId, searchInput);
    this.setState({
      products: resultado,
      categoryInput: categoryId,
      seachDone: true,
      searchInput: '',
    });
  }


  render() {
    const { searchInput, products, seachDone, x} = this.state;
    const { addItemCart, cartList, totalPrice, globalToogle, globalDetails } = this.props;
    const zero = 0;
    return (
      <div className="master-container">
        <header className="header">
          <div className="search-div">
            <form className="searchBar">
              <i class="fas fa-search search-button"
                onClick={ this.handleClick }
              ></i>
              <input
                className="search-input"
                id="home-initial-input"
                type="text"
                data-testid="query-input"
                placeholder="Digite aqui o termo da sua busca"
                value={ searchInput }
                onChange={ this.handleChange }
              />
              {/* <Link data-testid="shopping-cart-button" to="/ShoppingCart"> */}
                {/* https://fontawesome.com/icons/cart-plus?style=solid */}
                <i class="fas fa-cart-plus" onClick={ () => this.toogleInOut() }></i>
              {/* </Link> */}
            </form>
          </div>
        </header>
        {globalToogle && <ProductDetails product={globalDetails} addItemCart={ addItemCart }/>}
        <ToogleCart cartList={ cartList } totalPrice={ totalPrice } />
        <div className="center-container">
          <Category
            searchForCategory={ this.searchForCategory }
          />
          <div className="search-container">
            <div className="product-container">
              {!seachDone && (
                <p
                  style={{paddingRight: '200px', fontSize: '20px'}}
                  data-testid="home-initial-message"
                >
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </p>
              )}
              {Object.keys(products).length !== zero
              && seachDone
              && products.results.map((item) => (
                <ProductCard
                  x={ x }
                  addItemCart={ addItemCart }
                  product={ item }
                  key={ item.id }
                />
              ))}
            </div>
            {Object.keys(products).length !== zero && 
              <div className="controls">
                <button type="button" id="go-up-product" onClick={ this.goLeft }>
                    <i className="fas fa-chevron-up" />
                </button>
                <button type="button" id="go-down-product" onClick={ this.goRight }>
                    <i className="fas fa-chevron-down" />
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = { addItemCart: PropTypes.string.isRequired };

const mapStateToProps = (state) => ({
  globalToogle: state.details.toogle,
  globalDetails: state.details.product,
});

export default connect(mapStateToProps)(Search);
