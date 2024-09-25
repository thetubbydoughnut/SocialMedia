import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import './NewsFeed.css';
import Post from '../Post/Post';

const NewsFeed = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchPosts = async (currentPage) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/posts', { params: { page: currentPage } });
            if (response.data.length === 0) {
                setHasMore(false);
            } else {
                setPosts((prev) => [...prev, ...response.data]);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts(page);
    }, [page]); // Only fetch when page changes

    const loadMore = () => {
        if (!loading && hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <div>
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
            {loading && <p>Loading...</p>}
            {!hasMore && <p>No more posts</p>}
            {hasMore && !loading && (
                <button onClick={loadMore}>Load More</button>
            )}
        </div>
    );
};

export default NewsFeed;