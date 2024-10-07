import { useState } from "react";
import { ResponsePosts } from "../../types/Types";
import axiosInstance from "../../libs/axios";

export const useUpdatePosts = () => {
    const [state, setState] = useState<Omit<ResponsePosts, 'mutate'>>({
        data: null,
        loading: false,
        error: null,
        message: '',
        status: '',
    });

    const mutate = async (id: string, content: string) => {
        setState(prev => ({ ...prev, loading: true }))
        try {
            const response = await axiosInstance.put(`/posts/${id}`, { content })
            setState(prev => ({
                ...prev,
                data: response.data,
                loading: false,
                error: null,
            }))
            window.location.reload();
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error instanceof Error ? error : new Error('An unknown error occurred'),
            }))
        }
    }
    return {
        ...state,
        mutate
    }
}
