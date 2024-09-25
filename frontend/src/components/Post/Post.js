import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faHeart, faLaugh, faSurprise, faSadTear, faAngry } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as faThumbsUpSolid, faHeart as faHeartSolid, faLaugh as faLaughSolid, faSurprise as faSurpriseSolid, faSadTear as faSadTearSolid, faAngry as faAngrySolid } from '@fortawesome/free-solid-svg-icons';
import './Post.css';

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
        setComments([...comments, { user: 'Current User', text: newComment }]);
        setNewComment('');
    };

    const getIcon = (type) => {
        switch (type) {
            case 'like':
                return userReaction === 'like' ? faThumbsUpSolid : faThumbsUp;
            case 'love':
                return userReaction === 'love' ? faHeartSolid : faHeart;
            case 'haha':
                return userReaction === 'haha' ? faLaughSolid : faLaugh;
            case 'wow':
                return userReaction === 'wow' ? faSurpriseSolid : faSurprise;
            case 'sad':
                return userReaction === 'sad' ? faSadTearSolid : faSadTear;
            case 'angry':
                return userReaction === 'angry' ? faAngrySolid : faAngry;
            default:
                return faThumbsUp;
        }
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
                {post.mediaUrl && <img src={post.mediaUrl} alt="Post" className="post__image" />}
            </div>
            <div className="post__reactions">
                {Object.keys(reactions).map((type) => (
                    <button
                        key={type}
                        onClick={() => handleReaction(type)}
                        className={userReaction === type ? 'clicked' : ''}
                        disabled={!!userReaction} // Disable all buttons if a reaction is made
                    >
                        <FontAwesomeIcon icon={getIcon(type)} /> {reactions[type]}
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
                    <button type="submit">Comment</button>
                </form>
            </div>
        </div>
    );
};

export default Post;