import { useState } from "react"
import { Plus, Search, Edit, Eye, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/StatusBadge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AddParticipantModal } from "./AddParticipantModal"

interface Participant {
  id: number
  name: string
  age: number
  photo?: string
  fundingType: "Core" | "Capacity Building" | "Capital"
  ndisNumber: string
  room?: string
  primaryWorker: string
  status: "active" | "pending" | "inactive"
  joinDate: string
  supportLevel: "High" | "Medium" | "Low"
  allergies?: string[]
  emergencyContact: string
  emergencyPhone: string
}

const mockParticipants: Participant[] = [
  {
    id: 1,
    name: "Sarah Chen",
    age: 28,
    fundingType: "Core",
    ndisNumber: "4300123456",
    room: "Room 1A",
    primaryWorker: "Emma Thompson",
    status: "active",
    joinDate: "2023-01-15",
    supportLevel: "High",
    allergies: ["Nuts", "Dairy"],
    emergencyContact: "Linda Chen (Mother)",
    emergencyPhone: "+61 400 555 001"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    age: 34,
    fundingType: "Capacity Building",
    ndisNumber: "4300123457",
    room: "Room 1B",
    primaryWorker: "James Wilson",
    status: "active",
    joinDate: "2023-03-22",
    supportLevel: "Medium",
    emergencyContact: "Maria Rodriguez (Sister)",
    emergencyPhone: "+61 400 555 002"
  },
  {
    id: 3,
    name: "Lisa Kim",
    age: 26,
    fundingType: "Core",
    ndisNumber: "4300123458",
    room: "Room 2A",
    primaryWorker: "Emma Thompson",
    status: "active",
    joinDate: "2023-05-10",
    supportLevel: "Medium",
    allergies: ["Shellfish"],
    emergencyContact: "John Kim (Father)",
    emergencyPhone: "+61 400 555 003"
  },
  {
    id: 4,
    name: "David Park",
    age: 31,
    fundingType: "Capital",
    ndisNumber: "4300123459",
    room: "Room 2B",
    primaryWorker: "Alex Foster",
    status: "active",
    joinDate: "2023-07-18",
    supportLevel: "Low",
    emergencyContact: "Susan Park (Wife)",
    emergencyPhone: "+61 400 555 004"
  },
  {
    id: 5,
    name: "Amanda Clarke",
    age: 29,
    fundingType: "Core",
    ndisNumber: "4300123460",
    room: "Room 3A",
    primaryWorker: "Sarah Miller",
    status: "pending",
    joinDate: "2024-01-05",
    supportLevel: "High",
    emergencyContact: "Robert Clarke (Brother)",
    emergencyPhone: "+61 400 555 005"
  }
]

export function ParticipantsTab() {
  const [participants, setParticipants] = useState(mockParticipants)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const filteredParticipants = participants.filter(participant =>
    participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.ndisNumber.includes(searchTerm) ||
    (participant.room && participant.room.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const getSupportLevelBadge = (level: string) => {
    switch (level) {
      case "High":
        return <Badge variant="destructive">{level}</Badge>
      case "Medium":
        return <Badge variant="secondary">{level}</Badge>
      case "Low":
        return <Badge variant="outline">{level}</Badge>
      default:
        return <Badge variant="outline">{level}</Badge>
    }
  }

  const getFundingTypeBadge = (type: string) => {
    switch (type) {
      case "Core":
        return <Badge className="bg-info text-info-foreground">Core</Badge>
      case "Capacity Building":
        return <Badge className="bg-warning text-warning-foreground">Capacity</Badge>
      case "Capital":
        return <Badge className="bg-success text-success-foreground">Capital</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
            <div>
              <CardTitle>House Participants</CardTitle>
              <CardDescription>Manage residents and their details</CardDescription>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, NDIS number, or room..."
                  className="pl-9 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                size="sm" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
                onClick={() => setIsAddModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Participant
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Participant</TableHead>
                <TableHead>NDIS Number</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Funding Type</TableHead>
                <TableHead>Support Level</TableHead>
                <TableHead>Primary Worker</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredParticipants.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={participant.photo} />
                        <AvatarFallback className="text-xs">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{participant.name}</div>
                        <div className="text-xs text-muted-foreground">Age {participant.age}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-mono">{participant.ndisNumber}</TableCell>
                  <TableCell className="text-sm">{participant.room || "Unassigned"}</TableCell>
                  <TableCell>{getFundingTypeBadge(participant.fundingType)}</TableCell>
                  <TableCell>{getSupportLevelBadge(participant.supportLevel)}</TableCell>
                  <TableCell className="text-sm">{participant.primaryWorker}</TableCell>
                  <TableCell>
                    <StatusBadge status={participant.status}>
                      {participant.status === "active" ? "Active" : 
                       participant.status === "pending" ? "Pending" : "Inactive"}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Participant
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          View Support Plan
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Change Room
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Remove from House
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredParticipants.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No participants found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <AddParticipantModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(participant) => {
          // In real app, save to backend
          console.log("Adding participant:", participant)
          setIsAddModalOpen(false)
        }}
      />
    </div>
  )
}