import { useState } from "react";
import axiosIntence from "../../libs/axios";
import { ResponsePosts } from "../../types/Types";

export const useCreatePosts = () => {
    const [state, setState] = useState<Omit<ResponsePosts, 'mutate'>>({
        data: null,
        loading: false,
        error: null,
        message: '',
        status: '',
    });

    const submit = async (content: string) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const response = await axiosIntence.post('/posts', { content });
            setState(prev => ({
                ...prev,
                data: response.data,
                loading: false,
            }));
            // window.location.reload(); 
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error instanceof Error ? error : new Error('Error fetching posts'),
            }));
        }
    };

    return {
        ...state,
        submit,
    };
}
