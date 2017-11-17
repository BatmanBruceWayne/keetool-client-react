import axios from 'axios';
import * as env from '../../constants/env';

export function loadSuppliersApi(limit , page , query ) {
    let url = env.MANAGE_API_URL + "/order/all-suppliers?";
    let token = localStorage.getItem('token');
    if (limit){
        url += "&limit=" + limit;
    }
    if (page) {
        url += "&page=" + page;
    }
    if (query) {
        url += "&search=" + query;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}
export function addSupplierApi(supplier) {
    let url = env.MANAGE_API_URL + "/order/add-supplier?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "token=" + token;
    }
    return axios.post(url,{
        'name' :  supplier.name,
        'email' : supplier.email,
        'phone' : supplier.phone,
        'address' : supplier.address,
    });
}



