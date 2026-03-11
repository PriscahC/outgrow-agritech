import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Camera, Mic, Send, ArrowLeft, Bot, Loader2, Sparkles, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/db/supabase';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  imageUrl?: string;
  confidence?: number;
  isEscalation?: boolean;
}

const AIAdvisorPageRedesign = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'chat' | 'whatsapp'>('chat');
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi Priscah 👋\nWhat's going on with your crop today?",
      timestamp: '10:40 AM'
    },
    {
      role: 'user',
      content: 'My maize leaves have white streaks and some are turning brown at the tips',
      timestamp: '10:42 AM',
      imageUrl: 'photo-attached'
    },
    {
      role: 'assistant',
      content: `This looks like Maize Streak Virus, spread by leafhoppers. Here's what to do:

🗑 Remove the most affected plants
💊 Spray Acetamiprid to control leafhoppers
🚫 Avoid planting near infected fields
👁 Monitor daily for 7 days`,
      timestamp: '10:43 AM',
      confidence: 87
    },
    {
      role: 'assistant',
      content: "🚨 We've flagged this to James Otieno (Outgrow agronomist). He'll call you within 24 hours.",
      timestamp: '10:43 AM',
      isEscalation: true
    }
  ]);
  const [currentAIResponse, setCurrentAIResponse] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentAIResponse]);

  const quickQuestions = [
    'Why are my leaves yellowing?',
    'I see insects on my crop',
    'My soil feels too wet',
    'When should I harvest?',
    'What fertilizer should I use now?',
    'Is the weather affecting my crop?'
  ];

  const recentCases = [
    { date: 'Jun 28', issue: 'Maize Streak Virus', confidence: 87, status: '🟡 Monitoring' },
    { date: 'Jun 21', issue: 'Gray Leaf Spot', confidence: 74, status: '🔴 Escalated' },
    { date: 'Jun 10', issue: 'Aphid Activity', confidence: 91, status: '✅ Resolved' },
    { date: 'May 15', issue: 'Nitrogen Deficiency', confidence: 83, status: '✅ Resolved' }
  ];

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setIsLoading(true);
    const userMessage: Message = {
      role: 'user',
      content: 'Please analyze this crop image',
      timestamp: formatTime(),
      imageUrl: 'analyzing...'
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result?.toString().split(',')[1];
        await streamAIResponse('Please analyze this crop image and provide diagnosis', base64Data);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
      setIsLoading(false);
    }
  };

  const streamAIResponse = async (message: string, imageData?: string) => {
    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        message: msg.content
      }));

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-crop-advisor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          message,
          imageData,
          conversationHistory
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const jsonStr = line.slice(6);
                if (jsonStr.trim() === '[DONE]') continue;
                
                const data = JSON.parse(jsonStr);
                const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
                
                if (text) {
                  accumulatedText += text;
                  setCurrentAIResponse(accumulatedText);
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }

        if (accumulatedText) {
          const aiMessage: Message = {
            role: 'assistant',
            content: accumulatedText,
            timestamp: formatTime()
          };
          setMessages(prev => [...prev, aiMessage]);
          setCurrentAIResponse('');
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.error('AI error:', error);
      toast.error('Failed to get AI response. Please try again.');
      setIsLoading(false);
      setCurrentAIResponse('');
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: inputText,
      timestamp: formatTime()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    await streamAIResponse(inputText);
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 text-primary-foreground">
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-primary-foreground/10"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <h1 className="text-xl font-semibold">AI Advisor</h1>

        <div className="flex items-center gap-1 bg-primary-foreground/10 rounded-full p-1">
          <button
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              activeTab === 'chat'
                ? 'bg-primary-foreground text-primary'
                : 'text-primary-foreground/70 hover:text-primary-foreground'
            }`}
            onClick={() => setActiveTab('chat')}
          >
            💬 Chat
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              activeTab === 'whatsapp'
                ? 'bg-primary-foreground text-primary'
                : 'text-primary-foreground/70 hover:text-primary-foreground'
            }`}
            onClick={() => setActiveTab('whatsapp')}
          >
            📱 WhatsApp
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start p-4 overflow-y-auto space-y-6">
        {activeTab === 'chat' && (
          <>
            {/* HeyGen Avatar Embed */}
            <Card className="w-full max-w-4xl shadow-2xl border-none">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-primary mb-2">Talk to Safi 🌱</h2>
                  <p className="text-muted-foreground">Speak directly to our AI advisor in your language</p>
                </div>
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src="https://app.heygen.com/embeds/d0c8c4e8b7f14c1b9d1f3e5a7b9c2d4e"
                    title="Safi AI Advisor"
                    allow="camera; microphone; clipboard-write; display-capture; autoplay"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                    style={{ border: 'none' }}
                  />
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'chat' ? (
          <Card className="w-full max-w-4xl h-[600px] shadow-2xl border-none flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                        <Bot className="h-5 w-5" />
                      </div>
                    </div>
                  )}

                  <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[70%]`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        msg.isEscalation
                          ? 'bg-secondary/10 border-l-4 border-secondary'
                          : msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">
                        {msg.content}
                      </p>
                      {msg.imageUrl && (
                        <div className="mt-2 text-xs opacity-70">📎 Photo attached</div>
                      )}
                      {msg.confidence && (
                        <Badge className="mt-3 bg-secondary text-secondary-foreground">
                          ● {msg.confidence}% confident
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 px-1">
                      {msg.role === 'assistant' ? 'Outgrow AI' : 'Priscah'} · {msg.timestamp}
                    </span>
                  </div>

                  {msg.role === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                        P
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Current AI Response (streaming) */}
              {currentAIResponse && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                      <Bot className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex flex-col items-start max-w-[70%]">
                    <div className="rounded-2xl px-4 py-3 bg-muted">
                      <p className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">
                        {currentAIResponse}
                      </p>
                      <Loader2 className="h-4 w-4 animate-spin text-secondary mt-2" />
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 px-1">
                      Outgrow AI · {formatTime()}
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4 space-y-3">
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                >
                  <Camera className="h-5 w-5" />
                </Button>

                <Input
                  placeholder="Ask about your crop..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={isLoading}
                  className="flex-1 border-none bg-muted focus-visible:ring-1"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => toast.info('Voice recording coming soon!')}
                  disabled={isLoading}
                >
                  <Mic className="h-5 w-5" />
                </Button>

                <Button
                  size="icon"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputText.trim()}
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-center gap-4 text-sm">
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="text-primary-foreground/70 hover:text-primary-foreground flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                      <Sparkles className="h-4 w-4" />
                      Quick questions
                    </button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[400px]">
                    <SheetHeader>
                      <SheetTitle>Quick Questions</SheetTitle>
                    </SheetHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                      {quickQuestions.map((q, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start text-left h-auto py-3"
                          onClick={() => {
                            handleQuickQuestion(q);
                            document.body.click(); // Close sheet
                          }}
                        >
                          {q}
                        </Button>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>

                <Sheet>
                  <SheetTrigger asChild>
                    <button className="text-primary-foreground/70 hover:text-primary-foreground flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                      <FileText className="h-4 w-4" />
                      Recent cases
                    </button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[500px]">
                    <SheetHeader>
                      <SheetTitle>Recent Cases</SheetTitle>
                    </SheetHeader>
                    <div className="space-y-3 mt-6">
                      {recentCases.map((case_, index) => (
                        <div key={index} className="p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-foreground">{case_.issue}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {case_.date} · {case_.confidence}% confidence
                              </p>
                            </div>
                            <Badge variant="outline">{case_.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="w-full max-w-2xl shadow-2xl border-none">
            <CardContent className="p-8 md:p-12 space-y-8 text-center">
              <div className="text-6xl mb-4">📱</div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                  Talk to Outgrow AI on WhatsApp
                </h2>
                <p className="text-muted-foreground text-lg">
                  Send a voice message in any language and get instant advice
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
                <div className="space-y-3">
                  <div className="text-4xl">1️⃣</div>
                  <p className="font-semibold">Save our number</p>
                  <p className="text-sm text-muted-foreground">+254 700 698 4769</p>
                </div>
                <div className="space-y-3">
                  <div className="text-4xl">2️⃣</div>
                  <p className="font-semibold">Send voice message</p>
                  <p className="text-sm text-muted-foreground">In any language</p>
                </div>
                <div className="space-y-3">
                  <div className="text-4xl">3️⃣</div>
                  <p className="font-semibold">Get advice instantly</p>
                  <p className="text-sm text-muted-foreground">Voice reply in seconds</p>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8"
                onClick={() => toast.success('Number copied to clipboard!')}
              >
                Save Our Number
              </Button>

              <div className="pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-3">Supported Languages</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="outline">🇰🇪 Swahili</Badge>
                  <Badge variant="outline">🇬🇧 English</Badge>
                  <Badge variant="outline">🇳🇬 Hausa</Badge>
                  <Badge variant="outline">🇬🇭 Twi</Badge>
                  <Badge variant="outline">🇲🇼 Chichewa</Badge>
                </div>
              </div>

              <details className="text-left">
                <summary className="cursor-pointer text-sm text-primary font-semibold">
                  How does it work? ↓
                </summary>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <p>📸 Send a voice message or photo describing your crop issue</p>
                  <p>🤖 Our AI analyzes it and responds in your language</p>
                  <p>📞 If needed, an agronomist will call you within 24 hours</p>
                </div>
              </details>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AIAdvisorPageRedesign;
