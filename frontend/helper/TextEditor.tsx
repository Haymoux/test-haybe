'use client';

import React, { useRef, useState } from 'react';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';

const TextEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false
  });

  // Function to apply text formatting
  const applyFormat = (command: string) => {
    document.execCommand(command, false, '');
    editorRef.current?.focus(); // Keep focus on the editor after applying the command

    // Toggle the active state for the format
    setActiveFormats(prev => ({
      ...prev,
      [command]: !prev[command as keyof typeof prev]
    }));
  };

  // Handle input events to check if the editor is empty
  const handleInput = () => {
    if (editorRef.current) {
      setIsEmpty(editorRef.current.textContent?.trim() === '');
    }
  };

  // Handle focus and blur to manage placeholder
  const handleFocus = () => {
    if (editorRef.current && isEmpty) {
      editorRef.current.textContent = '';
      setIsEmpty(false);
    }
  };

  const handleBlur = () => {
    if (editorRef.current && editorRef.current.textContent?.trim() === '') {
      setIsEmpty(true);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md w-full max-w-xl mx-auto">
      {/* Toolbar */}
      <div className="flex gap-2 items-center mb-2 bg-gray-100 p-2 rounded-md">
        <button
          title="Bold"
          className={`p-2 rounded-md hover:bg-gray-200 focus:outline-none ${activeFormats.bold ? 'bg-[#F7F7F7] border' : ''}`}
          onClick={() => applyFormat('bold')}
        >
          <FaBold />
        </button>
        <button
          title="Italic"
          className={`p-2 rounded-md hover:bg-gray-200 focus:outline-none ${activeFormats.italic ? 'bg-[#F7F7F7] border' : ''}`}
          onClick={() => applyFormat('italic')}
        >
          <FaItalic />
        </button>
        <button
          title="Underline"
          className={`p-2 rounded-md hover:bg-gray-200 focus:outline-none ${activeFormats.underline ? 'bg-[#F7F7F7] border' : ''}`}
          onClick={() => applyFormat('underline')}
        >
          <FaUnderline />
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        // placeholder="Write your ideas here..."
        className={`w-full min-h-[44vh] border border-gray-300 outline-none rounded-md p-4 bg-gray-50 focus:outline-none ${isEmpty ? 'text-gray-400' : ''}`}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        suppressContentEditableWarning
      >
        {isEmpty ? "Write your ideas here..." : ''}
      </div>
    </div>
  );
};

export default TextEditor;