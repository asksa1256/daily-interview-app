import { useState } from "react";
import { supabase } from "../supabaseClient";
import IconButton from "../ui/IconButton";

const BookmarkButton = ({ question }) => {
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmark = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      console.error("로그인 필요");
      return;
    }

    setBookmarked((prev) => !prev);

    if (bookmarked) {
      // 북마크 해제
      await supabase
        .from("bookmarks")
        .delete()
        .eq("user_id", user.id)
        .eq("question_id", question.id);
    } else {
      // 북마크 추가
      await supabase
        .from("bookmarks")
        .insert([{ user_id: user.id, question_id: question.id }]);
    }
  };

  return (
    <IconButton
      onClick={handleBookmark}
      className={`bookmark-btn ${bookmarked ? "active" : ""}`}
    >
      🔖 {bookmarked ? "북마크됨" : "북마크"}
    </IconButton>
  );
};

export default BookmarkButton;
