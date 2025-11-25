import { BellIcon, CheckIcon, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNotifications } from "@/contexts/NotificationContext";

export function NotificationPanel() {
  const { notifications, markAsRead, deleteNotification, markAllAsRead } = useNotifications();
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (id: number, link?: string) => {
    markAsRead(id);
    if (link) {
      navigate(link);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <BellIcon className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white z-10">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 max-w-sm p-0">
        <Card className="shadow-none border-none">
          <CardHeader className="pt-4 pb-2">
            <CardTitle className="text-lg">Notifications</CardTitle>
            <CardDescription>
              {unreadCount > 0
                ? `You have ${unreadCount} unread message${unreadCount > 1 ? "s" : ""}`
                : "You're all caught up!"}
            </CardDescription>
          </CardHeader>
          <CardContent className="max-h-80 overflow-y-auto px-2">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                <span>No notifications</span>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "grid grid-cols-[20px_1fr_auto] items-center px-2 py-2 rounded-md group hover:bg-gray-100 transition-all",
                    !notification.read && "bg-sky-50"
                  )}
                  onClick={() => handleNotificationClick(notification.id, notification.link)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Notification: ${notification.title}`}
                >
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full mr-2",
                      !notification.read ? "bg-sky-500" : "bg-gray-300"
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{notification.title}</span>
                    <span className="text-xs text-gray-500">{notification.description}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-60 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                    aria-label="Delete notification"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </CardContent>
          {!!notifications.length && (
            <CardFooter className="pt-2">
              <Button className="w-full" onClick={markAllAsRead}>
                <CheckIcon className="mr-1 h-4 w-4" /> Mark all as read
              </Button>
            </CardFooter>
          )}
        </Card>
      </PopoverContent>
    </Popover>
  );
}
