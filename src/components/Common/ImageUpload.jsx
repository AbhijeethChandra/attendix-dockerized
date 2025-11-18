import React from "react";

export const ImageUpload = (props) => {
  const { file, setFile, children, handleUpload } = props;

  const handleImageUpload = (e) => {
    if (handleUpload) return handleUpload(e);

    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  return (
    <label className="h-full w-full cursor-pointer">
      <input type="file" onChange={handleImageUpload} className="hidden" />
      {file ? (
        <img
          alt="imagePreview"
          className="object-cover w-full h-full"
          src={URL.createObjectURL(file)}
        />
      ) : (
        children
      )}
    </label>
  );
};
