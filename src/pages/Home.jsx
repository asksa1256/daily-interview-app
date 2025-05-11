import { supabase } from "../supabaseClient";
import { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import QuestionSection from "../components/QuestionSection/QuestionSection";
import AnswerSection from "../components/AnswerSection/AnswerSection";
import ModelAnswerSection from "../components/ModelAnswerSection/ModelAnswerSection";
import TagList from "../ui/TagList";
import AddTagList from "../ui/AddTagList";

export default function Home() {
  const [question, setQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [modelAnswer, setModelAnswer] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

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

  const handleSubmit = (answer) => {
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

  useEffect(() => {
    getRandomQuestion();
  }, []);

  return (
    <Layout>
      <div className="container">
        {question ? (
          <QuestionSection
            question={question}
            getRandomQuestion={getRandomQuestion}
          />
        ) : (
          <p>질문을 불러오는 중입니다...</p>
        )}
        <AnswerSection handleSubmit={handleSubmit} />
        {submitted && <ModelAnswerSection question={question} />}
        <Button
          className="open-modal-button"
          onClick={() => setIsModalOpen(true)}
        >
          질문 추가하기
        </Button>
      </div>

      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          handleAddQuestion={handleAddQuestion}
        >
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
          <p className="modal-title-sub">
            핵심 키워드를 추가하면 더 잘 기억나요!
          </p>
          <AddTagList
            tags={tags}
            inputValue={tagInput}
            onChangeInput={(e) => setTagInput(e.target.value)}
            handleTagInput={handleTagInput}
            removeTag={removeTag}
          />
        </Modal>
      )}
    </Layout>
  );
}
