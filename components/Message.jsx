"use client";

import { useGlobalContext } from "@/app/context/GlobalContext";
import { useState } from "react";
import { toast } from "react-toastify";

function Message({ message }) {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  const { setUnreadCount } = useGlobalContext();

  async function handleClick() {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });
      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);
        setUnreadCount((count) => (read ? count - 1 : count + 1));
        if (read) {
          toast.success("Marked as read");
        } else {
          toast.success("Marked as new");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  async function handleDelete() {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        toast.success("Message deleted");
        setIsDeleted(true);
        setUnreadCount((count) => (!isRead ? count - 1 : count));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete message");
    }
  }

  if (isDeleted) return null;

  return (
    <div
      className={`relative  p-4 rounded-md shadow-md border border-gray-200 ${
        isRead ? "opacity-50 bg-gray-300" : "bg-white"
      }`}
    >
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.sender.username}
        </li>

        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleClick}
        className={`mt-4 mr-3 ${
          isRead ? "bg-gray-400" : "bg-blue-500 text-white"
        } py-1 px-3 rounded-md`}
      >
        {isRead ? "Mark As New" : "Mark As Read"}
      </button>
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
}

export default Message;
