import React, { Component } from 'react';
import withLoading from '../hoc/withLoading';
import s from './ProductDetailView.module.scss';

class ProductDetailView extends Component {
  render() {
    const {
      id,
      title,
      description,
      mainImgUrl,
      detailImgUrls,
      options,
      onQtyChange,
      onOptionChange,
      finalPrice,
      selectedOptionId,
      quantity,
    } = this.props;

    return (
      <React.Fragment>
        <ul className={s.info}>
          <li>
            <img src={mainImgUrl} alt={title} />
          </li>
          <li>{title}</li>
          <li>{description}</li>
        </ul>
        <form
          className={s.cartForm}
          onSubmit={e => {
            e.preventDefault();
            if (selectedOptionId === '') {
              alert('choose an option.');
            } else if (quantity < 1) {
              alert('choose more than 1 piece');
            } else {
              this.props.onCreateCartItem(selectedOptionId, quantity);
            }
          }}
        >
          <label>가격</label>
          <p>{options && options[0].price} 원</p>
          <label>선택</label>
          <select
            name="options"
            value={selectedOptionId}
            onChange={onOptionChange}
          >
            <option disabled value="">
              옵션을 선택하세요
            </option>
            {options &&
              options.map(o => (
                <option key={o.id} value={o.id}>
                  {o.title}
                </option>
              ))}
          </select>
          <label>수량</label>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={onQtyChange}
          />
          <label>최종 가격</label>
          <p>{finalPrice} 원</p>
          <button>장바구니에 넣기</button>
        </form>
        {detailImgUrls &&
          detailImgUrls.map(url => (
            <img src={url} alt={title} key={id} className={s.detailImg} />
          ))}
      </React.Fragment>
    );
  }
}

export default withLoading(ProductDetailView);
