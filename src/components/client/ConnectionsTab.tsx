import { Edit, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

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

interface ConnectionsTabProps {
  client: Client
}

export function ConnectionsTab({ client }: ConnectionsTabProps) {
  const navigate = useNavigate()
  
  const secondaryContact = {
    fullName: "Paula Birkett",
    relationship: "Daughter",
    phone: "0451 824 522",
    email: "Paula.birkett@gmail.com",
    address: "1 Myrtle Avenue Sorrento 6020, Perth, Western Australia"
  }

  const additionalContact = {
    fullName: "Tim Cook",
    relationship: "Father",
    phone: "0400 000 000",
    email: "timcook@gmail.com",
    address: "12 Atkinson Road, Subiaco 6008 WA"
  }

  const gpDetails = {
    name: "Dr Michelle",
    clinicName: "Michelle's Clinic",
    email: "admin@michellesclinic.com.au",
    phone: "1800 950 838",
    address: "1 Myrtle Avenue Sorrento 6020, Perth, Western Australia"
  }

  const specialistDetails = {
    name: "Caren Simpson",
    clinicName: "Whitfods City GP",
    email: "admin@whitfordscitygp.com.au",
    phone: "1800 950 838",
    specialty: "Orthopaedic",
    address: "1 Myrtle Avenue Sorrento 6020, Perth, Western Australia"
  }

  const rosterSending = {
    primary: "timbradford@gmail.com",
    secondary: "alexhormoni@bigpond.com.au",
    additional: "thesmiths@outlook.com"
  }

  return (
    <div className="space-y-6">
      {/* HCP Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            HCP Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                This client is on a Home Care Package (Level {client.level}). 
                View all HCP clients or manage this client's care plan.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Funding: {client.funding}</span>
                <span>•</span>
                <span>Level: {client.level}</span>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/clients/hcp')}
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              View All HCP Clients
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Secondary Contact */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Secondary Contact</CardTitle>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Full Name</label>
                <p className="font-medium">{secondaryContact.fullName}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Relationship</label>
                <p className="font-medium">{secondaryContact.relationship}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Phone Number</label>
                <p className="font-medium">{secondaryContact.phone}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Email</label>
                <p className="font-medium">{secondaryContact.email}</p>
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Address</label>
              <p className="font-medium">{secondaryContact.address}</p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Contact */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Additional Contact</CardTitle>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
              Save
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Full Name</label>
                <p className="font-medium">{additionalContact.fullName}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Relationship</label>
                <p className="font-medium">{additionalContact.relationship}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Phone Number</label>
                <p className="font-medium">{additionalContact.phone}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Email</label>
                <p className="font-medium">{additionalContact.email}</p>
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Address</label>
              <p className="font-medium">{additionalContact.address}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medical Contacts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GP Details */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>GP Details</CardTitle>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Dr's Name</label>
                <p className="font-medium">{gpDetails.name}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Clinic Name</label>
                <p className="font-medium">{gpDetails.clinicName}</p>
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Email</label>
              <p className="font-medium">{gpDetails.email}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Phone Number</label>
                <p className="font-medium">{gpDetails.phone}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Address</label>
                <p className="font-medium">{gpDetails.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Send Roster To */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Send Roster To</CardTitle>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Primary</label>
              <p className="font-medium">{rosterSending.primary}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Secondary</label>
              <p className="font-medium">{rosterSending.secondary}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Additional</label>
              <p className="font-medium">{rosterSending.additional}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Specialist Details */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Specialist Details</CardTitle>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">Specialist Name</label>
              <p className="font-medium">{specialistDetails.name}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Clinic Name</label>
              <p className="font-medium">{specialistDetails.clinicName}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Email</label>
              <p className="font-medium">{specialistDetails.email}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Phone Number</label>
              <p className="font-medium">{specialistDetails.phone}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Speciality</label>
              <p className="font-medium">{specialistDetails.specialty}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Address</label>
              <p className="font-medium">{specialistDetails.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}