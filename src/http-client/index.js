import axios from 'axios';

const BASEURL = 'https://y4mzjv0s54.execute-api.us-east-1.amazonaws.com/stage1';

const httpClient = axios.create({
    baseURL: BASEURL
});

export {
    httpClient,
};
