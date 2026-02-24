import { useRef, useState } from "react";
import { MdClose, MdInsertDriveFile, MdUpload } from "react-icons/md";

const FileUploader = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file) setSelectedFile(file);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };
  return (
    <div>
      {/* File Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files[0])}
        />
        {selectedFile ? (
          <div className="flex items-center justify-center gap-3">
            <MdInsertDriveFile className="w-8 h-8 text-blue-500 flex-shrink-0" />
            <div className="text-left min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
                fileInputRef.current.value = "";
              }}
              className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
            >
              <MdClose className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div>
            <MdUpload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">
              Click or drag a file to upload
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Any file type supported
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
