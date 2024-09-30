import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Friends from './Friends';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './FriendsList.css';
import { profileSelectors } from '../../slices/profileSlice';

const FriendsList = () => {
    const allProfiles = useSelector(profileSelectors.selectSearchResults);
    const friendsContainerRef = useRef(null);

    if (!allProfiles || allProfiles.length === 0) {
        return <div>No profiles available</div>;
    }

    const handleScroll = (direction) => {
        const container = friendsContainerRef.current;
        const scrollAmount = 200;
        if (container) {
            if (direction === 'left') {
                container.scrollLeft -= scrollAmount;
            } else {
                container.scrollLeft += scrollAmount;
            }
        }
    };

    return (
        <div className="friends-list">
            <h2>People You May Know</h2>
            <div className="friends-scroll-container">
                <button className="scroll-button left" onClick={() => handleScroll('left')}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <div className="friends-container" ref={friendsContainerRef}>
                    {allProfiles.map(profile => (
                        <Friends key={profile.id} friend={profile} />
                    ))}
                </div>
                <button className="scroll-button right" onClick={() => handleScroll('right')}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
};

export default FriendsList;