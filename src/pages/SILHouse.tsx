import { Search, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewTab } from "@/components/sil/OverviewTab"
import { ParticipantsTab } from "@/components/sil/ParticipantsTab"
import { RosterTab } from "@/components/sil/RosterTab"
import { StaffTab } from "@/components/sil/StaffTab"
import { ShiftNotesTab } from "@/components/sil/ShiftNotesTab"
import { ShiftCautionsTab } from "@/components/sil/ShiftCautionsTab"
import { IncidentsTab } from "@/components/sil/IncidentsTab"
import { BillingTab } from "@/components/sil/BillingTab"
import { DocumentsTab } from "@/components/sil/DocumentsTab"

const houseData = {
  name: "Subiaco House",
  address: "12 Atkinson Road, Subiaco 6008 WA"
}

export default function SILHouse() {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">SIL / {houseData.name}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{houseData.address}</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search..."
            className="pl-9 w-64"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="roster">Roster</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="shift-notes">Shift Notes</TabsTrigger>
          <TabsTrigger value="cautions">Shift Cautions</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="participants">
          <ParticipantsTab />
        </TabsContent>

        <TabsContent value="roster">
          <RosterTab />
        </TabsContent>

        <TabsContent value="staff">
          <StaffTab />
        </TabsContent>

        <TabsContent value="shift-notes">
          <ShiftNotesTab />
        </TabsContent>

        <TabsContent value="cautions">
          <ShiftCautionsTab />
        </TabsContent>

        <TabsContent value="incidents">
          <IncidentsTab />
        </TabsContent>

        <TabsContent value="billing">
          <BillingTab />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}