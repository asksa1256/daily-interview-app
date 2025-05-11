import TagList from "../../ui/TagList";

const ModelAnswerSection = ({ question }) => {
  return (
    <div className="model-answer-box">
      <h2 className="model-answer-title">📌 모범 답안</h2>
      <p className="model-answer-text">
        {question.modelAnswer || "모범 답안이 아직 준비되지 않았습니다."}
      </p>
      {question.tags && question.tags.length > 0 && (
        <TagList question={question} />
      )}
    </div>
  );
};

export default ModelAnswerSection;
