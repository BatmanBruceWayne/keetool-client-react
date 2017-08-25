import * as types from '../../constants/actionTypes';
import * as emailFormApi from './emailFormApi';
import * as helper from '../../helpers/helper';
import {BASE_URL} from '../../constants/env';

export function loadForms(page, search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_EMAIL_FORMS,
        });
        emailFormApi.loadForms(page, search)
            .then(res => {
                dispatch({
                    type: types.LOAD_EMAIL_FORMS_SUCCESS,
                    forms: res.data.email_forms,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            })
            .catch(() =>{
                dispatch({
                    type: types.LOAD_EMAIL_FORMS_ERROR,
                });
        });
    };
}

export function updateEmailFormData(emailForm) {
    return ({
        type: types.UPDATE_EMAIL_FORM_DATA,
        emailForm: emailForm
    });
}

export function uploadImage(file) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_UPLOAD_IMAGE_EMAIL_FORM
        });
        emailFormApi.uploadImage(file, function (event) {
            let data = JSON.parse(event.currentTarget.response);
            dispatch(uploadImageBlogSuccess(data.link));
        }, () => {
            helper.showErrorNotification("Đăng ảnh thất bại.");
            dispatch(uploadImageBlogFailed());
        });
    };
}

export function uploadImageBlogSuccess(imageUrl) {
    return (
        {
            type: types.UPLOAD_IMAGE_EMAIL_FORM_SUCCESS,
            imageUrl: imageUrl
        }
    );
}

export function uploadImageBlogFailed() {
    return (
        {
            type: types.UPLOAD_IMAGE_EMAIL_FORM_FAILED,
        }
    );
}

export function loadTemplates(page, search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_EMAIL_TEMPLATES,
        });
        emailFormApi.loadTemplates(page, search)
            .then(res => {
                dispatch({
                    type: types.LOAD_EMAIL_TEMPLATES_SUCCESS,
                    templates: res.data.email_templates,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            })
            .catch(() =>{
                dispatch({
                    type: types.LOAD_EMAIL_TEMPLATES_ERROR,
                });
            });
    };
}

export function chooseTemplate(template) {
    return ({
        type: types.CHOOSE_EMAIL_TEMPLATE_FOR_EMAIL_FORM,
        template: template
    });
}

export function saveEmailForm(emailForm) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_EMAIL_FORM
        });
        emailFormApi.saveEmailForm(emailForm, 1)
            .then((res) => {
                helper.showNotification("Tải lên thành công");
                dispatch({
                    type: types.SAVE_EMAIL_FORM_SUCCESS,
                    emailFormId: res.data.data.email_form.id,
                });
            }).catch(() => {
            helper.showNotification("Tải lên thất bại");
            dispatch({
                type: types.SAVE_EMAIL_FORM_FAILED
            });
        });
    };
}


export function preSaveEmailForm(emailForm) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_PRE_SAVE_EMAIL_FORM
        });
        emailFormApi.saveEmailForm(emailForm)
            .then((res) => {
                helper.showNotification("Tải lên thành công");
                window.open(BASE_URL + '/email-form/' + res.data.data.email_form.id, '_blank');
                dispatch({
                    type: types.PRE_SAVE_EMAIL_FORM_SUCCESS,
                    emailFormId: res.data.data.email_form.id,
                });
            }).catch(() => {
            helper.showNotification("Tải lên thất bại");
            dispatch({
                type: types.PRE_SAVE_EMAIL_FORM_FAILED
            });
        });
    };
}