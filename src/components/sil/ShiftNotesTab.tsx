import { Plus, FileText, User, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const mockNotes = [
  {
    id: 1,
    timestamp: "2024-01-08 14:30",
    staff: "Emma Thompson",
    participants: ["Sarah Chen", "Lisa Kim"],
    type: "Shift Note",
    content: "Both participants attended community outing. Sarah showed improved social interaction.",
    isAdminOnly: false
  },
  {
    id: 2,
    timestamp: "2024-01-08 10:15",
    staff: "James Wilson",
    participants: ["Michael Rodriguez"],
    type: "Progress Note",
    content: "Michael demonstrated increased independence in meal preparation today.",
    isAdminOnly: false
  },
  {
    id: 3,
    timestamp: "2024-01-07 22:45",
    staff: "Sarah Miller",
    participants: ["All Participants"],
    type: "Admin Note",
    content: "House inspection completed. Minor maintenance issues identified for follow-up.",
    isAdminOnly: true
  }
]

export function ShiftNotesTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Progress Notes</CardTitle>
            <CardDescription>Shift notes and participant progress records</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Export Notes
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground rounded-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Staff Member</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Note Content</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockNotes.map((note) => (
                <TableRow key={note.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{note.timestamp}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{note.staff}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {note.participants.join(", ")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge variant={note.isAdminOnly ? "destructive" : "secondary"}>
                        {note.type}
                      </Badge>
                      {note.isAdminOnly && (
                        <Badge variant="outline" className="text-xs">Admin Only</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-md">
                      <p className="text-sm text-foreground">{note.content}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}