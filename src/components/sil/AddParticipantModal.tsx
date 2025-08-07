import { useState } from "react"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface ParticipantFormData {
  name: string
  age: string
  ndisNumber: string
  fundingType: "Core" | "Capacity Building" | "Capital" | ""
  supportLevel: "High" | "Medium" | "Low" | ""
  primaryWorker: string
  room: string
  emergencyContact: string
  emergencyPhone: string
  allergies: string
  medicalNotes: string
}

interface AddParticipantModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (participant: ParticipantFormData) => void
}

const mockPrimaryWorkers = [
  "Emma Thompson",
  "James Wilson", 
  "Sarah Miller",
  "Alex Foster"
]

const availableRooms = [
  "Room 1A",
  "Room 1B", 
  "Room 2A",
  "Room 2B",
  "Room 3A",
  "Room 3B"
]

export function AddParticipantModal({ isOpen, onClose, onAdd }: AddParticipantModalProps) {
  const [formData, setFormData] = useState<ParticipantFormData>({
    name: "",
    age: "",
    ndisNumber: "",
    fundingType: "",
    supportLevel: "",
    primaryWorker: "",
    room: "",
    emergencyContact: "",
    emergencyPhone: "",
    allergies: "",
    medicalNotes: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.age || !formData.ndisNumber) {
      return
    }

    onAdd(formData)
    
    // Reset form
    setFormData({
      name: "",
      age: "",
      ndisNumber: "",
      fundingType: "",
      supportLevel: "",
      primaryWorker: "",
      room: "",
      emergencyContact: "",
      emergencyPhone: "",
      allergies: "",
      medicalNotes: ""
    })
  }

  const handleClose = () => {
    onClose()
    // Reset form when closing
    setFormData({
      name: "",
      age: "",
      ndisNumber: "",
      fundingType: "",
      supportLevel: "",
      primaryWorker: "",
      room: "",
      emergencyContact: "",
      emergencyPhone: "",
      allergies: "",
      medicalNotes: ""
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Participant</DialogTitle>
          <DialogDescription>
            Link a new participant to this SIL house
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter participant's full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  min="18"
                  max="100"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="Age"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ndisNumber">NDIS Number *</Label>
                <Input
                  id="ndisNumber"
                  value={formData.ndisNumber}
                  onChange={(e) => setFormData({ ...formData, ndisNumber: e.target.value })}
                  placeholder="4300123456"
                  pattern="[0-9]{10}"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fundingType">Funding Type</Label>
                <Select value={formData.fundingType} onValueChange={(value: "Core" | "Capacity Building" | "Capital") => setFormData({ ...formData, fundingType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select funding type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Core">Core Support</SelectItem>
                    <SelectItem value="Capacity Building">Capacity Building</SelectItem>
                    <SelectItem value="Capital">Capital Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supportLevel">Support Level</Label>
                <Select value={formData.supportLevel} onValueChange={(value: "High" | "Medium" | "Low") => setFormData({ ...formData, supportLevel: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select support level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High Support</SelectItem>
                    <SelectItem value="Medium">Medium Support</SelectItem>
                    <SelectItem value="Low">Low Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="room">Room Assignment</Label>
                <Select value={formData.room} onValueChange={(value) => setFormData({ ...formData, room: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRooms.map(room => (
                      <SelectItem key={room} value={room}>{room}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Care Team */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Care Team</h3>
            <div className="space-y-2">
              <Label htmlFor="primaryWorker">Primary Support Worker</Label>
              <Select value={formData.primaryWorker} onValueChange={(value) => setFormData({ ...formData, primaryWorker: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select primary worker" />
                </SelectTrigger>
                <SelectContent>
                  {mockPrimaryWorkers.map(worker => (
                    <SelectItem key={worker} value={worker}>{worker}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Contact Name</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  placeholder="Emergency contact name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                  placeholder="+61 400 000 000"
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Medical Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies & Dietary Requirements</Label>
                <Input
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                  placeholder="e.g., Nuts, Dairy, Gluten"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicalNotes">Medical Notes</Label>
                <Textarea
                  id="medicalNotes"
                  value={formData.medicalNotes}
                  onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
                  placeholder="Any relevant medical information..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Add Participant
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}