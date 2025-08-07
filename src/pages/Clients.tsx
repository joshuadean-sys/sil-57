import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Eye, Edit, MoreHorizontal, Phone, Mail } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Client {
  id: string
  name: string
  status: 'Active' | 'Inactive' | 'Pending'
  service: string
  supportWorker: string
  lastContact: string
  phone: string
  email: string
  ndisNumber: string
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    status: "Active",
    service: "SIL",
    supportWorker: "Mike Thompson",
    lastContact: "2024-01-15",
    phone: "(08) 9123-4567",
    email: "sarah.johnson@email.com",
    ndisNumber: "43012345678"
  },
  {
    id: "2", 
    name: "David Chen",
    status: "Active",
    service: "Community Support",
    supportWorker: "Lisa Anderson",
    lastContact: "2024-01-14",
    phone: "(08) 9234-5678",
    email: "david.chen@email.com",
    ndisNumber: "43012345679"
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    status: "Pending",
    service: "SIL",
    supportWorker: "James Wilson",
    lastContact: "2024-01-13",
    phone: "(08) 9345-6789",
    email: "maria.rodriguez@email.com",
    ndisNumber: "43012345680"
  },
  {
    id: "4",
    name: "Robert Taylor",
    status: "Active",
    service: "Respite Care",
    supportWorker: "Emma Davis",
    lastContact: "2024-01-12",
    phone: "(08) 9456-7890",
    email: "robert.taylor@email.com",
    ndisNumber: "43012345681"
  },
  {
    id: "5",
    name: "Jennifer Brown",
    status: "Inactive",
    service: "Community Support",
    supportWorker: "Alex Martinez",
    lastContact: "2024-01-10",
    phone: "(08) 9567-8901",
    email: "jennifer.brown@email.com",
    ndisNumber: "43012345682"
  }
]

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.supportWorker.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleViewClient = (clientId: string) => {
    navigate(`/client/${clientId}`)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Clients</h1>
          <p className="text-muted-foreground">Manage and view all client information</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Client
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Client Directory</CardTitle>
          <CardDescription>Search and filter through all clients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients by name, service, or support worker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Support Worker</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground">NDIS: {client.ndisNumber}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(client.status)}>
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{client.service}</TableCell>
                    <TableCell>{client.supportWorker}</TableCell>
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
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewClient(client.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Client
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            Contact Client
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredClients.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No clients found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{mockClients.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">
              {mockClients.filter(c => c.status === 'Active').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">
              {mockClients.filter(c => c.status === 'Pending').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">
              {mockClients.filter(c => c.status === 'Inactive').length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Clients