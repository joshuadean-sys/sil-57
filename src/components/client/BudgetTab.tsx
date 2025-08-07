import { useState } from "react"
import { Search, Plus, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

interface BudgetTabProps {
  client: Client
}

interface BudgetEntry {
  id: number
  dateOfCreation: string
  dateOfRenewal: string
  annualBudget: number
  remainingAnnualBudget: number
  status: "Current" | "Inactive"
}

export function BudgetTab({ client }: BudgetTabProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const fundingOverview = {
    budgetStatus: "Client is within budget",
    annualIncome: 62192.00,
    accountBalance: 13562.22,
    pendingTransactions: 1312.00,
    packageUtilisation: 67
  }

  const budgetEntries: BudgetEntry[] = [
    {
      id: 1,
      dateOfCreation: "12/01/2025",
      dateOfRenewal: "12/01/2026",
      annualBudget: 62000,
      remainingAnnualBudget: 43000,
      status: "Current"
    },
    {
      id: 2,
      dateOfCreation: "12/01/2025",
      dateOfRenewal: "-",
      annualBudget: 0,
      remainingAnnualBudget: 0,
      status: "Inactive"
    }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Current":
        return <Badge className="bg-success text-success-foreground">Current</Badge>
      case "Inactive":
        return <Badge variant="secondary">Inactive</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Funding Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Funding Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Budget Status */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-sm font-medium">{fundingOverview.budgetStatus}</span>
            </div>
            
            {/* Overview Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {formatCurrency(fundingOverview.annualIncome)}
                </div>
                <div className="text-sm text-muted-foreground">Annual Income</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {formatCurrency(fundingOverview.accountBalance)}
                </div>
                <div className="text-sm text-muted-foreground">Account Balance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {formatCurrency(fundingOverview.pendingTransactions)}
                </div>
                <div className="text-sm text-muted-foreground">Pending Transactions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {fundingOverview.packageUtilisation}%
                </div>
                <div className="text-sm text-muted-foreground">Package Utilisation</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget History */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
            <div>
              <CardTitle>Budget History</CardTitle>
              <CardDescription>Track budget allocations and renewals</CardDescription>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search budget"
                  className="pl-9 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button size="sm" className="bg-primary text-primary-foreground">
                Create New Budget
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date of Creation</TableHead>
                <TableHead>Date of Renewal</TableHead>
                <TableHead>Annual Budget</TableHead>
                <TableHead>Remaining Annual Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.dateOfCreation}</TableCell>
                  <TableCell>{entry.dateOfRenewal}</TableCell>
                  <TableCell>
                    {entry.annualBudget > 0 ? formatCurrency(entry.annualBudget) : "-"}
                  </TableCell>
                  <TableCell>
                    {entry.remainingAnnualBudget > 0 ? formatCurrency(entry.remainingAnnualBudget) : "-"}
                  </TableCell>
                  <TableCell>{getStatusBadge(entry.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {entry.status === "Current" && (
                        <Button variant="ghost" size="sm">
                          Duplicate
                        </Button>
                      )}
                    </div>
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