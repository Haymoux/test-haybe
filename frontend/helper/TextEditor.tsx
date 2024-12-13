'use client';

import React, { useRef, useState } from 'react';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';

const TextEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isContentEmpty, setIsContentEmpty] = useState(true);

  // Function to apply text formatting
  const applyFormat = (command: string) => {
    document.execCommand(command, false, '');
    editorRef.current?.focus(); // Keep focus on the editor after applying the command
  };

  // Handle input events to check if the editor is empty
  const handleInput = () => {
    if (editorRef.current) {
      setIsContentEmpty(editorRef.current.textContent?.trim() === '');
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md w-full max-w-xl mx-auto">
      {/* Toolbar */}
      <div className="flex gap-2 mb-2 bg-gray-100 p-2 rounded-md">
        <button
          title="Bold"
          className="p-2 rounded-md hover:bg-gray-200 focus:outline-none"
          onClick={() => applyFormat('bold')}
        >
          <FaBold />
        </button>
        <button
          title="Italic"
          className="p-2 rounded-md hover:bg-gray-200 focus:outline-none"
          onClick={() => applyFormat('italic')}
        >
          <FaItalic />
        </button>
        <button
          title="Underline"
          className="p-2 rounded-md hover:bg-gray-200 focus:outline-none"
          onClick={() => applyFormat('underline')}
        >
          <FaUnderline />
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="w-full min-h-[150px] border border-gray-300 rounded-md p-4 bg-gray-50 focus:outline-none"
        onInput={handleInput}
      >
        {isContentEmpty && (
          <span className="text-gray-400 absolute pointer-events-none">
            Write your ideas here...
          </span>
        )}
      </div>
    </div>
  );
};

export default TextEditor;
