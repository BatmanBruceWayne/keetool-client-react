import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as createProductAction from './createProductAction';
import Select from 'react-select';
import PropTypes from 'prop-types';

class ProductSystemContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            manufacture: '',
            category: ''
        };
        this.selectStatusProduct = this.selectStatusProduct.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.changeManufactureSelect = this.changeManufactureSelect.bind(this);
        this.changeCategorySelect = this.changeCategorySelect.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }

    updateFormData(e) {
        const field = e.target.name;
        let productWorking = {...this.props.productWorking};
        productWorking[field] = e.target.value;
        this.props.createProductAction.handleProductCreate(productWorking);
    }

    selectStatusProduct(e) {
        const field = e.target.name;
        let productWorking = {...this.props.productWorking};
        e.target.checked ? (
            productWorking[field] = 1
        ) : (
            productWorking[field] = 0
        );
        this.props.createProductAction.handleProductCreate(productWorking);
    }

    changeManufactureSelect(value) {
        let productWorking = {...this.props.productWorking};
        if (value) {
            productWorking.manufacture_id = value.value;
        } else {
            productWorking.manufacture_id = '';
        }
        this.props.createProductAction.handleProductCreate(productWorking);
    }

    changeCategorySelect(value) {
        let productWorking = {...this.props.productWorking};
        if (value) {
            productWorking.good_category_id = value.value;
        } else {
            productWorking.good_category_id = '';
        }
        this.props.createProductAction.handleProductCreate(productWorking);
    }

    render() {
        const product = this.props.productWorking;
        return (
            <form role="form">
                <div className="row">
                    <div className="col-md-4">
                        <h4 className="panel-title">
                            <div className="checkbox none-margin">
                                <label>
                                    <input type="checkbox"
                                           name="sale_status"
                                           checked={product.sale_status}
                                           onChange={this.selectStatusProduct}
                                    />
                                    <span className="checkbox-material">
                                    <span className="check"/>
                                </span>
                                    Đang kinh doanh
                                </label>
                            </div>
                        </h4>
                    </div>
                    <div className="col-md-4">
                        <h4 className="panel-title">
                            <div className="checkbox none-margin">
                                <label>
                                    <input type="checkbox"
                                           name="display_status"
                                           checked={product.display_status}
                                           onChange={this.selectStatusProduct}
                                    />
                                    <span className="checkbox-material">
                                    <span className="check"/>
                                </span>
                                    Hiển thị ra website
                                </label>
                            </div>
                        </h4>
                    </div>
                    <div className="col-md-4">
                        <h4 className="panel-title">
                            <div className="checkbox none-margin">
                                <label>
                                    <input type="checkbox"
                                           name="highlight_status"
                                           checked={product.highlight_status}
                                           onChange={this.selectStatusProduct}
                                    />
                                    <span className="checkbox-material">
                                    <span className="check"/>
                                </span>
                                    Nổi bật
                                </label>
                            </div>
                        </h4>
                    </div>
                </div>
                <div className="form-group">
                    <label className="label-control">Tên sản phẩm</label>
                    <input type="text"
                           name="name"
                           placeholder="Nhập tên sản phẩm"
                           className="form-control"
                           value={product.name}
                           onChange={this.updateFormData}/>
                    <span className="material-input"/>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="label-control">Mã sản phẩm</label>
                            <input type="text"
                                   name="code"
                                   placeholder="Nhập mã sản phẩm"
                                   className="form-control"
                                   value={product.code}
                                   onChange={this.updateFormData}/>
                            <span className="material-input"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="label-control">Giá bán</label>
                            <input type="text"
                                   name="price"
                                   placeholder="0"
                                   className="form-control"
                                   value={product.price}
                                   onChange={this.updateFormData}/>
                            <span className="material-input"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label className="label-control">Nhà sản xuất</label>
                        <Select
                            name="manufactures"
                            value={product.manufacture_id}
                            options={this.props.manufactures.map((manufacture) => {
                                return {
                                    ...manufacture,
                                    value: manufacture.id,
                                    label: manufacture.name
                                };
                            })}
                            onChange={this.changeManufactureSelect}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="label-control">Nhóm hàng hóa</label>
                        <Select
                            name="categories"
                            value={product.good_category_id}
                            options={this.props.categories.map((category) => {
                                return {
                                    ...category,
                                    value: category.id,
                                    label: category.label
                                };
                            })}
                            onChange={this.changeCategorySelect}
                        />
                    </div>
                </div>
            </form>
        );
    }
}

ProductSystemContainer.propTypes = {
    manufactures: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    productWorking: PropTypes.object.isRequired,
    createProductAction: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        manufactures: state.createProduct.manufactures,
        categories: state.createProduct.categories,
        productWorking: state.createProduct.productWorking
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createProductAction: bindActionCreators(createProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSystemContainer);