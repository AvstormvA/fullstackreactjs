import React, { Component } from 'react';
import axios from 'axios';

const addProductData = (product_name, product_price, product_image) => axios.post('/addData', { product_name, product_price, product_image }).then((res) => res.data)

class AddData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product_name: "",
            product_price: "",
            product_image: ""
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
        var { product_name } = this.state;
        var { product_price } = this.state;
        var { product_image } = this.state;
        addProductData(product_name, product_price, product_image).then((res) => { console.log(res); })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <hr />
                    </div>
                    <div className="col-8 mx-auto">
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
                            <button onClick={() => this.saveButton()} type="reset" className="btn btn-info">Thêm Mới</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddData;