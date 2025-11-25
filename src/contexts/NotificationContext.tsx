import { createContext, useContext, useState, ReactNode } from 'react';

export interface Notification {
  id: number;
  title: string;
  description: string;
  read: boolean;
  link?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  markAsRead: (id: number) => void;
  deleteNotification: (id: number) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

const initialNotifications: Notification[] = [
    {
      id: 1,
      title: "Your call has been confirmed.",
      description: "1 hour ago",
      read: false,
      link: "/profile"
    },
    {
      id: 2,
      title: "You have a new message!",
      description: "1 hour ago",
      read: false,
      link: "/profile/notifications" 
    },
    {
      id: 3,
      title: "Your subscription is expiring soon!",
      description: "2 hours ago",
      read: true,
      link: "/billing"
    },
];

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <NotificationContext.Provider value={{ notifications, markAsRead, deleteNotification, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};
