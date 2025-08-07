import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

interface CommandLink {
  label: string;
  to: string;
}

const quickLinks: CommandLink[] = [
  { label: "Dashboard", to: "/" },
  { label: "Clients", to: "/clients" },
  { label: "SIL", to: "/sil" },
  { label: "Scheduler • Roster", to: "/scheduler/roster" },
  { label: "Scheduler • Vacant Shifts", to: "/scheduler/vacant-shifts" },
];

export default function SpotlightSearch() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const groups = useMemo(() => {
    return [
      { heading: "Navigate", items: quickLinks },
    ];
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="h-8 px-2 text-sm text-muted-foreground flex items-center gap-2"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search…</span>
        <kbd className="ml-2 hidden md:inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium bg-muted text-muted-foreground">
          <span className="font-sans">{navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages and actions…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {groups.map((g) => (
            <CommandGroup key={g.heading} heading={g.heading}>
              {g.items.map((item) => (
                <CommandItem
                  key={item.label}
                  onSelect={() => {
                    setOpen(false);
                    navigate(item.to);
                  }}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Shortcuts">
            <CommandItem disabled>Open search (⌘/Ctrl + K)</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
