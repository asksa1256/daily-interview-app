const TagList = ({ question }) => {
  return (
    <div className="tag-list">
      <div className="tags">
        {question.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagList;
