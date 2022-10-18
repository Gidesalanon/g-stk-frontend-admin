
import axios from 'axios';
import Cookies from "js-cookie";
import $ from 'jquery';
import { toastr } from 'react-redux-toastr';
// import AsyncStorage from '@react-native-community/async-storage'


const API = process.env.REACT_APP_API_BASE_URL;
const OAUTH_URL = process.env.REACT_APP_API_BASE_URL + '/auth/login'
const token = Cookies.get('token');
axios.interceptors.request.use(async function (config) {
    if (typeof (token) === 'string') {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers['cache-control'] = `no-cache`;
    }
    return config;
}, function (err) {
    console.log('Erreur', err);
   // return Promise.reject(err);
});

axios.interceptors.response.use(undefined, err => {
  const error = err.response;
    // if error is 401 
    console.log(error);
    if ((error && error.status===401 && error.config && !error.config.__isRetryRequest)||error===undefined) {
        // history.push("/logout");
        toastr.error('Erreur '+error?.status+' !', `
            Vous avez perdu la connexion au serveur.
            Vérifiez votre connexion internet puis reéssayez.
        `,{ position: 'bottom-right'})
    }
    else {toastr.error('Erreur '+error.status+' !', error.statusText||'',{ position: 'bottom-right'})}
});

/**
 *
 * @param {string} entity_url
 * @param {Array} filters
 * @param {number} limit
 */
export const getEntity = (entity_url, params = {}) => {
    params = $.param(params);

    let url = API + entity_url
    if (entity_url.indexOf('https://') !== -1 || entity_url.indexOf('http://') !== -1) {
        url = entity_url;
    }

    url += (url.indexOf('?') === -1) ? '?' : '&';
    url += params;
    // url += (params.page? 'page='+params.page:'');
    return axios.get(url, { headers: { 'Content-Type': 'application/json' } })
}

/** Methode Judicael Tandj... */
export const getResourceApi = (resource_url) => {
    return axios.get(API +resource_url, { headers: { 'Content-Type': 'application/json' } })
}

/**
 *
 * @param {string} entity_url
 * @param {Array} filters
 */
export const getResource = (entity_url, filters = []) => {
    let firstparam= entity_url.indexOf('?')
    filters.map(f=>{
        entity_url += firstparam === -1 ? `?${f.id}=${f.value}`:`&${f.id}=${f.value}`
    })
    // console.log(entity_url);
    //return axios.get(entity_url, { headers: { 'Content-Type': 'application/json' } })
}

/**
 *
 * @param {string} url
 */
export const getOAuthToken = (url) => {
    return axios.get(OAUTH_URL + url, { headers: { 'Content-Type': 'application/json' } })
}

/**
 *
 * @param {string} entity_url - Url for API
 * @param {object} data - Data
 * @param {object} headers
 */
export const postEntity = (entity_url, data, headers) => {
    return axios.post(API + entity_url, data, headers)
}

/**
 *
 * @param {string} entity_url
 * @param {number} id
 * @param {object} data
 * @param {object} headers
 */
export const putEntity = (entity_url, id, data, headers) => {
    return axios.put(API + entity_url + '/' + id, data, headers)
}

/**
 *
 * @param {string} entity_url
 * @param {number} id
 * @param {object} data
 * @param {object} headers
 */
export const patchEntity = (entity_url, id, data, headers) => {
    return axios.patch(API + entity_url + '/' + id, data, headers)
}

export const putEntityByUrl = (entity_url, data, headers) => {
    return axios.put(API + entity_url, data, headers)
}

/**
 *
 * @param {string} entity_url
 * @param {number} id
 */
export const removeEntity = (entity_url, id) => {
    return axios.delete(API + entity_url + '/' + id)
}

/**
 *
 * @param {string} entity_url
 */
 export const loadFile = (entity_url) => {
    return "/default.png";
}
