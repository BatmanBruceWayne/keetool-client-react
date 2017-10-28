import * as types from '../../constants/actionTypes';
import * as categoriesAPI from './categoriesAPI';
import * as helper from '../../helpers/helper';

export  function editCategory(id , name , close) {
    return function (dispatch) {
        helper.showTypeNotification("Đang cập nhật" , "info");
        dispatch({
            type : types.BEGIN_EDIT_CATEGORY,
        });
        categoriesAPI.editCategoryAPI(id , name)
            .then((res) => {
            close();
            if(res.data.status)
            {
                helper.showTypeNotification('Cập nhật thành công ' + name ,'success');
                dispatch({
                    type : types.EDIT_CATEGORY_SUCCESS,
                    id : id,
                    name: name,
                });
            }
            else {
                helper.sweetAlertError(res.data.message);
            }

            })
            .catch(() => {
            helper.sweetAlertError('Cập nhật thất bại');
            dispatch({
                type : types.EDIT_CATEGORY_ERROR,
            });
            });
    };
}

export function deleteCategory(id) {
    return function (dispatch) {
        helper.showTypeNotification("Đang xóa ", "info");
        dispatch({
            type: types.BEGIN_DELETE_CATEGORY,
        });
        categoriesAPI.deleteCategoryAPI(id)
            .then((res) => {
            if (res.data.status){
                helper.showTypeNotification(" Đã xóa ", "success");
                dispatch({
                    type: types.DELETE_CATEGORY_SUCCESS,
                    id: id,
                });
            }
            else {
                helper.sweetAlertError('Xóa thất bại');
            }

            })
            .catch(() => {
                helper.sweetAlertError('Xóa thất bại ');
                dispatch({
                    type: types.DELETE_CATEGORY_ERROR,
                });
            });
    };
}

export function addCategory(name, parent_id, close) {
    return function (dispatch) {
        helper.showTypeNotification("Đang thêm", "info");
        dispatch({type: types.BEGIN_ADD_CATEGORY});
        categoriesAPI.addCategoryAPI(name, parent_id)
            .then((res) => {
                close();
                if(res.data.status){
                    helper.showTypeNotification('Đã thêm ' + name, 'success');
                    dispatch({
                        type: types.ADD_CATEGORY_SUCCESS,
                        category: res.data.data.goodCategory
                    });
                }
                else {
                    helper.sweetAlertError('Chưa được thêm ');
                }
            })
            .catch(() => dispatch({
                type: types.ADD_CATEGORY_ERROR
            }));
    };
}

export function loadCategories() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_CATEGORIES_DATA});
        categoriesAPI.loadCategoriesDataAPI()
            .then((res) => {
                    dispatch({
                            type: types.LOADED_CATEGORIES_DATA_SUCCESS,
                            categoriesList: res.data.data[0].good_categories,
                        }
                    );
                }
            )
            .catch(() => {
                dispatch({type: types.LOADED_CATEGORIES_DATA_ERROR});
            });
    };
}


export function openAddCategoryModalContainer(id , parent_id, name, isEdit) {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_ADD_CATEGORY_MODAL_CONTAINER,
            parent_id: parent_id,
            name: name,
            id : id,
            isEdit: isEdit,
        });
    };
}

export function closeAddCategoryModalContainer() {
    return function (dispatch) {
        dispatch({
            type: types.CLOSE_ADD_CATEGORY_MODAL_CONTAINER
        });
    };
}