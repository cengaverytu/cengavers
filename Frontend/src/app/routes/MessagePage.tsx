import { useState } from "react";
import { useCreateMessage, useDeleteMessage, useMessage, useMessages, useUpdateMessage } from "../../features/message/hooks/useMessage";
import { CreateMessageInput, MessageDTO } from "../../features/message/types/message";
import { useParams } from "react-router";
import Modal from "../../components/ui/Modal";
import MessageForm from "../../features/message/components/MessageForm";

export default function MessagePage(){

    const { data: messages, isLoading, error } = useMessages();

    const createMessage = useCreateMessage();
    const deleteMessage = useDeleteMessage();
    const updateMessage = useUpdateMessage();

    const [open,setOpen] = useState(false);
    const [editing, setEditing] = useState<MessageDTO | null>(null);


    if (isLoading) {
        return (
          <div className="container mx-auto max-w-7xl px-4 py-8">
            <p>Loading Messages...</p>
          </div>
        );
      }
      if (error) {
        return (
          <div className="container mx-auto max-w-7xl px-4 py-8 text-red-600">
            Failed to load messages
          </div>
        );
      }

      const handleCreate = async (values: CreateMessageInput) => {
        await createMessage.mutateAsync(values);
        setOpen(false);

      }
      const handleUpdate = async (values: CreateMessageInput) => {
        if(!editing) return;
        await updateMessage.mutateAsync({
            id: editing.id,
            input: values
        });
        setEditing(null);
        setOpen(false);
    };

    const handleDelete = async (message: MessageDTO) => {
        await deleteMessage.mutateAsync(message.id)
    }

    const openCreate = () => {
        setEditing(null);
        setOpen(true);
    }

    const onCloseModal = () => {
        setOpen(false);
        setEditing(null);
    }

    const openEdit = (message: MessageDTO) => {
        setEditing(message);
        setOpen(true);
      };

    return (
        <div className="container mx-auto max-w-7xl px-4 py-8 space-y-6">
          <div className="flex items-center gap-3">
            <button
              onClick={openCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Message
            </button>
          </div>
    
          <Modal
            open={open}
            onClose={onCloseModal}
            title={editing ? "Update Message" : "Create Message"}
          >
            <MessageForm
              defaultValues={
                editing
                  ? { id: editing.id,content: editing.content, status: editing.status}
                  : undefined
              }
              onSubmit={editing ? handleUpdate : handleCreate}
              submitLabel={editing ? "Update" : "Create"}
            />
          </Modal>
    
          {!messages || messages.length === 0 ? (
            <p>No message found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => openEdit(message)}
                  className="border rounded-lg shadow p-6 bg-white hover:shadow-lg transition cursor-pointer group relative"
                >
                  <h2 className="text-xl font-bold mb-2">{message.id}</h2>
                  <p className="text-gray-600 pr-10">{message.content}</p>
                  <p className="text-gray-600 pr-10">{JSON.stringify(message.status)}</p>

    
                  {/* Sil butonu (kart tıklamasını tetiklememesi için stopPropagation) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(message);
                    }}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
