"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { UserButton, useUser } from '@clerk/nextjs'
import {
  Home,
  User,
  Users,
  MessageCircle,
  Briefcase,
  Settings,
  Sun,
  Moon,
  Menu,
  X,
  Rss,
  MapPin,
  Video,
} from "lucide-react"

const navigationItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Rss, label: "Feed", href: "/feed" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Users, label: "Connections", href: "/connections" },
  { icon: MessageCircle, label: "Messages", href: "/messages" },
  { icon: MapPin, label: "Connect Nearby", href: "/connect-nearby" },
  { icon: Video, label: "Take My Interview", href: "/interview" },
  { icon: Briefcase, label: "Marketplace", href: "/marketplace" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, isSignedIn } = useUser()

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`
        fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        <div className="flex h-full flex-col justify-evenly">
          {/* Logo */}
          <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
            {isSignedIn && (
              <div className="flex justify-center">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                      userButtonPopoverCard: "bg-card border-border",
                      userButtonPopoverActionButton: "text-foreground hover:bg-muted",
                    }
                  }}
                />
              </div>
            )}
            <h1 className="text-xl font-display font-bold text-sidebar-foreground">SkillSync</h1>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2 p-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Info and Actions */}
          <div className="p-4 border-t border-sidebar-border space-y-2">
            {isSignedIn && user && (
              <div className="px-3 py-2 text-sm text-sidebar-foreground">
                <p className="font-medium">{user.fullName || user.firstName}</p>
                <p className="text-xs text-muted-foreground">{user.primaryEmailAddress?.emailAddress}</p>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-full justify-start gap-3"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  Dark Mode
                </>
              )}
            </Button>

            
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
