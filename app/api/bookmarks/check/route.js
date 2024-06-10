import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    await connectDB();

    const { propertyId } = await request.json();

    const sessionUser = await getSessionUser();
    if (!sessionUser)
      return new Response("User ID is required", { status: 401 });
    const { userId } = sessionUser;

    // Find user in the database
    const user = await User.findById(userId);
    // Check if property is bookmarked
    const isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.error(error.message);
    return new Response("Something went wrong", { status: 500 });
  }
};
