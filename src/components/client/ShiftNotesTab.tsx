import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Plus, Calendar } from "lucide-react"

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

interface ShiftNotesTabProps {
  client: Client
}

export function ShiftNotesTab({ client }: ShiftNotesTabProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Shift Notes</CardTitle>
          <Button size="sm" className="bg-primary text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <div className="mx-auto mb-6 w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          
          <h3 className="text-lg font-medium mb-2">No Shift Notes Available</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Start documenting care activities, observations, and important notes for {client.name}'s shifts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Create First Note
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              View Schedule
            </Button>
          </div>
          
          <div className="mt-8 p-4 bg-muted/30 rounded-lg text-left max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Shift Notes Include</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Daily care activities performed</li>
              <li>• Client's mood and behavior observations</li>
              <li>• Medication administration records</li>
              <li>• Communication with family members</li>
              <li>• Any incidents or concerns</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}