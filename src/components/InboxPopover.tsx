import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Inbox, Bell, CheckCircle, Clock, User, AlertTriangle } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  timestamp: string
  isRead: boolean
  sender?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Incident Report",
    message: "Kitchen safety incident reported at Subiaco House",
    type: "warning", 
    timestamp: "2024-01-15 14:30",
    isRead: false,
    sender: "Mike Thompson"
  },
  {
    id: "2",
    title: "Shift Coverage Update",
    message: "Tomorrow's evening shift has been confirmed",
    type: "success",
    timestamp: "2024-01-15 12:15",
    isRead: false,
    sender: "Lisa Anderson"
  },
  {
    id: "3",
    title: "New Participant Admission",
    message: "Sarah Johnson has been admitted to Subiaco House",
    type: "info",
    timestamp: "2024-01-15 10:45",
    isRead: true,
    sender: "James Wilson"
  },
  {
    id: "4",
    title: "Document Review Required",
    message: "Care plan for David Chen requires your review",
    type: "info",
    timestamp: "2024-01-14 16:20",
    isRead: true,
    sender: "Emma Davis"
  },
  {
    id: "5",
    title: "Budget Alert",
    message: "Monthly budget threshold reached for Community Support",
    type: "warning",
    timestamp: "2024-01-14 09:30",
    isRead: true,
    sender: "System"
  },
  {
    id: "6",
    title: "Staff Training Completed",
    message: "Alex Martinez completed First Aid certification",
    type: "success",
    timestamp: "2024-01-13 15:45",
    isRead: true,
    sender: "HR Department"
  }
]

interface InboxPopoverProps {
  children: React.ReactNode
}

export function InboxPopover({ children }: InboxPopoverProps) {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadNotifications = notifications.filter(n => !n.isRead)
  const readNotifications = notifications.filter(n => n.isRead)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />
      case 'success':
        return <CheckCircle className="h-4 w-4 text-success" />
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      default:
        return <Bell className="h-4 w-4 text-info" />
    }
  }

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="start" side="right" sideOffset={8}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Inbox className="h-5 w-5" />
            <h3 className="font-semibold">Notifications</h3>
          </div>
          {unreadNotifications.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-xs"
            >
              Mark all read
            </Button>
          )}
        </div>

        <Tabs defaultValue="unread" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mx-4 mt-2">
            <TabsTrigger value="unread" className="relative">
              Unread
              {unreadNotifications.length > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                  {unreadNotifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>

          <TabsContent value="unread" className="mt-0">
            <ScrollArea className="h-96">
              {unreadNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No unread notifications</p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {unreadNotifications.map((notification, index) => (
                    <div key={notification.id}>
                      <div 
                        className="p-3 hover:bg-muted/50 cursor-pointer rounded-lg"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium truncate">
                                {notification.title}
                              </p>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {formatTime(notification.timestamp)}
                                </span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            {notification.sender && (
                              <div className="flex items-center mt-2">
                                <User className="h-3 w-3 text-muted-foreground mr-1" />
                                <span className="text-xs text-muted-foreground">
                                  {notification.sender}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {index < unreadNotifications.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            <ScrollArea className="h-96">
              <div className="space-y-1 p-2">
                {readNotifications.slice(0, 10).map((notification, index) => (
                  <div key={notification.id}>
                    <div className="p-3 rounded-lg opacity-75">
                      <div className="flex items-start space-x-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium truncate">
                              {notification.title}
                            </p>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {formatTime(notification.timestamp)}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          {notification.sender && (
                            <div className="flex items-center mt-2">
                              <User className="h-3 w-3 text-muted-foreground mr-1" />
                              <span className="text-xs text-muted-foreground">
                                {notification.sender}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {index < readNotifications.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}