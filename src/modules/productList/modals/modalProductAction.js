import * as types from '../../../constants/actionTypes';

export function showPriceModal() {
    return ({
        type: types.TOGGLE_PRICE_MODAL,
    });
}

export function handleProduct(product) {
    return ({
        type: types.HANDLE_PRODUCT,
        product
    });
}

export function handleManufacture(manufacture_id) {
    return ({
        type: types.HANDLE_MANUFACTURE,
        manufacture_id
    });
}

export function handleCategory(good_category_id) {
    return ({
        type: types.HANDLE_CATEGORY,
        good_category_id
    });
}

export function handleStatus(status) {
    return ({
        type: types.HANDLE_STATUS,
        status
    });
}

export function showWareHouseModal() {
    return ({
        type: types.TOGGLE_WARE_HOUSE_MODAL
    });
}

export function showAvatarModal() {
    return ({
        type: types.TOGGLE_AVATAR_MODAL
    });
}

export function showSameProductModal() {
    return ({
        type: types.TOGGLE_SAME_PRODUCT_MODAL
    });
}

export function openWareHouseTab() {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_WAREHOUSE_TAB_PRODUCT_LIST
        });
    };
}

export function openHistoryTab() {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_HISTORY_TAB_PRODUCT_LIST
        });
    };
}

