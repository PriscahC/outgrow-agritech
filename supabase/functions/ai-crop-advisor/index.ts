import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, imageData, conversationHistory } = await req.json();

    if (!message && !imageData) {
      return new Response(
        JSON.stringify({ error: 'Message or image data is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get API key from environment
    const apiKey = Deno.env.get('INTEGRATIONS_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build conversation contents
    const contents = [];

    // Add system context for agricultural advisor (as first model response)
    if (!conversationHistory || conversationHistory.length === 0) {
      contents.push({
        role: 'user',
        parts: [{ text: 'You are an agricultural AI advisor for Outgrow, helping smallholder farmers in Africa diagnose crop issues.' }]
      });
      contents.push({
        role: 'model',
        parts: [{
          text: 'I understand. I am an agricultural AI advisor for Outgrow. I help smallholder farmers in Africa diagnose crop issues by analyzing photos and providing practical, actionable advice in a warm, conversational tone. I identify diseases and pests, recommend treatments, and if I am uncertain (confidence below 70%), I recommend escalation to a human agronomist. How can I help you today?'
        }]
      });
    }

    // Add conversation history if provided
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.forEach((msg: any) => {
        contents.push({
          role: msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user',
          parts: [{ text: msg.message }]
        });
      });
    }

    // Add current message
    const currentParts = [];
    if (message) {
      currentParts.push({ text: message });
    }
    if (imageData) {
      currentParts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageData
        }
      });
    }

    contents.push({
      role: 'user',
      parts: currentParts
    });

    // Call LLM API
    const response = await fetch(
      'https://app-a5tzymr7g1s1-api-VaOwP8E7dJqa.gateway.appmedo.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse',
      {
        method: 'POST',
        headers: {
          'X-Gateway-Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contents })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('LLM API error:', errorText);
      return new Response(
        JSON.stringify({ error: `LLM API error: ${response.status}`, details: errorText }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Stream the response back to client
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in ai-crop-advisor:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
