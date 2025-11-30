import { useState } from 'react';
import { Bell, Clock, Filter, CheckCheck, Trash2 } from 'lucide-react';

const Notifications = () => {
  const [filter, setFilter] = useState('all'); // all, read, unread

  // Sample notifications - replace with your actual data
  const [allNotifications, setAllNotifications] = useState([
    {
      id: 1,
      title: 'New order received',
      description: 'Order #1256 has been placed by John Doe',
      time: '2 minutes ago',
      isRead: false,
      category: 'order',
    },
    {
      id: 2,
      title: 'Table 5 requested service',
      description: 'Customer needs assistance at Table 5',
      time: '15 minutes ago',
      isRead: false,
      category: 'service',
    },
    {
      id: 3,
      title: 'Low stock alert: Tomatoes',
      description: 'Only 5 kg remaining in inventory',
      time: '1 hour ago',
      isRead: false,
      category: 'inventory',
    },
    {
      id: 4,
      title: 'Payment received for Order #1234',
      description: '₹450 received via UPI',
      time: '2 hours ago',
      isRead: true,
      category: 'payment',
    },
    {
      id: 5,
      title: 'New customer registered',
      description: 'Sarah Williams joined as a new customer',
      time: '3 hours ago',
      isRead: true,
      category: 'customer',
    },
    {
      id: 6,
      title: 'Staff shift ended',
      description: 'Rajesh Kumar has clocked out',
      time: '4 hours ago',
      isRead: true,
      category: 'staff',
    },
    {
      id: 7,
      title: 'Daily sales report ready',
      description: 'View your sales performance for today',
      time: '5 hours ago',
      isRead: true,
      category: 'report',
    },
  ]);

  const filteredNotifications = allNotifications.filter((notif) => {
    if (filter === 'read') return notif.isRead;
    if (filter === 'unread') return !notif.isRead;
    return true;
  });

  const unreadCount = allNotifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = () => {
    setAllNotifications(prevNotifications =>
      prevNotifications.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const handleDeleteAll = () => {
    setAllNotifications([]);
  };

  const handleMarkAsRead = (id) => {
    setAllNotifications(prevNotifications =>
      prevNotifications.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleDelete = (id) => {
    setAllNotifications(prevNotifications =>
      prevNotifications.filter(notif => notif.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Bell className="h-8 w-8" />
                Notifications
              </h1>
              <p className="text-muted-foreground mt-1">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleMarkAllRead}
                disabled={unreadCount === 0}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  unreadCount === 0
                    ? 'text-muted-foreground bg-secondary/50 cursor-not-allowed opacity-50'
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                <CheckCheck className="h-4 w-4" />
                Mark all read
              </button>
              <button
                onClick={handleDeleteAll}
                disabled={allNotifications.length === 0}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  allNotifications.length === 0
                    ? 'text-muted-foreground bg-secondary/50 cursor-not-allowed opacity-50'
                    : 'text-destructive hover:bg-destructive/10'
                }`}
              >
                <Trash2 className="h-4 w-4" />
                Clear all
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  filter === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  filter === 'unread'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                Unread
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  filter === 'read'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                Read
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${
                  !notification.isRead ? 'border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Status Indicator */}
                  <div className="mt-1">
                    {!notification.isRead && (
                      <div className="h-3 w-3 bg-blue-500 rounded-full" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-base font-semibold ${
                        !notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {notification.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.description}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {!notification.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <CheckCheck className="h-4 w-4 text-muted-foreground" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <Bell className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No notifications
              </h3>
              <p className="text-muted-foreground">
                {filter === 'unread' && 'You have no unread notifications'}
                {filter === 'read' && 'You have no read notifications'}
                {filter === 'all' && 'You have no notifications'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;