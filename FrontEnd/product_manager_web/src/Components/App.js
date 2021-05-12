import React, { Component } from 'react';
import './App.css'
import Product from './Product';
import HeadTitle from './HeadTitle';
import axios from 'axios';

const getProductData = () => axios.get('/getData').then((res) => res.data);
const addProductData = (product_name, product_price, product_image) => axios.post('/addData', { product_name, product_price, product_image }).then((res) => res.data);
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      product_name: "",
      product_price: "",
      product_image: ""
    }
  }


  componentWillMount() {
    if (this.state.data === null) {
      getProductData().then((res) => {
        this.setState({
          data: res
        });
      })
    }
  }

  printData = () => {
    if (this.state.data !== null) {
      return this.state.data.map((value, key) => (<Product key={key} product_name={value.product_name} product_price={value.product_price} image={value.product_image} />)
      )
    }
  }

  isChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  saveButton = () => {
    var { product_name, product_price, product_image } = this.state;
    var dataTemp = [];
    var item = {};
    item.product_name = product_name;
    item.product_price = product_price;
    item.product_image = product_image;
    dataTemp = this.state.data;
    if (item.product_name !== "") {
      dataTemp.push(item);
      this.setState({
        data: dataTemp
      });
    }
    addProductData(product_name, product_price, product_image).then((res) => { console.log(res); });

  }

  render() {
    return (
      <div>
        <HeadTitle />
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="row">
                {this.printData()}
              </div>
            </div>
            <div className="col-3">
              <div className="row">
                <div className="col-12 mx-auto">
                  <form>
                    <div className="form-group">
                      <label htmlFor="product_name">Tên Sản Phẩm</label>
                      <input onChange={(event) => { this.isChange(event) }} type="text" className="form-control" name="product_name" id="product_name" aria-describedby="name_text" placeholder="Nhập Tên Sản Phẩm" />
                      <small id="name_text" className="form-text text-muted">Nhập tên sản phẩm vào đây</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="product_price">Giá Sản Phẩm</label>
                      <input onChange={(event) => { this.isChange(event) }} type="text" className="form-control" name="product_price" id="product_price" aria-describedby="price_text" placeholder="Nhập Giá Sản Phẩm" />
                      <small id="price_text" className="form-text text-muted">Nhập giá sản phẩm vào đây</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="product_image">Đường Link Ảnh</label>
                      <input onChange={(event) => { this.isChange(event) }} type="text" className="form-control" name="product_image" id="product_image" aria-describedby="image_text" placeholder="Nhập Đường Link Ảnh" />
                      <small id="image_text" className="form-text text-muted">Nhập đường link ảnh vào đây</small>
                    </div>
                    <button onClick={() => this.saveButton()} type="reset" className="btn btn-info btn-block">Thêm Mới</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;