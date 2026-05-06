import React, { useState, useCallback } from 'react';
import { BiCheckCircle, BiInfoCircle, BiX, BiError } from 'react-icons/bi';
import { NotificationContext } from './NotificationContextBase';
import { NOTIFICATION_DURATION } from '../constants/config';

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const showNotification = useCallback((message, type = 'success', duration = NOTIFICATION_DURATION) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setNotifications(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeNotification(id);
    }, duration);
  }, [removeNotification]);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="fixed top-24 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm">
        {notifications.map(({ id, message, type }) => (
          <div
            key={id}
            className={`
              pointer-events-auto
              flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg 
              transform transition-all duration-300 animate-slide-in
              ${type === 'success' ? 'bg-[#8fbf1a] text-white' : ''}
              ${type === 'error' ? 'bg-[#f93270] text-white' : ''}
              ${type === 'info' ? 'bg-blue-500 text-white' : ''}
            `}
          >
            {type === 'success' && <BiCheckCircle className="text-xl" />}
            {type === 'error' && <BiError className="text-xl" />}
            {type === 'info' && <BiInfoCircle className="text-xl" />}
            <span className="font-medium text-sm md:text-base">{message}</span>
            <button 
              onClick={() => removeNotification(id)}
              aria-label="Close notification"
              className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <BiX className="text-lg" />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
