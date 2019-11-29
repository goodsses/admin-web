import request from '../utils/request';

export const dealersFindAll = query => {
    return request({
        url: 'dealers/findAll',
        method: 'post',
        params: query
    });
};


export const modelsFindAll = query => {
    return request({
        url: 'models/findAll',
        method: 'post',
        params: query
    });
};


export const questionsFindAll = query => {
    return request({
        url: 'questionBank/findAll',
        method: 'post',
        params: query
    });
};

export const usersFindAll = query => {
    return request({
        url: 'user/findAll',
        method: 'post',
        params: query
    });
};

export const login = query => {
    return request({
        url: 'login/login',
        method: 'post',
        params: query
    });
};
