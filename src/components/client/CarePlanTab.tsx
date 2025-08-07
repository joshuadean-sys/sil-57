import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, FileText, Clock } from "lucide-react"

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

interface CarePlanTabProps {
  client: Client
}

export function CarePlanTab({ client }: CarePlanTabProps) {
  const plans = [
    { id: 1, name: "Core Care Plan", version: "v1.2", effectiveFrom: "2025-01-01", status: "Active" },
    { id: 2, name: "Medication Management", version: "v1.0", effectiveFrom: "2024-09-15", status: "Active" },
    { id: 3, name: "Behaviour Support", version: "Draft", effectiveFrom: "—", status: "Draft" },
  ]
  const [selected, setSelected] = React.useState<typeof plans[0] | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{selected ? selected.name : "Care Plans"}</CardTitle>
      </CardHeader>
      <CardContent>
        {!selected ? (
          <div className="overflow-hidden rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="p-3 font-medium">Name</th>
                  <th className="p-3 font-medium">Version</th>
                  <th className="p-3 font-medium">Effective from</th>
                  <th className="p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((p) => (
                  <tr
                    key={p.id}
                    className="cursor-pointer hover:bg-muted/40"
                    onClick={() => setSelected(p)}
                  >
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.version}</td>
                    <td className="p-3">{p.effectiveFrom}</td>
                    <td className="p-3">
                      <span className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Client: {client.name}</p>
              <Button variant="outline" size="sm" onClick={() => setSelected(null)}>Back to list</Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border">
                <h3 className="text-base font-semibold mb-2">Overview</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Version: {selected.version}</li>
                  <li>• Effective from: {selected.effectiveFrom}</li>
                  <li>• Lead clinician: Dr. Smith</li>
                  <li>• Review frequency: Quarterly</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border">
                <h3 className="text-base font-semibold mb-2">Goals</h3>
                <p className="text-sm text-muted-foreground">Improve daily living skills, maintain medication adherence, and enhance community participation.</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h3 className="text-base font-semibold mb-2">Services</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Personal care twice daily</li>
                  <li>• Weekly community access</li>
                  <li>• Fortnightly therapy sessions</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border">
                <h3 className="text-base font-semibold mb-2">Risk Management</h3>
                <p className="text-sm text-muted-foreground">Known allergy to penicillin. Emergency plan documented and accessible to all staff.</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}