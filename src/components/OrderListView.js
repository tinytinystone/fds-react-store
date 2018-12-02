import s from './OrderListView.module.scss';
import React, { Component } from 'react';

function OrderItem(props) {
  const { orderTime, orderDetail } = props.order;
  console.log(props);
  return (
    <section className={s.order}>
      <h3>{orderTime}</h3>
      {orderDetail.map((order, index) => {
        const { title, mainImg, optionTitle, price, quantity } = order;
        return (
          <article key={index} className={s.orderItem}>
            <p className={s.title}>제품명: {title}</p>
            <img src={mainImg} alt={title} className={s.mainImg} />
            <p>선택한 옵션: {optionTitle}</p>
            <p>수량: {quantity}</p>
            <p className={s.price}>가격: {price}</p>
          </article>
        );
      })}
    </section>
  );
}

export default class OrderListView extends Component {
  render() {
    const { orderList } = this.props;
    return (
      <section className={s.order}>
        {orderList.map(order => {
          return <OrderItem order={order} key={order.orderId} />;
        })}
      </section>
    );
  }
}
