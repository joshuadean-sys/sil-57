import { Edit } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

interface DetailsTabProps {
  client: Client
}

export function DetailsTab({ client }: DetailsTabProps) {
  const fundingDetails = {
    funding: "Home Care Package",
    classification: "Non-remote",
    paymentNumber: "302-391-42",
    level: 4,
    referralCode: "2-14310035311",
    pensionStatus: "Full",
    startDate: "10/02/2023",
    acn: "13910481",
    crn: "1603355542H"
  }

  const teamAllocation = {
    business: "My Companionship",
    careManager: "Nischal Shrestha",
    scheduler: "Dipshika Shrestha"
  }

  const accountInfo = {
    bank: "Commbank",
    bsb: "***-***",
    accountNumber: "***-***",
    itfStatusKnown: "Yes | $23.50 per day"
  }

  const clientNotes = "John Fletcher, a retired carpenter, spent decades crafting furniture and restoring historic homes in his coastal town. Widowed three years ago, he lives alone but stays connected with his two daughters who call regularly from interstate. John was diagnosed with early-stage Parkinson's two."

  const preferredStaff = ["Shannon Bigstone", "Michael Cena"]
  const doNotSendUsers = ["Tim Dean", "Alex Smith", "Orlando Hernandez", "Harry Drake"]

  return (
    <div className="space-y-6">
      {/* Top row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funding Details */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Funding Details</CardTitle>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <label className="text-muted-foreground">Funding</label>
                <p className="font-medium">{fundingDetails.funding}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Classification</label>
                <p className="font-medium">{fundingDetails.classification}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Payment Number</label>
                <p className="font-medium">{fundingDetails.paymentNumber}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Level</label>
                <p className="font-medium">{fundingDetails.level}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Referral Code</label>
                <p className="font-medium">{fundingDetails.referralCode}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Pension Status</label>
                <p className="font-medium">{fundingDetails.pensionStatus}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Start Date</label>
                <p className="font-medium">{fundingDetails.startDate}</p>
              </div>
              <div>
                <label className="text-muted-foreground">ACN</label>
                <p className="font-medium">{fundingDetails.acn}</p>
              </div>
              <div>
                <label className="text-muted-foreground">CRN</label>
                <p className="font-medium">{fundingDetails.crn}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Allocation */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Team Allocation</CardTitle>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <label className="text-muted-foreground">Business</label>
                <p className="font-medium">{teamAllocation.business}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Care Manager</label>
                <p className="font-medium">{teamAllocation.careManager}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Scheduler</label>
                <p className="font-medium">{teamAllocation.scheduler}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Information */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Account Information
              <span className="text-xs text-muted-foreground">🔒</span>
            </CardTitle>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <label className="text-muted-foreground">Bank</label>
                <p className="font-medium">{accountInfo.bank}</p>
              </div>
              <div>
                <label className="text-muted-foreground">BSB</label>
                <p className="font-medium">{accountInfo.bsb}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Account Number</label>
                <p className="font-medium">{accountInfo.accountNumber}</p>
              </div>
              <div>
                <label className="text-muted-foreground">ITF Status Known</label>
                <p className="font-medium">{accountInfo.itfStatusKnown}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Notes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Client Notes</CardTitle>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{clientNotes}</p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gender Requirements */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Gender Requirements
              <span className="text-xs text-muted-foreground">ℹ️</span>
            </CardTitle>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm">No requirements</p>
            <p className="text-xs text-muted-foreground mt-2">
              These requirements will take priority on AI Assist
            </p>
          </CardContent>
        </Card>

        {/* Preferred Staff to Send */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Preferred Staff to Send</CardTitle>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {preferredStaff.map((staff, index) => (
                <Badge key={index} variant="secondary" className="bg-success/10 text-success border-success/20">
                  {staff}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Do Not Send Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Do Not Send Users
              <span className="text-xs text-muted-foreground">ℹ️</span>
            </CardTitle>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {doNotSendUsers.map((staff, index) => (
                <Badge key={index} variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">
                  {staff}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              These won't be able to be allocated to this clients schedule
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}