"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  HelpCircle,
  ChevronRight,
  Moon,
  Sun,
  Monitor,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"

const settingsCategories = [
  {
    id: "profile",
    title: "Profile Settings",
    icon: User,
    description: "Manage your personal information and preferences",
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    description: "Control how and when you receive notifications",
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    icon: Shield,
    description: "Manage your privacy settings and security options",
  },
  {
    id: "appearance",
    title: "Appearance",
    icon: Palette,
    description: "Customize the look and feel of your experience",
  },
  {
    id: "language",
    title: "Language & Region",
    icon: Globe,
    description: "Set your language and regional preferences",
  },
  {
    id: "billing",
    title: "Billing & Subscription",
    icon: CreditCard,
    description: "Manage your subscription and payment methods",
  },
  {
    id: "help",
    title: "Help & Support",
    icon: HelpCircle,
    description: "Get help and contact support",
  },
]

const notificationSettings = [
  { id: "email", label: "Email Notifications", enabled: true },
  { id: "push", label: "Push Notifications", enabled: true },
  { id: "sms", label: "SMS Notifications", enabled: false },
  { id: "marketing", label: "Marketing Communications", enabled: false },
  { id: "connections", label: "New Connections", enabled: true },
  { id: "messages", label: "New Messages", enabled: true },
  { id: "posts", label: "Post Interactions", enabled: true },
]

const privacySettings = [
  { id: "profile_visibility", label: "Profile Visibility", enabled: true },
  { id: "search_visibility", label: "Appear in Search Results", enabled: true },
  { id: "activity_status", label: "Show Activity Status", enabled: false },
  { id: "read_receipts", label: "Read Receipts", enabled: true },
  { id: "data_analytics", label: "Data Analytics", enabled: false },
]

export default function SettingsPage() {
  const [activeCategory, setActiveCategory] = useState("profile")
  const [notifications, setNotifications] = useState(notificationSettings)
  const [privacy, setPrivacy] = useState(privacySettings)
  const { theme, setTheme } = useTheme()

  const toggleNotification = (id: string) => {
    setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item)))
  }

  const togglePrivacy = (id: string) => {
    setPrivacy((prev) => prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item)))
  }

  const renderSettingsContent = () => {
    switch (activeCategory) {
      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {notifications.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between">
                    <Label htmlFor={setting.id} className="text-sm font-medium">
                      {setting.label}
                    </Label>
                    <Switch
                      id={setting.id}
                      checked={setting.enabled}
                      onCheckedChange={() => toggleNotification(setting.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "privacy":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Privacy Controls</h3>
              <div className="space-y-4">
                {privacy.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between">
                    <Label htmlFor={setting.id} className="text-sm font-medium">
                      {setting.label}
                    </Label>
                    <Switch
                      id={setting.id}
                      checked={setting.enabled}
                      onCheckedChange={() => togglePrivacy(setting.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "appearance":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Theme Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: "light", label: "Light", icon: Sun },
                  { value: "dark", label: "Dark", icon: Moon },
                  { value: "system", label: "System", icon: Monitor },
                ].map((themeOption) => {
                  const Icon = themeOption.icon
                  return (
                    <Card
                      key={themeOption.value}
                      className={`cursor-pointer transition-all duration-200 ${
                        theme === themeOption.value ? "ring-2 ring-primary border-primary" : "hover:border-primary/50"
                      }`}
                      onClick={() => setTheme(themeOption.value)}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <Icon className="w-8 h-8 mb-2" />
                        <span className="font-medium">{themeOption.label}</span>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Coming Soon</h3>
              <p className="text-muted-foreground">
                This section is currently under development. Check back soon for more settings options.
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Settings</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {settingsCategories.map((category) => {
                    const Icon = category.icon
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors ${
                          activeCategory === category.id
                            ? "bg-muted border-r-2 border-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{category.title}</span>
                        </div>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </motion.div>

          {/* Settings Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card>
              <CardHeader>
                <CardTitle>{settingsCategories.find((cat) => cat.id === activeCategory)?.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {settingsCategories.find((cat) => cat.id === activeCategory)?.description}
                </p>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderSettingsContent()}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
