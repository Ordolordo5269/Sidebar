"use client"

import type * as React from "react"
import { ChevronDown, Globe, Banknote, Landmark, Shield, Users, Globe2, Cpu, Palette } from "lucide-react"
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
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"

export function CountrySidebar() {
  return (
    <SidebarProvider>
      <Sidebar side="right" variant="floating" className="border-l border-slate-800">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search country data..."
              className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-400"
            />
          </div>
        </SidebarHeader>
        <SidebarContent className="bg-slate-900/95 text-slate-200">
          {/* General Information */}
          <CategoryGroup
            icon={<Globe className="text-blue-400" />}
            title="General Information"
            items={[
              "Official Name",
              "Flag",
              "Surface Area",
              "Languages",
              "Currency",
              "ISO Code",
              "Continent",
              "Capital City",
              "Population",
              "Government Type",
            ]}
          />

          {/* Economy */}
          <CategoryGroup
            icon={<Banknote className="text-green-400" />}
            title="Economy"
            items={[
              "GDP (Gross Domestic Product)",
              "GDP per Capita",
              "Inflation Rate",
              "GINI Index",
              "GDP Sector Breakdown",
              "Exports & Imports",
              "Main Trade Partners",
              "External Debt",
              "Unemployment Rate",
            ]}
          />

          {/* Politics */}
          <CategoryGroup
            icon={<Landmark className="text-purple-400" />}
            title="Politics"
            items={["Political Parties", "Political System", "Head of State / Government", "Political Stability"]}
          />

          {/* Defence */}
          <CategoryGroup
            icon={<Shield className="text-red-400" />}
            title="Defence"
            items={[
              "Military Budget",
              "Armed Forces Size",
              "Active Conflicts",
              "Peace Operations",
              "Main Military Adversaries",
            ]}
          />

          {/* Social */}
          <CategoryGroup
            icon={<Users className="text-yellow-400" />}
            title="Social"
            items={[
              "Life Expectancy",
              "Literacy Rate",
              "Poverty Indicators",
              "Health & Education Access",
              "Human Development Index (HDI)",
              "Demographics",
              "Birth / Death Rates",
              "Urban / Rural Population (%)",
              "Population Density",
            ]}
          />

          {/* International */}
          <CategoryGroup
            icon={<Globe2 className="text-cyan-400" />}
            title="International"
            items={[
              "International Organizations Membership",
              "Treaties",
              "Regional Cooperation",
              "Official Development Assistance (ODA)",
              "Top Recipients",
              "Rival Countries",
              "Key Allies",
            ]}
          />

          {/* Technology & National Assets */}
          <CategoryGroup
            icon={<Cpu className="text-indigo-400" />}
            title="Technology & National Assets"
            items={[
              "R&D Index",
              "Tech Exports",
              "Top National Companies",
              "State-Owned Enterprises (SOEs)",
              "Strategic Holdings",
              "Sovereign Wealth Funds",
              "Strategic Industries & Specializations",
              "Industrial Policy",
              "Critical Minerals & Share of Global Supply",
            ]}
          />

          {/* Culture */}
          <CategoryGroup
            icon={<Palette className="text-pink-400" />}
            title="Culture"
            items={["Religions", "UNESCO World Heritage Sites", "Soft Power Metrics"]}
          />
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}

interface CategoryGroupProps {
  icon: React.ReactNode
  title: string
  items: string[]
}

function CategoryGroup({ icon, title, items }: CategoryGroupProps) {
  return (
    <SidebarGroup>
      <Collapsible className="w-full group/collapsible">
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="flex w-full items-center gap-2 hover:bg-slate-800 rounded-md p-2">
            {icon}
            <span>{title}</span>
            <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item}>
                  <SidebarMenuButton asChild className="hover:bg-slate-800 text-slate-300 hover:text-slate-100">
                    <a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}>
                      <span>{item}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  )
}
