import React, { useContext } from 'react';
import { NotificationContext } from '../../contexts/NotficationContext';
import './Notifications.css';

const Notifications = () => {
    const { notifications, markAsRead } = useContext(NotificationContext);

    return (
        <div className="notifications">
            <h3>Notifications</h3>
            <ul>
                {notifications.map(notification => (
                    <li key={notification.id} className={notification.isRead ? 'read' : 'unread'}>
                        <p>{notification.content}</p>
                        {!notification.isRead && (
                            <button onClick={() => markAsRead(notification.id)}>Mark as Read</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;