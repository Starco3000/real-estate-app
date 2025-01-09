import React, { useCallback, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { uploadFile } from '../helpers/uploadFile';

function RichText({ value, setValue, height }) {
  const quillRef = useRef(null);

  // Custom image handler
  const imageHandler = useCallback(async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const folder = 'news'; // Location to store images
        const uploadPhoto = await uploadFile(file, folder); // Upload file to Cloudinary
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        if (range) {
          editor.insertEmbed(range.index, 'image', uploadPhoto.url);
        } else {
          editor.insertEmbed(editor.getLength() - 1, 'image', uploadPhoto.url);
        }
      }
    };
  }, []);

  // Handle image drop
  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();
    const files = e.dataTransfer.files;

    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const folder = 'news'; // Location to store images
        try {
          const uploadPhoto = await uploadFile(file, folder); // Upload file to Cloudinary
          if (range) {
            // Find the base64 image and remove it
            const contents = editor.getContents();
            const base64ImageIndices = [];
            contents.ops.forEach((op, index) => {
              if (
                op.insert &&
                op.insert.image &&
                op.insert.image.startsWith('data:image/')
              ) {
                // console.log('Removing base64 image at index:', index);
                base64ImageIndices.push(index);
              }
            });

            // Remove base64 images in reverse order to avoid index shifting
            base64ImageIndices.reverse().forEach((index) => {
              editor.deleteText(index, 1);
            });

            // Insert the URL image after a short delay
            setTimeout(() => {
              editor.insertEmbed(range.index, 'image', uploadPhoto.url);
              // Update the range to avoid duplication issues
              editor.setSelection(range.index + 1, 0);
            }, 100);
          } else {
            editor.insertEmbed(
              editor.getLength() - 1,
              'image',
              uploadPhoto.url,
            );
          }
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    }
  }, []);

  // Prevent default drop behavior
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handlePaste = useCallback(async (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const items = clipboardData.items;
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        const folder = 'news'; // Location to store images
        try {
          const uploadPhoto = await uploadFile(file, folder); // Upload file to Cloudinary
          if (range) {
            editor.deleteText(range.index, 1); // Remove the base64 image
            editor.insertEmbed(range.index, 'image', uploadPhoto.url);
            editor.setSelection(range.index + 1, 0);
          } else {
            editor.insertEmbed(
              editor.getLength() - 1,
              'image',
              uploadPhoto.url,
            );
          }
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    }
  }, []);

  useEffect(() => {
    const editor = quillRef.current.getEditor();
    editor.root.addEventListener('drop', handleDrop);
    editor.root.addEventListener('dragover', handleDragOver);
    editor.root.addEventListener('paste', handlePaste);

    return () => {
      editor.root.removeEventListener('drop', handleDrop);
      editor.root.removeEventListener('dragover', handleDragOver);
      editor.root.removeEventListener('paste', handlePaste);
    };
  }, [handleDrop, handleDragOver, handlePaste]);

  //Quill Settings
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, false] }, { font: [] }, { size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
          { align: [] },
          { script: 'sub' },
          { script: 'super' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'script',
    'align',
    'list',
    'indent',
    'link',
    'image',
    'video',
  ];
  return (
    <div style={{ height: height || 'auto' }}>
      <ReactQuill
        ref={quillRef}
        theme='snow'
        modules={modules}
        formats={formats}
        value={value}
        onChange={setValue}
        // className='h-full'
        style={{ height: height - 60 }}
      />
    </div>
  );
}

export default RichText;
