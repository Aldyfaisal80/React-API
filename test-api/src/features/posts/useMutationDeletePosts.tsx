import { useState } from "react"
import { ResponsePosts } from "../../types/Types"
import axiosInstance from "../../libs/axios";

export const useDeletePosts = () => {
    const [state, setState] = useState<Omit<ResponsePosts, 'mutate'>>({
        data: null,
        loading: false,
        error: null,
        message: '',
        status: '',
    });

    const mutate = async (id: string) => {
        setState(prev => ({ ...prev, loading: true }))

        axiosInstance.delete(`/posts/${id}`).then(response => {
            setState(prev => ({
                ...prev,
                data: response.data,
                loading: false,
                error: null,
                message: response.data.message,
                status: response.data.status,
            }))
            window.location.reload();
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