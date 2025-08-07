import { useState } from "react"
import { Plus, X, Calendar, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ShiftFormData {
  date: string
  startTime: string
  endTime: string
  shiftType: "Standard" | "Sleepover" | "Active Overnight" | "Day Support" | ""
  selectedStaff: string[]
  selectedParticipants: string[]
  notes: string
  allowOverlap: boolean
}

interface CreateShiftModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (shift: ShiftFormData) => void
}

const mockStaff = [
  { id: "1", name: "Emma Thompson", role: "Senior Support Worker" },
  { id: "2", name: "James Wilson", role: "Support Worker" },
  { id: "3", name: "Sarah Miller", role: "Support Worker" },
  { id: "4", name: "Alex Foster", role: "Relief Support Worker" },
]

const mockParticipants = [
  { id: "1", name: "Sarah Chen", room: "Room 1A" },
  { id: "2", name: "Michael Rodriguez", room: "Room 1B" },
  { id: "3", name: "Lisa Kim", room: "Room 2A" },
  { id: "4", name: "David Park", room: "Room 2B" },
  { id: "5", name: "Amanda Clarke", room: "Room 3A" },
]

export function CreateShiftModal({ isOpen, onClose, onCreate }: CreateShiftModalProps) {
  const [formData, setFormData] = useState<ShiftFormData>({
    date: "",
    startTime: "",
    endTime: "",
    shiftType: "",
    selectedStaff: [],
    selectedParticipants: [],
    notes: "",
    allowOverlap: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.date || !formData.startTime || !formData.endTime || !formData.shiftType) {
      return
    }

    if (formData.selectedStaff.length === 0) {
      return
    }

    onCreate(formData)
    
    // Reset form
    setFormData({
      date: "",
      startTime: "",
      endTime: "",
      shiftType: "",
      selectedStaff: [],
      selectedParticipants: [],
      notes: "",
      allowOverlap: false
    })
  }

  const handleClose = () => {
    onClose()
    // Reset form when closing
    setFormData({
      date: "",
      startTime: "",
      endTime: "",
      shiftType: "",
      selectedStaff: [],
      selectedParticipants: [],
      notes: "",
      allowOverlap: false
    })
  }

  const handleStaffToggle = (staffId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedStaff: prev.selectedStaff.includes(staffId)
        ? prev.selectedStaff.filter(id => id !== staffId)
        : [...prev.selectedStaff, staffId]
    }))
  }

  const handleParticipantToggle = (participantId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedParticipants: prev.selectedParticipants.includes(participantId)
        ? prev.selectedParticipants.filter(id => id !== participantId)
        : [...prev.selectedParticipants, participantId]
    }))
  }

  // Get tomorrow's date as default
  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Shift</DialogTitle>
          <DialogDescription>
            Schedule a new shift for this SIL house
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Shift Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Shift Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={getTomorrowDate()}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time *</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shiftType">Shift Type *</Label>
                <Select value={formData.shiftType} onValueChange={(value: "Standard" | "Sleepover" | "Active Overnight" | "Day Support") => setFormData({ ...formData, shiftType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard Shift</SelectItem>
                    <SelectItem value="Day Support">Day Support</SelectItem>
                    <SelectItem value="Sleepover">Sleepover</SelectItem>
                    <SelectItem value="Active Overnight">Active Overnight</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="allowOverlap"
                  checked={formData.allowOverlap}
                  onCheckedChange={(checked) => setFormData({ ...formData, allowOverlap: checked as boolean })}
                />
                <Label htmlFor="allowOverlap" className="text-sm">
                  Allow overlapping with existing shifts
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Staff Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Assign Staff ({formData.selectedStaff.length} selected)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mockStaff.map((staff) => (
                  <div 
                    key={staff.id} 
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      formData.selectedStaff.includes(staff.id) 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:bg-accent'
                    }`}
                    onClick={() => handleStaffToggle(staff.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        checked={formData.selectedStaff.includes(staff.id)}
                        onChange={() => handleStaffToggle(staff.id)}
                      />
                      <div>
                        <p className="font-medium text-sm">{staff.name}</p>
                        <p className="text-xs text-muted-foreground">{staff.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {formData.selectedStaff.length === 0 && (
                <p className="text-sm text-destructive mt-2">Please select at least one staff member</p>
              )}
            </CardContent>
          </Card>

          {/* Participants Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Select Participants ({formData.selectedParticipants.length} selected)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {mockParticipants.map((participant) => (
                  <div 
                    key={participant.id} 
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      formData.selectedParticipants.includes(participant.id) 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:bg-accent'
                    }`}
                    onClick={() => handleParticipantToggle(participant.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        checked={formData.selectedParticipants.includes(participant.id)}
                        onChange={() => handleParticipantToggle(participant.id)}
                      />
                      <div>
                        <p className="font-medium text-sm">{participant.name}</p>
                        <p className="text-xs text-muted-foreground">{participant.room}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Leave empty to create a general house shift
              </p>
            </CardContent>
          </Card>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Shift Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any special instructions or notes for this shift..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Create Shift
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}