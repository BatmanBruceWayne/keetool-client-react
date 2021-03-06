import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '../../components/common/Pagination';





class OrdersListCustomerComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>






                <div className="row">
                    <div className="col-sm-12">
                        <table id="property-table" className="table table-hover" role="grid"
                               aria-describedby="property-table_info">
                            <thead>
                            <tr className="text-rose" role="row">
                                <th>Mã</th>
                                <th>Thời gian mua hàng</th>
                                <th>Tổng tiền hàng</th>
                                <th> Tiền trả hàng</th>
                                <th> Tiền nợ</th>
                                <th> Nhân viên bán hàng</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.ordersList && this.props.ordersList.map(
                                (order) => {
                                    return (
                                        <tr role="row" className="even" key={order.id}>
                                            <td className="sorting_1">
                                                {order.code}
                                            </td>
                                            <td>{order.created_at}</td>
                                            <td>{order.total}</td>
                                            <td>{order.paid}</td>
                                            <td>{order.debt}</td>
                                            <td>{order.staff && order.staff.name}</td>
                                        </tr>

                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>








                <div className="row">
                    <div className="col-sm-5">
                        <div className="dataTables_info" id="property-table_info"
                             role="status" aria-live="polite">Hiển trị
                            trang {this.props.currentPage} trên tổng số
                            {' ' + this.props.totalOrderPages} trang
                        </div>
                    </div>
                    <div className="col-sm-7" style={{textAlign: 'right'}}>
                        <Pagination
                            totalPages={this.props.totalOrderPages}
                            currentPage={this.props.currentPage}
                            loadDataPage={this.props.loadOrdersCustomer}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

OrdersListCustomerComponent.propTypes = {
    ordersList: PropTypes.array,
    loadOrdersCustomer: PropTypes.func,
    currentPage : PropTypes.number,
    totalOrderPages : PropTypes.number,
};


export default OrdersListCustomerComponent;