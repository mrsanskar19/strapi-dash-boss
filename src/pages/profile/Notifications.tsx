import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNotifications } from "@/contexts/NotificationContext";
import { cn } from "@/lib/utils";
import { Check, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const { notifications, markAsRead, deleteNotification, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  const handleNotificationClick = (id: number, link?: string) => {
    markAsRead(id);
    if (link) {
      navigate(link);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage your notifications.</CardDescription>
          </div>
          <Button onClick={markAllAsRead}>Mark all as read</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "p-4 rounded-lg flex items-center justify-between cursor-pointer",
                notification.read ? "bg-muted/50" : "bg-muted"
              )}
              onClick={() => handleNotificationClick(notification.id, notification.link)}
            >
              <div className="flex items-center space-x-4">
                <div className={cn("h-2 w-2 rounded-full", !notification.read && "bg-primary")} />
                <div>
                  <p className="font-semibold">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); markAsRead(notification.id); }}>
                  <Check className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id); }}>
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Notifications;
