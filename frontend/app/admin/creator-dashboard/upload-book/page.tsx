'use client'

import UploadIcon from '@/components/Icons/UploadIcon';
import { useAuth } from '@/lib/auth-context';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useRef } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';

interface BookData {
  images: string[];
  price: number;
  type: 'book';
  book: {
    title: string;
    cover: string;
    author: string;
    description: string;
    publisher: string;
    publishedDate: string;
  };
  status: 'draft' | 'published';
}

export default function UploadBook() {
    const { token } = useAuth()
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [bookData, setBookData] = useState<BookData>({
    images: [],
    price: 0,
    type: 'book',
    book: {
      title: '',
      cover: '',
      author: '',
      description: '',
      publisher: '',
      publishedDate: new Date().toISOString().split('T')[0]
    },
    status: 'published'
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setBookData(prev => {
        if (parent === 'book') {
          return {
            ...prev,
            book: {
              ...prev.book,
              [child]: value
            }
          };
        }
        return prev;
      });
    } else {
      setBookData(prev => ({
        ...prev,
        [name]: name === 'price' ? parseFloat(value) || 0 : value
      }));  
    }
  };

  const handleStatusChange = (status: 'draft' | 'published') => {
    setBookData(prev => ({ ...prev, status }));
    setShowStatusDropdown(false);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      setErrorMessage('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Image size should be less than 5MB');
      return;
    }

    // Create preview URL
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    setUploadedFile(file);
    setErrorMessage(null);

    // Clean up the preview URL when component unmounts
    return () => {
      URL.revokeObjectURL(preview);
    };
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('media', file);

    try {
      const response = await axios.post(
        'https://api.hosoptima.com/api/v1/media',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            setUploadProgress(progress);
          }
        }
      );

      return response.data.url; 
    } catch (error) {
      throw new Error('Failed to upload image');
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      // Validation
      if (!uploadedFile) {
        throw new Error('Please upload a book cover image');
      }
      if (!bookData.book.title.trim()) {
        throw new Error('Book title is required');
      }
      if (!bookData.book.description.trim()) {
        throw new Error('Book description is required');
      }
      if (!bookData.price || bookData.price <= 0) {
        throw new Error('Please enter a valid price');
      }

      // Upload image first
      const imageUrl = await uploadFile(uploadedFile);
      
      // Update book data with the image URL
      const updatedBookData = {
        ...bookData,
        images: [imageUrl],
        book: {
          ...bookData.book,
          cover: imageUrl
        }
      };

      console.log(updatedBookData)
      // Create book
      const response = await axios.post(
        'https://api.hosoptima.com/api/v1/product',
        updatedBookData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` 
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert('Book uploaded successfully!');
        // Optionally redirect or clear form
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to upload book');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
  <div className="">
    <h5 className="text-[0.7rem] mb-3 max-md:mb-2 text-gray-600 flex gap-1">
      <Link href="/" className="hover:text-[#6694c2] hover:font-medium transition-colors duration-500 peer">
        Homepage
      </Link>
      &gt;
      <Link href="/admin/creator-dashboard" className="hover:text-[#6694c2] hover:font-medium transition-colors duration-500 peer">
        Creator Dashboard
      </Link>
      &gt;
      <span className="text-[#6694c2] font-medium transition-colors duration-500 peer-hover:text-gray-700">
        Upload Book
      </span>
    </h5>

    <div className="py-6 max-md:py-4">
      <h2 className="font-bold text-[1.15rem]">Book Name</h2>

      <div className="flex w-full py-4 max-md:py-2 justify-between gap-4">
        <input
          type="text"
          name="book.title"
          placeholder="Book Name"
          value={bookData.book.title}
          onChange={handleInputChange}
          className="p-4 max-md:p-2 w-[58%] text-[0.86rem] outline-none bg-[#f7f7f7] rounded-md"
        />
        <div className="relative w-[42%]">
          <button
            title="dropdown"
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            className="p-4 max-md:p-2 bg-[#f7f7f7] w-full rounded-md"
          >
            <div className="flex pl-5 max-md:pl-1 items-center justify-between">
              <h3 className="font-semibold text-[0.86rem] capitalize">
                {bookData.status}
              </h3>
              <TiArrowSortedDown />
            </div>
          </button>
          
          {showStatusDropdown && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-md shadow-lg z-10">
              <button
                onClick={() => handleStatusChange('published')}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-[0.86rem]"
              >
                Published
              </button>
              <button
                onClick={() => handleStatusChange('draft')}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-[0.86rem]"
              >
                Draft
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full py-4 h-[66vh] justify-between gap-4">
        <button
          onClick={handleFileSelect}
          title="upload Book"
          className="p-4 bg-[#f7f7f7] w-[58%] max-md:w-full rounded-md relative overflow-hidden"
        >
          <input
            type="file"
            ref={fileInputRef}
            title='file change'
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          {previewUrl ? (
            <div className="relative w-full h-full">
              <Image
                src={previewUrl}
                alt="Book cover preview"
                className="object-contain w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white text-sm">Click to change image</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <UploadIcon />
              <h3 className="text-[0.97rem] font-medium text-[#1A1A1A]">
                Upload Book Cover
              </h3>
              {uploadProgress > 0 && (
                <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-[#1B3664] h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </div>
          )}
        </button>
      </div>
      <div className="w-[58%] max-md:w-full py-4">
          <div className="mb-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={bookData.price || ''}
              onChange={handleInputChange}
              className="p-4 w-full text-[0.86rem] outline-none bg-[#f7f7f7] rounded-md"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="book.author"
              placeholder="Author"
              value={bookData.book.author}
              onChange={handleInputChange}
              className="p-4 w-full text-[0.86rem] outline-none bg-[#f7f7f7] rounded-md"
            />
          </div>

          <h2 className="font-bold text-[1.15rem]">Book Description</h2>
          <div className="py-4">
            <textarea
              name="book.description"
              placeholder="Write your description here"
              value={bookData.book.description}
              onChange={handleInputChange}
              className="p-4 w-full h-[40vh] text-[0.86rem] outline-none bg-[#f7f7f7] rounded-md"
            />
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">
            {errorMessage}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-[#1B3664] py-2 px-12 text-[0.86rem] rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Uploading...' : 'Post'}
        </button>
      </div>
    </div>
  );
}