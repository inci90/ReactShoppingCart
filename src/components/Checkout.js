import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { loadCart, removeProduct } from '../store/actions/floatCartActions';
import { updateCart } from '../store/actions/updateCartActions';
import { showCheckout } from '../store/actions/checkoutActions';

import util from '../util';


class Checkout extends Component {
  state = {
    couponCode: false,
    coupSuccess: false,
    twentyoffDiscount: false,
  };

  closeCheckout = () => {
    const { showCheckout } = this.props;
    showCheckout(false);
  }

  proceedToCheckout = () => {
    const { totalPrice, currencyFormat, currencyId } = this.props.cartTotals;
    const { cartProducts, updateCart } = this.props;
    alert(`Checkout - Subtotal: ${currencyFormat} ${util.formatPrice(totalPrice, currencyId)}`);
    this.closeCheckout();
    cartProducts.length = 0;
    updateCart(cartProducts);

  }

  applyDiscount = (event) => {
    const { totalPrice } = this.props.cartTotals;
    event.preventDefault();

    if (this.state.couponCode === "20OFF" && !this.state.twentyoffDiscount) {
      this.setState({twentyoffDiscount: true})
      this.setState({coupSuccess: true})
      this.props.cartTotals.totalPrice = totalPrice*0.80;
      this.setState({totalPrice});
    } else if  (this.state.couponCode === "20OFF" && this.state.twentyoffDiscount) {
      alert("Code has already been entered!");
    } else {
      alert("Invalid code!");
    }
  }

  handleChange = (event) =>
    this.setState({couponCode: event.target.value});


  render() {
    const { cartTotals } = this.props;

    return(
      <div>
        {this.props.checkoutIsOpen &&(

          <div className="checkoutModal">

          <div className="checkoutModal-content">
            <span className="close-btn" onClick={this.closeCheckout}>&times;</span>
            <div>
              <form onSubmit={() => this.proceedToCheckout()}>
                <h3 className="delivInfo-header">Delivery Information:</h3>
                <div className="delivInfo-content">
                  <p>Full Name</p>
                  <input type="text" required></input>
                  <p>Email</p>
                  <input type="email" required></input>
                  <p>Address</p>
                  <input type="text" required></input>
                  <p>City</p>
                  <input type="text" required></input>
                  <p>Zip</p>
                  <input type="text" pattern="[0-9]{4}"
                    title="A zip code consists of four digits." required></input>
                  <p>State</p>
                  <input type="text" required></input>
                </div>
                <h3 className="payInfo-header">Payment Information:</h3>
                <div className="payInfo-content">
                  <p>Name as it appears on card</p>
                  <input type="text" required></input>
                  <p>Credit card number</p>
                  <input type="text" pattern="([0-9]{4}[-]){3}[0-9]{4}"
                    title="A credit card must be in the form &quot;XXXX-XXXX-XXXX-XXXX&quot;" required></input>
                  <p>Expiry</p>
                  <input type="month" required></input>
                  <p>CVV</p>
                  <input type="number" pattern="[0-9]{3}"
                    title="Your CVV is the three digit code on the back of your card"  required></input>
                </div>
                <div className="checkoutModal-footer">
                  <div className="sub">SUBTOTAL</div>
                    <div className="sub-price">
                    <p className="sub-price__val">
                      {`${cartTotals.currencyFormat} ${util.formatPrice(cartTotals.totalPrice, cartTotals.currencyId)}`}
                    </p>
                    </div>
                    <div className="coup-btn">
                      <input className="coup-text" type="text" name="coupon" onChange={this.handleChange}></input>
                      <button className="coup-submit" type="Button" onClick={this.applyDiscount}>Enter Coupon</button>
                    </div>
                    {this.state.coupSuccess &&(
                      <div className="coup-msg">
                        <p>
                          Coupon accepted, 20% has been taken off your price.
                        </p>
                      </div>
                    )}

                      <input className="buy-btn" type="submit" value="Checkout"></input>
                    
                  </div>
              </form>
            </div>
          </div>
        </div>
      )}</div>
    );
  }
}

Checkout.propTypes = {
  loadCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  cartProducts: PropTypes.array.isRequired,
  newProduct: PropTypes.object,
  removeProduct: PropTypes.func,
  productToRemove: PropTypes.object,
  showCheckout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cartProducts: state.cartProducts.items,
  newProduct: state.cartProducts.item,
  productToRemove: state.cartProducts.itemToRemove,
  cartTotals: state.cartTotals.item,
  checkoutIsOpen: state.checkouts.item,
});

export default connect(mapStateToProps, { loadCart, updateCart, removeProduct, showCheckout})(Checkout);
