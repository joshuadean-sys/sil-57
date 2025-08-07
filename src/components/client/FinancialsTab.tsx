import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, Calculator } from "lucide-react"

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

interface FinancialsTabProps {
  client: Client
}

export function FinancialsTab({ client }: FinancialsTabProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Financials</CardTitle>
          <Button size="sm" className="bg-primary text-primary-foreground">
            <Calculator className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <div className="mx-auto mb-6 w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <DollarSign className="h-8 w-8 text-muted-foreground" />
          </div>
          
          <h3 className="text-lg font-medium mb-2">Financial Information</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Track billing, payments, and financial transactions for {client.name}'s care services.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-primary text-primary-foreground">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Billing History
            </Button>
            <Button variant="outline">
              <Calculator className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </div>
          
          <div className="mt-8 p-4 bg-muted/30 rounded-lg text-left max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Financial Overview</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Service billing and invoicing</li>
              <li>• Payment tracking and history</li>
              <li>• Funding allocation reports</li>
              <li>• Outstanding balances</li>
              <li>• Financial compliance records</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}