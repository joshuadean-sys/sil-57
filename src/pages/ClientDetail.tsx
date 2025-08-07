import { Search, MapPin, User, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DashboardTab } from "@/components/client/DashboardTab"
import { DetailsTab } from "@/components/client/DetailsTab"
import { ConnectionsTab } from "@/components/client/ConnectionsTab"
import { NotesActivityTab } from "@/components/client/NotesActivityTab"
import { DocumentsTab } from "@/components/client/DocumentsTab"
import { CarePlanTab } from "@/components/client/CarePlanTab"
import { BudgetTab } from "@/components/client/BudgetTab"
import { ShiftNotesTab } from "@/components/client/ShiftNotesTab"
import { FinancialsTab } from "@/components/client/FinancialsTab"
import { ShiftCautionsTab } from "@/components/client/ShiftCautionsTab"
import { IncidentsTab } from "@/components/client/IncidentsTab"

const clientData = {
  id: 301,
  name: "Caren Simpson",
  status: "active",
  phone: "0451 824 000",
  email: "caren.simpson@gmail.com",
  address: "58 High Avenue, Sorrento 6020, Western Australia",
  funding: "Home Care Package",
  level: 4,
  photo: "/placeholder.svg"
}

export default function ClientDetail() {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={clientData.photo} />
            <AvatarFallback className="text-lg">
              {clientData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-semibold text-foreground">{clientData.name}</h1>
              <Badge variant="secondary" className="bg-success text-success-foreground">
                {clientData.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Client ID: {clientData.id}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          <Button size="sm">
            Edit Details
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-9 w-64"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-11">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="notes-activity">Notes & Activity</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="care-plan">Care Plan</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="shift-notes">Shift Notes</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="shift-cautions">Shift Cautions</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <DashboardTab client={clientData} />
        </TabsContent>

        <TabsContent value="details">
          <DetailsTab client={clientData} />
        </TabsContent>

        <TabsContent value="connections">
          <ConnectionsTab client={clientData} />
        </TabsContent>

        <TabsContent value="notes-activity">
          <NotesActivityTab client={clientData} />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsTab client={clientData} />
        </TabsContent>

        <TabsContent value="care-plan">
          <CarePlanTab client={clientData} />
        </TabsContent>

        <TabsContent value="budget">
          <BudgetTab client={clientData} />
        </TabsContent>

        <TabsContent value="shift-notes">
          <ShiftNotesTab client={clientData} />
        </TabsContent>

        <TabsContent value="financials">
          <FinancialsTab client={clientData} />
        </TabsContent>

        <TabsContent value="shift-cautions">
          <ShiftCautionsTab client={clientData} />
        </TabsContent>

        <TabsContent value="incidents">
          <IncidentsTab client={clientData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}