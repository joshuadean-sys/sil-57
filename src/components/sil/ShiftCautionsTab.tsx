import { useState } from "react"
import { AlertTriangle, Brain, Filter, Eye, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CautionAnalysis {
  id: number
  shiftId: string
  date: string
  staff: string
  participant: string
  riskScore: number
  concerns: string[]
  keywords: string[]
  originalNote: string
  aiSummary: string
  status: "pending" | "reviewed" | "escalated"
  reviewedBy?: string
  reviewDate?: string
}

const mockCautions: CautionAnalysis[] = [
  {
    id: 1,
    shiftId: "SH001",
    date: "2024-01-08",
    staff: "Emma Thompson",
    participant: "Sarah Chen",
    riskScore: 8,
    concerns: ["Medication non-compliance", "Behavioral escalation", "Safety risk"],
    keywords: ["refused medication", "aggressive", "safety concern"],
    originalNote: "Participant refused morning medication and became aggressive when reminded. Had to remove sharp objects from room for safety. Contacted supervisor.",
    aiSummary: "High-risk incident involving medication refusal and aggressive behavior requiring safety interventions.",
    status: "pending"
  },
  {
    id: 2,
    shiftId: "SH002",
    date: "2024-01-07",
    staff: "James Wilson",
    participant: "Michael Rodriguez",
    riskScore: 6,
    concerns: ["Equipment malfunction", "Service disruption"],
    keywords: ["broken", "repair needed", "not working"],
    originalNote: "Wheelchair broke during outing. Had to arrange emergency repair. Participant unable to attend planned activities.",
    aiSummary: "Equipment failure impacting participant mobility and planned activities.",
    status: "reviewed",
    reviewedBy: "Dr. Smith",
    reviewDate: "2024-01-08"
  },
  {
    id: 3,
    shiftId: "SH003",
    date: "2024-01-07",
    staff: "Sarah Miller",
    participant: "David Park",
    riskScore: 9,
    concerns: ["Medical emergency", "Hospital transport", "Critical incident"],
    keywords: ["emergency", "hospital", "ambulance", "breathing"],
    originalNote: "Participant experienced severe breathing difficulties at 2:30 AM. Called ambulance immediately. Transported to Royal Perth Hospital emergency department.",
    aiSummary: "Critical medical emergency requiring immediate hospital transport.",
    status: "escalated",
    reviewedBy: "Dr. Smith",
    reviewDate: "2024-01-07"
  },
  {
    id: 4,
    shiftId: "SH004",
    date: "2024-01-06",
    staff: "Alex Foster",
    participant: "Lisa Kim",
    riskScore: 4,
    concerns: ["Minor incident", "Documentation required"],
    keywords: ["fall", "minor injury", "first aid"],
    originalNote: "Participant had minor slip in bathroom. Applied first aid to small cut on hand. No medical attention required.",
    aiSummary: "Minor incident with appropriate first aid response.",
    status: "reviewed",
    reviewedBy: "Nurse Johnson",
    reviewDate: "2024-01-07"
  }
]

export function ShiftCautionsTab() {
  const [cautions, setCautions] = useState(mockCautions)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterRiskLevel, setFilterRiskLevel] = useState<string>("all")

  const filteredCautions = cautions.filter(caution => {
    const statusMatch = filterStatus === "all" || caution.status === filterStatus
    const riskMatch = filterRiskLevel === "all" || 
      (filterRiskLevel === "high" && caution.riskScore >= 7) ||
      (filterRiskLevel === "medium" && caution.riskScore >= 4 && caution.riskScore < 7) ||
      (filterRiskLevel === "low" && caution.riskScore < 4)
    return statusMatch && riskMatch
  })

  const getRiskBadge = (score: number) => {
    if (score >= 7) {
      return <Badge className="bg-destructive text-destructive-foreground">High Risk ({score}/10)</Badge>
    } else if (score >= 4) {
      return <Badge className="bg-warning text-warning-foreground">Medium Risk ({score}/10)</Badge>
    } else {
      return <Badge className="bg-success text-success-foreground">Low Risk ({score}/10)</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending Review</Badge>
      case "reviewed":
        return <Badge className="bg-info text-info-foreground">Reviewed</Badge>
      case "escalated":
        return <Badge className="bg-destructive text-destructive-foreground">Escalated</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRiskColor = (score: number) => {
    if (score >= 7) return "text-destructive"
    if (score >= 4) return "text-warning"
    return "text-success"
  }

  const stats = {
    totalCautions: cautions.length,
    highRisk: cautions.filter(c => c.riskScore >= 7).length,
    pendingReview: cautions.filter(c => c.status === "pending").length,
    avgRiskScore: cautions.reduce((sum, c) => sum + c.riskScore, 0) / cautions.length
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Total Cautions</p>
                <p className="text-2xl font-bold">{stats.totalCautions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-sm font-medium">High Risk</p>
                <p className="text-2xl font-bold text-destructive">{stats.highRisk}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-warning" />
              <div>
                <p className="text-sm font-medium">Pending Review</p>
                <p className="text-2xl font-bold text-warning">{stats.pendingReview}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-info" />
              <div>
                <p className="text-sm font-medium">Avg Risk Score</p>
                <p className="text-2xl font-bold">{stats.avgRiskScore.toFixed(1)}/10</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>AI Shift Cautions</span>
              </CardTitle>
              <CardDescription>
                AI analysis of shift notes identifying potential concerns and risks
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="escalated">Escalated</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterRiskLevel} onValueChange={setFilterRiskLevel}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk</SelectItem>
                  <SelectItem value="high">High (7-10)</SelectItem>
                  <SelectItem value="medium">Medium (4-6)</SelectItem>
                  <SelectItem value="low">Low (0-3)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shift Details</TableHead>
                <TableHead>Risk Analysis</TableHead>
                <TableHead>Concerns & Keywords</TableHead>
                <TableHead>AI Summary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCautions.map((caution) => (
                <TableRow key={caution.id} className={caution.riskScore >= 7 ? "bg-destructive/5" : ""}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">Shift {caution.shiftId}</div>
                      <div className="text-sm text-muted-foreground">{caution.date}</div>
                      <div className="text-sm">Staff: {caution.staff}</div>
                      <div className="text-sm">Participant: {caution.participant}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      {getRiskBadge(caution.riskScore)}
                      <Progress 
                        value={caution.riskScore * 10} 
                        className="w-20 h-2"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {caution.concerns.map((concern, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {concern}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {caution.keywords.map((keyword, index) => (
                          <Badge key={index} className="bg-muted text-muted-foreground text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm max-w-xs">{caution.aiSummary}</p>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {getStatusBadge(caution.status)}
                      {caution.reviewedBy && (
                        <div className="text-xs text-muted-foreground">
                          By: {caution.reviewedBy}
                          <br />
                          {caution.reviewDate}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        View Note
                      </Button>
                      {caution.status === "pending" && (
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          Review
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredCautions.length === 0 && (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No cautions found matching your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}