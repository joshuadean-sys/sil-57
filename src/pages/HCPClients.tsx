import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Eye, Edit, MoreHorizontal, Phone, Mail, User, Calendar, ArrowLeft } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface HCPClient {
  id: string
  name: string
  status: 'Active' | 'Inactive' | 'Pending'
  level: number
  careManager: string
  lastContact: string
  phone: string
  email: string
  address: string
  funding: string
  startDate: string
  crn: string
}

const mockHCPClients: HCPClient[] = [
  {
    id: "1",
    name: "Caren Simpson",
    status: "Active",
    level: 4,
    careManager: "Nischal Shrestha",
    lastContact: "2024-01-15",
    phone: "0451 824 000",
    email: "caren.simpson@gmail.com",
    address: "58 High Avenue, Sorrento 6020, Western Australia",
    funding: "Home Care Package",
    startDate: "10/02/2023",
    crn: "1603355542H"
  },
  {
    id: "2", 
    name: "John Fletcher",
    status: "Active",
    level: 3,
    careManager: "Dipshika Shrestha",
    lastContact: "2024-01-14",
    phone: "(08) 9234-5678",
    email: "john.fletcher@email.com",
    address: "12 Beach Road, Scarborough 6019, Western Australia",
    funding: "Home Care Package",
    startDate: "15/03/2023",
    crn: "1603355543H"
  },
  {
    id: "3",
    name: "Margaret Wilson",
    status: "Pending",
    level: 2,
    careManager: "James Wilson",
    lastContact: "2024-01-13",
    phone: "(08) 9345-6789",
    email: "margaret.wilson@email.com",
    address: "45 Sunset Drive, Hillarys 6025, Western Australia",
    funding: "Home Care Package",
    startDate: "01/04/2023",
    crn: "1603355544H"
  },
  {
    id: "4",
    name: "Robert Taylor",
    status: "Active",
    level: 4,
    careManager: "Emma Davis",
    lastContact: "2024-01-12",
    phone: "(08) 9456-7890",
    email: "robert.taylor@email.com",
    address: "78 Ocean View, Trigg 6029, Western Australia",
    funding: "Home Care Package",
    startDate: "20/01/2023",
    crn: "1603355545H"
  },
  {
    id: "5",
    name: "Jennifer Brown",
    status: "Inactive",
    level: 1,
    careManager: "Alex Martinez",
    lastContact: "2024-01-10",
    phone: "(08) 9567-8901",
    email: "jennifer.brown@email.com",
    address: "23 Park Street, Joondalup 6027, Western Australia",
    funding: "Home Care Package",
    startDate: "05/05/2023",
    crn: "1603355546H"
  }
]

const HCPClients = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const filteredClients = mockHCPClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.careManager.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default'
      case 'Pending':
        return 'secondary'
      case 'Inactive':
        return 'outline'
      default:
        return 'default'
    }
  }

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-blue-100 text-blue-800'
      case 2:
        return 'bg-green-100 text-green-800'
      case 3:
        return 'bg-yellow-100 text-yellow-800'
      case 4:
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleViewClient = (clientId: string) => {
    navigate(`/client/${clientId}`)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/clients')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Clients
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">HCP Clients</h1>
            <p className="text-muted-foreground">Manage Home Care Package clients and their care plans</p>
          </div>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New HCP Client
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="outline" className="px-3 py-1">
          {filteredClients.length} clients
        </Badge>
      </div>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>HCP Client List</CardTitle>
          <CardDescription>
            All Home Care Package clients with their current status and care details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Care Manager</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-muted-foreground">CRN: {client.crn}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(client.status)}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getLevelColor(client.level)}>
                      Level {client.level}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.careManager}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Phone className="mr-1 h-3 w-3" />
                        {client.phone}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="mr-1 h-3 w-3" />
                        {client.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{client.lastContact}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewClient(client.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewClient(client.id)}>
                            <User className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Client
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule Care
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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

export default HCPClients
