import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStories, addStory } from '../../slices/storiesSlice';
import axios from 'axios';
import socket from '../../socket';
import './StoriesList.css';

function StoriesList() {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories.items);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('/stories/friends');
        dispatch(setStories(response.data));
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();

    // Listen for new stories
    socket.on('new_story', (story) => {
      dispatch(addStory(story));
    });

    return () => {
      socket.off('new_story');
    };
  }, [dispatch]);

  return (
    <div className="stories-list">
      <h3>Stories</h3>
      <div className="stories-container">
        {stories.map((story) => (
          <div key={story.id} className="story">
            <img src={story.media_url} alt="Story" />
            <p>{story.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoriesList;