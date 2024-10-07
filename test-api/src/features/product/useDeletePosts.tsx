import { useState } from "react"
import axiosIntence from "../../libs/axios"
import { ResponsePosts } from "../../types/Types"

export default function useDeletePosts() {
    const [state, setState] = useState<Omit<ResponsePosts, 'mutate'>>({
        data: null,
        loading: false,
        error: null,
        message: '',
        status: '',
    });

    const deletePosts = async (id: string) => {
        setState(prev => ({
            ...prev,
            loading: true
        }))
        try {
            const response = await axiosIntence.delete(`/posts/${id}`)
            setState(prev => ({
                ...prev,
                data: response.data,
                loading: false,
                error: null
            }))
            window.location.reload()
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error instanceof Error ? error : new Error('Error fetching posts'),
            }));
        }
    }
    return {
        ...state,
        deletePosts

    }
}
