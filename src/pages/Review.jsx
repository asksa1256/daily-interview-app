import { useEffect, useState, useRef } from "react";
import { supabase } from "../supabaseClient";
import Layout from "../Layout/Layout";
import "./Review.scss";

export default function Review() {
  const [questions, setQuestions] = useState([]);

  const [filtered, setFiltered] = useState([]);
  const [hideAnswers, setHideAnswers] = useState(true);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [selectedTag, setSelectedTag] = useState(null);
  const [allTags, setAllTags] = useState([]);

  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");

  // 수정, 삭제
  const questionRef = useRef();
  const answerRef = useRef();

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

  const handleEditClick = (question) => {
    setEditingQuestion(question);
    setEditedText(question.question);
    setEditedAnswer(question.modelAnswer);
  };

  const handleUpdate = async () => {
    try {
      await supabase
        .from("questions")
        .update({
          question: questionRef.current.value,
          modelAnswer: answerRef.current.value,
        })
        .eq("id", editingQuestion.id);

      setEditingQuestion(null); // 수정/삭제 모달 닫기
      fetchQuestions();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      await supabase.from("questions").delete().eq("id", id);
      fetchQuestions();
    }
  };

  // 질문 전체 불러오기
  useEffect(() => {
    fetchQuestions();
  }, []);

  // 질문 필터링
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
                <button onClick={() => handleEditClick(q)}>수정</button>
                <button onClick={() => handleDelete(q.id)}>삭제</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 수정 모달 */}
      {editingQuestion && (
        <div className="modal">
          <h3>질문 수정</h3>
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={4}
            ref={questionRef}
          />
          <h3>답안 수정</h3>
          <textarea
            value={editedAnswer}
            onChange={(e) => setEditedAnswer(e.target.value)}
            rows={4}
            ref={answerRef}
          />
          <h3>키워드 수정</h3>
          <button onClick={handleUpdate}>저장</button>
          <button onClick={() => setEditingQuestion(null)}>취소</button>
        </div>
      )}
    </Layout>
  );
}
