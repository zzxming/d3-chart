import originAxios from 'axios';

const axios = originAxios.create({
	baseURL: process.env.NODE_ENV === 'development' ? '' : '/d3-chart/',
});

export default axios;
