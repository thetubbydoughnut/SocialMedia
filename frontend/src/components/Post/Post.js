import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faHeart, faLaugh, faSurprise, faSadTear, faAngry } from '@fortawesome/free-regular-svg-icons';
import './Post.css';

const Post = ({ post }) => {
    const [reactions, setReactions] = useState(post.reactions);
    const [comments, setComments] = useState(post.comments);
    const [newComment, setNewComment] = useState('');

    const handleReaction = (type) => {
        setReactions({
            ...reactions,
            [type]: reactions[type] + 1
        });
    };

    const handleComment = (e) => {
        e.preventDefault();
        setComments([...comments, { user: 'Current User', text: newComment }]);
        setNewComment('');
    };

    return (
        <div className="post">
            <div className="post__header">
                <img src={post.user.profilePicture} alt={post.user.name} className="post__profile-picture" />
                <div className="post__user-info">
                    <h3>{post.user.name}</h3>
                </div>
            </div>
            <div className="post__content">
                <p>{post.content}</p>
                {post.image && <img src={post.image} alt="Post" className="post__image" />}
            </div>
            <div className="post__reactions">
                <button onClick={() => handleReaction('like')}>
                    <FontAwesomeIcon icon={faThumbsUp} /> {reactions.like}
                </button>
                <button onClick={() => handleReaction('love')}>
                    <FontAwesomeIcon icon={faHeart} /> {reactions.love}
                </button>
                <button onClick={() => handleReaction('haha')}>
                    <FontAwesomeIcon icon={faLaugh} /> {reactions.haha}
                </button>
                <button onClick={() => handleReaction('wow')}>
                    <FontAwesomeIcon icon={faSurprise} /> {reactions.wow}
                </button>
                <button onClick={() => handleReaction('sad')}>
                    <FontAwesomeIcon icon={faSadTear} /> {reactions.sad}
                </button>
                <button onClick={() => handleReaction('angry')}>
                    <FontAwesomeIcon icon={faAngry} /> {reactions.angry}
                </button>
            </div>
            <div className="post__comments">
                {comments.map((comment, index) => (
                    <div key={index} className="post__comment">
                        <strong>{comment.user}</strong> {comment.text}
                    </div>
                ))}
                <form onSubmit={handleComment}>
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                    />
                    <button type="submit">Comment</button>
                </form>
            </div>
        </div>
    );
};

export default Post;