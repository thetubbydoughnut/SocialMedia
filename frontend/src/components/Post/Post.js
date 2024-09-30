import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faHeart, faLaugh, faSurprise, faSadTear, faAngry } from '@fortawesome/free-solid-svg-icons';
import './Post.css';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    const [reactions, setReactions] = useState(post.reactions || {});
    const [userReaction, setUserReaction] = useState(null);
    const [comments, setComments] = useState(post.comments || []);
    const [newComment, setNewComment] = useState('');

    const handleReaction = (type) => {
        if (userReaction) return; // Prevent multiple reactions

        setReactions({
            ...reactions,
            [type]: (reactions[type] || 0) + 1,
        });
        setUserReaction(type);
    };

    const handleComment = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            const updatedComments = [...comments, { user: 'Current User', text: newComment }];
            setComments(updatedComments);
            setNewComment('');
        }
    };

    

    const getIcon = (type) => {
        switch (type) {
            case 'like': return faThumbsUp;
            case 'love': return faHeart;
            case 'haha': return faLaugh;
            case 'wow': return faSurprise;
            case 'sad': return faSadTear;
            case 'angry': return faAngry;
            default: return faThumbsUp;
        }
    };

    return (
        <div className="post">
            <div className="post__header">
                <Link to={`/profile/${post.user.username}`} className="post__user-link">
                    <img src={post.user.profilePicture} alt={post.user.name} className="post__profile-picture" />
                    <div className="post__user-info">
                        <h3>{post.user.name}</h3>
                    </div>
                </Link>
            </div>
            <div className="post__content">
                <p>{post.content}</p>
                {post.image && <img src={post.image} alt="Post" className="post__image" />}
            </div>
            <div className="post__reactions">
                {Object.keys(post.reactions).map((type) => (
                    <button
                        key={type}
                        onClick={() => handleReaction(type)}
                        className={userReaction === type ? 'clicked' : ''}
                        disabled={!!userReaction} // Disable all buttons if a reaction is made
                    >
                        <FontAwesomeIcon icon={getIcon(type)} /> {post.reactions[type]}
                    </button>
                ))}
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
                    <button type="submit" className="comment-button">Comment</button>
                </form>
            </div>
        </div>
    );
};

export default Post;