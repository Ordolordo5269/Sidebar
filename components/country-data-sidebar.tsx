"use client"

import * as React from "react"
import {
  ChevronDown,
  Globe,
  Banknote,
  Landmark,
  Shield,
  Users,
  Globe2,
  Cpu,
  Palette,
  Search,
  X,
  BarChart3,
  PanelRight,
  PanelRightClose,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface CountryData {
  name: string
  flag: string
  code: string
}

interface DataItem {
  id: string
  label: string
  value?: string | number
  hasChart?: boolean
  isOptional?: boolean
}

interface CategoryData {
  id: string
  title: string
  icon: React.ReactNode
  color: string
  items: DataItem[]
  isExpanded?: boolean
}

const mockCountryData: CountryData = {
  name: "United States",
  flag: "🇺🇸",
  code: "US",
}

const categoryData: CategoryData[] = [
  {
    id: "general",
    title: "General Information",
    icon: <Globe className="w-4 h-4" />,
    color: "text-blue-400",
    items: [
      { id: "official-name", label: "Official Name", value: "United States of America" },
      { id: "flag", label: "Flag", value: "🇺🇸" },
      { id: "surface-area", label: "Surface Area", value: "9.8M km²" },
      { id: "languages", label: "Languages", value: "English" },
      { id: "currency", label: "Currency", value: "USD" },
      { id: "iso-code", label: "ISO Code", value: "US" },
      { id: "continent", label: "Continent", value: "North America" },
      { id: "capital", label: "Capital City", value: "Washington, D.C." },
      { id: "population", label: "Population", value: "331M", hasChart: true },
      { id: "government", label: "Government Type", value: "Federal Republic" },
    ],
  },
  {
    id: "economy",
    title: "Economy",
    icon: <Banknote className="w-4 h-4" />,
    color: "text-green-400",
    items: [
      { id: "gdp", label: "GDP (Gross Domestic Product)", value: "$26.9T", hasChart: true },
      { id: "gdp-per-capita", label: "GDP per Capita", value: "$80,412" },
      { id: "inflation", label: "Inflation Rate", value: "3.2%", hasChart: true },
      { id: "gini", label: "GINI Index", value: "41.4" },
      { id: "gdp-breakdown", label: "GDP Sector Breakdown", hasChart: true },
      { id: "exports-imports", label: "Exports & Imports", value: "$1.6T / $2.4T", hasChart: true },
      { id: "trade-partners", label: "Main Trade Partners" },
      { id: "external-debt", label: "External Debt", value: "$24.3T" },
      { id: "unemployment", label: "Unemployment Rate", value: "3.7%", hasChart: true },
    ],
  },
  {
    id: "politics",
    title: "Politics",
    icon: <Landmark className="w-4 h-4" />,
    color: "text-purple-400",
    items: [
      { id: "political-parties", label: "Political Parties" },
      { id: "political-system", label: "Political System", value: "Federal Presidential Republic" },
      { id: "head-of-state", label: "Head of State / Government" },
      { id: "political-stability", label: "Political Stability", hasChart: true },
    ],
  },
  {
    id: "defense",
    title: "Defense",
    icon: <Shield className="w-4 h-4" />,
    color: "text-red-400",
    items: [
      { id: "military-budget", label: "Military Budget", value: "$816B", hasChart: true },
      { id: "armed-forces", label: "Armed Forces Size", value: "1.4M active" },
      { id: "active-conflicts", label: "Active Conflicts" },
      { id: "peace-operations", label: "Peace Operations" },
      { id: "military-adversaries", label: "Main Military Adversaries", isOptional: true },
    ],
  },
  {
    id: "social",
    title: "Social",
    icon: <Users className="w-4 h-4" />,
    color: "text-yellow-400",
    items: [
      { id: "life-expectancy", label: "Life Expectancy", value: "78.9 years", hasChart: true },
      { id: "literacy-rate", label: "Literacy Rate", value: "99%" },
      { id: "poverty", label: "Poverty Indicators", hasChart: true },
      { id: "health-education", label: "Health & Education Access" },
      { id: "hdi", label: "Human Development Index (HDI)", value: "0.921" },
      { id: "demographics", label: "Demographics", hasChart: true },
      { id: "birth-death-rates", label: "Birth / Death Rates", hasChart: true },
      { id: "urban-rural", label: "Urban / Rural Population (%)", value: "83% / 17%", hasChart: true },
      { id: "population-density", label: "Population Density", value: "36/km²" },
    ],
  },
  {
    id: "international",
    title: "International",
    icon: <Globe2 className="w-4 h-4" />,
    color: "text-cyan-400",
    items: [
      { id: "organizations", label: "International Organizations Membership" },
      { id: "treaties", label: "Treaties" },
      { id: "regional-cooperation", label: "Regional Cooperation" },
      { id: "oda", label: "Official Development Assistance (ODA)", hasChart: true },
      { id: "top-recipients", label: "Top Recipients" },
      { id: "rival-countries", label: "Rival Countries" },
      { id: "key-allies", label: "Key Allies" },
    ],
  },
  {
    id: "technology",
    title: "Technology & National Assets",
    icon: <Cpu className="w-4 h-4" />,
    color: "text-indigo-400",
    items: [
      { id: "rd-index", label: "R&D Index", value: "2.84%", hasChart: true },
      { id: "tech-exports", label: "Tech Exports", value: "$156B", hasChart: true },
      { id: "top-companies", label: "Top National Companies" },
      { id: "soes", label: "State-Owned Enterprises (SOEs)" },
      { id: "strategic-holdings", label: "Strategic Holdings" },
      { id: "sovereign-funds", label: "Sovereign Wealth Funds" },
      { id: "strategic-industries", label: "Strategic Industries & Specializations" },
      { id: "industrial-policy", label: "Industrial Policy" },
      { id: "critical-minerals", label: "Critical Minerals & Share of Global Supply", hasChart: true },
    ],
  },
  {
    id: "culture",
    title: "Culture",
    icon: <Palette className="w-4 h-4" />,
    color: "text-pink-400",
    items: [
      { id: "religions", label: "Religions", hasChart: true },
      { id: "unesco-sites", label: "UNESCO World Heritage Sites", value: "12 sites" },
      { id: "soft-power", label: "Soft Power Metrics", hasChart: true },
    ],
  },
]

function SidebarToggleButton() {
  const { open, toggleSidebar } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleSidebar}
      className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
      title={open ? "Close sidebar" : "Open sidebar"}
    >
      {open ? <PanelRightClose className="w-4 h-4" /> : <PanelRight className="w-4 h-4" />}
    </Button>
  )
}

function SidebarContentComponent() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [expandedCategories, setExpandedCategories] = React.useState<string[]>(["general"])
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null)

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const filteredCategories = categoryData
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => item.label.toLowerCase().includes(searchTerm.toLowerCase())),
    }))
    .filter((category) => category.items.length > 0)

  return (
    <>
      <SidebarHeader className="p-4 border-b border-slate-800/50">
        {/* Toggle Button and Title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            <h2 className="font-semibold text-white text-sm">Country Data</h2>
          </div>
          <SidebarToggleButton />
        </div>

        {/* Country Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="text-2xl">{mockCountryData.flag}</div>
          <div>
            <h3 className="font-semibold text-white">{mockCountryData.name}</h3>
            <p className="text-sm text-slate-400">{mockCountryData.code}</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search country data..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-400 focus:border-blue-400"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-slate-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-slate-900/30 backdrop-blur-sm">
        <ScrollArea className="h-full">
          {filteredCategories.map((category) => (
            <SidebarGroup key={category.id} className="px-2">
              <Collapsible
                open={expandedCategories.includes(category.id)}
                onOpenChange={() => toggleCategory(category.id)}
              >
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 hover:bg-slate-800/50 rounded-lg p-3 transition-colors group">
                    <div className="flex items-center gap-2">
                      <div className={category.color}>{category.icon}</div>
                      <span className="font-medium text-white">{category.title}</span>
                      <Badge variant="secondary" className="ml-auto bg-slate-800 text-slate-300 text-xs">
                        {category.items.length}
                      </Badge>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 transition-transform group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>

                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu className="mt-2">
                      {category.items.map((item) => (
                        <SidebarMenuItem key={item.id}>
                          <SidebarMenuButton
                            asChild
                            className={`hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors ${
                              selectedItem === item.id ? "bg-slate-800 text-white" : ""
                            }`}
                            onClick={() => setSelectedItem(item.id)}
                          >
                            <div className="flex items-center justify-between w-full p-2 cursor-pointer">
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <span className="text-sm truncate">{item.label}</span>
                                {item.isOptional && (
                                  <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                                    Optional
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                {item.hasChart && <BarChart3 className="w-3 h-3 text-slate-500" />}
                                {item.value && <span className="text-xs text-slate-400 font-mono">{item.value}</span>}
                              </div>
                            </div>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
              {category.id !== "culture" && <Separator className="my-2 bg-slate-800/50" />}
            </SidebarGroup>
          ))}
        </ScrollArea>
      </SidebarContent>
    </>
  )
}

export function CountryDataSidebar() {
  return (
    <div className="min-h-screen bg-black">
      <SidebarProvider defaultOpen={true}>
        <Sidebar
          side="right"
          variant="floating"
          collapsible="offcanvas"
          className="w-1/4 min-w-[400px] border-l border-slate-800/50 backdrop-blur-sm fixed right-0 top-0 h-full z-50"
        >
          <SidebarContentComponent />
        </Sidebar>
      </SidebarProvider>
    </div>
  )
}
