import { useState } from "react"
import { Search, Filter, MessageSquare, FileText, Phone, ChevronDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Client {
  id: number
  name: string
  status: string
  phone: string
  email: string
  address: string
  funding: string
  level: number
}

interface NotesActivityTabProps {
  client: Client
}

interface ActivityItem {
  id: number
  date: string
  time: string
  type: "Care Plan" | "Budget" | "Other" | "Roster"
  requestBy: string
  assignedTo: string
  notes: string
  readMore?: boolean
}

export function NotesActivityTab({ client }: NotesActivityTabProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [requestFilter, setRequestFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")

  const activities: ActivityItem[] = [
    {
      id: 1,
      date: "12/05/2025",
      time: "12:00 AM",
      type: "Care Plan",
      requestBy: "Rosie Smith",
      assignedTo: "Joshua Dean",
      notes: "Care Plan due to be updated within 9 days."
    },
    {
      id: 2,
      date: "12/05/2025",
      time: "12:00 AM",
      type: "Care Plan",
      requestBy: "Rosie Smith",
      assignedTo: "Joshua Dean",
      notes: "Care Plan due to be updated within 9 days."
    },
    {
      id: 3,
      date: "12/05/2025",
      time: "12:00 AM",
      type: "Budget",
      requestBy: "Rosie Smith",
      assignedTo: "Joshua Dean",
      notes: ""
    },
    {
      id: 4,
      date: "12/05/2025",
      time: "12:00 AM",
      type: "Other",
      requestBy: "Rosie Smith",
      assignedTo: "Joshua Dean",
      notes: "Client requested you send the document"
    },
    {
      id: 5,
      date: "12/05/2025",
      time: "12:00 AM",
      type: "Other",
      requestBy: "Rosie Smith",
      assignedTo: "Joshua Dean",
      notes: "Give client a call"
    },
    {
      id: 6,
      date: "12/05/2025",
      time: "12:00 AM",
      type: "Other",
      requestBy: "Rosie Smith",
      assignedTo: "Joshua Dean",
      notes: "Care Plan due to be updated within 9 days."
    },
    {
      id: 7,
      date: "12/05/2025",
      time: "12:00 AM",
      type: "Roster",
      requestBy: "Rosie Smith",
      assignedTo: "Joshua Dean",
      notes: "Irenes roster to continue as usual"
    },
    {
      id: 8,
      date: "12/05/2025",
      time: "12:00 AM",
      type: "Care Plan",
      requestBy: "Rosie Smith",
      assignedTo: "Joshua Dean",
      notes: "Care Plan due to be updated within 9 days."
    },
    {
      id: 9,
      date: "12/05/2025",
      time: "12:00 AM",
      type: "Care Plan",
      requestBy: "Rosie Smith",
      assignedTo: "Joshua Dean",
      notes: "Care Plan due to be updated within 9 days. Make sure its done...",
      readMore: true
    }
  ]

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Care Plan":
        return <Badge className="bg-warning/10 text-warning border-warning/20">{type}</Badge>
      case "Budget":
        return <Badge className="bg-info/10 text-info border-info/20">{type}</Badge>
      case "Roster":
        return <Badge className="bg-success/10 text-success border-success/20">{type}</Badge>
      case "Other":
        return <Badge variant="outline">{type}</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.requestBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRequest = requestFilter === "All" || activity.type === requestFilter
    return matchesSearch && matchesRequest
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Notes & Activity</CardTitle>
          <Button className="bg-primary text-primary-foreground">
            Request Update
          </Button>
        </div>
        
        {/* Sub-navigation */}
        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="grid w-fit grid-cols-3">
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="calls" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Calls
            </TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-4">
            {/* Filters */}
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Request
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setRequestFilter("All")}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRequestFilter("Care Plan")}>Care Plan</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRequestFilter("Budget")}>Budget</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRequestFilter("Roster")}>Roster</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRequestFilter("Other")}>Other</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Status
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter("All")}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Open")}>Open</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Closed")}>Closed</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search keyword, date ect..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Activity List */}
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex-shrink-0 text-sm text-muted-foreground min-w-[100px]">
                <div>{activity.date}</div>
                <div>{activity.time}</div>
              </div>
              
              <div className="flex-shrink-0">
                {getTypeBadge(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-4 text-sm">
                  <span>
                    <span className="text-muted-foreground">Request by</span>{" "}
                    <span className="font-medium">{activity.requestBy}</span>
                  </span>
                  <span>
                    <span className="text-muted-foreground">Assigned to</span>{" "}
                    <span className="font-medium">{activity.assignedTo}</span>
                  </span>
                </div>
                {activity.notes && (
                  <div className="mt-2 text-sm">
                    <span className="text-muted-foreground">Notes:</span>{" "}
                    <span>{activity.notes}</span>
                    {activity.readMore && (
                      <Button variant="link" className="p-0 h-auto text-primary ml-2">
                        Read More
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}