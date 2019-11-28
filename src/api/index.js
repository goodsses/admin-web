import request from '../utils/request';

export const dealersFindAll = query => {
    return request({
        url: 'dealers/findAll',
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
