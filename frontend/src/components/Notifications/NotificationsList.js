import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../socket';
import { addNotification, setNotifications, markAsRead } from '../../slices/notificationsSlice';
import { axiosInstance } from '../../utils/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faMessage, faBell } from '@fortawesome/free-solid-svg-icons';

function NotificationsList() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications?.items || []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('/notifications');
        dispatch(setNotifications(response.data));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Authentication error. Please log in again.');
        } else {
          console.error('Error fetching notifications:', error);
        }
      }
    };

    fetchNotifications();

    // Listen for new notifications
    socket.on('new_notification', (notification) => {
      dispatch(addNotification(notification));
    });

    return () => {
      socket.off('new_notification');
    };
  }, [dispatch]);

  const handleMarkAsRead = async (id) => {
    try {
      await axiosInstance.patch(`/notifications/${id}/read`);
      dispatch(markAsRead(id));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'like':
        return faThumbsUp;
      case 'comment':
        return faComment;
      case 'message':
        return faMessage;
      default:
        return faBell;
    }
  };

  return (
    <div className="notifications-list">
      <h3>Notifications</h3>
      {notifications && notifications.length === 0 && <p>No notifications available.</p>}
      {notifications && notifications.length > 0 && (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className={notification.is_read ? 'read' : 'unread'}>
              <FontAwesomeIcon icon={getIcon(notification.type)} />
              <span>{notification.type} from User ID: {notification.from_user_id}</span>
              <button onClick={() => handleMarkAsRead(notification.id)}>
                {notification.is_read ? 'Read' : 'Mark as Read'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotificationsList;