import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function addDiscountReducer(state = initialState.addDiscount, action) {
    switch (action.type) {
        case types.UPDATE_DISCOUNT_FORM_DATA :
            return {
                ...state,
                discount: action.discount,
            };

        case types.ADD_DISCOUNT_SUCCESS :
            return {
                ...state,
                isSaving: false,
            };
        case types.ADD_DISCOUNT_ERROR :
            return {
                ...state,
                isSaving: false,
            };
        case types.BEGIN_ADD_DISCOUNT :
            return {
                ...state,
                isSaving: true,
            };





            //          LOAD CUSTOMERS





        case types.BEGIN_LOAD_CUSTOMER_IN_DISCOUNT :
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.LOADED_CUSTOMER_SUCCESS_IN_DISCOUNT:
            return {
                ...state,
                ...{
                    customers: action.customers,
                    isLoading: false,
                    totalCustomerPages: action.total_pages,
                }
            };

        case types.LOADED_CUSTOMER_ERROR_IN_DISCOUNT:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };




            //          LOAD GOODS




        case types.BEGIN_LOAD_GOOD_IN_DISCOUNT :
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.LOADED_GOOD_SUCCESS_IN_DISCOUNT:
            return {
                ...state,
                ...{
                    goods: action.goods,
                    isLoading: false,
                    totalGoodPages: action.total_pages,
                }
            };

        case types.LOADED_GOOD_ERROR_IN_DISCOUNT:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };

            //          LOAD CATEGORIES




        case types.BEGIN_LOAD_CATEGORY_IN_DISCOUNT :
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.LOADED_CATEGORY_SUCCESS_IN_DISCOUNT:
            return {
                ...state,
                ...{
                    categories: action.categories,
                    isLoading: false,
                }
            };

        case types.LOADED_CATEGORY_ERROR_IN_DISCOUNT:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };



        default :
            return state;
    }
}