import TagList from "./TagList";

const AddTagList = ({
  tags,
  inputValue,
  onChangeInput,
  handleTagInput,
  removeTag,
}) => {
  return (
    <div className="add-tag-list-area">
      <input
        type="text"
        value={inputValue}
        onChange={onChangeInput}
        onKeyDown={handleTagInput}
        placeholder="태그를 입력하고 Enter 또는 , 를 누르세요"
        className="form-input"
      />
      <TagList items={tags} removeTag={removeTag} showRemoveButton={true} />
    </div>
  );
};

export default AddTagList;
