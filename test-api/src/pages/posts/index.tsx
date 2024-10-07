import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ButtonPrimary from "../../components/elements/ButtonPrimary";
import Table from "../../components/elements/Table";
import { Post } from "../../types/Types";
import { usePosts, useUpdatePosts, useCreatePosts, useDeletePosts } from "../../features/posts";

export default function Posts() {
    const { data } = usePosts();
    const {mutate: submit, loading, error} = useCreatePosts();
    const { mutate: updatePosts, loading: updateLoading, error: updateError } = useUpdatePosts();
    const { mutate: deletePosts, loading: deleteLoading, error: deleteError } = useDeletePosts();

    const [editPostId, setEditPostId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState<string>("");

    const schema = z.object({
        content: z
            .string()
            .min(3, { message: "Content is required" })
            .max(30, { message: "Content is too long" }),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const createSubmit = async () => {
        if (editPostId) {
            await updatePosts(editPostId, editContent);
        } else {
            submit(editContent);
            window.location.reload();
        }
        setEditPostId(null);
        setEditContent("");
        reset();
    };


    const editHandler = (post: { id: string; content: string }) => {
        setEditPostId(post.id);
        setEditContent(post.content);
        reset({ content: post.content });
    };

    const deleteHandler = (id: string) => {
        if (deleteError) {
            return alert("Error deleting post");
        }
        deletePosts(id);
    };

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <div className="flex justify-center items-center gap-2 mb-10">
                <form
                    onSubmit={handleSubmit(createSubmit)}
                    className="w-full max-w-2xl flex flex-col items-center"
                >
                    <input
                        type="text"
                        className="border-solid border-gray-300 border-2 rounded-lg w-3/4 p-3 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Enter post content"
                        {...register("content")}
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                    />

                    {errors.content && (
                        <p className="text-red-500 mt-2">{errors.content.message?.toString()}</p>
                    )}
                    <button
                        className="ml-4 w-[100px] h-[50px] p-2 mt-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                        type="submit"
                        disabled={loading || updateLoading || deleteLoading}
                    >
                        {loading || updateLoading
                            ? "Submitting..."
                            : editPostId
                                ? "Update"
                                : "Submit"}
                    </button>
                </form>
            </div>

            {error && (
                <p className="text-red-500 text-center mt-5">
                    {typeof error === "object" && error.message
                        ? error.message
                        : String(error)}
                </p>
            )}
            {updateError && (
                <p className="text-red-500 text-center mt-5">
                    {typeof updateError === "object" && updateError.message
                        ? updateError.message
                        : String(updateError)}
                </p>
            )}

            <div className="mt-10 flex justify-center w-full">
                <Table>
                    <Table.Head>
                        <Table.Row>
                            <Table.Cell>ID</Table.Cell>
                            <Table.Cell>Content</Table.Cell>
                            <Table.Cell>Created At</Table.Cell>
                            <Table.Cell>Action</Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {data?.data?.map((post: Post) => (
                            <Table.Row key={post.id}>
                                <Table.Cell>{post.id}</Table.Cell>
                                <Table.Cell>{post.content}</Table.Cell>
                                <Table.Cell>{new Date(post.created_at).toLocaleString()}</Table.Cell>
                                <Table.Cell>
                                    <div className="flex justify-center gap-4">
                                        <ButtonPrimary className={"bg-blue-500"} onClick={() => editHandler(post)} text={'Edit'} />
                                        <ButtonPrimary className={"bg-red-500"} onClick={() => deleteHandler(post.id)} text={'Delete'} />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

            </div>
        </div>
    );
}
