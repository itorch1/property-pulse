import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET /api/messages
export const GET = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser)
      return new Response("User ID is required", { status: 401 });
    const { userId } = sessionUser;

    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");

    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");

    const messages =[...unreadMessages, ...readMessages]

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// POST /api/messages
export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser)
      return new Response("User ID is required", { status: 401 });
    const { user } = sessionUser;

    const { name, email, phone, message, recipient, property } =
      await request.json();

    // Cannot send message to self
    if (user.id === recipient)
      return new Response(
        JSON.stringify({ message: "Can not send a message to yourself" }),
        { status: 400 }
      );

    const newMessage = new Message({
      name,
      email,
      phone,
      body: message,
      recipient,
      sender: user.id,
      property,
    });

    await newMessage.save();

    return new Response(
      JSON.stringify({ message: "Message sent" }, { status: 200 })
    );
  } catch (error) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
};
