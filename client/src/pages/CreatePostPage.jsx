import { useState } from 'react';
import axios from 'axios';

export default function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('link');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5002/api/posts', { title, type, content });
            setTitle('');
            setContent('');
            alert('Post created successfully');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div>
            <h1>Create a New Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Type:</label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="link">Link</option>
                        <option value="note">Note</option>
                    </select>
                </div>
                <div>
                    <label>Content:</label>
                    <input type="text" value={content} onChange={(e) => setContent(e.target.value)} required />
                </div>
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
}
