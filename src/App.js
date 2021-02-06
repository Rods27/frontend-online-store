import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Search from './components/Search';
import Checkout from './pages/Checkout';
import Confirmation from './components/Confirmation';

class App extends React.Component {
  constructor() {
    super();

    this.addItemCart = this.addItemCart.bind(this);
    this.state = {
      shoppingCart: [],
      totalPrice: 0,
    };
  }

  addItemCart(product, price) {
    const { shoppingCart, totalPrice } = this.state;
    this.setState({
      shoppingCart: shoppingCart.concat(product),
      totalPrice: price + totalPrice,
    })
  }

  render() {
    const { shoppingCart, totalPrice } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ (props) => 
            <Search
              addItemCart={ this.addItemCart }
              cartList={ shoppingCart }
              totalPrice={ totalPrice }
              { ...props }
            />
          }
        />
        <Route
          exact
          path="/Checkout"
          render={ 
            (props) => <Checkout products={ shoppingCart } { ...props } />
          } 
        />
        <Route 
          exath path= "/confirmation"
           render={ 
            () => <Confirmation products={ shoppingCart } />
          }
        />
      </Switch>
    );
  }
}

export default App;
