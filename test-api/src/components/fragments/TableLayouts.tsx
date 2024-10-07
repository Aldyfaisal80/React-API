import { useState } from "react";
import { z } from "zod";
import useDeletePosts from "../../features/product/useDeletePosts";
import usePosts from "../../features/product/usePosts";
import ButtonPrimary from "../elements/ButtonPrimary";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Table from "../elements/Table";


export default function TableLayouts() {

  const { data } = usePosts();
  const { deletePosts, loading: deleteLoading, error: deleteError } = useDeletePosts();
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");

  const schema = z.object({
    content: z
      .string()
      .min(1, { message: "Content is required" })
      .max(30, { message: "Content is too long" }),
  });

  const {
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });


  const editHandler = (post) => {
    setEditPostId(post.id);
    setEditContent(post.content);
    reset({ content: post.content });
  };

  const deleteHandler = (id: string) => {
    deletePosts(id);
  };

  return (
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
        {data?.data?.map((post) => (
          <Table.Row key={post.id}>
            <Table.Cell>{post.id}</Table.Cell>
            <Table.Cell>{post.content}</Table.Cell>
            <Table.Cell>{post.created_at}</Table.Cell>
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
  )
}
