import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import boleto from '../img/boleto.jpeg';
import cartao from '../img/cartao.jpeg';

class Confirmation extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const { products, user, stateQuantity } = this.props;
    console.log(user.nome, user.cpf, user.email, user.phone,)
    console.log(user.adress, user.num, user.city, user.state)
    console.log(user.payment)
    return (
      <div className="confirmation-obscure-background">
        <div className="confirmation-container">
          <h4>Confirme seus dados: </h4>
          <div className="confirmation-top-content">
            <div className="products">
            {products.map((item) => {
              const qtd = stateQuantity[item.product.id]
              return (
                <div key={ this.id }>
                  <div className="checkout-product-container">
                    <img src={ item.product.thumbnail } alt="imagem do procuto" />
                    <h4>{item.product.title}</h4>
                    <p style={{margin: '0', padding: '0'}}>R$</p>
                    <div className="confirmation-price">
                      <h5>{item.product.price}</h5>
                      <span>Qtd. {qtd}</span>
                    </div>
                  </div>
                  <hr className="checkout-hr" />
                </div>
              )
            })}
            </div>
            <div className="confirmation-user-info">
              <div className="confirmation-user-info-children">
                <label>
                  <span>Nome: </span>
                  <p>{user.nome}</p>
                </label>
                <label>
                  <span>CPF: </span>
                  <p>{user.cpf}</p>
                </label>
                <label>
                  <span>Email: </span>
                  <p>{user.email}</p>
                </label>
                <label>
                  <span>Telefone: </span>
                  <p>{user.phone}</p>
                </label>
                <label>
                  <span>Endereço: </span>
                  <p>{`${user.adress} ${user.num} ${user.city} ${user.state}`}</p>
                </label>
                <label>
                  <span>Forma de Pagamento: </span>
                  { user.payment === 'boleto' ? <img src={ boleto } /> : <img src={ cartao } /> }
                </label>
              </div>
            </div>
          </div>
          <div className="buttons">
            { /* https://fontawesome.com/icons/long-arrow-alt-left?style=solid */ }
            <i class="fas fa-long-arrow-alt-left" onClick={ () => {
              document.querySelector('.confirmation-obscure-background')
                .style.display="none";
            }}></i>
            <Link to="/">
              <button className="confirmation-button">
                <span>Confirmar</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Confirmation.propTypes = {
};

const mapStateToProps = (state) => ({
  statePrice: state.price.price,
  stateQuantity: state.price.quantity
});

export default connect(mapStateToProps)(Confirmation);
