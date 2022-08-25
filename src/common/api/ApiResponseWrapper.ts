interface ApiResponseWrapper<T> {
	data: T;
	message: string;
	status: number;
	success: boolean;
}

export default ApiResponseWrapper;
