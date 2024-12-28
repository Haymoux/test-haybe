'use client'

import React, { useState } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  answers: string[];
  correctAnswers: number[];
}

export default function UploadHOSAssessmentQuestions() {
  // Previous state declarations remain the same...
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: 1,
    question: '',
    answers: ['', '', '', ''],
    correctAnswers: []
  });
  const [showQuestionType, setShowQuestionType] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<number | null>(null);
  const [isMultipleAnswer, setIsMultipleAnswer] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Previous handlers remain the same...
  const handleQuestionChange = (value: string) => {
    setCurrentQuestion(prev => ({
      ...prev,
      question: value
    }));
  };

  const handleAnswerChange = (index: number, value: string) => {
    setCurrentQuestion(prev => ({
      ...prev,
      answers: prev.answers.map((ans, i) => i === index ? value : ans)
    }));
  };

  const handleCorrectAnswerToggle = (index: number) => {
    setCurrentQuestion(prev => ({
      ...prev,
      correctAnswers: isMultipleAnswer
        ? prev.correctAnswers.includes(index)
          ? prev.correctAnswers.filter(i => i !== index)
          : [...prev.correctAnswers, index]
        : [index]
    }));
  };

  const handleAddQuestion = () => {
    if (editingQuestion) {
      setQuestions(prev => prev.map(q => 
        q.id === editingQuestion.id ? currentQuestion : q
      ));
      setEditingQuestion(null);
    } else {
      setQuestions(prev => [...prev, currentQuestion]);
    }
    setCurrentQuestion({
      id: editingQuestion ? currentQuestion.id + 1 : questions.length + 2,
      question: '',
      answers: ['', '', '', ''],
      correctAnswers: []
    });
    setShowQuestionType(false);
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setCurrentQuestion(question);
    setIsMultipleAnswer(question.correctAnswers.length > 1);
  };

  const handleSave = () => {
    setShowSuccessModal(true);
  };

  const handleDelete = (id: number) => {
    setQuestionToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (questionToDelete) {
      setQuestions(prev => prev.filter(q => q.id !== questionToDelete));
      setShowDeleteModal(false);
    }
  };


  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb - Made responsive with flexible text sizing */}
        <h5 className="text-[0.7rem] sm:text-sm mb-3 max-md:mb-2 text-gray-600 flex flex-wrap gap-1 items-center">
            <Link href="/" className="hover:text-[#6694c2] hover:font-medium transition-colors duration-500 peer whitespace-nowrap">
            Homepage
            </Link>
            <span className="text-gray-400">&gt;</span>
            <Link href="/admin/creator-dashboard" className="hover:text-[#6694c2] hover:font-medium transition-colors duration-500 peer whitespace-nowrap">
            Creator Dashboard
            </Link>
            <span className="text-gray-400">&gt;</span>
            <span className="text-[#6694c2] font-medium transition-colors duration-500 peer-hover:text-gray-700 whitespace-normal">
            Upload HOS Assessment Questions
            </span>
        </h5>
      <div className="py-4 sm:py-6 lg:py-8">
        <div className="w-full bg-white rounded-md shadow-lg p-4 sm:p-6 lg:p-8">
          {/* Question Section */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
              {editingQuestion ? `Edit Question ${editingQuestion.id}` : `Question ${currentQuestion.id}`}
            </h3>
            <textarea
              className="w-full p-3 border rounded-md min-h-[100px] resize-y"
              placeholder="Enter question"
              value={currentQuestion.question}
              onChange={(e) => handleQuestionChange(e.target.value)}
            />
          </div>

          {/* Answers Section */}
          <div className="mb-4 sm:mb-6">
            <p className="mb-2 sm:mb-3 text-sm sm:text-base">Enter the answers and select the correct one</p>
            {currentQuestion.answers.map((answer, index) => (
              <div key={index} className="flex items-center gap-2 mb-2 sm:mb-3">
                <div className="flex-shrink-0">
                  <input
                    type={isMultipleAnswer ? "checkbox" : "radio"}
                    checked={currentQuestion.correctAnswers.includes(index)}
                    onChange={() => handleCorrectAnswerToggle(index)}
                    title='answer'
                    className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base"
                  placeholder="Enter answer"
                  value={answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mb-8">
            <button
              onClick={() => setShowQuestionType(true)}
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 text-sm sm:text-base transition-colors duration-300"
            >
              + Add question
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 text-sm sm:text-base transition-colors duration-300"
            >
              Save
            </button>
          </div>

          {/* Previous Questions List */}
          {questions.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Previous Questions</h3>
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">Question {index + 1}</h4>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(question)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(question.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{question.question}</p>
                    <div className="space-y-1">
                      {question.answers.map((answer, ansIndex) => (
                        <div key={ansIndex} className="flex items-center gap-2">
                          <div className="w-4 h-4 flex-shrink-0">
                            {question.correctAnswers.includes(ansIndex) && (
                              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className={question.correctAnswers.includes(ansIndex) ? "font-medium" : "text-gray-600"}>
                            {answer}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Question Type Modal */}
      {showQuestionType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold">Question type</h2>
              <button 
                onClick={() => setShowQuestionType(false)} 
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <p className="mb-4 text-sm sm:text-base">Please Select the option below</p>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors duration-300">
                <input
                  type="radio"
                  name="questionType"
                  checked={!isMultipleAnswer}
                  title='answer'
                  onChange={() => setIsMultipleAnswer(false)}
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                <span className="text-sm sm:text-base">Single answer</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors duration-300">
                <input
                  type="radio"
                  name="questionType"
                  checked={isMultipleAnswer}
                  onChange={() => setIsMultipleAnswer(true)}
                  title='answer'
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                <span className="text-sm sm:text-base">Multiple answers</span>
              </div>
            </div>
            <button
              onClick={() => {
                handleAddQuestion();
                setShowQuestionType(false);
              }}
              className="w-full py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 text-sm sm:text-base transition-colors duration-300"
            >
              Proceed
            </button>
          </div>
        </div>
      )}


      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold">Delete question</h2>
              <button 
                onClick={() => setShowDeleteModal(false)} 
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <p className="mb-6 text-center text-sm sm:text-base">Are you sure you want to delete this question?</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 text-sm sm:text-base transition-colors duration-300"
              >
                No, cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2 border border-blue-900 text-blue-900 rounded-md hover:bg-blue-50 text-sm sm:text-base transition-colors duration-300"
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md text-center">
            <div className="flex justify-end">
              <button 
                onClick={() => setShowSuccessModal(false)} 
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="mb-4">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold mb-2">Questions added</h2>
              <p className="text-sm sm:text-base">You have successfully added {questions.length} questions</p>
            </div>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                // Add navigation logic here
              }}
              className="w-full py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 text-sm sm:text-base transition-colors duration-300"
            >
              Go to dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}