import React, { createContext, useState, useEffect } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('smartWorkerNotifications');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('smartWorkerNotifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (userId, title, description, iconType = 'system') => {
    if (!userId) return; // Need a recipient
    const newNotification = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      userId,
      title,
      description,
      iconType,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = (userId) => {
    setNotifications(prev => prev.map(n => n.userId === userId ? { ...n, isRead: true } : n));
  };

  const clearNotifications = (userId) => {
    setNotifications(prev => prev.filter(n => n.userId !== userId));
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
