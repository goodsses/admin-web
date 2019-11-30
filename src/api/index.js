import request from '../utils/request';

export const dealersFindAll = query => {
    return request({
        url: 'dealers/findAll',
        method: 'post',
        params: query
    });
};

export const deleteDealers = query => {
    return request({
        url: 'dealers/deleteDealers',
        method: 'post',
        params: query
    });
};

export const saveDealers = query => {
    return request({
        url: 'dealers/saveDealers',
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

export const deleteModels = query => {
    return request({
        url: 'models/deleteModels',
        method: 'post',
        params: query
    });
};

export const saveModels = query => {
    return request({
        url: 'models/saveModels',
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

export const deleteQuestion = query => {
    return request({
        url: 'questionBank/deleteQuestion',
        method: 'post',
        params: query
    });
};

export const saveQuestion = query => {
    return request({
        url: 'questionBank/saveQuestion',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: query
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


