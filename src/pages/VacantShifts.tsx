import { useMemo, useState } from "react"
import { format, startOfWeek, addDays, isSameDay } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface VacantShift {
  id: string
  date: Date
  start: string
  end: string
  role: string
  location?: string
  notes?: string
  participants?: string[]
  allocatedTo?: string | null
}

const staff = [
  "Emma Thompson",
  "James Wilson",
  "Sarah Miller",
  "Alex Foster",
  "Olivia Brown",
]

function generateWeekShifts(weekStart: Date): VacantShift[] {
  const days = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i))
  const base: Omit<VacantShift, "id" | "date">[] = [
    { start: "07:00", end: "15:00", role: "Standard" },
    { start: "15:00", end: "23:00", role: "Standard" },
    { start: "22:00", end: "07:00", role: "Sleepover" },
  ]
  const result: VacantShift[] = []
  days.forEach((d, di) => {
    base.forEach((b, bi) => {
      // Fewer shifts on weekends for demo
      if (di >= 5 && bi === 1) return
      result.push({
        id: `${+d}-${bi}`,
        date: d,
        ...b,
        participants: ["Sarah Chen"],
        location: "SIL House A",
        allocatedTo: null,
      })
    })
  })
  return result
}

export default function VacantShifts() {
  const { toast } = useToast()
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const [view, setView] = useState<"week" | "day">("week")
  const [selectedDay, setSelectedDay] = useState<Date>(weekStart)
  const [shifts, setShifts] = useState<VacantShift[]>(() => generateWeekShifts(weekStart))

  const [allocOpen, setAllocOpen] = useState(false)
  const [allocShift, setAllocShift] = useState<VacantShift | null>(null)
  const [chosenStaff, setChosenStaff] = useState<string>("")

  const days = useMemo(() => Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i)), [weekStart])

  const openAllocate = (shift: VacantShift) => {
    setAllocShift(shift)
    setChosenStaff("")
    setAllocOpen(true)
  }

  const confirmAllocate = () => {
    if (!allocShift || !chosenStaff) return
    setShifts((prev) => prev.map((s) => (s.id === allocShift.id ? { ...s, allocatedTo: chosenStaff } : s)))
    toast({ title: "Shift allocated", description: `${chosenStaff} allocated to ${allocShift.role} (${allocShift.start}–${allocShift.end})` })
    setAllocOpen(false)
  }

  const goPrevWeek = () => {
    const w = addDays(weekStart, -7)
    setWeekStart(w)
    setSelectedDay(w)
    setShifts(generateWeekShifts(w))
  }

  const goNextWeek = () => {
    const w = addDays(weekStart, 7)
    setWeekStart(w)
    setSelectedDay(w)
    setShifts(generateWeekShifts(w))
  }

  const renderShift = (shift: VacantShift) => (
    <div key={shift.id} className="rounded-lg border p-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{shift.role}</Badge>
          <span className="text-muted-foreground">{shift.start} – {shift.end}</span>
        </div>
        {shift.allocatedTo ? (
          <Badge className="bg-success text-success-foreground">{shift.allocatedTo}</Badge>
        ) : (
          <Button size="sm" onClick={() => openAllocate(shift)}>Allocate</Button>
        )}
      </div>
      {shift.location && <div className="text-muted-foreground">{shift.location}</div>}
      {shift.participants && (
        <div className="text-muted-foreground text-xs">Participants: {shift.participants.join(", ")}</div>
      )}
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goPrevWeek}><ChevronLeft className="h-4 w-4" /></Button>
          <div className="text-base font-semibold">{format(weekStart, "d MMM")} – {format(addDays(weekStart, 6), "d MMM, yyyy")}</div>
          <Button variant="outline" size="sm" onClick={goNextWeek}><ChevronRight className="h-4 w-4" /></Button>
        </div>
        <Tabs value={view} onValueChange={(v) => setView(v as any)}>
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vacant Shifts</CardTitle>
        </CardHeader>
        <CardContent>
          {view === "week" ? (
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {days.map((d) => (
                <div key={+d} className="space-y-3">
                  <div className="text-sm font-medium">{format(d, "EEE d MMM")}</div>
                  <div className="space-y-2">
                    {shifts.filter((s) => isSameDay(s.date, d)).map(renderShift)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground">Day:</div>
                <Select value={String(+selectedDay)} onValueChange={(v) => setSelectedDay(new Date(Number(v)))}>
                  <SelectTrigger className="w-56">
                    <SelectValue placeholder="Pick a day" />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    {days.map((d) => (
                      <SelectItem key={+d} value={String(+d)}>{format(d, "EEEE, d MMM yyyy")}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                {shifts.filter((s) => isSameDay(s.date, selectedDay)).map(renderShift)}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={allocOpen} onOpenChange={setAllocOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Allocate shift</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">Select staff to allocate to this shift.</div>
            <Select value={chosenStaff} onValueChange={setChosenStaff}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select staff" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {staff.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAllocOpen(false)}>Cancel</Button>
            <Button onClick={confirmAllocate} disabled={!chosenStaff}>Allocate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
