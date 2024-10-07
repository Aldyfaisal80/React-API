import { useEffect, useState } from "react";
import axiosIntence from "../../libs/axios";
import { ResponsePosts } from "../../types/Types";

export const usePosts = () => {
    const [state, setState] = useState<Omit<ResponsePosts, 'mutate'>>({
        data: null,
        loading: false,
        error: null,
        message: '',
        status: '',
    });

    useEffect(() => {
        const fetchPosts = async () => {
            setState(prev => ({ ...prev }));
            try {
                const response = await axiosIntence.get('/posts');
                setState(prev => ({
                    ...prev,
                    data: response.data,
                }));
            } catch (error) {
                setState(prev => ({
                    ...prev,
                    loading: false,
                    error: error instanceof Error ? error : new Error('Error fetching posts'),
                }));
            }
        };
        fetchPosts();
    }, []);

    return {
        ...state,
    };
}
