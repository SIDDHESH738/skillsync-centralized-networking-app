// "use client"

// import type React from "react"
// import { useRouter } from "next/navigation";
// import { useState, useRef } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Github, Chrome } from "lucide-react"
// import Link from "next/link"
// import * as AnimeNS from "animejs"
// import router from "next/router";
// const anime: any = (AnimeNS as any).default ?? (AnimeNS as any)

// interface AuthFormProps {
//   mode: "login" | "signup"
// }

// export function AuthForm({ mode }: AuthFormProps) {
//   const [showPassword, setShowPassword] = useState(false)
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     name: "",
//     confirmPassword: "",
//   })
//   const [errors, setErrors] = useState<Record<string, string>>({})
//   const [isLoading, setIsLoading] = useState(false)
//   const formRef = useRef<HTMLDivElement>(null)

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: "" }))
//     }
//   }

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {}

//     if (!formData.email) {
//       newErrors.email = "Email is required"
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid"
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required"
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters"
//     }

//     if (mode === "signup") {
//       if (!formData.name) {
//         newErrors.name = "Name is required"
//       }
//       if (!formData.confirmPassword) {
//         newErrors.confirmPassword = "Please confirm your password"
//       } else if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = "Passwords do not match"
//       }
//     }

//     return newErrors
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const newErrors = validateForm()

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors)

//       // Shake animation for errors
//       if (formRef.current) {
//         anime({
//           targets: formRef.current,
//           translateX: [-10, 10, -10, 10, 0],
//           duration: 400,
//           easing: "easeInOutSine",
//         })
//       }
//       return
//     }

//     setIsLoading(true)

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 2000))

//     setIsLoading(false)
//     // console.log(`${mode} submitted:`, formData);
//     router.push("/dashboard");
//   }

//   const handleSocialAuth = (provider: string) => {
//     console.log(`${provider} authentication`)
//   }

//   return (
//     <motion.div
//       ref={formRef}
//       initial={{ opacity: 0, y: 20, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       transition={{ duration: 0.5, ease: "easeOut" }}
//       className="w-full max-w-md"
//     >
//       <Card className="backdrop-blur-xl bg-card/80 border-border/50 shadow-2xl">
//         <CardHeader className="text-center space-y-4">
//           <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
//             <CardTitle className="text-3xl font-display font-bold text-foreground">
//               {mode === "login" ? "Welcome Back" : "Join SkillSync"}
//             </CardTitle>
//             <CardDescription className="text-muted-foreground">
//               {mode === "login" ? "Sign in to your account to continue" : "Create your account to get started"}
//             </CardDescription>
//           </motion.div>

//           {/* Social Auth Buttons */}
//           <div className="flex gap-3">
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
//               <Button variant="outline" className="w-full bg-transparent" onClick={() => handleSocialAuth("google")}>
//                 <Chrome className="w-4 h-4 mr-2" />
//                 Google
//               </Button>
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
//               <Button variant="outline" className="w-full bg-transparent" onClick={() => handleSocialAuth("github")}>
//                 <Github className="w-4 h-4 mr-2" />
//                 GitHub
//               </Button>
//             </motion.div>
//           </div>

//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <span className="w-full border-t border-border" />
//             </div>
//             <div className="relative flex justify-center text-xs uppercase">
//               <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
//             </div>
//           </div>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <AnimatePresence mode="wait">
//               {mode === "signup" && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <div className="space-y-2">
//                     <Label htmlFor="name" className="text-sm font-medium">
//                       Full Name
//                     </Label>
//                     <div className="relative">
//                       <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//                       <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
//                         <Input
//                           id="name"
//                           type="text"
//                           placeholder="Enter your full name"
//                           value={formData.name}
//                           onChange={(e) => handleInputChange("name", e.target.value)}
//                           className={`pl-10 ${errors.name ? "border-destructive" : ""}`}
//                         />
//                       </motion.div>
//                     </div>
//                     {errors.name && (
//                       <motion.p
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="text-sm text-destructive"
//                       >
//                         {errors.name}
//                       </motion.p>
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <div className="space-y-2">
//               <Label htmlFor="email" className="text-sm font-medium">
//                 Email Address
//               </Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//                 <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={formData.email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                     className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
//                   />
//                 </motion.div>
//               </div>
//               {errors.email && (
//                 <motion.p
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="text-sm text-destructive"
//                 >
//                   {errors.email}
//                 </motion.p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password" className="text-sm font-medium">
//                 Password
//               </Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//                 <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
//                   <Input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     value={formData.password}
//                     onChange={(e) => handleInputChange("password", e.target.value)}
//                     className={`pl-10 pr-10 ${errors.password ? "border-destructive" : ""}`}
//                   />
//                 </motion.div>
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                 >
//                   {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <motion.p
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="text-sm text-destructive"
//                 >
//                   {errors.password}
//                 </motion.p>
//               )}
//             </div>

//             <AnimatePresence mode="wait">
//               {mode === "signup" && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <div className="space-y-2">
//                     <Label htmlFor="confirmPassword" className="text-sm font-medium">
//                       Confirm Password
//                     </Label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//                       <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
//                         <Input
//                           id="confirmPassword"
//                           type="password"
//                           placeholder="Confirm your password"
//                           value={formData.confirmPassword}
//                           onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
//                           className={`pl-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
//                         />
//                       </motion.div>
//                     </div>
//                     {errors.confirmPassword && (
//                       <motion.p
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="text-sm text-destructive"
//                       >
//                         {errors.confirmPassword}
//                       </motion.p>
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {mode === "login" && (
//               <div className="flex items-center justify-between">
//                 <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
//                   Forgot password?
//                 </Link>
//               </div>
//             )}

//             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//               <Button type="submit" className="w-full group" disabled={isLoading}>
//                 {isLoading ? (
//                   <motion.div
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                     className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
//                   />
//                 ) : (
//                   <>
//                     {mode === "login" ? "Sign In" : "Create Account"}
//                     <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//                   </>
//                 )}
//               </Button>
//             </motion.div>

//             <div className="text-center">
//               <span className="text-sm text-muted-foreground">
//                 {mode === "login" ? "Don't have an account?" : "Already have an account?"}
//               </span>{" "}
//               <Link
//                 href={mode === "login" ? "/auth/signup" : "/auth/login"}
//                 className="text-sm text-primary hover:underline font-medium"
//               >
//                 {mode === "login" ? "Sign up" : "Sign in"}
//               </Link>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </motion.div>
//   )
// }

"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Github, Chrome } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"   // ✅ for navigation
import * as AnimeNS from "animejs"
const anime: any = (AnimeNS as any).default ?? (AnimeNS as any)

interface AuthFormProps {
  mode: "login" | "signup"
}

export function AuthForm({ mode }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const router = useRouter()   // ✅ initialize router

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (mode === "signup") {
      if (!formData.name) {
        newErrors.name = "Name is required"
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password"
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)

      // Shake animation for errors
      if (formRef.current) {
        anime({
          targets: formRef.current,
          translateX: [-10, 10, -10, 10, 0],
          duration: 400,
          easing: "easeInOutSine",
        })
      }
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    console.log(`${mode} submitted:`, formData)

    // ✅ Navigate to dashboard after success
    router.push("/dashboard")
  }

  const handleSocialAuth = (provider: string) => {
    console.log(`${provider} authentication`)
    // Example: after auth success
    router.push("/dashboard")
  }

  return (
    <motion.div
      ref={formRef}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <Card className="backdrop-blur-xl bg-card/80 border-border/50 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <CardTitle className="text-3xl font-display font-bold text-foreground">
              {mode === "login" ? "Welcome Back" : "Join SkillSync"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {mode === "login" ? "Sign in to your account to continue" : "Create your account to get started"}
            </CardDescription>
          </motion.div>

          {/* Social Auth Buttons */}
          <div className="flex gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
              <Button variant="outline" className="w-full bg-transparent" onClick={() => handleSocialAuth("google")}>
                <Chrome className="w-4 h-4 mr-2" />
                Google
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
              <Button variant="outline" className="w-full bg-transparent" onClick={() => handleSocialAuth("github")}>
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </motion.div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
             {mode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className={`pl-10 ${errors.name ? "border-destructive" : ""}`}
                        />
                      </motion.div>
                    </div>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-destructive"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                  />
                </motion.div>
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`pl-10 pr-10 ${errors.password ? "border-destructive" : ""}`}
                  />
                </motion.div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            <AnimatePresence mode="wait">
              {mode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          className={`pl-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                        />
                      </motion.div>
                    </div>
                    {errors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-destructive"
                      >
                        {errors.confirmPassword}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {mode === "login" && (
              <div className="flex items-center justify-between">
                <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
            )}

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" className="w-full group" disabled={isLoading}>
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    {mode === "login" ? "Sign In" : "Create Account"}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </motion.div>

            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                {mode === "login" ? "Don't have an account?" : "Already have an account?"}
              </span>{" "}
              <Link
                href={mode === "login" ? "/auth/signup" : "/auth/login"}
                className="text-sm text-primary hover:underline font-medium"
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </form>






        </CardContent>
      </Card>
    </motion.div>
  )
}

