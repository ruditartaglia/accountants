"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const workTypes = [
  "Website",
  "SEO",
  "Social Media",
  "Copywriting",
  "Media Buying",
  "Marketing Strategy",
  "Marketing 1 Day Workshop"
]

export default function HomePage() {
  const [formData, setFormData] = useState({
    accountantName: '',
    accountantEmail: '',
    clientName: '',
    workTypes: [],
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (type) => {
    setFormData(prev => ({
      ...prev,
      workTypes: prev.workTypes.includes(type)
        ? prev.workTypes.filter(t => t !== type)
        : [...prev.workTypes, type]
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.accountantName.trim()) newErrors.accountantName = 'Accountant Name is required'
    if (!formData.accountantEmail.trim()) newErrors.accountantEmail = 'Accountant Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.accountantEmail)) newErrors.accountantEmail = 'Email is invalid'
    if (!formData.clientName.trim()) newErrors.clientName = 'Client Name is required'
    if (formData.workTypes.length === 0) newErrors.workTypes = 'Please select at least one type of work'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData)
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSubmitting(false)
      alert('Form submitted successfully! Check your email for the ticket number.')
      // Reset form after submission
      setFormData({ accountantName: '', accountantEmail: '', clientName: '', workTypes: [] })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Tartaglia Marketing - Request for Quote</CardTitle>
          <CardDescription className="text-center mt-2">
            Please fill out the form below to request a quote for our marketing services.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="accountantName">Accountant's Name</Label>
              <Input
                id="accountantName"
                name="accountantName"
                value={formData.accountantName}
                onChange={handleInputChange}
                className={errors.accountantName ? "border-red-500" : ""}
              />
              {errors.accountantName && <p className="text-red-500 text-sm mt-1">{errors.accountantName}</p>}
            </div>
            <div>
              <Label htmlFor="accountantEmail">Accountant's Email Address</Label>
              <Input
                id="accountantEmail"
                name="accountantEmail"
                type="email"
                value={formData.accountantEmail}
                onChange={handleInputChange}
                className={errors.accountantEmail ? "border-red-500" : ""}
              />
              {errors.accountantEmail && <p className="text-red-500 text-sm mt-1">{errors.accountantEmail}</p>}
            </div>
            <div>
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                className={errors.clientName ? "border-red-500" : ""}
              />
              {errors.clientName && <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>}
            </div>
            <div>
              <Label>Type of Work</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {workTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={formData.workTypes.includes(type)}
                      onCheckedChange={() => handleCheckboxChange(type)}
                    />
                    <label htmlFor={type} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
              {errors.workTypes && <p className="text-red-500 text-sm mt-1">{errors.workTypes}</p>}
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request for Quote'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}