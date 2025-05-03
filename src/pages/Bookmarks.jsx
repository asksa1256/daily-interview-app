import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Bookmarks() {
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("로그인 필요");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("bookmarks")
        .select("question_id, questions(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) {
        const questions = data.map((entry) => entry.questions);
        setBookmarkedQuestions(questions);
      } else {
        console.error("북마크 불러오기 실패:", error.message);
      }

      setLoading(false);
    };

    fetchBookmarks();
  }, []);

  return (
    <div className="bookmark-page">
      <h1>🔖 북마크한 질문</h1>
      {loading ? (
        <p>불러오는 중...</p>
      ) : bookmarkedQuestions.length === 0 ? (
        <p>북마크한 질문이 없습니다.</p>
      ) : (
        <ul className="bookmark-list">
          {bookmarkedQuestions.map((q) => (
            <li key={q.id} className="bookmark-item">
              <h2>{q.question}</h2>
              <p style={{ whiteSpace: "pre-line" }}>{q.modelAnswer}</p>
              {q.tags &&
                q.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
