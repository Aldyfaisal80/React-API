import { useState } from "react";
import { ResponsePosts } from "../../types/Types";
import axiosInstance from "../../libs/axios";

export const useCreatePosts = () => {
    const [state, setState] = useState<Omit<ResponsePosts, 'mutate'>>({
        data: null,
        loading: false,
        error: null,
        message: '',
        status: '',
    });

    const mutate = (content: string) => {
        setState(prev => ({ ...prev, loading: true }))
        axiosInstance.post('/posts', { content }).then(response => {
            setState(prev => ({
                ...prev,
                data: response.data,
                loading: false,
                error: null,
                message: response.data.message,
                status: response.data.status,
            }))
        }).catch(error => {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error instanceof Error ? error : new Error('An unknown error occurred'),
            }))
        })
    }

    return {
        ...state,
        mutate
    }
}
