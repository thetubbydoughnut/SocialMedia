import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import NotificationsList from './NotificationsList';
import './NotificationIcon.css';

function NotificationIcon() {
  const unreadCount = useSelector((state) => state.notifications.unreadCount);
  const [visible, setVisible] = React.useState(false);
  const location = useLocation();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  if (location.pathname !== '/') {
    return null;
  }

  return (
    <div className="notification-icon">
      <FontAwesomeIcon icon={faBell} onClick={toggleVisibility} />
      {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      {visible && <NotificationsList />}
    </div>
  );
}

export default NotificationIcon;