import React from 'react';
import TrendingTopics from '../TrendingTopics/TrendingTopics';
import Birthdays from '../Birthdays/Birthdays';
import Weather from '../Weather/Weather';
import QuickPost from '../QuickPost/QuickPost';
import './Widgets.css';

const Widgets = ({ onPostCreated }) => {
    return (
        <div className="widgets">
            <QuickPost onPostCreated={onPostCreated} />
            <TrendingTopics />
            <Birthdays />
            <Weather />
        </div>
    );
};

export default Widgets;