import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/blogs')
      .then(response => setBlogs(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleCreateBlog = async () => {
    if (!title || !content) {
      setMessage('❌ يرجى إدخال جميع البيانات!');
      return;
    }

    await axios.post('/api/blogs/create', { title, content, authorId: 1 });
    setMessage(`✅ تم نشر المقال: ${title}`);
    setBlogs([...blogs, { title, content, authorId: 1, createdAt: new Date() }]);
  };

  return (
    <div>
      <h2>📝 إدارة المدونات</h2>
      <label>عنوان المقال:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

      <label>المحتوى:</label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>

      <button onClick={handleCreateBlog}>📝 نشر المقال</button>

      <h3>📜 المقالات المنشورة</h3>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <h4>{blog.title}</h4>
            <p>{blog.content}</p>
          </li>
        ))}
      </ul>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Blog;
