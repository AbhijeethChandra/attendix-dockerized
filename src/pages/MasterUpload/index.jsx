import React, { useState, useRef } from "react";
import { FaUpload, FaDownload, FaFile, FaTimes } from "react-icons/fa";
import myExcel from "../../assets/files/download.xlsx";
import { useMasterSaveMutation } from "@/app/rtkQueries/fileUploadApi";
import toast from "react-hot-toast";

const MasterUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [uploadFileApi, uploadFileApiRes] = useMasterSaveMutation();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    console.log("Uploading file:", selectedFile);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      // formData.append("validateOnly", true); // for testing if the api works.

      await uploadFileApi(formData).unwrap();
      toast.success("File uploaded successfully");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center p-4">
        <form
          onSubmit={handleSave}
          className="w-full max-w-2xl rounded-2xl shadow-[0_2px_5px_gray] p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[var(--color-text-1)] mb-2">
              Upload Your Files
            </h1>
          </div>

          {/* Download Template Button */}
          <div className="mb-4 flex flex-col items-center gap-2 bg-[var(--color-bg-1)] p-4 rounded-md">
            <p className="text-sm text-[var(--color-text-2)]">
              Download the pre-formatted template to ensure your data is structured correctly
            </p>
            <div
              className="button-1 py-1 cursor-pointer rounded-md flex"
              onClick={() => window.open(myExcel)}
            >
              <label className="cursor-pointer w-full px-2 py-1.5 text-center text-md font-semibold font-medium">
                <FaDownload className="inline-block mr-1 size-3.5" />
                Download Template
              </label>
            </div>
          </div>

          {/* Hidden file input */}
          <input
            required
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            accept=".xlsx"
          />

          {/* Upload Area */}
          {!selectedFile && (
            <div
              onClick={handleUploadClick}
              className="border-2 border-dashed border-[var(--color-border-1)] hover:border-[var(--color-border-3)] rounded-xl p-12 text-center bg-gray-50 cursor-pointer transition-all"
            >
              <FaUpload className="inline-block mr-1 size-4 text-[var(--color-text-2)]" />
              <p className="text-lg font-semibold text-[var(--color-text-2)] mb-2">
                click to select files
              </p>
            </div>
          )}

          {/* Selected File Display */}
          {selectedFile && (
            <div className="mt-4 p-4 bg-gray-50 border border-[var(--color-border-1)] rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaFile className="text-[var(--color-text-2)] text-xl" />
                <div>
                  <p className="font-semibold text-[var(--color-text-1)]">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-[var(--color-text-2)]">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
          )}

          {/* Save Button */}
          <button
            type="submit"
            className={`cursor-pointer w-full rounded-md flex mt-6 ${
              selectedFile ? "button-1" : "opacity-50 pointer-events-none"
            }`}
          >
            <label className="cursor-pointer w-full px-2 py-1.5 text-center text-md font-semibold font-medium">
              save File
            </label>
          </button>
        </form>
      </div>
    </div>
  );
};

export default MasterUpload;
