import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let customersList;
export default function customerReducer(state = initialState.customers, action) {
    switch (action.type) {



        //             LOAD CUSTOMERS

        case types.BEGIN_LOAD_CUSTOMER :
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.LOADED_CUSTOMER_SUCCESS:
            return {
                ...state,
                ...{
                    customersList: action.customersList,
                    totalPages: action.total_pages,
                    totalCount: action.total_count,
                    isLoading: false,
                }
            };

        case types.LOADED_INFO_CUSTOMER_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };


        case types.BEGIN_LOAD_INFO_CUSTOMER :
            return {
                ...state,
                isLoading: true,
            };
        case types.LOADED_INFO_CUSTOMER_SUCCESS:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    customer: action.customer
                },
                isLoading: true
            };

        case types.LOADED_CUSTOMER_ERROR:
            return {
                ...state,
                isLoading: false,

            };



        //              LOAD ORDER CUSTOMER


        case types.BEGIN_LOAD_ORDERS_CUSTOMER :
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.LOADED_ORDERS_CUSTOMER_SUCCESS:
            return {
                ...state,
                ...{
                    totalOrderPages: action.total_pages,
                    ordersList: action.ordersList,
                    isLoading: false,
                }
            };

        case types.LOADED_ORDERS_CUSTOMER_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };




        //      LOAD MONEY


        case types.BEGIN_LOAD_TOTAL_AND_DEBT_MONEY :
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.LOADED_TOTAL_AND_DEBT_MONEY_SUCCESS:
            return {
                ...state,
                ...{
                    totalMoneys: action.total_moneys,
                    totalDebtMoneys: action.total_debt_moneys,
                    isLoading: false,
                }
            };

        case types.LOADED_TOTAL_AND_DEBT_MONEY_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };



        //          ADD


        case types.UPDATE_ADD_CUSTOMER_FORM_DATA:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    customer: action.customer,
                }
            };
        case types.ADD_CUSTOMER_SUCCESS :
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...{
                        isSaving: false,
                    },
                },
                customersList: [action.customer, ...state.customersList],
            };
        case types.ADD_CUSTOMER_ERROR :
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...{
                        isSaving: false,
                    },
                }
            };
        case types.BEGIN_ADD_CUSTOMER :
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...{
                        isSaving: true,
                    },
                }
            };



        //          EDIT


        case types.BEGIN_EDIT_CUSTOMER:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...{
                        isSaving: true,
                    }
                }
            };
        case types.EDIT_CUSTOMER_ERROR:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...{
                        isSaving: false,
                    }
                }
            };
        case types.EDIT_CUSTOMER_SUCCESS:
            customersList = changeCustomer(action.customer, state.customersList);
            return {
                ...state,
                customersList: customersList,
                modal: {
                    ...state.modal,
                    ...{
                        isSaving: false,
                    }
                }
            };

        default :
            return state;
    }
}


// SUPPORT


function changeCustomer(actionCustomer, customersList) {
    if (customersList) {
        customersList = customersList.map(function (customer) {
            if (customer.id === actionCustomer.id) {
                return {
                    ...actionCustomer
                };
            }
            else return customer;
        });
    }
    return customersList;
}
