import AxiosBase from './axios/AxiosBase'
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import AxiosBaseV2 from './axios/AxiosBaseV2'
import axios from 'axios';

/**
 * Safe API call utility with optional CSRF token support.
 * @param {string} url - The API endpoint.
 * @param {object} options - Axios request config.
 * @param {string} [csrfToken] - Optional CSRF token to include in headers.
 * @returns {Promise<any>} - The API response.
 */
export async function safeApiCall(url: string, options: any = {}, csrfToken?: string) {
  const config = {
    ...options,
    url,
    headers: {
      ...(options.headers || {}),
      ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
      // Always use credentials for secure cookies if needed
      'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true, // for CORS/CSRF cookies
  };
  return axios(config);
}

// NOTE: CORS is enforced by the backend. Ensure your backend allows requests from your frontend origin.
// For CSRF, the backend should set a CSRF cookie/token and validate it on each request.
// This utility is ready for integration with such a backend.

const ApiService = {
    fetchDataWithAxios<Response = unknown, Request = Record<string, unknown>>(
        param: AxiosRequestConfig<Request>,
    ) {
        return new Promise<Response>((resolve, reject) => {
            AxiosBase(param)
                .then((response: AxiosResponse<Response>) => {
                    resolve(response.data)
                })
                .catch((errors: AxiosError) => {
                    reject(errors)
                })
        })
    },
    fetchDataWithAxiosV2<Response = unknown, Request = Record<string, unknown>>(
        param: AxiosRequestConfig<Request>,
    ) {
        return new Promise<Response>((resolve, reject) => {
            AxiosBaseV2(param)
                .then((response: AxiosResponse<Response>) => {
                    resolve(response.data)
                })
                .catch((errors: AxiosError) => {
                    reject(errors)
                })
        })
    },
    fetchAIDataWithAxiosV2<Response = unknown, Request = Record<string, unknown>>(
        param: AxiosRequestConfig<Request>,
    ) {
        return new Promise<Response>((resolve, reject) => {
            AxiosBaseV2(param)
                .then((response: AxiosResponse<Response>) => {
                    resolve(response.data)
                })
                .catch((errors: AxiosError) => {
                    reject(errors)
                })
        })
    },
}

export default ApiService
