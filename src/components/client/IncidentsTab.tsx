import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Plus, FileText } from "lucide-react"

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

interface IncidentsTabProps {
  client: Client
}

export function IncidentsTab({ client }: IncidentsTabProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Incidents</CardTitle>
          <Button size="sm" className="bg-destructive text-destructive-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Report Incident
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <div className="mx-auto mb-6 w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-muted-foreground" />
          </div>
          
          <h3 className="text-lg font-medium mb-2">No Incidents Reported</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Track and document any incidents, accidents, or unusual events related to {client.name}'s care.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-destructive text-destructive-foreground">
              <AlertCircle className="h-4 w-4 mr-2" />
              Report New Incident
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Incident Guidelines
            </Button>
          </div>
          
          <div className="mt-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-left max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium">When to Report</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Falls, injuries, or medical emergencies</li>
              <li>• Medication errors or reactions</li>
              <li>• Behavioral incidents or aggression</li>
              <li>• Property damage or safety hazards</li>
              <li>• Any unusual or concerning events</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}