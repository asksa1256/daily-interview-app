import { supabase } from "../supabaseClient";
import { useState, useEffect } from "react";
import Layout from "../Layout/Layout";

export default function Home() {
  const [question, setQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");

  const [answer, setAnswer] = useState("");
  const [modelAnswer, setModelAnswer] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const [bookmarked, setBookmarked] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [hiddenIds, setHiddenIds] = useState(() => {
    // localStorage에서 숨긴 질문 ID 불러오기
    const stored = localStorage.getItem("hiddenQuestionIds");
    return stored ? JSON.parse(stored) : [];
  });

  // 질문 숨기기 (로컬 기준)
  const hideQuestion = () => {
    if (!currentQuestion) return;

    const updatedHidden = [...hiddenIds, currentQuestion.id];
    setHiddenIds(updatedHidden);
    localStorage.setItem("hiddenQuestionIds", JSON.stringify(updatedHidden));

    getRandomQuestion(); // 다음 질문 보여주기
  };

  async function getRandomQuestion() {
    const { data, error } = await supabase.from("questions").select("*");
    if (error) {
      console.error("질문을 불러오지 못했습니다:", error.message);
      return;
    }
    if (data && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setQuestion(data[randomIndex]);
    }
  }

  const handleSubmit = () => {
    if (answer.trim() !== "") {
      setSubmitted(true);
    }
  };

  const handleAddQuestion = async () => {
    if (!newQuestion.trim()) return;

    const { error } = await supabase.from("questions").insert([
      {
        question: newQuestion,
        modelAnswer: modelAnswer,
        tags: tags,
      },
    ]);

    if (error) {
      alert("질문 추가 중 오류 발생: " + error.message);
    } else {
      alert("질문이 성공적으로 추가되었습니다!");
      setIsModalOpen(false);
      setNewQuestion("");
      setModelAnswer("");
      setTags([]);
    }
  };

  const handleTagInput = (e) => {
    const value = e.target.value;
    if (value.includes(",") || e.key === "Enter") {
      e.preventDefault();
      const newTag = value.replace(",", "").trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

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

  useEffect(() => {
    getRandomQuestion();
  }, []);

  return (
    <Layout>
      <div className="container">
        {question ? (
          <div className="question-area">
            <h2 className="question-label">💡 오늘의 질문</h2>
            <div className="question-box">
              <p className="question-text">❝ {question.question} ❞</p>
              <button onClick={hideQuestion}>이 질문 그만 보기</button>
            </div>
            <div className="question-meta">
              <button
                onClick={handleBookmark}
                className={`bookmark-btn ${bookmarked ? "active" : ""}`}
              >
                🔖 {bookmarked ? "북마크됨" : "북마크"}
              </button>
              <button onClick={getRandomQuestion}>다른 질문 보기</button>
            </div>
          </div>
        ) : (
          <p>질문을 불러오는 중입니다...</p>
        )}
        <textarea
          placeholder="답변을 작성하고 모범 답안을 확인해보세요!"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={5}
          className="answer-textarea"
        />
        <button
          onClick={handleSubmit}
          disabled={answer.trim() === ""}
          className="submit-button"
        >
          답 제출하기
        </button>

        {submitted && (
          <div className="model-answer-box">
            <h2 className="model-answer-title">📌 모범 답안</h2>
            <p className="model-answer-text">
              {question.modelAnswer || "모범 답안이 아직 준비되지 않았습니다."}
            </p>
            {question.tags && question.tags.length > 0 && (
              <div className="tag-list">
                <div className="tags">
                  {question.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <button
          className="open-modal-button"
          onClick={() => setIsModalOpen(true)}
        >
          질문 추가하기
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>
              📝 면접 질문 추가 <b className="required">*</b>
            </h2>
            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="추가할 질문을 입력하세요"
              rows={4}
              required
            />
            <h2>
              📝 모범 답안 추가 <b className="required">*</b>
            </h2>
            <textarea
              value={modelAnswer}
              onChange={(e) => setModelAnswer(e.target.value)}
              placeholder="모범 답안을 입력하세요"
              rows={4}
              required
            />
            <h2>🏷️ 태그 추가</h2>
            <div className="tag-input-area">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInput}
                placeholder="태그를 입력하고 Enter 또는 , 를 누르세요"
              />
              <div className="tag-list">
                {tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                    <button onClick={() => removeTag(tag)}>×</button>
                  </span>
                ))}
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={handleAddQuestion}>추가</button>
              <button className="cancel" onClick={() => setIsModalOpen(false)}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
