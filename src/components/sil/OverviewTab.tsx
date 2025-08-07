import { useState } from "react"
import { Edit, Save, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/StatusBadge"

interface HouseData {
  name: string
  address: string
  houseType: "STA" | "SDA" | "SIL"
  capacity: number
  status: "active" | "inactive"
  adminNotes: string
}

interface StaffMember {
  id: number
  name: string
  role: string
  phone: string
  email: string
  status: "active" | "inactive"
}

const mockStaff: StaffMember[] = [
  { id: 1, name: "Emma Thompson", role: "Senior Support Worker", phone: "+61 400 123 456", email: "emma.t@essencecare.com.au", status: "active" },
  { id: 2, name: "James Wilson", role: "Support Worker", phone: "+61 400 123 457", email: "james.w@essencecare.com.au", status: "active" },
  { id: 3, name: "Sarah Miller", role: "Support Worker", phone: "+61 400 123 458", email: "sarah.m@essencecare.com.au", status: "active" },
  { id: 4, name: "Alex Foster", role: "Relief Support Worker", phone: "+61 400 123 459", email: "alex.f@essencecare.com.au", status: "active" },
]

export function OverviewTab() {
  const [isEditing, setIsEditing] = useState(false)
  const [houseData, setHouseData] = useState<HouseData>({
    name: "Subiaco House",
    address: "12 Atkinson Road, Subiaco 6008 WA",
    houseType: "SIL",
    capacity: 5,
    status: "active",
    adminNotes: "Modern facility with full wheelchair access. Recently renovated kitchen and common areas. All rooms have private bathrooms."
  })

  const handleSave = () => {
    // In real app, save to backend
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset to original data
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* House Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>House Information</CardTitle>
            <CardDescription>Basic details and configuration</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button size="sm" onClick={handleSave} className="bg-success text-success-foreground">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Details
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="houseName">House Name</Label>
              {isEditing ? (
                <Input
                  id="houseName"
                  value={houseData.name}
                  onChange={(e) => setHouseData({ ...houseData, name: e.target.value })}
                />
              ) : (
                <p className="text-sm font-medium">{houseData.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="houseType">House Type</Label>
              {isEditing ? (
                <Select value={houseData.houseType} onValueChange={(value: "STA" | "SDA" | "SIL") => setHouseData({ ...houseData, houseType: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SIL">SIL - Supported Independent Living</SelectItem>
                    <SelectItem value="SDA">SDA - Specialist Disability Accommodation</SelectItem>
                    <SelectItem value="STA">STA - Short Term Accommodation</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{houseData.houseType}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {houseData.houseType === "SIL" && "Supported Independent Living"}
                    {houseData.houseType === "SDA" && "Specialist Disability Accommodation"}
                    {houseData.houseType === "STA" && "Short Term Accommodation"}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              {isEditing ? (
                <Input
                  id="address"
                  value={houseData.address}
                  onChange={(e) => setHouseData({ ...houseData, address: e.target.value })}
                />
              ) : (
                <p className="text-sm">{houseData.address}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              {isEditing ? (
                <Input
                  id="capacity"
                  type="number"
                  min="1"
                  max="20"
                  value={houseData.capacity}
                  onChange={(e) => setHouseData({ ...houseData, capacity: parseInt(e.target.value) })}
                />
              ) : (
                <p className="text-sm font-medium">{houseData.capacity} participants</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <StatusBadge status={houseData.status}>
              {houseData.status === "active" ? "Active" : "Inactive"}
            </StatusBadge>
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminNotes">Admin Notes (Internal Only)</Label>
            {isEditing ? (
              <Textarea
                id="adminNotes"
                value={houseData.adminNotes}
                onChange={(e) => setHouseData({ ...houseData, adminNotes: e.target.value })}
                rows={4}
                placeholder="Internal notes about the house..."
              />
            ) : (
              <p className="text-sm bg-muted p-3 rounded-md">{houseData.adminNotes}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Assigned Staff */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Assigned Staff</CardTitle>
            <CardDescription>Support workers assigned to this house</CardDescription>
          </div>
          <Button size="sm" className="bg-primary text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Assign Staff
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockStaff.map((staff) => (
              <div key={staff.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-sm">{staff.name}</h4>
                    <p className="text-xs text-muted-foreground">{staff.role}</p>
                  </div>
                  <StatusBadge status={staff.status}>
                    {staff.status}
                  </StatusBadge>
                </div>
                <div className="space-y-1">
                  <p className="text-xs"><span className="font-medium">Phone:</span> {staff.phone}</p>
                  <p className="text-xs"><span className="font-medium">Email:</span> {staff.email}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost" className="text-xs h-7">Edit</Button>
                  <Button size="sm" variant="ghost" className="text-xs h-7 text-destructive">Remove</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}