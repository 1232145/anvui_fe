import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const editorModules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        ['blockquote', 'code-block'],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
        matchVisual: false
    }
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'font',
    'blockquote', 'code-block',
    'align',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];

function QuillForm({data, handleChange}) {
    return (
        <ReactQuill
            modules={editorModules}
            value={data}
            onChange={(e) => handleChange(e)}
            formats={formats}
        />
    )
}

export default QuillForm