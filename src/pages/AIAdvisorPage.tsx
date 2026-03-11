import React, { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, MessageSquare, Mic, Bot, AlertTriangle, CheckCircle, Phone, Globe, Leaf, Bug, Droplets, Sprout, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/db/supabase';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  imageUrl?: string;
}

const AIAdvisorPage = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'user',
      content: 'My maize leaves have white streaks and some are turning brown at the tips',
      timestamp: 'Jun 28, 10:42 AM',
      imageUrl: 'photo-attached'
    },
    {
      role: 'assistant',
      content: `Thanks for the photo, Priscah. Based on what I can see, this looks like **Maize Streak Virus**, which is spread by tiny insects called leafhoppers.

**Here's what to do:**
- 🗑 Remove and destroy the most affected plants
- 💊 Spray with Acetamiprid to control leafhoppers
- 🚫 Avoid planting near other infected fields
- 👁 Check your crop daily for the next 7 days

**Confidence: 87%** 🟢

This is AI guidance. For serious cases, we recommend confirming with an agronomist.`,
      timestamp: 'Jun 28, 10:43 AM'
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
    { icon: Leaf, text: 'Why are my leaves yellowing?' },
    { icon: Bug, text: 'I see insects on my crop' },
    { icon: Droplets, text: 'My soil feels too wet' },
    { icon: Sprout, text: 'When should I harvest?' },
    { icon: Leaf, text: 'What fertilizer should I use now?' },
    { icon: Droplets, text: 'Is the weather affecting my crop?' },
  ];

  const pastDiagnoses = [
    { date: 'Jun 28', issue: 'Maize Streak Virus', confidence: 87, status: 'monitoring', statusColor: 'bg-yellow-500', statusText: '🟡 Monitoring' },
    { date: 'Jun 21', issue: 'Gray Leaf Spot', confidence: 74, status: 'escalated', statusColor: 'bg-red-500', statusText: '🔴 Escalated' },
    { date: 'Jun 10', issue: 'Aphid Activity', confidence: 91, status: 'resolved', statusColor: 'bg-green-500', statusText: '✅ Resolved' },
    { date: 'May 15', issue: 'Nitrogen Deficiency', confidence: 83, status: 'resolved', statusColor: 'bg-green-500', statusText: '✅ Resolved' },
  ];

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
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

        // Add completed message to history
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

  const handleVoiceRecord = () => {
    toast.info('Voice recording feature coming soon!');
  };

  const handleEscalate = () => {
    toast.success('Case escalated to agronomist team');
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
    setTimeout(() => {
      document.getElementById('question-input')?.focus();
    }, 100);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">AI Advisor</h1>
          <p className="text-muted-foreground text-lg">Get instant crop advice from our AI assistant</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-grid">
            <TabsTrigger value="chat">💬 Chat & Photo</TabsTrigger>
            <TabsTrigger value="whatsapp">📱 WhatsApp Voice</TabsTrigger>
          </TabsList>

          {/* Tab 1: Chat & Photo */}
          <TabsContent value="chat" className="space-y-6 mt-6">
            {/* Greeting Card */}
            <Card className="shadow-lg border-none bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">🤖</div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-primary mb-2">Hi Priscah 👋 What's going on with your crop?</h2>
                    <p className="text-muted-foreground">
                      Describe your problem, upload a photo, or switch to WhatsApp to send a voice message.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Input Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
              <Button
                size="lg"
                className="h-20 bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-3"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
              >
                <Camera className="h-6 w-6" />
                <span className="font-semibold">Upload Photo</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-20 border-primary text-primary hover:bg-primary/5 gap-3"
                onClick={() => document.getElementById('question-input')?.focus()}
              >
                <MessageSquare className="h-6 w-6" />
                <span className="font-semibold">Type a Question</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-20 border-primary text-primary hover:bg-primary/5 gap-3"
                onClick={handleVoiceRecord}
              >
                <Mic className="h-6 w-6" />
                <span className="font-semibold">Record Voice Note</span>
              </Button>
            </div>

            {/* Sample Conversation */}
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary">Conversation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 max-h-[600px] overflow-y-auto">
                {messages.map((msg, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0">
                      {msg.role === 'user' ? (
                        <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          P
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                          <Bot className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-foreground">
                          {msg.role === 'user' ? 'Priscah' : 'Outgrow AI'}
                        </span>
                        <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                      </div>
                      <div className={`${msg.role === 'user' ? 'bg-muted' : 'bg-secondary/10'} rounded-2xl rounded-tl-none p-4`}>
                        <p className="text-foreground whitespace-pre-wrap">{msg.content}</p>
                        {msg.imageUrl && (
                          <div className="mt-3 text-xs text-muted-foreground italic">📸 Photo attached</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Current AI Response (streaming) */}
                {currentAIResponse && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                        <Bot className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-foreground">Outgrow AI</span>
                        <span className="text-xs text-muted-foreground">{formatTime()}</span>
                        <Loader2 className="h-4 w-4 animate-spin text-secondary" />
                      </div>
                      <div className="bg-secondary/10 rounded-2xl rounded-tl-none p-4">
                        <p className="text-foreground whitespace-pre-wrap">{currentAIResponse}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </CardContent>
            </Card>

            {/* Escalation Card (shown when escalated) */}
            <Card className="shadow-lg border-2 border-secondary bg-secondary/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-8 w-8 text-secondary flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground mb-2">
                      🚨 We've flagged this case to our agronomist team.
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      James Otieno (Outgrow Kenya) will call you within 24 hours on +254 712 xxx xxx
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      You'll also receive an SMS with interim advice shortly.
                    </p>
                    <Badge className="bg-yellow-500 text-white">Escalated — Awaiting Agronomist 🟡</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question Input */}
            <Card className="shadow-lg border-none">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Textarea
                    id="question-input"
                    placeholder="Type your question here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="min-h-[100px]"
                    disabled={isLoading}
                  />
                  <Button
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputText.trim()}
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Send'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Question Chips */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Quick Questions</h3>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q, index) => {
                  const Icon = q.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleQuickQuestion(q.text)}
                      disabled={isLoading}
                    >
                      <Icon className="h-4 w-4" />
                      {q.text}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Past Diagnoses */}
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary">Your Recent Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Date</th>
                        <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Issue</th>
                        <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Confidence</th>
                        <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Status</th>
                        <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pastDiagnoses.map((diagnosis, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-3 text-sm">{diagnosis.date}</td>
                          <td className="p-3 font-medium">{diagnosis.issue}</td>
                          <td className="p-3 text-sm">{diagnosis.confidence}%</td>
                          <td className="p-3">
                            <Badge className={`${diagnosis.statusColor} text-white`}>
                              {diagnosis.statusText}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm" onClick={() => toast.info('Details coming soon')}>
                              View Details →
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: WhatsApp Voice */}
          <TabsContent value="whatsapp" className="space-y-6 mt-6">
            {/* Hero Card */}
            <Card className="shadow-lg border-none bg-gradient-to-r from-secondary/20 to-secondary/10">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">📱</div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-primary mb-2">Talk to Outgrow AI on WhatsApp</h2>
                    <p className="text-muted-foreground text-lg">
                      Send a voice message in any language — Swahili, English, Hausa, Twi, Chichewa — and our AI will respond with advice in your language.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How It Works */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-lg border-none">
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-4">📱</div>
                    <h3 className="text-xl font-bold text-primary mb-3">1. Save our WhatsApp number</h3>
                    <p className="text-muted-foreground mb-4">+254 700 OUTGROW (698 4769)</p>
                    <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={() => toast.success('Number copied to clipboard!')}>
                      Save Number →
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-none">
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-4">🎙️</div>
                    <h3 className="text-xl font-bold text-primary mb-3">2. Send a voice message</h3>
                    <p className="text-muted-foreground">
                      Just hold the mic button on WhatsApp and describe what's happening with your crop. You can also send a photo of the affected plant.
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-none">
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-4">🤖</div>
                    <h3 className="text-xl font-bold text-primary mb-3">3. Get advice in seconds</h3>
                    <p className="text-muted-foreground">
                      Our AI will listen, understand your language, and send back a voice reply with clear steps to follow. If it's unsure, it will ask for a photo or connect you to an agronomist.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* What You Can Ask */}
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary">What You Can Ask</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="font-medium text-foreground">🗣 "Mahindi yangu yana rangi ya njano"</p>
                  <p className="text-sm text-muted-foreground italic">Swahili — My maize is turning yellow</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="font-medium text-foreground">🗣 "I see white powder on my leaves"</p>
                  <p className="text-sm text-muted-foreground italic">English</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="font-medium text-foreground">🗣 "Gooro mim so"</p>
                  <p className="text-sm text-muted-foreground italic">Twi — My crop has a problem</p>
                </div>
                <p className="text-sm text-muted-foreground italic pt-2">
                  The AI automatically detects your language — no need to select it.
                </p>
              </CardContent>
            </Card>

            {/* Language Support */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">Language Support</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline" className="text-base py-2 px-4">🇰🇪 Swahili</Badge>
                <Badge variant="outline" className="text-base py-2 px-4">🇬🇧 English</Badge>
                <Badge variant="outline" className="text-base py-2 px-4">🇳🇬 Hausa</Badge>
                <Badge variant="outline" className="text-base py-2 px-4">🇬🇭 Twi</Badge>
                <Badge variant="outline" className="text-base py-2 px-4">🇲🇼 Chichewa</Badge>
              </div>
              <p className="text-sm text-muted-foreground italic">More languages coming soon</p>
            </div>

            {/* What If AI Is Unsure */}
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary">What if the AI doesn't know the answer?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📸</span>
                  <div>
                    <p className="font-semibold text-foreground">Step 1</p>
                    <p className="text-muted-foreground">It will ask you to send a photo of the affected crop</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📩</span>
                  <div>
                    <p className="font-semibold text-foreground">Step 2</p>
                    <p className="text-muted-foreground">You'll receive an SMS with the best available advice</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-semibold text-foreground">Step 3</p>
                    <p className="text-muted-foreground">A human agronomist from our team will call you within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sample WhatsApp Conversation */}
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary">Sample WhatsApp Conversation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      P
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-muted rounded-2xl rounded-tl-none p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Mic className="h-4 w-4" />
                        <span className="text-sm font-semibold">Voice note — 0:12</span>
                      </div>
                      <p className="text-xs text-muted-foreground italic">(Swahili)</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                      <Bot className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-secondary/10 rounded-2xl rounded-tl-none p-4 space-y-3">
                      <p className="font-semibold text-foreground">Outgrow AI:</p>
                      <p className="text-foreground">
                        "Habari Priscah! Nimesikia ujumbe wako. Inaonekana kama ugonjwa wa Maize Streak Virus..."
                      </p>
                      <p className="text-xs text-muted-foreground italic">
                        (Translation: "Hi Priscah! I heard your message. This looks like Maize Streak Virus...")
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <Mic className="h-4 w-4" />
                        <span className="font-semibold">Voice note — 0:28</span>
                      </div>
                      <Badge className="bg-green-500 text-white">Confidence: 87% ✅</Badge>
                      <p className="text-sm text-muted-foreground italic">
                        "Kama tatizo linaendelea, tutakupelekea mtaalamu. / If the problem continues, we'll connect you to an agronomist."
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sticky Bottom CTA */}
            <Card className="shadow-lg border-none bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-6 w-6" />
                    <span className="font-semibold">Prefer to type or upload a photo instead?</span>
                  </div>
                  <Button variant="secondary" onClick={() => setActiveTab('chat')}>
                    Switch to Chat →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AIAdvisorPage;
