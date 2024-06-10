import { useGlobalContext } from "@/app/context/GlobalContext";
import { useEffect } from "react";

function UnreadMessagesCount({ session }) {
  const { unreadCount, setUnreadCount } = useGlobalContext();

  useEffect(() => {
    if (!session) return;

    const fetchUnreadMessagesCount = async () => {
      try {
        const res = await fetch("/api/messages/unread-count");
        if (res.status === 200) {
          const data = await res.json();
          setUnreadCount(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUnreadMessagesCount();
  }, [session]);

  if (!unreadCount) return null;
  return (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
      {unreadCount}
    </span>
  );
}

export default UnreadMessagesCount;
