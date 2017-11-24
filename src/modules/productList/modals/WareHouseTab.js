import React from 'react';
import PropTypes from 'prop-types';

class WareHouseTab extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr className="text-rose">
                        <th>STT</th>
                        <th>Tên kho</th>
                        <th>Địa chỉ</th>
                        <th>Cơ sở</th>
                        <th>Địa chỉ cơ sở</th>
                        <th>SL</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.productPresent.good_warehouses && this.props.productPresent.good_warehouses.map((warehouse, id) => {
                            return (
                                <tr key={id}>
                                    <td>{id + 1}</td>
                                    <td>{warehouse.warehouse.name}</td>
                                    <td>{warehouse.warehouse.address}</td>
                                    <td>{warehouse.base.name}</td>
                                    <td>{warehouse.base.address}</td>
                                    <td>{warehouse.quantity}</td>
                                    <td>
                                        <div className="btn-group-action">
                                            <a data-toggle="tooltip" title="" type="button"
                                               rel="tooltip" href="good/11/edit"
                                               data-original-title="Sửa"><i className="material-icons">edit</i></a>
                                            <a
                                                data-toggle="tooltip" title="" type="button" rel="tooltip"
                                                data-original-title="Không thể xoá"><i
                                                className="material-icons">delete_forever</i></a>
                                            <a
                                                data-toggle="tooltip" title="" type="button" rel="tooltip"
                                                data-original-title="Chuyển kho"><i
                                                className="material-icons">swap_horiz</i></a>

                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    <tr>
                        <td/>
                        <td><b>Tổng</b></td>
                        <td/>
                        <td/>
                        <td/>
                        <td>
                            <b>{this.props.productPresent.total_quantity_in_warehouses}</b>
                        </td>
                        <td/>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

WareHouseTab.propTypes = {
    productPresent: PropTypes.object.isRequired
};

export default WareHouseTab;