import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Layout from "../Layout/Layout";
import "../Review.scss";

export default function Review() {
  const [questions, setQuestions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hideAnswers, setHideAnswers] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .order("id", { ascending: false });
      if (!error) {
        setQuestions(data);
        setFiltered(data);
        const tags = [...new Set(data.flatMap((q) => q.tags || []))];
        setAllTags(tags);
      }
      setLoading(false);
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    let result = [...questions];

    if (search) {
      result = result.filter((q) =>
        q.question.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedTag) {
      result = result.filter((q) => q.tags?.includes(selectedTag));
    }

    setFiltered(result);
  }, [search, selectedTag, questions]);

  return (
    <Layout>
      <div className="review-page">
        <h1>📚 전체 질문 리뷰</h1>

        <div className="review-controls">
          <input
            type="text"
            placeholder="질문 검색..."
            className="input-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={selectedTag || ""}
            className="select-tag"
            onChange={(e) => setSelectedTag(e.target.value || null)}
          >
            <option value="">전체 태그</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <label>
            <input
              type="checkbox"
              className="toggle-answer"
              checked={hideAnswers}
              onChange={() => setHideAnswers((prev) => !prev)}
            />
            정답 가리기
          </label>
        </div>

        {loading ? (
          <p>불러오는 중...</p>
        ) : (
          <div className="question-list">
            {filtered.map((q) => (
              <div key={q.id} className="question-card">
                <h2>❓ {q.question}</h2>
                {!hideAnswers && (
                  <p style={{ whiteSpace: "pre-line" }}>
                    {q.modelAnswer || "모범 답안이 없습니다."}
                  </p>
                )}
                {q.tags && q.tags.length > 0 && (
                  <div className="tags">
                    {q.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
