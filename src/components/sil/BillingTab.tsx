import { Download, DollarSign, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const mockBillingData = [
  {
    id: 1,
    date: "2024-01-08",
    startTime: "08:00",
    endTime: "16:00",
    participants: 2,
    rateType: "Weekday TTP",
    ratePerHour: 65.50,
    totalHours: 8,
    costPerParticipant: 262.00,
    totalCost: 524.00
  },
  {
    id: 2,
    date: "2024-01-08",
    startTime: "16:00", 
    endTime: "00:00",
    participants: 2,
    rateType: "Evening Rate",
    ratePerHour: 78.60,
    totalHours: 8,
    costPerParticipant: 314.40,
    totalCost: 628.80
  },
  {
    id: 3,
    date: "2024-01-08",
    startTime: "22:00",
    endTime: "08:00",
    participants: 2,
    rateType: "Sleepover",
    ratePerHour: 150.00,
    totalHours: 10,
    costPerParticipant: 750.00,
    totalCost: 1500.00
  }
]

export function BillingTab() {
  const totalCost = mockBillingData.reduce((sum, item) => sum + item.totalCost, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>SIL Billing</CardTitle>
            <CardDescription>NDIS billing and cost breakdown for this house</CardDescription>
          </div>
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Period Cost</p>
                <p className="text-2xl font-semibold text-foreground">${totalCost.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time Period</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Rate Type</TableHead>
                <TableHead>Rate/Hour</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Cost per Participant</TableHead>
                <TableHead>Total Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBillingData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{item.date}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {item.startTime} - {item.endTime}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.participants}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.rateType}</Badge>
                  </TableCell>
                  <TableCell className="text-sm font-mono">
                    ${item.ratePerHour.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {item.totalHours}h
                  </TableCell>
                  <TableCell className="text-sm font-mono">
                    ${item.costPerParticipant.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-sm font-mono font-medium">
                    ${item.totalCost.toFixed(2)}
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