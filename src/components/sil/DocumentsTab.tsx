import { useState } from "react"
import { Upload, File, Download, Trash2, Eye, Plus, Folder, FileText, Image, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Document {
  id: number
  name: string
  type: "pdf" | "doc" | "docx" | "xlsx" | "jpg" | "png" | "txt"
  category: "house" | "staff" | "participant" | "incident" | "medication" | "care-plan" | "other"
  size: string
  uploadedBy: string
  uploadedDate: string
  description?: string
  tags: string[]
}

const mockDocuments: Document[] = [
  {
    id: 1,
    name: "House Safety Protocol.pdf",
    type: "pdf",
    category: "house",
    size: "2.4 MB",
    uploadedBy: "Emma Thompson",
    uploadedDate: "2024-01-08",
    description: "Emergency procedures and safety protocols for the house",
    tags: ["safety", "protocol", "emergency"]
  },
  {
    id: 2,
    name: "Staff Roster Template.xlsx",
    type: "xlsx",
    category: "staff",
    size: "856 KB",
    uploadedBy: "Dr. Smith",
    uploadedDate: "2024-01-07",
    description: "Monthly staff roster template with shift allocations",
    tags: ["roster", "template", "shifts"]
  },
  {
    id: 3,
    name: "Medication Chart - Sarah Chen.pdf",
    type: "pdf",
    category: "medication",
    size: "1.2 MB",
    uploadedBy: "Nurse Johnson",
    uploadedDate: "2024-01-06",
    description: "Current medication chart for participant Sarah Chen",
    tags: ["medication", "sarah-chen", "chart"]
  },
  {
    id: 4,
    name: "House Insurance Certificate.pdf",
    type: "pdf",
    category: "house",
    size: "445 KB",
    uploadedBy: "Admin Team",
    uploadedDate: "2024-01-05",
    description: "Property insurance certificate valid until Dec 2024",
    tags: ["insurance", "certificate", "property"]
  },
  {
    id: 5,
    name: "Incident Report Form.docx",
    type: "docx",
    category: "incident",
    size: "124 KB",
    uploadedBy: "Emma Thompson",
    uploadedDate: "2024-01-04",
    description: "Blank incident report form template",
    tags: ["incident", "form", "template"]
  },
  {
    id: 6,
    name: "Staff Training Certificate - James Wilson.pdf",
    type: "pdf",
    category: "staff",
    size: "789 KB",
    uploadedBy: "James Wilson",
    uploadedDate: "2024-01-03",
    description: "First Aid certification for James Wilson",
    tags: ["training", "certificate", "first-aid", "james-wilson"]
  }
]

export function DocumentsTab() {
  const [documents, setDocuments] = useState(mockDocuments)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = filterCategory === "all" || doc.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />
      case "doc":
      case "docx":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "xlsx":
        return <FileSpreadsheet className="h-4 w-4 text-green-500" />
      case "jpg":
      case "png":
        return <Image className="h-4 w-4 text-purple-500" />
      default:
        return <File className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      house: "bg-blue-100 text-blue-800",
      staff: "bg-green-100 text-green-800",
      participant: "bg-purple-100 text-purple-800",
      incident: "bg-red-100 text-red-800",
      medication: "bg-orange-100 text-orange-800",
      "care-plan": "bg-teal-100 text-teal-800",
      other: "bg-gray-100 text-gray-800"
    }
    
    return (
      <Badge className={colors[category as keyof typeof colors] || colors.other}>
        {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
      </Badge>
    )
  }

  const documentsByCategory = {
    house: documents.filter(doc => doc.category === "house"),
    staff: documents.filter(doc => doc.category === "staff"),
    participant: documents.filter(doc => doc.category === "participant"),
    incident: documents.filter(doc => doc.category === "incident"),
    medication: documents.filter(doc => doc.category === "medication"),
    "care-plan": documents.filter(doc => doc.category === "care-plan"),
    other: documents.filter(doc => doc.category === "other")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Folder className="h-5 w-5" />
                <span>Document Management</span>
              </CardTitle>
              <CardDescription>Manage house, staff, and participant documents</CardDescription>
            </div>
            <Button 
              size="sm" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Documents</TabsTrigger>
              <TabsTrigger value="categories">By Category</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="shared">Shared</TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-4">
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="participant">Participant</SelectItem>
                  <SelectItem value="incident">Incident</SelectItem>
                  <SelectItem value="medication">Medication</SelectItem>
                  <SelectItem value="care-plan">Care Plan</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="all" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {getFileIcon(doc.type)}
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            {doc.description && (
                              <div className="text-xs text-muted-foreground max-w-xs truncate">
                                {doc.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getCategoryBadge(doc.category)}</TableCell>
                      <TableCell className="text-sm">{doc.size}</TableCell>
                      <TableCell className="text-sm">{doc.uploadedBy}</TableCell>
                      <TableCell className="text-sm">{doc.uploadedDate}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-32">
                          {doc.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {doc.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{doc.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="categories" className="space-y-4">
              <div className="grid gap-4">
                {Object.entries(documentsByCategory).map(([category, docs]) => (
                  <Card key={category} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Folder className="h-4 w-4" />
                        <h4 className="font-medium">
                          {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                        </h4>
                        <Badge variant="outline">{docs.length}</Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {docs.slice(0, 6).map((doc) => (
                        <div key={doc.id} className="flex items-center space-x-2 p-2 rounded border">
                          {getFileIcon(doc.type)}
                          <span className="text-sm truncate">{doc.name}</span>
                        </div>
                      ))}
                      {docs.length > 6 && (
                        <div className="text-sm text-muted-foreground p-2">
                          +{docs.length - 6} more...
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Recent documents view - coming soon</p>
              </div>
            </TabsContent>

            <TabsContent value="shared" className="space-y-4">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Shared documents view - coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}