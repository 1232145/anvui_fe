import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editorConfig = {
  toolbar: {
    items: [
      'undo', 'redo',
      '|', 'heading', 'insertTable',
      '|', 'bold', 'italic',
      '|', 'link', 'uploadImage', 'mediaEmbed', 'blockQuote',
      '|', 'bulletedList', 'numberedList', 'outdent', 'indent'
    ],
    shouldNotGroupWhenFull: false
  },
};

function CKEditorForm({ data, handleChange }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      config={editorConfig}
      onReady={(editor) => {
        // You can access the editor instance here if needed
        // console.log('Editor is ready to use!', editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        handleChange(data);
      }}
    />
  );
}

export default CKEditorForm;
