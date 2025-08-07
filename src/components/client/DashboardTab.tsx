import { Edit, Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

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

interface DashboardTabProps {
  client: Client
}

export function DashboardTab({ client }: DashboardTabProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 12)) // July 2025

  const clientInfo = {
    gender: "Male",
    age: "79 years old",
    dateOfBirth: "15/07/1949",
    classification: "Non-remote",
    startDate: "15/03/2024",
    referenceNumber: "N/A",
    primaryLanguage: "English",
    secondaryLanguages: "Spanish, French",
    allergies: "Penecillin, Pine Nuts, Latex, Moisturiser",
    allergyNotes: "Ensure the patient always carries an epipen and avoids allergy triggers."
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-8 w-8 text-center text-sm text-muted-foreground">
          {new Date(currentDate.getFullYear(), currentDate.getMonth(), -firstDay + i + 1).getDate()}
        </div>
      )
    }
    
    // Days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === 12 // July 12 is highlighted in the screenshot
      days.push(
        <div
          key={day}
          className={`h-8 w-8 text-center text-sm flex items-center justify-center rounded cursor-pointer
            ${isToday 
              ? 'bg-primary text-primary-foreground font-semibold' 
              : 'text-foreground hover:bg-muted'
            }`}
        >
          {day}
        </div>
      )
    }
    
    return days
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Client Information */}
      <div className="lg:col-span-2 space-y-6">
        {/* Client Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Client Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Client Phone Number</label>
                <p className="font-medium">{client.phone}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Client Email</label>
                <p className="font-medium">{client.email}</p>
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Client Address</label>
              <p className="font-medium">{client.address}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Primary Language</label>
              <p className="font-medium">{clientInfo.primaryLanguage}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Secondary Languages</label>
              <p className="font-medium">{clientInfo.secondaryLanguages}</p>
            </div>
          </CardContent>
        </Card>

        {/* General Information */}
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Gender</label>
                  <p className="font-medium">{clientInfo.gender}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Age</label>
                  <p className="font-medium">{clientInfo.age}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Date of Birth</label>
                  <p className="font-medium">{clientInfo.dateOfBirth}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Classification</label>
                  <p className="font-medium">{clientInfo.classification}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Funding</label>
                  <p className="font-medium">{client.funding}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Level</label>
                  <p className="font-medium">{client.level}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Start Date</label>
                  <p className="font-medium">{clientInfo.startDate}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Reference Number</label>
                  <p className="font-medium">{clientInfo.referenceNumber}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Allergies */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Allergies</CardTitle>
              <span className="text-sm text-muted-foreground">Last Updated: Jun 8, 2023</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="font-medium">{clientInfo.allergies}</p>
            <p className="text-sm text-muted-foreground">
              <strong>Notes:</strong> {clientInfo.allergyNotes}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Calendar and Schedule */}
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="font-semibold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Calendar header */}
              <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-muted-foreground">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>
              
              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {renderCalendar()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule for selected day */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Wednesday, 12 July</CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Time slots */}
              <div className="space-y-3 text-sm">
                <div className="text-muted-foreground">08:00</div>
                <div className="text-muted-foreground">09:00</div>
                <div className="text-muted-foreground">10:00</div>
                <div className="text-muted-foreground">11:00</div>
                <div className="text-muted-foreground">12:00</div>
                <div className="text-muted-foreground">01:00</div>
              </div>
              
              {/* Appointment */}
              <div className="bg-info/10 border border-info/20 rounded-lg p-3 mt-4">
                <div className="font-medium text-sm">Companion Care</div>
                <div className="text-sm text-muted-foreground">10:00 - 12:00</div>
                <div className="text-sm text-muted-foreground">Employee: John Smith</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}