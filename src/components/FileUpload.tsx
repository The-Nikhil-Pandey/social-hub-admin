
import { useState, useRef } from 'react';
import { X, Upload, FileText, Image } from 'lucide-react';

interface FileUploadProps {
  value?: File | string;
  onChange: (file: File | null) => void;
  accept: string;
  placeholder: string;
  type: 'image' | 'document';
}

const FileUpload = ({ value, onChange, accept, placeholder, type }: FileUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);
      
      if (type === 'image' && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileName = () => {
    if (value instanceof File) return value.name;
    if (typeof value === 'string') return value.split('/').pop() || value;
    return null;
  };

  const hasFile = value instanceof File || (typeof value === 'string' && value);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          id={`file-upload-${Math.random()}`}
        />
        <label
          htmlFor={`file-upload-${Math.random()}`}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg cursor-pointer transition-colors"
        >
          <Upload size={16} />
          {placeholder}
        </label>
        
        {hasFile && (
          <button
            onClick={handleRemove}
            className="p-1 text-red-400 hover:text-red-300 transition-colors"
            type="button"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {hasFile && (
        <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
          {type === 'image' && preview ? (
            <img src={preview} alt="Preview" className="w-12 h-12 object-cover rounded" />
          ) : (
            <div className="w-12 h-12 bg-gray-600 rounded flex items-center justify-center">
              {type === 'image' ? <Image size={20} className="text-gray-400" /> : <FileText size={20} className="text-gray-400" />}
            </div>
          )}
          <span className="text-gray-300 text-sm">{getFileName()}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
