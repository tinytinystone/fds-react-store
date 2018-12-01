import React, { Component } from 'react';
import withLoading from '../hoc/withLoading';
import s from './ProductDetailView.module.scss';

class ProductDetailView extends Component {
  static defaultProps = {
    id: null,
    title: '',
    description: '',
    mainImgUrl: '',
    detailImgUrls: [],
    options: [],
  };
  constructor(props) {
    super(props);
    this.state = {
      optionId: '',
      optionPrice: this.props.options[0].price,
      optionQuantity: 1,
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
  }
  handleOptionChange(e) {
    const { options } = this.props;
    e.preventDefault();
    const optionId = parseInt(e.target.value);
    const optionPrice = options[optionId - 1].price;
    this.setState({
      optionId,
      optionPrice,
    });
  }
  handleQtyChange(e) {
    e.preventDefault();
    const optionQuantity = parseInt(e.target.value);
    parseInt(this.state.optionPrice) * optionQuantity > 0 &&
      this.setState({
        optionQuantity,
      });
  }
  render() {
    const {
      id,
      title,
      description,
      mainImgUrl,
      detailImgUrls,
      options,
    } = this.props;
    const { optionPrice, optionQuantity } = this.state;
    const finalPrice = optionPrice * optionQuantity;
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
            const { optionId, optionQuantity } = this.state;
            if (optionId === '') {
              alert('choose an option.');
            } else if (optionQuantity < 1) {
              alert('choose more than 1 piece');
            } else {
              this.props.onCreateCartItem(optionId, optionQuantity);
            }
          }}
        >
          <label>가격</label>
          <p>{optionPrice} 원</p>
          <label>선택</label>
          <select
            name="options"
            value={this.state.optionId}
            onChange={this.handleOptionChange}
          >
            <option disabled value="">
              옵션을 선택하세요
            </option>
            {options.map(o => (
              <option key={o.id} value={o.id}>
                {o.title}
              </option>
            ))}
          </select>
          <label>수량</label>
          <input
            type="number"
            name="quantity"
            value={this.state.optionQuantity}
            onChange={this.handleQtyChange}
          />
          <label>최종 가격</label>
          <p>{finalPrice} 원</p>
          <button>장바구니에 넣기</button>
        </form>
        {detailImgUrls.map(url => (
          <img src={url} alt={title} key={id} className={s.detailImg} />
        ))}
      </React.Fragment>
    );
  }
}

export default withLoading(ProductDetailView);
