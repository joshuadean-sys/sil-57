import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Plus, Shield } from "lucide-react"

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

interface ShiftCautionsTabProps {
  client: Client
}

export function ShiftCautionsTab({ client }: ShiftCautionsTabProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Shift Cautions</CardTitle>
          <Button size="sm" className="bg-warning text-warning-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Add Caution
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <div className="mx-auto mb-6 w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-muted-foreground" />
          </div>
          
          <h3 className="text-lg font-medium mb-2">No Active Cautions</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Document important safety considerations, behavioral notes, and special requirements for {client.name}'s care.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-warning text-warning-foreground">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Create Caution
            </Button>
            <Button variant="outline">
              <Shield className="h-4 w-4 mr-2" />
              Safety Guidelines
            </Button>
          </div>
          
          <div className="mt-8 p-4 bg-warning/10 border border-warning/20 rounded-lg text-left max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">Types of Cautions</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Medical conditions requiring attention</li>
              <li>• Behavioral considerations</li>
              <li>• Environmental safety concerns</li>
              <li>• Communication preferences</li>
              <li>• Emergency procedures</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}