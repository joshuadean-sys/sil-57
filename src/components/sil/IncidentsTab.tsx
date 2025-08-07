import { useState } from "react"
import { Plus, AlertTriangle, Clock, MessageSquare, FileText, User, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/StatusBadge"

interface IncidentResponse {
  id: number
  userId: string
  userName: string
  userRole: string
  message: string
  timestamp: string
  attachments?: string[]
}

interface Incident {
  id: number
  title: string
  description: string
  severity: "low" | "medium" | "high" | "critical"
  status: "open" | "investigating" | "resolved" | "closed"
  category: string
  reportedBy: string
  reportedDate: string
  participant?: string
  staff?: string
  location: string
  responses: IncidentResponse[]
  dueDate?: string
  assignedTo?: string
}

const mockIncidents: Incident[] = [
  {
    id: 1,
    title: "Medication Administration Error",
    description: "Wrong dosage of medication given to participant during morning routine. Immediately contacted supervisor and participant's GP.",
    severity: "high",
    status: "investigating",
    category: "Medication Error",
    reportedBy: "Emma Thompson",
    reportedDate: "2024-01-08 09:30",
    participant: "Sarah Chen",
    staff: "Emma Thompson",
    location: "Subiaco House - Kitchen",
    dueDate: "2024-01-10",
    assignedTo: "Dr. Smith",
    responses: [
      {
        id: 1,
        userId: "user1",
        userName: "Dr. Smith",
        userRole: "Clinical Manager",
        message: "I've reviewed the incident report. We need to complete an immediate review of medication procedures. Please provide the medication chart and witness statements.",
        timestamp: "2024-01-08 10:15"
      },
      {
        id: 2,
        userId: "user2",
        userName: "Emma Thompson",
        userRole: "Senior Support Worker",
        message: "Medication chart attached. The participant is stable and GP has been informed. No adverse effects observed.",
        timestamp: "2024-01-08 10:45",
        attachments: ["medication-chart-jan8.pdf"]
      },
      {
        id: 3,
        userId: "user1",
        userName: "Dr. Smith",
        userRole: "Clinical Manager",
        message: "Thanks Emma. I'm scheduling additional medication training for all staff next week. Please ensure the participant is monitored closely for the next 24 hours.",
        timestamp: "2024-01-08 11:20"
      }
    ]
  },
  {
    id: 2,
    title: "Participant Fall in Bathroom",
    description: "Participant slipped on wet floor in bathroom and sustained minor bruising to left arm. First aid administered immediately.",
    severity: "medium",
    status: "resolved",
    category: "Injury",
    reportedBy: "James Wilson",
    reportedDate: "2024-01-07 14:20",
    participant: "Michael Rodriguez",
    staff: "James Wilson",
    location: "Subiaco House - Bathroom",
    assignedTo: "Nurse Johnson",
    responses: [
      {
        id: 4,
        userId: "user3",
        userName: "Nurse Johnson",
        userRole: "Registered Nurse",
        message: "Incident reviewed. Minor injury with appropriate first aid response. Adding non-slip mats to bathroom as preventive measure.",
        timestamp: "2024-01-07 15:00"
      },
      {
        id: 5,
        userId: "user4",
        userName: "Maintenance Team",
        userRole: "Maintenance",
        message: "Non-slip mats installed in all bathrooms. Additional safety rails added where needed.",
        timestamp: "2024-01-08 08:30"
      }
    ]
  },
  {
    id: 3,
    title: "Equipment Malfunction - Hoist Failure",
    description: "Ceiling hoist stopped working during participant transfer. Had to manually assist participant back to wheelchair. No injuries occurred.",
    severity: "high",
    status: "open",
    category: "Equipment",
    reportedBy: "Sarah Miller",
    reportedDate: "2024-01-06 16:45",
    participant: "David Park",
    staff: "Sarah Miller",
    location: "Subiaco House - Bedroom 2",
    dueDate: "2024-01-09",
    assignedTo: "Maintenance Team",
    responses: [
      {
        id: 6,
        userId: "user4",
        userName: "Maintenance Team",
        userRole: "Maintenance",
        message: "Hoist inspection scheduled for tomorrow morning. Alternative transfer equipment arranged as temporary measure.",
        timestamp: "2024-01-06 17:30"
      }
    ]
  }
]

export function IncidentsTab() {
  const [incidents, setIncidents] = useState(mockIncidents)
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [newResponse, setNewResponse] = useState("")

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-destructive text-destructive-foreground">Critical</Badge>
      case "high":
        return <Badge className="bg-warning text-warning-foreground">High</Badge>
      case "medium":
        return <Badge className="bg-info text-info-foreground">Medium</Badge>
      case "low":
        return <Badge className="bg-success text-success-foreground">Low</Badge>
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <StatusBadge status="pending">Open</StatusBadge>
      case "investigating":
        return <StatusBadge status="warning">Investigating</StatusBadge>
      case "resolved":
        return <StatusBadge status="active">Resolved</StatusBadge>
      case "closed":
        return <StatusBadge status="active">Closed</StatusBadge>
      default:
        return <StatusBadge status="pending">{status}</StatusBadge>
    }
  }

  const addResponse = () => {
    if (!selectedIncident || !newResponse.trim()) return

    const response: IncidentResponse = {
      id: Date.now(),
      userId: "current-user",
      userName: "Current User",
      userRole: "Support Worker",
      message: newResponse,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' ')
    }

    setIncidents(incidents.map(incident => 
      incident.id === selectedIncident.id 
        ? { ...incident, responses: [...incident.responses, response] }
        : incident
    ))

    setSelectedIncident({
      ...selectedIncident,
      responses: [...selectedIncident.responses, response]
    })

    setNewResponse("")
  }

  if (selectedIncident) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setSelectedIncident(null)}>
            ← Back to Incidents
          </Button>
          <div className="flex space-x-2">
            {getStatusBadge(selectedIncident.status)}
            {getSeverityBadge(selectedIncident.severity)}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>{selectedIncident.title}</span>
            </CardTitle>
            <CardDescription>
              Reported by {selectedIncident.reportedBy} on {selectedIncident.reportedDate}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Incident Details</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Category:</strong> {selectedIncident.category}</div>
                  <div><strong>Location:</strong> {selectedIncident.location}</div>
                  {selectedIncident.participant && (
                    <div><strong>Participant:</strong> {selectedIncident.participant}</div>
                  )}
                  {selectedIncident.staff && (
                    <div><strong>Staff Involved:</strong> {selectedIncident.staff}</div>
                  )}
                  {selectedIncident.dueDate && (
                    <div><strong>Due Date:</strong> {selectedIncident.dueDate}</div>
                  )}
                  {selectedIncident.assignedTo && (
                    <div><strong>Assigned To:</strong> {selectedIncident.assignedTo}</div>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedIncident.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Response Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {selectedIncident.responses.map((response, index) => (
                <div key={response.id} className="flex space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{response.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{response.userName}</span>
                      <Badge variant="outline" className="text-xs">{response.userRole}</Badge>
                      <span className="text-xs text-muted-foreground">{response.timestamp}</span>
                    </div>
                    <p className="text-sm">{response.message}</p>
                    {response.attachments && (
                      <div className="flex space-x-2">
                        {response.attachments.map((attachment, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            <FileText className="h-3 w-3 mr-1" />
                            {attachment}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium">Add Response</h4>
              <Textarea
                placeholder="Add your response or update..."
                value={newResponse}
                onChange={(e) => setNewResponse(e.target.value)}
                rows={3}
              />
              <Button onClick={addResponse} disabled={!newResponse.trim()}>
                Add Response
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Incident Management</span>
              </CardTitle>
              <CardDescription>Track and manage house incidents with response threads</CardDescription>
            </div>
            <Button 
              size="sm" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Report Incident
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {incidents.map((incident) => (
              <Card 
                key={incident.id} 
                className="cursor-pointer hover:bg-accent/50"
                onClick={() => setSelectedIncident(incident)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold">{incident.title}</h4>
                        <div className="flex space-x-2">
                          {getSeverityBadge(incident.severity)}
                          {getStatusBadge(incident.status)}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {incident.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>Reported by {incident.reportedBy}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{incident.reportedDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{incident.responses.length} responses</span>
                        </div>
                        {incident.dueDate && (
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>Due: {incident.dueDate}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div><strong>Category:</strong> {incident.category}</div>
                        <div><strong>Location:</strong> {incident.location}</div>
                        {incident.assignedTo && (
                          <div><strong>Assigned:</strong> {incident.assignedTo}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {incidents.length === 0 && (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No incidents reported for this house.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}