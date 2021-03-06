import axios from 'axios';
import * as env from '../../constants/env';

export function loadSummaryMarketingCampaign(genId = '', baseId = '') {
    let url = env.MANAGE_API_URL + "/marketing-campaign/summary";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    url += `&gen_id=${genId}&base_id=${baseId}`;

    return axios.get(url);
}

export function loadGens() {
    let url = env.MANAGE_API_URL + "/gen/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadBases() {
    let url = env.MANAGE_API_URL + "/base/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}