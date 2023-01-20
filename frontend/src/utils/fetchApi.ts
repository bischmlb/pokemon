
/* Fetch API from req url */
export const fetchApi = async <T>(url: string, method: 'POST' | 'GET' | 'PUT' | 'DELETE' = 'GET', body?: BodyInit): Promise<T> => {
	return new Promise((resolve, reject) => {
		if (url) {
			const endpoint = url;
			const settings: RequestInit = {
				method: method,
				headers:{
							Accept: 'application/json',
							'Content-type': 'application/json',
					  },
				body: body,
			};
			try {
				fetch(endpoint, settings)
					.then((fetchRespone) => {
						fetchRespone
							.json()
							.then((responseData) => resolve(responseData))
							.catch((e) => reject(e));
					})
					.catch((e) => reject(e));
			} catch (error) {
				reject(error);
			}
		} else {
			reject('Error, no endpoint defined');
		}
	});
};