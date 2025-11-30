import { useState, useRef, useEffect } from 'react';
import { Bell, Clock, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Sample notifications - replace with your actual data
  const recentNotifications = [
    {
      id: 1,
      title: 'New order received',
      time: '2 minutes ago',
      isRead: false,
    },
    {
      id: 2,
      title: 'Table 5 requested service',
      time: '15 minutes ago',
      isRead: false,
    },
    {
      id: 3,
      title: 'Low stock alert: Tomatoes',
      time: '1 hour ago',
      isRead: false,
    },
    {
      id: 4,
      title: 'Payment received for Order #1234',
      time: '2 hours ago',
      isRead: true,
    },
    {
      id: 5,
      title: 'New customer registered',
      time: '3 hours ago',
      isRead: true,
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSeeAll = () => {
    setIsOpen(false);
    navigate('/notifications');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5 text-foreground" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-secondary rounded transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {recentNotifications.length > 0 ? (
              <ul>
                {recentNotifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="px-4 py-3 hover:bg-secondary transition-colors cursor-pointer border-b border-border last:border-b-0"
                  >
                    <div className="flex items-start gap-3">
                      {/* Status Dot */}
                      <div className="mt-1">
                        {!notification.isRead && (
                          <div className="h-2 w-2 bg-blue-500 rounded-full" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${!notification.isRead ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                          {notification.title}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No notifications</p>
              </div>
            )}
          </div>

          {/* Footer - See All Button */}
          <div className="p-3 border-t border-border">
            <button
              onClick={handleSeeAll}
              className="w-full py-2 text-sm font-medium text-primary hover:bg-secondary rounded-lg transition-colors"
            >
              See All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;