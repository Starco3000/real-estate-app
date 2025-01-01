import React, { useCallback, useRef } from 'react';
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
        console.log('Uploaded Photo URL:', uploadPhoto.url); // Log the uploaded photo URL
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', uploadPhoto.url);
      }
    };
  }, []);
  //Quill Settings
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, false] }],
        [{ font: [] }],
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
    <ReactQuill
      ref={quillRef}
      theme='snow'
      modules={modules}
      formats={formats}
      value={value}
      onChange={setValue}
      // className='h-full'
      style={{ height }}
    />
  );
}

export default RichText;

// import React, { useRef, useCallback } from 'react';
// import ReactQuill, { Quill } from 'react-quill-new';
// import 'react-quill-new/dist/quill.snow.css';
// import { uploadFile } from '../helpers/uploadFile';

// // Create a custom image blot with caption
// const BlockEmbed = Quill.import('blots/block/embed');

// class CustomImageBlot extends BlockEmbed {
//   static create(value) {
//     const node = super.create();
//     const figure = document.createElement('figure');
//     const img = document.createElement('img');
//     img.setAttribute('src', value.url);
//     figure.appendChild(img);

//     const caption = document.createElement('figcaption');
//     caption.setAttribute('contenteditable', 'true');
//     caption.innerText = value.caption || 'Caption';
//     figure.appendChild(caption);

//     node.appendChild(figure);

//     // Prevent the deletion of the entire image when editing the caption
//     caption.addEventListener('keydown', (e) => {
//       if (e.key === 'Backspace' && caption.innerText === 'Caption') {
//         e.preventDefault();
//         caption.innerText = '';
//       }
//     });

//     return node;
//   }

//   static value(node) {
//     const img = node.querySelector('img');
//     const caption = node.querySelector('figcaption');
//     return {
//       url: img.getAttribute('src'),
//       caption: caption.innerText,
//     };
//   }
// }

// CustomImageBlot.blotName = 'customImage';
// CustomImageBlot.tagName = 'div';
// Quill.register(CustomImageBlot);

// function RichText({ value, setValue, height }) {
//   const quillRef = useRef(null);

//   // Custom image handler
//   const imageHandler = useCallback(async () => {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       if (file) {
//         const folder = 'news'; // Location to store images
//         const uploadPhoto = await uploadFile(file, folder); // Upload file to Cloudinary
//         console.log('Uploaded Photo URL:', uploadPhoto.url); // Log the uploaded photo URL
//         const editor = quillRef.current.getEditor();
//         const range = editor.getSelection();
//         const position = range ? range.index : editor.getLength(); // Set default position if range is null
//         editor.insertEmbed(position, 'customImage', {
//           url: uploadPhoto.url,
//           caption: 'Caption',
//         });
//       }
//     };
//   }, []);

//   // Quill Settings
//   const modules = {
//     toolbar: {
//       container: [
//         [{ header: [1, 2, 3, 4, false] }],
//         [{ font: [] }],
//         ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
//         [
//           { list: 'ordered' },
//           { list: 'bullet' },
//           { indent: '-1' },
//           { indent: '+1' },
//           { align: [] },
//           { script: 'sub' },
//           { script: 'super' },
//         ],
//         ['link', 'image', 'video'],
//         ['clean'],
//       ],
//       handlers: {
//         image: imageHandler,
//       },
//     }
//   };

//   const formats = [
//     'header',
//     'font',
//     'bold',
//     'italic',
//     'underline',
//     'strike',
//     'blockquote',
//     'code-block',
//     'list',
//     'script',
//     'align',
//     'indent',
//     'link',
//     'customImage',
//     'video',
//   ];

//   return (
//     <div style={{ height: height || 'auto' }}>
//       <ReactQuill
//         ref={quillRef}
//         theme='snow'
//         modules={modules}
//         formats={formats}
//         value={value}
//         onChange={setValue}
//         className='h-full'
//       />
//     </div>
//   );
// }

// export default RichText;

// import React, { useRef, useCallback, useState, useEffect } from 'react';
// import ReactQuill, { Quill } from 'react-quill-new';
// import 'react-quill-new/dist/quill.snow.css';
// import { uploadFile } from '../helpers/uploadFile';
// import CaptionModal from './Modal';

// // Create a custom image blot with caption
// const BlockEmbed = Quill.import('blots/block/embed');

// class CustomImageBlot extends BlockEmbed {
//   static create(value) {
//     const node = super.create();
//     const figure = document.createElement('figure');
//     const img = document.createElement('img');
//     img.setAttribute('src', value.url);
//     figure.appendChild(img);

//     const caption = document.createElement('figcaption');
//     caption.setAttribute('contenteditable', 'true');
//     caption.innerText = value.caption || 'Caption';
//     figure.appendChild(caption);

//     node.appendChild(figure);

//     // Add double-click event to edit caption
//     img.addEventListener('dblclick', () => {
//       const quill = Quill.find(node);
//       quill.root.dispatchEvent(
//         new CustomEvent('edit-caption', {
//           detail: { blot: CustomImageBlot, node },
//         }),
//       );
//     });

//     return node;
//   }

//   static value(node) {
//     const img = node.querySelector('img');
//     const caption = node.querySelector('figcaption');
//     return {
//       url: img.getAttribute('src'),
//       caption: caption.innerText,
//     };
//   }
// }

// CustomImageBlot.blotName = 'customImage';
// CustomImageBlot.tagName = 'div';
// Quill.register(CustomImageBlot);

// function RichText({ value, setValue, height }) {
//   const quillRef = useRef(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentBlot, setCurrentBlot] = useState(null);
//   const [initialCaption, setInitialCaption] = useState('');

  
//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setCurrentBlot(null);
//   };

//   const handleModalSubmit = (caption) => {
//     if (currentBlot) {
//       const { blot, node } = currentBlot;
//       const value = blot.value(node);
//       value.caption = caption;
//       const newNode = blot.create(value);
//       node.parentNode.replaceChild(newNode, node);
//     }
//   };

//   const handleEditCaption = useCallback((e) => {
//     const { blot, node } = e.detail;
//     const value = blot.value(node);
//     setInitialCaption(value.caption);
//     setCurrentBlot({ blot, node });
//     setIsModalOpen(true);
//   }, []);

//   useEffect(() => {
//     const quill = quillRef.current.getEditor();
//     quill.root.addEventListener('edit-caption', handleEditCaption);
//     return () => {
//       quill.root.removeEventListener('edit-caption', handleEditCaption);
//     };
//   }, [handleEditCaption]);

//   // Custom image handler
//   const imageHandler = useCallback(async () => {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       if (file) {
//         const folder = 'news'; // Location to store images
//         const uploadPhoto = await uploadFile(file, folder); // Upload file to Cloudinary
//         console.log('Uploaded Photo URL:', uploadPhoto.url); // Log the uploaded photo URL
//         const editor = quillRef.current.getEditor();
//         const range = editor.getSelection();
//         const position = range ? range.index : editor.getLength(); // Set default position if range is null
//         editor.insertEmbed(position, 'customImage', { url: uploadPhoto.url, caption: 'Caption' });
//         setInitialCaption('Caption');
//         setCurrentBlot({ blot: CustomImageBlot, node: editor.scroll.domNode });
//         setIsModalOpen(true);
//       }
//     };
//   }, []);

//   // Quill Settings
//   const modules = {
//     toolbar: {
//       container: [
//         [{ header: [1, 2, 3, 4, false] }],
//         [{ font: [] }],
//         ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
//         [
//           { list: 'ordered' },
//           { list: 'bullet' },
//           { indent: '-1' },
//           { indent: '+1' },
//           { align: [] },
//           { script: 'sub' },
//           { script: 'super' },
//         ],
//         ['link', 'image', 'video'],
//         ['clean'],
//       ],
//       handlers: {
//         image: imageHandler,
//       },
//     },
//     clipboard: {
//       matchVisual: false,
//     },
//   };

//   const formats = [
//     'header',
//     'font',
//     'bold',
//     'italic',
//     'underline',
//     'strike',
//     'blockquote',
//     'code-block',
//     'list',
//     'script',
//     'align',
//     'indent',
//     'link',
//     'customImage',
//     'video',
//   ];

//   return (
//     <div style={{ height: height || 'auto' }}>
//       <ReactQuill
//         ref={quillRef}
//         theme='snow'
//         modules={modules}
//         formats={formats}
//         value={value}
//         onChange={setValue}
//         className='h-full'
//       />
//       <CaptionModal
//         isOpen={isModalOpen}
//         onClose={handleModalClose}
//         onSubmit={handleModalSubmit}
//         initialCaption={initialCaption}
//       />
//     </div>
//   );
// }

// export default RichText;
