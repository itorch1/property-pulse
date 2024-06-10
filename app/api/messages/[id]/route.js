import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// PUT /api/messages/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser)
      return new Response("User ID is required", { status: 401 });

    const { userId } = sessionUser;
    const { id: messageId } = params;

    const message = await Message.findById(messageId);
    if (!message) return new Response("Message not found", { status: 404 });

    // Authorize access to message
    if (userId !== message.recipient.toString())
      return new Response("Unauthorized access to message", { status: 401 });

    message.read = !message.read;
    await message.save();
    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// DELETE /api/messages/:id
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser)
      return new Response("User ID is required", { status: 401 });

    const { userId } = sessionUser;
    const { id: messageId } = params;

    const message = await Message.findById(messageId);
    if (!message) return new Response("Message not found", { status: 404 });

    // Authorize access to message
    if (userId !== message.recipient.toString())
      return new Response("Unauthorized access to message", { status: 401 });

    await message.deleteOne();
    return new Response("Message deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
