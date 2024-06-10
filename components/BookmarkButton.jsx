"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

function BookmarkButton({ property }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkBookmark = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/bookmarks/check", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ propertyId: property._id }),
        });
        if (!res.ok) throw new Error("Something went wrong");

        const data = await res.json();
        setIsBookmarked(data.isBookmarked);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkBookmark();
  }, [property._id, userId]);

  async function handleClick() {
    if (!userId) {
      toast.error("You need to sign in to bookmark a property");
      return;
    }

    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ propertyId: property._id }),
      });

      if (!res.ok) throw new Error("Something went wrong");

      const data = await res.json();
      toast.success(data.message);
      setIsBookmarked(data.isBookmarked);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`${
        isBookmarked
          ? "bg-red-500 hover:bg-red-600"
          : "bg-blue-500 hover:bg-blue-600"
      } text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
    >
      {!loading && <FaBookmark className="mr-2" />}
      {loading
        ? "Loading..."
        : isBookmarked
        ? "Remove Bookmark"
        : "Bookmark Property"}
    </button>
  );
}

export default BookmarkButton;
