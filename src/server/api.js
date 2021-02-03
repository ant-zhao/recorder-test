import request from "./request";
import baseUrl from './url';
/**
 * 
 * @param {wav: string, jpg: string, text: string} params 
 */
export const inputApi = params=> {
    return request.post(`${baseUrl}/test`, params);
}