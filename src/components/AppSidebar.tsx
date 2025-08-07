import { useState, useEffect, useRef } from "react"
import { 
  Home, 
  Inbox, 
  Users, 
  Calendar, 
  UserCheck, 
  Briefcase,
  CreditCard,
  FileText,
  FileSignature,
  AlertTriangle,
  BarChart3,
  DollarSign,
  UserCircle,
  Building,
  Settings,
  ChevronRight,
  ChevronDown,
  HomeIcon
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { InboxPopover } from "./InboxPopover"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const navigation = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
    badge: "2",
    isPopover: true
  }
]

const clientManagement = [
  {
    title: "Clients",
    url: "/clients",
    icon: Users,
    children: [
      { title: "HCP", url: "/clients/hcp" },
      { title: "NDIS", url: "/clients/ndis" },
      { title: "Private", url: "/clients/private" },
    ],
  },
  {
    title: "SIL",
    url: "/sil",
    icon: HomeIcon,
  },
  {
    title: "Scheduler",
    url: "/scheduler",
    icon: Calendar,
    children: [
      { title: "Roster", url: "/scheduler/roster" },
      { title: "Vacant shifts", url: "/scheduler/vacant-shifts" },
      { title: "Timesheets", url: "/scheduler/timesheets" },
    ],
  }
]

const humanResources = [
  {
    title: "Manage staff",
    url: "/staff",
    icon: UserCheck,
    badge: "!",
    children: [
      { title: "Staff", url: "/staff" },
      { title: "Availability", url: "/staff/availability" },
      { title: "Leave", url: "/staff/leave" },
    ],
  },
  {
    title: "Job Board",
    url: "/jobs",
    icon: Briefcase,
  },
  {
    title: "Payroll",
    url: "/payroll",
    icon: CreditCard,
  }
]

const compliance = [
  {
    title: "Documents",
    url: "/documents",
    icon: FileText,
  },
  {
    title: "eSign",
    url: "/esign",
    icon: FileSignature,
  },
  {
    title: "Incidents",
    url: "/incidents",
    icon: AlertTriangle,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: BarChart3,
  }
]

const operations = [
  {
    title: "Finances",
    url: "/finances",
    icon: DollarSign,
    badge: "!",
    children: [
      { title: "Invoicing", url: "/finances/invoicing" },
      { title: "HCP claims", url: "/finances/hcp-claims" },
      { title: "NDIS claims", url: "/finances/ndis-claims" },
      { title: "Travel claims", url: "/finances/travel-claims" },
      { title: "Staff claims", url: "/finances/staff-claims" },
    ],
  },
  {
    title: "CRM",
    url: "/crm",
    icon: UserCircle,
    children: [
      { title: "People", url: "/crm/people" },
      { title: "Prospects", url: "/crm/prospects" },
    ],
  },
  {
    title: "Suppliers",
    url: "/suppliers",
    icon: Building,
  }
]

interface NavigationChild {
  title: string
  url: string
  badge?: string
}

interface NavigationItem {
  title: string
  url: string
  icon: any
  badge?: string
  isPopover?: boolean
  children?: NavigationChild[]
}

interface SidebarGroupProps {
  title: string
  items: NavigationItem[]
  isCollapsed: boolean
  showLabel?: boolean
  collapsible?: boolean
}

function SidebarGroupComponent({ title, items, isCollapsed, showLabel = true, collapsible = true }: SidebarGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({})
  const location = useLocation()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenMap({})
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Auto-expand dropdowns when sidebar is collapsed and user hovers
  const handleMouseEnter = (itemTitle: string) => {
    if (isCollapsed && items.find(item => item.title === itemTitle)?.children) {
      setOpenMap(prev => ({ ...prev, [itemTitle]: true }))
    }
  }

  const handleMouseLeave = (itemTitle: string) => {
    if (isCollapsed && items.find(item => item.title === itemTitle)?.children) {
      // Add a small delay to prevent accidental closing
      setTimeout(() => {
        setOpenMap(prev => ({ ...prev, [itemTitle]: false }))
      }, 150)
    }
  }

  // Handle touch events for mobile
  const handleTouchStart = (itemTitle: string) => {
    if (isCollapsed && items.find(item => item.title === itemTitle)?.children) {
      setOpenMap(prev => ({ ...prev, [itemTitle]: !prev[itemTitle] }))
    }
  }

  if (isCollapsed) {
    return (
      <SidebarGroup ref={dropdownRef}>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem 
                key={item.title}
                onMouseEnter={() => handleMouseEnter(item.title)}
                onMouseLeave={() => handleMouseLeave(item.title)}
                onTouchStart={() => handleTouchStart(item.title)}
                className="relative"
              >
                <SidebarMenuButton asChild tooltip={item.title}>
                  {item.isPopover ? (
                    <InboxPopover>
                      <div className="flex items-center w-full">
                        <item.icon className="h-4 w-4" />
                      </div>
                    </InboxPopover>
                  ) : (
                    <NavLink 
                      to={item.url} 
                      className="flex items-center w-full"
                    >
                      <item.icon className="h-4 w-4" />
                    </NavLink>
                  )}
                </SidebarMenuButton>
                
                {/* Dropdown for collapsed state */}
                {item.children && item.children.length > 0 && openMap[item.title] && (
                  <div 
                    className="sidebar-dropdown"
                    onMouseEnter={() => setOpenMap(prev => ({ ...prev, [item.title]: true }))}
                    onMouseLeave={() => handleMouseLeave(item.title)}
                  >
                    <div className="p-1">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.title}
                          to={child.url}
                          className={({ isActive }) =>
                            `sidebar-dropdown-item ${
                              isActive ? "active" : ""
                            }`
                          }
                        >
                          {child.title}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  return (
    <SidebarGroup ref={dropdownRef}>
      {showLabel && (
        <SidebarGroupLabel 
          className="flex items-center justify-between cursor-pointer text-xs text-muted-foreground font-medium uppercase tracking-wider"
          onClick={() => collapsible && setIsExpanded(!isExpanded)}
        >
          {title}
          {collapsible && (isExpanded ? (
            <ChevronDown className="h-3 w-3" />
          ) : (
            <ChevronRight className="h-3 w-3" />
          ))}
        </SidebarGroupLabel>
      )}
      {(!showLabel || isExpanded) && (
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  {item.isPopover ? (
                    <InboxPopover>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                        </div>
                        {item.badge && (
                          <span className={`text-xs px-1.5 py-0.5 rounded ${
                            item.badge === "!" 
                              ? "bg-destructive text-destructive-foreground" 
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </InboxPopover>
                  ) : item.children && item.children.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => setOpenMap((prev) => ({ ...prev, [item.title]: !prev[item.title] }))}
                      className="flex items-center justify-between w-full"
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className={`text-xs px-1.5 py-0.5 rounded ${
                            item.badge === "!" 
                              ? "bg-destructive text-destructive-foreground" 
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${openMap[item.title] ? "rotate-180" : ""}`} />
                      </div>
                    </button>
                  ) : (
                    <NavLink 
                      to={item.url} 
                      className="flex items-center justify-between w-full"
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          item.badge === "!" 
                            ? "bg-destructive text-destructive-foreground" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  )}
                </SidebarMenuButton>
                {item.children && item.children.length > 0 && openMap[item.title] && (
                  <SidebarMenuSub className="mt-1">
                    {item.children.map((child) => (
                      <SidebarMenuSubItem key={child.title}>
                        <SidebarMenuSubButton asChild>
                          <NavLink 
                            to={child.url}
                            className="flex items-center justify-between w-full"
                          >
                            <span>{child.title}</span>
                            {child.badge && (
                              <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                                {child.badge}
                              </span>
                            )}
                          </NavLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      )}
    </SidebarGroup>
  )
}

export function AppSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar className="border-r">
      {/* Logo */}
      <div className="flex items-center h-14 px-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">EC</span>
          </div>
          {!isCollapsed && (
            <span className="font-semibold text-foreground">Essence Care</span>
          )}
        </div>
      </div>

      <SidebarContent className="px-2 py-2">
        {/* Main Navigation */}
        <SidebarGroupComponent 
          title="Main" 
          items={navigation} 
          isCollapsed={isCollapsed} 
          showLabel={false}
          collapsible={false}
        />
        
        {/* Client Management */}
        <SidebarGroupComponent 
          title="Client Management" 
          items={clientManagement} 
          isCollapsed={isCollapsed} 
        />
        
        {/* Human Resources */}
        <SidebarGroupComponent 
          title="Human Resources" 
          items={humanResources} 
          isCollapsed={isCollapsed} 
        />
        
        {/* Compliance */}
        <SidebarGroupComponent 
          title="Compliance" 
          items={compliance} 
          isCollapsed={isCollapsed} 
        />
        
        {/* Operations */}
        <SidebarGroupComponent 
          title="Operations" 
          items={operations} 
          isCollapsed={isCollapsed} 
        />

        {/* Settings at bottom */}
        <div className="mt-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to="/settings" 
                      className={({ isActive }) => 
                        isActive 
                          ? "bg-accent text-accent-foreground font-medium" 
                          : "hover:bg-accent/50"
                      }
                    >
                      <Settings className={`h-4 w-4 ${isCollapsed ? '' : 'mr-2'}`} />
                      {!isCollapsed && <span>Settings</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>

      {/* User Profile at bottom */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">DM</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Daniel Moss</p>
              <p className="text-xs text-muted-foreground truncate">Essence Home Care</p>
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  )
}