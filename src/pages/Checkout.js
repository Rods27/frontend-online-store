import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import boleto from '../img/boleto.jpeg';
import cartao from '../img/cartao.jpeg';
import { connect } from 'react-redux';
import { renderConfirmation } from '../actions';
import Confirmation from '../components/Confirmation';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      render: false,
      validCpf: false,
      validEmail: false,
      validCep: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    fetch('/api/form-submit-url', {
      method: 'POST',
      body: data,
    });
  }

  handleValidator({ target }) {
    if (target.name === 'cpf' && this.state[target.name] && target.value.length === 11) {
      const validator = /^(\d{3}.\d{3}.\d{3}-\d{2})|(\d{11})$/i;
      const isValid = validator.test(Number(target.value));
      if (isValid) {
        this.setState({ validCpf: true })
      } else {
        this.setState({ validCpf: false })
      }
    }
    
    if (target.name === 'email' && this.state[target.name]) {
      const validator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      const isValid = validator.test(String(target.value).toLowerCase());
      if (isValid) {
        this.setState({ validEmail: true })
      } else {
        this.setState({ validEmail: false }) 
      }
    }

    if (target.name === 'cep' && this.state[target.name]) {
      console.log(target.name)
      const validator = 	/^\d{5}-\d{3}$/
      const isValid = validator.test(target.value);
      if (isValid) {
        this.setState({ validCep: true }) 
      } else {
        this.setState({ validCep: false }) 
      }
    }
  }

  changeHandler({ target }) {
    this.setState({ [target.name]: target.value });
    this.handleValidator({ target });
  }

  render() {
    const {
      validEmail,
      email,
      validCep,
      cep,
      validCpf,
      cpf,
      adress,
      city,
      nome,
      num,
      phone,
      state,
      payment
    }= this.state;
    const { products, renderConfirm, statePrice, stateQuantity, stateCart } = this.props;
    const user= { email, cep, cpf, adress, city, nome, num, phone, state, payment };
    return (
      <div className="checkout-container">
        <Confirmation user={ user } />
        <div className="checkout-container-2">
          <div className="checkout-top-content">
            <h3>Revise seus Produtos</h3>
            {stateCart.map((item) =>  {
              const qtd = stateQuantity[item.id]
              return (
                <div key={ this.id }>
                  <div className="checkout-product-container">
                    <img src={ item.thumbnail } alt="imagem do procuto" />
                    <h3>{item.title}</h3>
                    <span>R$</span>
                    <h4>{item.price}</h4>
                    <span style={{fontSize: '14px;'}}>Qtd. {qtd}</span>
                  </div>
                  <hr className="checkout-hr" />
                </div>
              )
            })}
            <div className="price-div">
              <p>Total:</p>
              <span>R$ </span>
              <h3>{statePrice.toFixed(2)}</h3>
            </div>
          </div>
          <form className="form-container" onSubmit={ this.handleSubmit }>
            <h3>Informações do Comprador</h3>
            <div className="inputs-div">
              <div className="form-top-content">
                <input type="text" name="nome" onChange={ (event) => this.changeHandler(event) } placeholder="Nome Completo" />
                <input type="text" name="cpf" maxlength="11" onChange={ (event) => this.changeHandler(event) } placeholder="Ex: 12345678912" />
                <input type="text" name="email" onChange={ (event) => this.changeHandler(event) } placeholder="Email" />
                <input type="number" name="phone" onChange={ (event) => this.changeHandler(event) } placeholder="Telefone" />
              </div>
              <div className="form-middle-content">
                <input type="text" name="cep" maxlength="9" onChange={ (event) => this.changeHandler(event) } placeholder="Ex: 00000-000" />
                <input type="text" name="adress" onChange={ (event) => this.changeHandler(event) } placeholder="Endereço" />
              </div>
              <div className="form-bottom-content">
              <input type="text" name="another" onChange={ (event) => this.changeHandler(event) } placeholder="Complemento" />
              <input type="number" name="num" onChange={ (event) => this.changeHandler(event) } placeholder="Número" />
              <input type="text" name="city" onChange={ (event) => this.changeHandler(event) } placeholder="Cidade" />
              <input type="text" name="state" onChange={ (event) => this.changeHandler(event) } placeholder="Estado" />
            </div>
            </div>
          </form>
          <div className="payment-container">
            <h3>Método de pagamento</h3>
            <div className="payment-methods">
              <div>
                <p>Boleto</p>
                <div className="boleto-div">
                  <label htmlFor="boleto">
                    <input id="boleto" type="radio" name="payment" value="boleto" onChange={ (event) => this.changeHandler(event) } />
                  </label>
                  <img
                    src={ boleto }
                    width="100"
                    alt="imagem de boleto"
                  />
                </div>
              </div>
              <div className="creditcard">
                <p>Cartão de Crédito</p>
                <div className="card-div">
                  <label htmlFor="visa">
                    <input id="visa" type="radio" name="payment" value="visa" onChange={ (event) => this.changeHandler(event) } />
                    Visa
                  </label>
                  <img src={ cartao } alt="imagem de cartao" />
                  <label htmlFor="mastercard">
                    <input id="mastercard" type="radio" name="payment" value="mastercard" onChange={ (event) => this.changeHandler(event) }/>
                    Mastercard
                  </label>
                  <img src={ cartao } alt="imagem de cartao" />
                  <label htmlFor="elo">
                    <input id="elo" type="radio" name="payment" value="elo" onChange={ (event) => this.changeHandler(event) } />
                    Elo
                  </label>
                  <img src={ cartao } alt="imagem de cartao" />
                </div>
              </div>
            </div>
          </div>
          <div className="checkout-buttons">
          <Link to="/">
            { /* https://fontawesome.com/icons/long-arrow-alt-left?style=solid */ }
            <i class="fas fa-long-arrow-alt-left"></i>
          </Link>
          <button
            type="submit"
            className="checkout-button"
            onClick= { () => {
              renderConfirm(true)
              document.querySelector('.confirmation-obscure-background').style.display = "flex"
            }}
            disabled= { !validEmail || !validCpf || !validCep || !adress || !city || !nome || !num || !phone || !state || !payment }
          >
            Prosseguir
          </button>
        </div>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  location: propTypes.arrayOf(propTypes.object).isRequired,
  state: propTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  statePrice: state.price.price,
  stateQuantity: state.price.quantity,
  stateCart: state.product.cart,
});

const mapDispatchToProps = (dispatch) => ({
  renderConfirm: (toogle) => dispatch(renderConfirmation(toogle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
