import { useState } from "react"
import { Folder, Lock, FileText, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

interface DocumentsTabProps {
  client: Client
}

interface DocumentFolder {
  id: number
  name: string
  fileCount: number
  isSecure?: boolean
}

export function DocumentsTab({ client }: DocumentsTabProps) {
  const folders: DocumentFolder[] = [
    {
      id: 1,
      name: "General Documents",
      fileCount: 9
    },
    {
      id: 2,
      name: "Assessments",
      fileCount: 5
    },
    {
      id: 3,
      name: "Secure Documents",
      fileCount: 2,
      isSecure: true
    }
  ]

  const [currentView, setCurrentView] = useState<'root' | 'general'>('root')

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {currentView !== "root" && (
            <button
              type="button"
              onClick={() => setCurrentView("root")}
              className="inline-flex items-center text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </button>
          )}
          <span>{currentView === "root" ? "Folders" : "General Documents"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {currentView === "root" ? (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {folders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => folder.id === 1 ? setCurrentView("general") : null}
                className="min-w-[220px] flex flex-col items-center p-4 border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer group"
              >
                <div className="relative mb-3">
                  <Folder className="h-10 w-10 text-primary group-hover:text-primary/80 transition-colors" />
                  {folder.isSecure && (
                    <Lock className="h-3.5 w-3.5 text-muted-foreground absolute -top-1 -right-1" />
                  )}
                </div>
                <h3 className="text-sm font-medium text-center mb-1">
                  {folder.name}
                  {folder.isSecure && (
                    <Lock className="inline h-3 w-3 ml-1 text-muted-foreground" />
                  )}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {folder.fileCount} file{folder.fileCount !== 1 ? "s" : ""}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-3">
              {/* Sub-folder */}
              <div className="min-w-[220px] flex flex-col items-center p-4 border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer group">
                <div className="mb-3">
                  <Folder className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-sm font-medium">Care Plans</h3>
                <p className="text-xs text-muted-foreground">3 items</p>
              </div>

              {/* Documents */}
              {[
                { id: 101, name: "Service Agreement.pdf" },
                { id: 102, name: "Consent Form.pdf" },
                { id: 103, name: "Medication Chart.pdf" },
              ].map((doc) => (
                <div key={doc.id} className="min-w-[220px] p-4 border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                    <span className="text-sm font-medium truncate">{doc.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">PDF • 256 KB</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}