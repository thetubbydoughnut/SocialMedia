import React from 'react';
import './Widgets.css';

const Widgets = () => {
    return (
        <div className="widgets">
            <div className="widget">
                <h3>Trending Topics</h3>
                <ul>
                    <li>#TrendingTopic1</li>
                    <li>#TrendingTopic2</li>
                    <li>#TrendingTopic3</li>
                </ul>
            </div>
            <div className="widget">
                <h3>Suggested Friends</h3>
                <ul>
                    <li>Friend 1</li>
                    <li>Friend 2</li>
                    <li>Friend 3</li>
                </ul>
            </div>
        </div>
    );
};

export default Widgets;