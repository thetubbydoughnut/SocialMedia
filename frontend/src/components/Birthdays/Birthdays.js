import React from 'react';

const Birthdays = () => {
    // This would typically fetch data from your backend
    const upcomingBirthdays = [
        { name: 'John Doe', date: 'Today' },
        { name: 'Jane Smith', date: 'Tomorrow' },
    ];

    return (
        <div className="widget birthdays">
            <h2>Upcoming Birthdays</h2>
            <ul>
                {upcomingBirthdays.map((birthday, index) => (
                    <li key={index}>{birthday.name} - {birthday.date}</li>
                ))}
            </ul>
        </div>
    );
};

export default Birthdays;
