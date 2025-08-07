import { useState, useMemo } from "react"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreateShiftModal } from "./CreateShiftModal"
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

interface CalendarEvent {
  id: number
  title: string
  start: Date
  end: Date
  resource: {
    shiftType: "Standard" | "Sleepover" | "Active Overnight" | "Day Support"
    staff: string[]
    participants: string[]
    status: "scheduled" | "confirmed" | "completed" | "cancelled"
    notes?: string
    isOverlapping?: boolean
  }
}

const mockEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Standard Shift - Emma Thompson",
    start: new Date(2024, 0, 8, 8, 0),
    end: new Date(2024, 0, 8, 16, 0),
    resource: {
      shiftType: "Standard",
      staff: ["Emma Thompson"],
      participants: ["Sarah Chen", "Lisa Kim"],
      status: "confirmed",
      notes: "Morning medication support required"
    }
  },
  {
    id: 2,
    title: "Standard Shift - James Wilson",
    start: new Date(2024, 0, 8, 16, 0),
    end: new Date(2024, 0, 9, 0, 0),
    resource: {
      shiftType: "Standard",
      staff: ["James Wilson"],
      participants: ["Michael Rodriguez", "David Park"],
      status: "confirmed"
    }
  },
  {
    id: 3,
    title: "Sleepover - Sarah Miller",
    start: new Date(2024, 0, 8, 22, 0),
    end: new Date(2024, 0, 9, 8, 0),
    resource: {
      shiftType: "Sleepover",
      staff: ["Sarah Miller"],
      participants: ["Sarah Chen", "Amanda Clarke"],
      status: "scheduled",
      isOverlapping: true
    }
  },
  {
    id: 4,
    title: "Standard Shift - Alex Foster",
    start: new Date(2024, 0, 9, 8, 0),
    end: new Date(2024, 0, 9, 16, 0),
    resource: {
      shiftType: "Standard",
      staff: ["Alex Foster"],
      participants: ["David Park"],
      status: "scheduled"
    }
  }
]

export function RosterTab() {
  const [events, setEvents] = useState(mockEvents)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())

  const eventStyleGetter = (event: CalendarEvent) => {
    const { shiftType, status, isOverlapping } = event.resource
    
    let backgroundColor = '#3174ad'
    let borderColor = '#3174ad'
    
    switch (shiftType) {
      case "Standard":
        backgroundColor = 'hsl(var(--primary))'
        borderColor = 'hsl(var(--primary))'
        break
      case "Sleepover":
        backgroundColor = 'hsl(var(--info))'
        borderColor = 'hsl(var(--info))'
        break
      case "Active Overnight":
        backgroundColor = 'hsl(var(--warning))'
        borderColor = 'hsl(var(--warning))'
        break
      case "Day Support":
        backgroundColor = 'hsl(var(--success))'
        borderColor = 'hsl(var(--success))'
        break
    }

    if (status === 'cancelled') {
      backgroundColor = 'hsl(var(--destructive))'
      borderColor = 'hsl(var(--destructive))'
    } else if (status === 'completed') {
      backgroundColor = 'hsl(var(--muted))'
      borderColor = 'hsl(var(--muted))'
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        border: isOverlapping ? '2px solid hsl(var(--warning))' : `1px solid ${borderColor}`,
        opacity: status === 'cancelled' ? 0.6 : 1,
        color: 'white',
        fontSize: '12px',
        borderRadius: '4px'
      }
    }
  }

  const CustomToolbar = (toolbar: any) => {
    return (
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toolbar.onNavigate('PREV')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toolbar.onNavigate('TODAY')}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toolbar.onNavigate('NEXT')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-semibold ml-4">{toolbar.label}</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Badge variant="secondary">Standard</Badge>
            <Badge className="bg-info text-info-foreground">Sleepover</Badge>
            <Badge className="bg-warning text-warning-foreground">Active Overnight</Badge>
            <Badge className="bg-success text-success-foreground">Day Support</Badge>
          </div>
          
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Shift
          </Button>
        </div>
      </div>
    )
  }

  const handleSelectEvent = (event: CalendarEvent) => {
    console.log('Selected event:', event)
    // Handle event selection (could open edit modal)
  }

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    console.log('Selected slot:', start, end)
    // Could auto-open create modal with selected time
    setIsCreateModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>House Roster Calendar</CardTitle>
          <CardDescription>Visual shift schedule and staff assignments</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[600px] p-6">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              eventPropGetter={eventStyleGetter}
              components={{
                toolbar: CustomToolbar
              }}
              views={['month', 'week', 'day']}
              defaultView="week"
              step={30}
              timeslots={2}
              min={new Date(0, 0, 0, 6, 0, 0)}
              max={new Date(0, 0, 0, 23, 59, 59)}
              formats={{
                timeGutterFormat: 'HH:mm',
                eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) => 
                  `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`
              }}
            />
          </div>
        </CardContent>
      </Card>

      <CreateShiftModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={(shiftData) => {
          console.log("Creating shift:", shiftData)
          setIsCreateModalOpen(false)
        }}
      />
    </div>
  )
}