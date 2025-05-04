import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Layout from "../Layout/Layout";
import "./HiddenQuestions.scss"; // 스타일 시트 임포트

const HiddenQuestions = () => {
  const [hiddenIds, setHiddenIds] = useState([]);
  const [hiddenQuestions, setHiddenQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmRestoreId, setConfirmRestoreId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("hiddenQuestionIds");
    const ids = stored ? JSON.parse(stored) : [];
    setHiddenIds(ids);
  }, []);

  useEffect(() => {
    const fetchHiddenQuestions = async () => {
      if (hiddenIds.length === 0) {
        setHiddenQuestions([]);
        return;
      }

      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .in("id", hiddenIds);

      if (error) {
        console.error("질문 불러오기 오류:", error);
      } else {
        setHiddenQuestions(data);
      }
    };

    fetchHiddenQuestions();
  }, [hiddenIds]);

  const restoreQuestion = (id) => {
    const updatedHiddenIds = hiddenIds.filter((qid) => qid !== id);
    setHiddenIds(updatedHiddenIds);
    localStorage.setItem("hiddenQuestionIds", JSON.stringify(updatedHiddenIds));
    setConfirmRestoreId(null);
  };

  const filteredQuestions = hiddenQuestions.filter((q) =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="hidden-container">
        <h2 className="hidden-title">숨긴 질문 보기</h2>

        <input
          type="text"
          placeholder="질문 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="hidden-search"
        />

        {filteredQuestions.length === 0 ? (
          <p className="hidden-empty">
            숨긴 질문이 없거나 검색 결과가 없습니다.
          </p>
        ) : (
          <ul className="hidden-list">
            {filteredQuestions.map((q) => (
              <li key={q.id} className="hidden-item">
                <span className="hidden-question">{q.question}</span>
                <button
                  onClick={() => setConfirmRestoreId(q.id)}
                  className="hidden-restore-btn"
                >
                  복구하기
                </button>
              </li>
            ))}
          </ul>
        )}

        {confirmRestoreId && (
          <div className="modal-overlay">
            <div className="modal">
              <p className="modal-message">정말 복구하시겠어요?</p>
              <div className="modal-buttons">
                <button
                  onClick={() => restoreQuestion(confirmRestoreId)}
                  className="modal-btn confirm"
                >
                  예
                </button>
                <button
                  onClick={() => setConfirmRestoreId(null)}
                  className="modal-btn cancel"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HiddenQuestions;
