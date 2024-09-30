import React, { useState } from 'react';

const QuickPost = () => {
    const [post, setPost] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // This would typically send the post to your backend
        console.log('Posting:', post);
        setPost('');
    };

    return (
        <div className="widget quick-post">
            <h2>Quick Post</h2>
            <form onSubmit={handleSubmit}>
                <textarea 
                    value={post} 
                    onChange={(e) => setPost(e.target.value)}
                    placeholder="What's on your mind?"
                />
                <button type="submit">Post</button>
            </form>
        </div>
    );
};

export default QuickPost;