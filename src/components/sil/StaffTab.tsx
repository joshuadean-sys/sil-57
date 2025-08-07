import { useState } from "react"
import { Plus, Mail, Phone, Calendar, Star, UserCheck, UserX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/StatusBadge"

interface StaffMember {
  id: number
  name: string
  email: string
  phone: string
  role: string
  status: "active" | "inactive" | "on-leave"
  avatar: string
  employeeId: string
  startDate: string
  certifications: string[]
  availability: {
    [key: string]: string[]
  }
  shiftTypes: string[]
  rating: number
  totalShifts: number
  hoursThisMonth: number
}

const mockStaff: StaffMember[] = [
  {
    id: 1,
    name: "Emma Thompson",
    email: "emma.thompson@company.com",
    phone: "+61 400 123 456",
    role: "Senior Support Worker",
    status: "active",
    avatar: "/placeholder.svg",
    employeeId: "EMP001",
    startDate: "2023-01-15",
    certifications: ["First Aid", "CPR", "Medication Administration"],
    availability: {
      Monday: ["08:00-16:00", "16:00-00:00"],
      Tuesday: ["08:00-16:00"],
      Wednesday: ["08:00-16:00", "16:00-00:00"],
      Thursday: ["08:00-16:00"],
      Friday: ["08:00-16:00"]
    },
    shiftTypes: ["Standard", "Sleepover"],
    rating: 4.8,
    totalShifts: 245,
    hoursThisMonth: 152
  },
  {
    id: 2,
    name: "James Wilson",
    email: "james.wilson@company.com",
    phone: "+61 400 789 012",
    role: "Support Worker",
    status: "active",
    avatar: "/placeholder.svg",
    employeeId: "EMP002",
    startDate: "2023-03-20",
    certifications: ["First Aid", "CPR"],
    availability: {
      Monday: ["16:00-00:00"],
      Tuesday: ["16:00-00:00"],
      Wednesday: ["16:00-00:00"],
      Thursday: ["16:00-00:00"],
      Friday: ["16:00-00:00"],
      Saturday: ["08:00-16:00"],
      Sunday: ["08:00-16:00"]
    },
    shiftTypes: ["Standard", "Active Overnight"],
    rating: 4.6,
    totalShifts: 189,
    hoursThisMonth: 128
  },
  {
    id: 3,
    name: "Sarah Miller",
    email: "sarah.miller@company.com",
    phone: "+61 400 345 678",
    role: "Support Worker",
    status: "on-leave",
    avatar: "/placeholder.svg",
    employeeId: "EMP003",
    startDate: "2022-11-10",
    certifications: ["First Aid", "CPR", "Disability Care Certificate"],
    availability: {
      Friday: ["22:00-08:00"],
      Saturday: ["22:00-08:00"],
      Sunday: ["22:00-08:00"]
    },
    shiftTypes: ["Sleepover", "Active Overnight"],
    rating: 4.9,
    totalShifts: 312,
    hoursThisMonth: 0
  }
]

export function StaffTab() {
  const [staff, setStaff] = useState(mockStaff)
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <StatusBadge status="active">Active</StatusBadge>
      case "inactive":
        return <StatusBadge status="warning">Inactive</StatusBadge>
      case "on-leave":
        return <StatusBadge status="pending">On Leave</StatusBadge>
      default:
        return <StatusBadge status="pending">{status}</StatusBadge>
    }
  }

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-muted-foreground'
        }`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>House Staff</CardTitle>
              <CardDescription>Manage staff allocated to this house</CardDescription>
            </div>
            <Button 
              size="sm" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Allocate Staff
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4">
                {staff.map((member) => (
                  <Card key={member.id} className="cursor-pointer hover:bg-accent/50" onClick={() => setSelectedStaff(member)}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{member.name}</h4>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{member.email}</span>
                              <Phone className="h-3 w-3 text-muted-foreground ml-2" />
                              <span className="text-xs text-muted-foreground">{member.phone}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="flex items-center space-x-1">
                              {getRatingStars(member.rating)}
                              <span className="text-sm font-medium ml-1">{member.rating}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{member.hoursThisMonth}h this month</p>
                          </div>
                          <div className="flex flex-col space-y-2">
                            {getStatusBadge(member.status)}
                            <div className="flex space-x-1">
                              {member.shiftTypes.map((type) => (
                                <Badge key={type} variant="outline" className="text-xs">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="availability" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Monday</TableHead>
                    <TableHead>Tuesday</TableHead>
                    <TableHead>Wednesday</TableHead>
                    <TableHead>Thursday</TableHead>
                    <TableHead>Friday</TableHead>
                    <TableHead>Saturday</TableHead>
                    <TableHead>Sunday</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{member.name}</span>
                        </div>
                      </TableCell>
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <TableCell key={day}>
                          {member.availability[day] ? (
                            <div className="space-y-1">
                              {member.availability[day].map((time, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {time}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-xs">Not available</span>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Total Shifts</TableHead>
                    <TableHead>Hours This Month</TableHead>
                    <TableHead>Certifications</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-medium">{member.name}</span>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {getRatingStars(member.rating)}
                          <span className="text-sm font-medium ml-1">{member.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>{member.totalShifts}</TableCell>
                      <TableCell>{member.hoursThisMonth}h</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {member.certifications.map((cert) => (
                            <Badge key={cert} variant="outline" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}