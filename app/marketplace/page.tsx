"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, MapPin, DollarSign, Eye, Briefcase, Users, Calendar, Send, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { useUser } from '@clerk/nextjs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface JobPosting {
  id: string
  title: string
  company: string
  type: 'job' | 'internship'
  location: string
  salary: string
  description: string
  requirements: string[]
  applications: number
  status: 'active' | 'paused' | 'closed'
  postedDate: string
  companyId: string
}

export default function MarketplacePage() {
  const { user, isSignedIn } = useUser()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([])
  const [showApplicationDialog, setShowApplicationDialog] = useState(false)
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null)
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    resume: '',
    phone: '',
    experience: ''
  })

  useEffect(() => {
    // Load job postings from localStorage
    const storedJobs = localStorage.getItem('org-job-postings')
    if (storedJobs) {
      setJobPostings(JSON.parse(storedJobs))
    } else {
      // Create some sample job postings
      const sampleJobs: JobPosting[] = [
        {
          id: '1',
          title: 'Senior Software Engineer',
          company: 'TechCorp Inc.',
          type: 'job',
          location: 'San Francisco, CA',
          salary: '$120,000 - $150,000',
          description: 'We are looking for a senior software engineer to join our team building next-generation web applications. You will work with cutting-edge technologies and collaborate with a talented team of developers.',
          requirements: ['5+ years experience', 'React, Node.js', 'AWS knowledge', 'TypeScript', 'Team leadership'],
          applications: 12,
          status: 'active',
          postedDate: '2024-01-15',
          companyId: 'techcorp'
        },
        {
          id: '2',
          title: 'Frontend Developer Intern',
          company: 'StartupXYZ',
          type: 'internship',
          location: 'Remote',
          salary: '$3,000/month',
          description: 'Great opportunity for students to gain real-world experience in frontend development. Work on real projects and learn from experienced developers.',
          requirements: ['React knowledge', 'CSS/HTML', 'Student status', 'Git basics', 'Passion for learning'],
          applications: 8,
          status: 'active',
          postedDate: '2024-01-20',
          companyId: 'startupxyz'
        },
        {
          id: '3',
          title: 'Full Stack Developer',
          company: 'InnovateLab',
          type: 'job',
          location: 'New York, NY',
          salary: '$100,000 - $130,000',
          description: 'Join our innovative team to build scalable web applications. We offer flexible work arrangements and opportunities for growth.',
          requirements: ['3+ years experience', 'JavaScript, Python', 'Database design', 'API development', 'Problem-solving skills'],
          applications: 15,
          status: 'active',
          postedDate: '2024-01-18',
          companyId: 'innovatelab'
        }
      ]
      setJobPostings(sampleJobs)
      localStorage.setItem('org-job-postings', JSON.stringify(sampleJobs))
    }
  }, [])

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
  }

  const handleApplyJob = (job: JobPosting) => {
    if (!isSignedIn) {
      alert('Please sign in to apply for jobs')
      return
    }
    setSelectedJob(job)
    setShowApplicationDialog(true)
  }

  const handleSubmitApplication = () => {
    if (!selectedJob || !isSignedIn) return

    const application = {
      id: Date.now().toString(),
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      company: selectedJob.company,
      applicantName: user?.fullName || 'User',
      applicantEmail: user?.primaryEmailAddress?.emailAddress || '',
      phone: applicationData.phone,
      coverLetter: applicationData.coverLetter,
      resume: applicationData.resume,
      experience: applicationData.experience,
      status: 'pending',
      appliedDate: new Date().toISOString()
    }

    // Store application in localStorage
    const storedApplications = localStorage.getItem('job-applications')
    const applications = storedApplications ? JSON.parse(storedApplications) : []
    applications.push(application)
    localStorage.setItem('job-applications', JSON.stringify(applications))

    // Update job applications count
    const updatedJobs = jobPostings.map(job => 
      job.id === selectedJob.id 
        ? { ...job, applications: job.applications + 1 }
        : job
    )
    setJobPostings(updatedJobs)
    localStorage.setItem('org-job-postings', JSON.stringify(updatedJobs))

    setApplicationData({
      coverLetter: '',
      resume: '',
      phone: '',
      experience: ''
    })
    setShowApplicationDialog(false)
    setSelectedJob(null)
    alert('Application submitted successfully!')
  }

  const filteredJobs = jobPostings.filter(job => {
    if (selectedCategory !== "All" && job.type !== selectedCategory.toLowerCase()) {
      return false
    }
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="md:ml-64 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Job Marketplace</h1>
            <p className="text-muted-foreground">Discover amazing job opportunities and internships</p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 flex flex-col md:flex-row gap-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search jobs, companies, locations..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2">
              {["All", "Job", "Internship"].map((category) => (
                <Badge
                  key={category}
                  variant={category === selectedCategory ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Job Postings */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredJobs.map((job) => (
              <motion.div key={job.id} variants={itemVariants}>
                <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {job.title}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{job.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      <Badge variant={job.type === 'job' ? 'default' : 'secondary'}>
                        {job.type === 'job' ? 'Full-time' : 'Internship'}
                      </Badge>
                      <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                        {job.status}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-semibold text-foreground">{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{job.applications} applications</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Posted {job.postedDate}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <Button 
                        onClick={() => handleApplyJob(job)}
                        className="w-full"
                        disabled={job.status !== 'active'}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {job.status === 'active' ? 'Apply Now' : 'Not Available'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredJobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No job postings found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? 'Try adjusting your search criteria' : 'Check back later for new opportunities'}
              </p>
            </motion.div>
          )}

          {/* Application Dialog */}
          <Dialog open={showApplicationDialog} onOpenChange={setShowApplicationDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
              </DialogHeader>
              {selectedJob && (
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold">{selectedJob.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedJob.company}</p>
                    <p className="text-sm text-muted-foreground">{selectedJob.location} • {selectedJob.salary}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={applicationData.phone}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience *</Label>
                      <Input
                        id="experience"
                        value={applicationData.experience}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, experience: e.target.value }))}
                        placeholder="e.g., 3 years"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="resume">Resume/CV Link *</Label>
                      <Input
                        id="resume"
                        value={applicationData.resume}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, resume: e.target.value }))}
                        placeholder="https://drive.google.com/your-resume.pdf"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="coverLetter">Cover Letter *</Label>
                      <Textarea
                        id="coverLetter"
                        value={applicationData.coverLetter}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, coverLetter: e.target.value }))}
                        placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowApplicationDialog(false)
                        setSelectedJob(null)
                        setApplicationData({
                          coverLetter: '',
                          resume: '',
                          phone: '',
                          experience: ''
                        })
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmitApplication}
                      disabled={!applicationData.phone || !applicationData.experience || !applicationData.resume || !applicationData.coverLetter}
                      className="flex-1"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit Application
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  )
}
