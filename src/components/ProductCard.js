import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { productPrice, productItem, productDetails, productQuantity, cartListHandler, productID } from '../actions';

class ProductCard extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
      total: 0,
    };
    this.addItemsToCart = this.addItemsToCart.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
  }

  addItemsToCart() {
    const { product, addItemCart, dispatchPrice, dispatchProduct, dispatchQuantity, globalID, dispatchCartList, dispatchID } = this.props;
    const { title, thumbnail, price, id } = product;
    const { quantity } = this.state;
    if (!globalID.includes(id)) {
      dispatchQuantity(id, (1))
      dispatchPrice(price)
      dispatchProduct(product)
      dispatchID(id)
      dispatchCartList(product)
      addItemCart({ product: { title, thumbnail, price, id, quantity } }, price);
    } else {
      window.alert ('Item já adicionado no carrinho de compras!')
    }
  }

  renderDetails() {
    const { dispatchProductDetails, product } = this.props;
    document.querySelector('.obscure-background').style.display = 'flex';
    dispatchProductDetails(true, product)
  }
  

  render() {
    const { product, x } = this.props;
    const { title, thumbnail, price, id } = product;

    return (
      <section
      key={ title }
      data-testid="product"
      className="product-content"
      style={ { transform: `translateY(${x}%)` } }
      >
        <div className="img-div" onClick={ () => this.renderDetails() }>
          <img className="img" src={ thumbnail } alt={ title } />
        </div>
      <div className="product-title-div"
      style={{width:'196px', textAlign:'left'}}>
        <span>{title}</span>
      </div>
        <div className="addToCart">
          <span style={{marginLeft: '10px'}}>R$</span>
          <span className="price">{`${price}`}</span>
          <button
            type="button"
            className="add-button"
            data-testid="product-add-to-cart"
            onClick={ () => this.addItemsToCart() }
          >
            {/* https://fontawesome.com/icons/plus-square?style=solid */}
            <i class="fas fa-plus-square"></i>
          </button>
        </div>
      </section>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.string,
  }).isRequired,
  addItemCart: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  globalID: state.product.id,
  stateCart: state.product.cart,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchPrice: (price) => dispatch(productPrice(price)),
  dispatchProduct: (product, id) => dispatch(productItem(product, id)),
  dispatchProductDetails: (toogle, product) => dispatch(productDetails(toogle, product)),
  dispatchQuantity: (id, quantity) => dispatch(productQuantity(id, quantity)),
  dispatchCartList: (cartItem) => dispatch(cartListHandler(cartItem)),
  dispatchID: (id) => dispatch(productID(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);

