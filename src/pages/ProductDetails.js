import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import PropTypes from 'prop-types';
import { productPrice, productItem, productDetails, productQuantity, productID, cartListHandler } from '../actions';
import { connect } from 'react-redux';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
    this.addItemsToCart = this.addItemsToCart.bind(this);
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


  render() {
    const { product, globalID } = this.props;
    return (
      <div className="obscure-background">
        <section className="product-details-container">
          <div className="product-details-img-div">
            <img src={ product.thumbnail } alt={ `Imagem do produto ${product.title}` } />
          </div>
          <div className="product-name">
            <span>{ product.title }</span>
            <div className="product-price">
              <span style={{fontSize: "17px"}}>R$ </span>
              <span>{`${product.price}`}</span>
            </div>
          </div>
          <div className="rating">
            <form className="detailedDescription">
              <span>Avaliação</span>
              <div className="top-rating-content">
                <input id="email-rating" placeholder="Email" />
                <div style={ { display:'flex', flexDirection: 'column' } }>
                  <Rater total={ 5 } rating={ 2 } />
                  <div className="button-rating" onClick={ ()=> {
                    document.querySelector('#email-rating').value = ''
                    document.querySelector('#labelRating').value = ''
                  }}>
                    Enviar!
                  </div>
                </div>
              </div>
              <textarea
                className="labelRating"
                id="labelRating"
                placeholder="Mensagem (Opcional)"
                data-testid="product-detail-evaluation"
                maxLength="500"
                rows="5"
                cols="50"
              />
            </form>
          </div>
          <div className="buttons-content">
            {(!globalID.includes(product.id)) ?
              <button
                type="button"
                data-testid="product-detail-add-to-cart"
                onClick={ () => this.addItemsToCart() }
                className="details-add-button"
              >
                Adicionar ao Carrinho
              </button>
              :
              <p>Produto Adicionado !</p>
            }
            {/* https://fontawesome.com/icons/times?style=solid */}
            <i class="fas fa-times close" onClick={ ()=> {
              document.querySelector('.obscure-background').style.display = 'none';
            }}
            ></i>
            
          </div>
        </section>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  addItemCart: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  globalDetails: state.details.product,
  globalID: state.product.id,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchPrice: (price) => dispatch(productPrice(price)),
  dispatchProduct: (product, id) => dispatch(productItem(product)),
  dispatchProductDetails: (toogle) => dispatch(productDetails(toogle)),
  dispatchQuantity: (id, quantity) => dispatch(productQuantity(id, quantity)),
  dispatchCartList: (cartItem) => dispatch(cartListHandler(cartItem)),
  dispatchID: (id) => dispatch(productID(id)),
});

export default connect(mapStateToProps, mapDispatchToProps )(ProductDetails);