const NewCaptionForm = ({ caption, onClickNewCaption, onCaptionChange }) => {
  return (
    <form onSubmit={onClickNewCaption}>
      Caption: <input type="text" value={caption} onChange={onCaptionChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export { NewCaptionForm };
