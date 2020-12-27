import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartListHandler, productID, productPrice, productQuantity, removeCart } from '../actions';
class ToogleCart extends Component {
  constructor() {
    super();
    this.state = {
      click: false,
    };
    this.addQuantity = this.addQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { stateProduct} = this.props;
    const { click } = this.state;
    if(stateProduct && !click) {
      this.addQuantityToState (prevProps);
    }
  }

  addQuantityToState (prevProps) {
    const { stateProduct} = this.props;
    if (prevProps.stateProduct.id != stateProduct.id ) {
      this.setState({
        [stateProduct.id]: 1 
      })
    }
  }

  addQuantity(id, dispatchQuantity, { target }) {
    const { stateQuantity, dispatchPrice } = this.props;
    const productPrice = Number((target.parentNode.parentNode.nextSibling.innerText).split(" ")[1])
    this.setState(prevState => ({
      [id]: prevState[id] + 1
    }))
    dispatchQuantity(id, (stateQuantity[id] + 1))
    dispatchPrice(productPrice)
  }

  decreaseQuantity(id, dispatchQuantity, { target }) {
    const { stateQuantity, dispatchPrice } = this.props;
    const productPrice = Number((target.parentNode.parentNode.nextSibling.innerText).split(" ")[1])
    const negativePrice = productPrice - (productPrice * 2)
    if (stateQuantity[id] > 0) {
      this.setState(prevState => ({
        [id]: prevState[id] - 1
      }))
      dispatchQuantity(id, (stateQuantity[id] - 1))
      dispatchPrice(negativePrice)
      if(stateQuantity[id] === 1) {
        this.removeItem(id);
      }
    }
  }

  removeItem(id) {
    const { removeCartItem, stateCart, globalID } = this.props;
    const newCart = stateCart.filter(element => element.id !== id)
    removeCartItem(newCart)
    const indexToBeRemoved = globalID.indexOf(id)
    globalID.splice(indexToBeRemoved, 1)
  } 

  render() {
    const { stateCart, statePrice, dispatchQuantity, stateQuantity} = this.props;
    return (
      <div className="toogle-shoppingcart-container ">
        <div className="toogle-cart-header">
          {/* https://fontawesome.com/icons/shopping-cart?style=solid */}
          <i class="fas fa-shopping-cart"></i>
          <span>Carrinho de Compras</span>
        </div>
        {/* https://fontawesome.com/icons/box-open?style=solid */}
        {(stateCart && stateCart.length < 1 ) &&
          <div className="toogle-shoppingcart-empty">
            <i class="fas fa-box-open"></i>
            <p>Seu Carrinho está Vazio</p>
          </div>}
        <div className="toogle-center-container">
        {(stateCart && stateCart.length > 0)
          && stateCart.map(element => (
            <div key={element.id} className="cart-item">
              <img src={element.thumbnail}/>
              <span className="toogle-title">{element.title}</span>
              <div className="toogle-quantity">
                {/* https://fontawesome.com/icons/minus?style=solid */}
                <button onClick={ (event) =>  this.decreaseQuantity(element.id, dispatchQuantity, event) }>
                  <i class="fas fa-minus"></i>
                </button>
                <span>{stateQuantity[element.id]}</span>
                {/* https://fontawesome.com/icons/plus?style=solid */}
                <button onClick={ (event) =>  this.addQuantity(element.id, dispatchQuantity, event) }>
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <span className="toogle-price">
                {`R$ ${element.price}`}
              </span>
            </div>
        ))}
        </div>
        {(stateCart && stateCart.length > 0) &&
          <div className="total">
            <span>
              { `Valor total da Compra: R$ ${statePrice.toFixed(2)}` }
            </span>
            <button >
              <Link to="/Checkout">
                Finalizar Compra
              </Link>
            </button>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stateQuantity: state.price.quantity,
  stateProduct: state.product.product,
  statePrice: state.price.price,
  stateCart: state.product.cart,
  globalID: state.product.id,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchPrice: (price) => dispatch(productPrice(price)),
  dispatchQuantity: (id, quantity) => dispatch(productQuantity(id, quantity)),
  dispatchCartList: (cartItem) => dispatch(cartListHandler(cartItem)),
  removeCartItem: (cartItem) => dispatch(removeCart(cartItem)),
  dispatchID: (id) => dispatch(productID(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToogleCart);

