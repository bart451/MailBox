import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs'
import { Card, CardContent } from './components/ui/card'
import { Inbox, Mail, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

const emails = [
  {
    id: 1,
    sender: 'GitHub',
    subject: 'Je repository is bijgewerkt',
    preview: 'De repository die je volgt heeft nieuwe commits...',
    read: false,
    starred: true
  },
  {
    id: 2,
    sender: 'LinkedIn',
    subject: 'Nieuwe vacatures voor jou',
    preview: 'Op basis van je profiel hebben we deze vacatures gevonden...',
    read: true,
    starred: false
  },
  {
    id: 3,
    sender: 'Twitter',
    subject: 'Je hebt nieuwe meldingen',
    preview: 'Bekijk wat er nu gebeurt op Twitter...',
    read: true,
    starred: false
  }
]

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && 
              window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <button
        onClick={() => setIsDark(!isDark)}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
      >
        {isDark ? (
          <span className="text-yellow-300">☀️</span>
        ) : (
          <span className="text-gray-700">🌙</span>
        )}
      </button>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="inbox" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inbox" className="flex items-center gap-2">
              <Inbox className="h-4 w-4" />
              Postvak IN
            </TabsTrigger>
            <TabsTrigger value="starred" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Favorieten
            </TabsTrigger>
            <TabsTrigger value="sent" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Verzonden
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Card className="mt-4">
          <CardContent className="p-6">
            <div className="flex gap-2 mb-4">
              <select className="p-2 border rounded bg-background text-foreground">
                <option>Alle emails</option>
                <option>Ongelezen</option>
              </select>
              <button 
                onClick={() => alert('Bezig met vernieuwen...')}
                className="p-2 bg-blue-500 text-white rounded"
              >
                Vernieuwen
              </button>
            </div>

            <div className="space-y-4">
              {emails.map((email) => (
                <div 
                  key={email.id} 
                  className={`p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${!email.read ? 'border-l-4 border-blue-500' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${!email.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {email.sender}
                      </p>
                      <p className={`text-sm truncate ${!email.read ? 'font-semibold' : 'font-normal'}`}>
                        {email.subject}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {email.preview}
                      </p>
                    </div>
                    {email.starred && (
                      <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
