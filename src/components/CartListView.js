import React, { Component } from 'react';
import s from './CartListView.module.scss';
import withLoading from '../hoc/withLoading';

class CartListView extends Component {
  constructor(props) {
    super(props);

    // !! props로부터 state를 계산해내고 싶은 경우
    // 생성자에서 해당 작업을 해주면 된다.
    // 다만, props가 단 한번만 내려올 때만 이 방식이 가능하다.

    const { carts, products } = props;
    console.log(this.props);
    const productsInCarts = carts.map(cart => {
      const { quantity, option } = cart;
      const { mainImgUrl, title } = products.find(
        product => cart.option.productId === product.id
      );
      return {
        cartId: cart.id,
        title,
        price: option.price,
        mainImgUrl,
        quantity,
        optionTitle: option.title,
        checked: true,
      };
    });

    this.state = {
      productsInCarts,
    };
  }
  handleQtyChange = (cartId, quantity) => {
    const { productsInCarts } = this.state;
    const newProductsInCarts = productsInCarts.map(p => {
      if (p.cartId === cartId) {
        p.quantity = quantity;
      }
      return p;
    });
    this.setState({ productsInCarts: newProductsInCarts });
  };
  handleCheck = e => {
    // e.preventDefault(); // 흑흑 슬퍼요
    // immer를 써보는 것으로
    const { productsInCarts } = this.state;
    const cartId = parseInt(e.target.value);
    // console.log('cartId: ', cartId);
    const newProductsInCarts = productsInCarts.map(p => {
      if (p.cartId === cartId) {
        p.checked = e.target.checked;
      }
      return p;
    });
    // console.log('newProductsInCarts', newProductsInCarts);
    this.setState({ productsInCarts: newProductsInCarts });
  };
  handleOrder = () => {
    const newProductsInCarts = this.state.productsInCarts.filter(
      p => p.checked === true
    );
    const newArr = [];
    for (const p of newProductsInCarts) {
      newArr.push(p.cartId);
    }
    this.props.handleClick(newArr);
  };
  renderItem(productInCart) {
    const {
      cartId,
      title,
      price,
      mainImgUrl,
      quantity,
      optionTitle,
      checked,
    } = productInCart;
    // console.log('cartId', cartId, 'checked', checked);
    return (
      <article key={cartId} className={s.cartItem}>
        <input
          type="checkbox"
          checked={checked}
          value={cartId}
          onChange={this.handleCheck}
        />
        <img src={mainImgUrl} alt={title} />
        <h3>{title}</h3>
        <span>{price * quantity}</span>
        <span>{optionTitle}</span>
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={e =>
            this.handleQtyChange(parseInt(cartId), parseInt(e.target.value))
          }
        />
        <button
          onClick={e => {
            this.props.deleteItem(cartId);
          }}
        >
          삭제
        </button>
      </article>
    );
  }
  render() {
    const { productsInCarts } = this.state;
    return (
      <section>
        {productsInCarts.map(p => this.renderItem(p))}
        <button onClick={this.handleOrder}>주문하기</button>
      </section>
    );
  }
}

export default withLoading(CartListView);
