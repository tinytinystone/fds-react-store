import React, { Component } from 'react';
import withLoading from '../hoc/withLoading';

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
        <div>{id}</div>
        <div>{title}</div>
        <div>{description}</div>
        <img src={mainImgUrl} alt={title} />
        <label>옵션</label>
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
        <label>
          수량
          <input
            type="number"
            name="quantity"
            value={this.state.optionQuantity}
            onChange={this.handleQtyChange}
          />
        </label>
        <span>{finalPrice} 원</span>
        <button
          onClick={() => {
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
          장바구니
        </button>
        {detailImgUrls.map(url => (
          <img src={url} alt={title} key={id} />
        ))}
      </React.Fragment>
    );
  }
}

export default withLoading(ProductDetailView);
