"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Settings, CheckCircle, AlertCircle, Key, Shield } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

interface EmailConfig {
  provider: 'resend' | 'gmail' | 'outlook'
  resendApiKey?: string
  resendFromEmail?: string
  gmailSmtpUser?: string
  gmailSmtpPass?: string
  gmailFromEmail?: string
  outlookSmtpUser?: string
  outlookSmtpPass?: string
  outlookFromEmail?: string
}

export function EmailSettings() {
  const { user } = useAuth()
  const [config, setConfig] = useState<EmailConfig>({ provider: 'resend' })
  const [loading, setLoading] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)

  // Load existing config from localStorage (in production, save to Firestore)
  useEffect(() => {
    const savedConfig = localStorage.getItem('emailConfig')
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
    }
  }, [])

  const saveConfig = async () => {
    if (!user?.uid) return
    
    setLoading(true)
    try {
      // Validate required fields based on provider
      if (config.provider === 'resend' && (!config.resendApiKey || !config.resendFromEmail)) {
        toast.error('Resend API key en from email zijn verplicht')
        return
      }
      if (config.provider === 'gmail' && (!config.gmailSmtpUser || !config.gmailSmtpPass || !config.gmailFromEmail)) {
        toast.error('Gmail SMTP user, password en from email zijn verplicht')
        return
      }
      if (config.provider === 'outlook' && (!config.outlookSmtpUser || !config.outlookSmtpPass || !config.outlookFromEmail)) {
        toast.error('Outlook SMTP user, password en from email zijn verplicht')
        return
      }

      // Save to localStorage (in production, save to Firestore)
      localStorage.setItem('emailConfig', JSON.stringify(config))
      
      // In production, also save to Firestore:
      // await updateDoc(doc(db, "users", user.uid), {
      //   emailConfig: config,
      //   updatedAt: serverTimestamp()
      // })

      toast.success('Email configuratie opgeslagen')
    } catch (error) {
      toast.error('Fout bij opslaan configuratie')
    } finally {
      setLoading(false)
    }
  }

  const testEmailConfig = async () => {
    setTesting(true)
    setTestResult(null)
    
    try {
      // Test with custom config
      const configParam = encodeURIComponent(JSON.stringify(config))
      const response = await fetch(`/api/reminders/send-custom?config=${configParam}`, {
        method: 'GET',
      })
      
      const result = await response.json()
      
      if (response.ok) {
        setTestResult({ success: true, message: result.message })
        toast.success('Email test succesvol!')
      } else {
        setTestResult({ success: false, message: result.error })
        toast.error('Email test mislukt')
      }
    } catch (error) {
      const message = 'Email test mislukt - controleer je configuratie'
      setTestResult({ success: false, message })
      toast.error(message)
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Mail className="w-5 h-5" />
        <h2 className="text-2xl font-bold">Email Instellingen</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Email Provider Configuratie
          </CardTitle>
          <CardDescription>
            Kies je email provider en configureer de verzendinstellingen voor factuurherinneringen.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Provider Selection */}
          <div className="space-y-2">
            <Label htmlFor="provider">Email Provider</Label>
            <Select
              value={config.provider}
              onValueChange={(value: 'resend' | 'gmail' | 'outlook') => 
                setConfig(prev => ({ ...prev, provider: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Kies provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="resend">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Resend (Aanbevolen)
                  </div>
                </SelectItem>
                <SelectItem value="gmail">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Gmail SMTP
                  </div>
                </SelectItem>
                <SelectItem value="outlook">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Outlook SMTP
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Provider-specific configuration */}
          <Tabs value={config.provider} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="resend">Resend</TabsTrigger>
              <TabsTrigger value="gmail">Gmail</TabsTrigger>
              <TabsTrigger value="outlook">Outlook</TabsTrigger>
            </TabsList>

            <TabsContent value="resend" className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Resend is een professionele email service. Vereist domein verificatie op resend.com.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <Label htmlFor="resendApiKey">Resend API Key</Label>
                <Input
                  id="resendApiKey"
                  type="password"
                  placeholder="re_xxxxxxxxxxxxxx"
                  value={config.resendApiKey || ''}
                  onChange={(e) => setConfig(prev => ({ ...prev, resendApiKey: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="resendFromEmail">From Email</Label>
                <Input
                  id="resendFromEmail"
                  type="email"
                  placeholder="noreply@archonpro.com"
                  value={config.resendFromEmail || ''}
                  onChange={(e) => setConfig(prev => ({ ...prev, resendFromEmail: e.target.value }))}
                />
              </div>
            </TabsContent>

            <TabsContent value="gmail" className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Gmail vereist 2FA en een App Password. Ga naar Google App Passwords om er een te genereren.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <Label htmlFor="gmailSmtpUser">Gmail Email</Label>
                <Input
                  id="gmailSmtpUser"
                  type="email"
                  placeholder="your-email@gmail.com"
                  value={config.gmailSmtpUser || ''}
                  onChange={(e) => setConfig(prev => ({ ...prev, gmailSmtpUser: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gmailSmtpPass">App Password</Label>
                <Input
                  id="gmailSmtpPass"
                  type="password"
                  placeholder="16-char app password"
                  value={config.gmailSmtpPass || ''}
                  onChange={(e) => setConfig(prev => ({ ...prev, gmailSmtpPass: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gmailFromEmail">From Email</Label>
                <Input
                  id="gmailFromEmail"
                  type="email"
                  placeholder="your-email@gmail.com"
                  value={config.gmailFromEmail || ''}
                  onChange={(e) => setConfig(prev => ({ ...prev, gmailFromEmail: e.target.value }))}
                />
              </div>
            </TabsContent>

            <TabsContent value="outlook" className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Outlook vereist 2FA en een App Password. Ga naar Microsoft Account Security om er een te genereren.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <Label htmlFor="outlookSmtpUser">Outlook Email</Label>
                <Input
                  id="outlookSmtpUser"
                  type="email"
                  placeholder="your-email@outlook.com"
                  value={config.outlookSmtpUser || ''}
                  onChange={(e) => setConfig(prev => ({ ...prev, outlookSmtpUser: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="outlookSmtpPass">App Password</Label>
                <Input
                  id="outlookSmtpPass"
                  type="password"
                  placeholder="App password"
                  value={config.outlookSmtpPass || ''}
                  onChange={(e) => setConfig(prev => ({ ...prev, outlookSmtpPass: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="outlookFromEmail">From Email</Label>
                <Input
                  id="outlookFromEmail"
                  type="email"
                  placeholder="your-email@outlook.com"
                  value={config.outlookFromEmail || ''}
                  onChange={(e) => setConfig(prev => ({ ...prev, outlookFromEmail: e.target.value }))}
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Test Result */}
          {testResult && (
            <Alert className={testResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              {testResult.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={testResult.success ? "text-green-800" : "text-red-800"}>
                {testResult.message}
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button onClick={saveConfig} disabled={loading}>
              {loading ? "Opslaan..." : "Configuratie Opslaan"}
            </Button>
            <Button variant="outline" onClick={testEmailConfig} disabled={testing}>
              {testing ? "Testen..." : "Test Email"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Configuratie Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Provider:</span>
            <Badge variant="outline">{config.provider.toUpperCase()}</Badge>
          </div>
          
          {config.provider === 'resend' && (
            <>
              <div className="flex items-center justify-between">
                <span>API Key:</span>
                <Badge variant={config.resendApiKey ? "default" : "destructive"}>
                  {config.resendApiKey ? "✓ Geconfigureerd" : "✗ Ontbreekt"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>From Email:</span>
                <Badge variant={config.resendFromEmail ? "default" : "destructive"}>
                  {config.resendFromEmail ? "✓ Geconfigureerd" : "✗ Ontbreekt"}
                </Badge>
              </div>
            </>
          )}
          
          {config.provider === 'gmail' && (
            <>
              <div className="flex items-center justify-between">
                <span>Gmail Account:</span>
                <Badge variant={config.gmailSmtpUser ? "default" : "destructive"}>
                  {config.gmailSmtpUser ? "✓ Geconfigureerd" : "✗ Ontbreekt"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>App Password:</span>
                <Badge variant={config.gmailSmtpPass ? "default" : "destructive"}>
                  {config.gmailSmtpPass ? "✓ Geconfigureerd" : "✗ Ontbreekt"}
                </Badge>
              </div>
            </>
          )}
          
          {config.provider === 'outlook' && (
            <>
              <div className="flex items-center justify-between">
                <span>Outlook Account:</span>
                <Badge variant={config.outlookSmtpUser ? "default" : "destructive"}>
                  {config.outlookSmtpUser ? "✓ Geconfigureerd" : "✗ Ontbreekt"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>App Password:</span>
                <Badge variant={config.outlookSmtpPass ? "default" : "destructive"}>
                  {config.outlookSmtpPass ? "✓ Geconfigureerd" : "✗ Ontbreekt"}
                </Badge>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
