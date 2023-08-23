import axios from 'axios'
// 创建实例时设置配置的默认值
const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,    //例如h：ttps://test-test-test.vercel.app/
	changeOrigin: true,  //跨域
	// timeout: 100000,
	withCredentials: true,
});
// 添加请求拦截器
instance.interceptors.request.use(
	// 在发送请求之前做些什么
	config => {
		// config.headers['cookie'] = getItem("TOKEN_KEY")
		// 时间戳
		if (config.method == 'post') {
			config.data = {
				...config.data,
				timestamp: Date.parse(new Date()) / 1000
			}
		} else if (config.method == 'get') {
			config.params = {
				timestamp: Date.parse(new Date()) / 1000,
				...config.params
			}
		}
		return config
	},

	error => {
		console.log(error)
		return Promise.reject(error)
	})

// 添加响应拦截器
instance.interceptors.response.use(response => {
	// 对响应数据做点什么
	return response;
}, function (error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});

//暴露出去
export default instance;
