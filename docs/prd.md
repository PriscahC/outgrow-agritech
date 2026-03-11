# Outgrow — Requirements Document

## 1. Application Overview

**Application Name**: Outgrow

**Application Description**: A multi-page public marketing website and authenticated portal system for Africa's smartest farm network, connecting smallholder farmers with crop buyers across Kenya, Uganda, Nigeria, Ghana, and Malawi. Platform tagline: From Soil to Sale — Africa's Smartest Farm Network.

**Target Audience**: Smallholder farmers and crop buyers (aggregators, food processors, traders) in Kenya, Uganda, Nigeria, Ghana, and Malawi.

**Sample Farmer Context**:
- Farmer: Priscah W. | Kenya 🇰🇪
- Crop: Maize (Duma 43 Variety)
- Farm Size: 3.2 acres | Region: Nakuru, Rift Valley
- Season: Long Rains 2025 | Planting Date: March 3, 2025

**Sample Buyer Context**:
- Buyer: James Kariuki | Unga Group Ltd | Nairobi, Kenya 🇰🇪
- Interest: Maize, Sorghum, Soybeans
- Countries: Kenya, Uganda

---

## 2. Design Requirements

**Color Scheme**:
- Primary: Dark Forest Green (#1B4332)
- Accent: Amber Gold (#D4A017)
- Background: Cream Beige (#FAF7F0)
- Card Background: White with soft shadows

**Design Style**: Earthy, premium, modern African agritech aesthetic with serif fonts for headings and clean fonts for body text. Avoid generic blue/purple SaaS colors. Friendly for low-tech users and highly readable.

**Tone**: Simple, warm, human. Avoid jargon. Speak like talking to farmers and buyers, not engineers.

---

## 3. Pages and Functional Modules

### 3.1 Public Landing Page

#### 3.1.1 Fixed Navigation Bar
- Logo on the left
- Navigation links: Home, For Farmers, For Buyers, About, Contact
- Two action buttons:
  - Join as Farmer (amber gold background)
  - Browse Farms (outline style) — **Links to Buyer Portal (Section 3.10)**

#### 3.1.2 Hero Section
- Split-screen layout
- Left: Headline, subheadline, two CTA buttons
- Right: Farm dashboard preview card showing charts and crop health score widgets

#### 3.1.3 How It Works Section
- Three horizontal step cards:
  1. We Visit Your Farm — Drone and IoT installation
  2. Monitor in Real Time — Dashboard with alerts
  3. Connect to Markets & Finance — Buyers and bank loans

#### 3.1.4 Impact Stats Section
- Dark green banner background
- Animated statistics:
  - 4,800+ Farms
  - 5 Countries
  - 62% Yield Improvement
  - KSh 2.1B Revenue Facilitated

#### 3.1.5 For Farmers Section
- List of benefits with icons covering:
  - Market access
  - AI pest diagnosis
  - SMS alerts
  - Capital access
  - Extension services
- Phone mockup showing SMS notification example

#### 3.1.6 Farmer Testimonials Section
- Three quote cards, each containing:
  - Testimonial quote
  - Farmer name
  - Region
  - Crop type

#### 3.1.7 For Buyers Section
- Dark background
- Procurement process in 3 steps: Browse → Connect → Procure
- Three farm profile preview cards showing:
  - Crop type
  - Location
  - Harvest date
  - Quality badge

#### 3.1.8 About/Partners Section
- Mission statement
- Three partner logo placeholders (banks and NGOs)
- Outline map showing 5 countries

#### 3.1.9 Sign-Up Form
- Form fields:
  - Full Name
  - Phone Number
  - Country (dropdown)
  - Farm Location
  - Primary Crop (dropdown)
  - Acreage
- Submit button: Join Outgrow →

#### 3.1.10 Footer
- Logo
- Navigation bar
- Social media icons
- Five country flags
- Copyright information

---

### 3.2 Farmer Dashboard

**Page Type**: Authenticated web dashboard (farmer-facing)

**Target Audience**: Registered smallholder farmers in Kenya, Uganda, Nigeria, Ghana, and Malawi

**Device Priority**: Mobile-first with full desktop layout

#### 3.2.1 Layout Structure

**Left Sidebar** (desktop) / **Bottom Navigation** (mobile):
- Logo
- Navigation icons with labels: Dashboard, Farm Map, Crop Monitor, AI Advisor, Market Access, Finance, Reports, Profile, Logout

**Top Bar**:
- Farm name
- Farmer avatar
- Country flag
- Notification bell (with badge count)
- Language switcher

#### 3.2.2 Dashboard Page — Functional Areas

**1. Welcome Banner**
- Display: Good morning, [Farmer Name] 🌱 + today's date + weather widget (temperature, rainfall forecast, sun/cloud icon), based on farmer's region

**2. Farm Health Score Card**
- Large circular gauge (0–100)
- Color-coded: Red (0–40), Amber (41–70), Green (71–100)
- Current score highlighted
- Sub-labels: Soil Health, Moisture, Pest Risk

**3. Key Stats Row**
- 4 stat cards arranged horizontally:
  - 🌾 Current Crop (e.g., Maize)
  - 📐 Farm Size (e.g., 3.2 acres)
  - 📅 Days to Harvest (e.g., 34 days)
  - 💧 Soil Moisture (e.g., 68%)

**4. Soil pH Chart**
- Line chart showing soil pH readings over the past 30 days
- Ideal range band highlighted in green (6.0–7.0)
- X-axis: Date, Y-axis: pH value

**5. Yield Forecast Chart**
- Bar chart comparing: Expected Yield vs. Last Season Yield vs. Regional Average
- Three bars per crop cycle
- Metric: Bags or kilograms

**6. IoT Sensor Live Readings**
- 3 mini cards arranged horizontally:
  - Temperature (°C)
  - Humidity (%)
  - Soil Moisture (%)
- Each card with small trend line and status dot (green = normal, red = alert)

**7. Pest & Disease Alerts**
- Alert timeline list
- Each entry: Date, alert type (e.g., Fall Armyworm Risk), severity badge (Low / Medium / High), action link → Ask AI Advisor

**8. SMS Notification Log**
- Display recent 5 SMS messages received from Outgrow
- Each entry: Timestamp, message preview, category label (Market / Weather / Finance / Extension)

**9. Quick Actions Row**
- 4 large icon buttons:
  - 📸 Diagnose a Crop
  - 📦 View Buyer Offers
  - 💳 Apply for Loan
  - 📞 Call Extension Agent

---

### 3.3 Crop Monitor Page

**Page Type**: Authenticated farmer page

#### 3.3.1 Crop Overview Banner
Top horizontal card:
- Crop icon (maize) + variety name
- Season label
- Planting date → Expected harvest date: July 18, 2025
- Harvest countdown badge: 34 days
- Current growth stage badge (amber): Tasseling

#### 3.3.2 Growth Stage Tracker
Horizontal stepper with 6 stages. Completed stages in green, current stage in amber, upcoming stages in gray:
1. ✅ Germination (Mar 3)
2. ✅ Seedling (Mar 17)
3. ✅ Vegetative (Apr 10)
4. ✅ Flowering (May 22)
5. 🟡 Tasseling ← Current (Jun 15)
6. ⬜ Maturity (Jul 18)

Each stage displays date and one-line tip (e.g., Ensure adequate nitrogen at vegetative stage)

#### 3.3.3 Health Metrics Row
4 stat cards:
- 🌿 Canopy Cover: 87% (Good)
- 🐛 Pest Pressure: Medium (amber)
- 💧 Water Stress Index: Low (green)
- 🌱 Nutrient Status: Nitrogen Low (red)

#### 3.3.4 Pest & Disease Alert Timeline
Chronological list, newest first:

| Date | Alert | Severity | Status |
|---|---|---|---|
| Jun 28 | Fall Armyworm detected — Zone B | 🔴 High | Action Required |
| Jun 21 | Gray Leaf Spot risk elevated | 🟡 Medium | Monitoring |
| Jun 10 | Aphid activity — low levels | 🟢 Low | Resolved |
| May 30 | No issues detected | 🟢 Clear | — |

Each alert has a → Ask AI Advisor link button

#### 3.3.5 Input & Activity Schedule
Table or card list of recommended farm activities:

| Date | Activity | Input | Status |
|---|---|---|---|
| Jun 30 | Top dressing | CAN Fertilizer — 25kg/acre | ⏳ Due Soon |
| Jul 5 | Pest spray | Ampligo 150ZC — 200ml/20L | ⬜ Upcoming |
| Jul 10 | Irrigation check | IoT moisture threshold | ⬜ Upcoming |
| Jun 20 | Weeding | Manual — completed | ✅ Done |
| Jun 5 | Foliar feed | Optimizer Plus | ✅ Done |

#### 3.3.6 Yield Forecast Card
- Expected yield: 18 bags (90kg each)
- Last season: 13 bags
- Regional average: 15 bags
- Small bar chart comparing all three
- Note: Yield projection updated based on IoT data and growth stage — June 28

#### 3.3.7 Extension Advice Card
Latest tip from Outgrow agronomist:
> Your crop is in tasseling stage — this is the most critical period for water. Ensure soil moisture stays above 60%. Avoid any moisture stress in the next 2 weeks to protect grain set.
- Agronomist: James Otieno | Outgrow Kenya
- Sent via: SMS + Dashboard | Jun 26, 2025
- Button: Ask a Question →

---

### 3.4 Farm Map Page

**Page Type**: Authenticated interactive map view (farmer-facing)

**Target Audience**: Registered smallholder farmers

**Device Priority**: Mobile-first with full desktop layout

#### 3.4.1 Design Style
Dark forest green (#1B4332) sidebar/header consistent with dashboard. Map occupies most of screen area. Data panels use floating card overlays. Amber gold (#D4A017) for active markers and highlights. Map controls use dark overlay panels with white text.

#### 3.4.2 Layout Structure
- **Left Sidebar / Bottom Navigation**: Same as dashboard (maintain navigation consistency)
- **Top Bar**: Page title My Farm Map, last updated timestamp, Request New Drone Scan button (amber)

#### 3.4.3 Main Map View
Full-width interactive map (use map placeholder/mockup). Display:
- Farm boundary outline drawn in amber
- Colored zone overlays representing field areas (Zone A, B, C) using different health colors (green = healthy, yellow = watch, red = alert)
- IoT sensor pin markers — clicking pin opens small popup showing live readings (temperature, humidity, soil moisture)
- Drone flight path overlay shown as dashed line

#### 3.4.4 Map Controls Toolbar (floating, top-right of map)
Toggle buttons:
- 🛰 Satellite View / Map View
- 🌡 Heat Map (soil temperature overlay)
- 💧 Moisture Map (humidity gradient overlay)
- 📍 Show/Hide Sensors
- 🚁 Show/Hide Drone Path

#### 3.4.5 Drone Scan History Panel (right panel on desktop, bottom sheet on mobile)
List of past drone scans containing:
- Scan date
- Coverage area (acres)
- Thumbnail preview image
- Status badge: Processed / Pending
- View Full Report link

Latest scan highlighted at top with larger thumbnail

#### 3.4.6 Zone Breakdown Cards
3 cards (Zone A, Zone B, Zone C), each showing:
- Zone name + acreage
- Crop planted
- Health status badge (Healthy / Watch / Critical)
- Soil pH reading
- Moisture level bar
- Last IoT reading timestamp

#### 3.4.7 IoT Sensor Panel
List of all installed sensors on farm:
- Sensor ID and location name (e.g., North Field — Sensor 01)
- Battery level indicator (icon + percentage)
- Connection status dot (green = online, red = offline)
- Last ping timestamp
- Live readings: Temperature, Humidity, Soil Moisture

#### 3.4.8 Soil pH Zone Map Legend
Small legend card explaining zone color codes:
- 🟢 Green: pH 6.0–7.0 (Optimal)
- 🟡 Yellow: pH 5.0–5.9 (Slightly Acidic)
- 🔴 Red: pH below 5.0 or above 7.5 (Action Required)

#### 3.4.9 Request Drone Scan Modal (triggered by top bar button)
Form fields:
- Preferred scan date (date picker)
- Reason for scan (dropdown: Routine Check, Pest Suspicion, Post-Harvest, Other)
- Additional notes (text area)
- Submit button: Request Scan →

Confirmation message: Your request has been sent. Our field team will confirm within 24 hours via SMS.

---

### 3.5 AI Advisor Page

**Page Type**: Authenticated farmer page

**Tagline**: Describe your problem or upload a photo — we'll help you figure it out.

**Layout**: Two-tab interface with chat-style interaction

**Design**: Match existing app — dark green (#1B4332) header/sidebar, cream (#FAF7F0) background, amber (#D4A017) accents, white cards, soft shadows

**Tone**: Warm, simple, conversational. Like texting a knowledgeable friend.

**Dummy Farmer Context**:
- Farmer: Priscah W. | Nakuru, Kenya 🇰🇪
- Crop: Maize (Duma 43) | Season: Long Rains 2025

**AI Integration**:
- API: mistralai/Mistral-7B-Instruct-v0.2
- API Key: rc_bfa0f87736b5cf58677193be2558e5383547cd1d344ea79126dff8d9a1b1b8ad

#### 3.5.1 Tab Navigation
Two tabs at top of page:
- 💬 Chat & Photo (default open)
- 📱 WhatsApp Voice

---

#### 3.5.2 Tab 1 — Chat & Photo

**Greeting Card** (top of page):
- Icon: friendly robot face 🤖
- Headline: Hi Priscah 👋 What's going on with your crop?
- Subtext: Describe your problem, upload a photo, or switch to WhatsApp to send a voice message.

**Three Input Options** (large, tappable buttons in a row):
- 📸 Upload Photo — amber filled button
- ✍️ Type a Question — green outline button
- 🎙️ Record Voice Note — green outline button (in-app mic, for quick use)

**Chat Interface**:
- Scrollable message area displaying conversation history
- User messages aligned right with light amber background
- AI responses aligned left with white background
- Each message shows timestamp
- AI responses include confidence score when applicable
- Real-time typing indicator when AI is processing

**Message Input Area** (bottom of chat):
- Text input field with placeholder: Type your question here...
- 📎 Attach photo button
- 🎙️ Voice note button
- Send button (amber, arrow icon)

**AI Response Format**:
- Diagnosis or answer text
- Actionable recommendations in bullet points
- Confidence score with color indicator (green ≥80%, amber 60-79%, red <60%)
- Disclaimer: This is AI guidance. For serious cases, we recommend confirming with an agronomist.
- Two action buttons: ✅ This helped | 🚨 Escalate to Agronomist

**Pre-loaded Dummy Conversation** (shows what a session looks like):

> 👩 Priscah (sent a photo + text)
> My maize leaves have white streaks and some are turning brown at the tips
> — Jun 28, 10:42 AM

> 🤖 Outgrow AI
> Thanks for the photo, Priscah. Based on what I can see, this looks like Maize Streak Virus, which is spread by tiny insects called leafhoppers.
>
> Here's what to do:
> - 🗑 Remove and destroy the most affected plants
> - 💊 Spray with Acetamiprid to control leafhoppers
> - 🚫 Avoid planting near other infected fields
> - 👁 Check your crop daily for the next 7 days
>
> Confidence: 87% 🟢
> This is AI guidance. For serious cases, we recommend confirming with an agronomist.
>
> Two buttons: ✅ This helped | 🚨 Escalate to Agronomist
> — Jun 28, 10:43 AM

**Escalation Flow Card** (shown below conversation when escalated):

Amber-bordered card:
- 🚨 We've flagged this case to our agronomist team.
- James Otieno (Outgrow Kenya) will call you within 24 hours on +254 712 xxx xxx
- You'll also receive an SMS with interim advice shortly.
- Status badge: Escalated — Awaiting Agronomist 🟡

**Quick Question Chips** (below input area, scrollable):
- 🌿 Why are my leaves yellowing?
- 🐛 I see insects on my crop
- 💧 My soil feels too wet
- 🌾 When should I harvest?
- 🌱 What fertilizer should I use now?
- ☀️ Is the weather affecting my crop?

**Past Diagnoses** (collapsible section at bottom):
Title: Your recent cases

| Date | Issue | Confidence | Status |
|---|---|---|---|
| Jun 28 | Maize Streak Virus | 87% | 🟡 Monitoring |
| Jun 21 | Gray Leaf Spot | 74% | 🔴 Escalated |
| Jun 10 | Aphid Activity | 91% | ✅ Resolved |
| May 15 | Nitrogen Deficiency | 83% | ✅ Resolved |

Each row has: View Details → link

---

#### 3.5.3 Tab 2 — WhatsApp Voice Agent

**Design**: Clean instructional card layout. Warm and simple — like an onboarding guide.

**Hero Card** (top, amber background):
- WhatsApp icon + mic icon
- Headline: Talk to Outgrow AI on WhatsApp
- Subtext: Send a voice message in any language — Swahili, English, Hausa, Twi, Chichewa — and our AI will respond with advice in your language.

**How It Works** (3 simple steps with large icons):

1. 📱 Save our WhatsApp number
   +254 700 OUTGROW (698 4769)
   Big amber button: Save Number →

2. 🎙️ Send a voice message
   Just hold the mic button on WhatsApp and describe what's happening with your crop. You can also send a photo of the affected plant.

3. 🤖 Get advice in seconds
   Our AI will listen, understand your language, and send back a voice reply with clear steps to follow. If it's unsure, it will ask for a photo or connect you to an agronomist.

**What You Can Ask** (example chips, non-tappable, just illustrative):
- 🗣 Mahindi yangu yana rangi ya njano (Swahili — My maize is turning yellow)
- 🗣 I see white powder on my leaves (English)
- 🗣 Gooro mim so (Twi — My crop has a problem)

Small note below: The AI automatically detects your language — no need to select it.

**Language Support Badge Row**:
Five pill badges in a row:
- 🇰🇪 Swahili
- 🇬🇧 English
- 🇳🇬 Hausa
- 🇬🇭 Twi
- 🇲🇼 Chichewa

Small note: More languages coming soon

**What Happens If AI Is Unsure** (collapsible info card):
Title: What if the AI doesn't know the answer?
- Step 1: 📸 It will ask you to send a photo of the affected crop
- Step 2: 📩 You'll receive an SMS with the best available advice
- Step 3: 📞 A human agronomist from our team will call you within 24 hours

**Sample WhatsApp Conversation Preview** (mockup chat bubbles):

> 👩 [Voice note — 0:12] (Swahili)

> 🤖 Outgrow AI:
> Habari Priscah! Nimesikia ujumbe wako. Inaonekana kama ugonjwa wa Maize Streak Virus...
> (Translation shown below in small grey text: Hi Priscah! I heard your message. This looks like Maize Streak Virus...)
> [Voice note — 0:28]
>
> Confidence: 87% ✅
> Kama tatizo linaendelea, tutakupelekea mtaalamu. / If the problem continues, we'll connect you to an agronomist.

**Sticky Bottom CTA**:
Green bar at bottom of tab:
- 💬 Prefer to type or upload a photo instead?
- Link: Switch to Chat →

---

### 3.6 Market Access Page

**Page Type**: Authenticated farmer page

**Tagline**: Your crop is ready — here's who wants to buy it.

**Tone**: Simple marketplace, no complex financial terminology

#### 3.6.1 Crop Summary Card
- Crop: Maize | Expected: 18 bags | Harvest: ~Jul 18
- Quality grade: B+
- Status badge: Harvest Approaching — Buyers Notified 🟡

#### 3.6.2 Buyer Offers
3 cards, each showing:
- Buyer name + company (e.g., Unga Group, Nairobi)
- Offer: KSh 3,200 / bag
- Quantity needed: 10 bags
- Pickup method: They collect from farm
- Two buttons: ✅ Accept Offer | 💬 Ask a Question

Mock buyers:
- 🏢 Unga Group — KSh 3,200/bag — 10 bags — Nairobi
- 🏢 Githunguri Dairy & Feeds — KSh 3,050/bag — 18 bags — Kiambu
- 🏢 Outgrow Aggregator — KSh 3,100/bag — Any quantity — Nakuru (closest)

#### 3.6.3 Current Price Tracker
Small card: Maize prices in Nakuru this week
- Market price: KSh 3,100/bag
- Last week: KSh 2,980/bag
- Trend: ↑ Up 4%

#### 3.6.4 Past Sales Log
Simple list:
- Oct 2024 — 12 bags — KSh 2,750/bag — Unga Group — ✅ Paid

---

### 3.7 Finance Page

**Page Type**: Authenticated farmer page

**Tagline**: Get the support you need to grow more next season.

**Tone**: Reassuring, non-banking focus. Avoid intimidating financial terminology.

#### 3.7.1 Finance Score Card
Large simple score: 72 / 100 — Good standing (green)

3 sub-scores displayed as simple bar charts:
- Farm Performance: 80%
- Repayment History: 70%
- Season Consistency: 65%

Small note: This score helps partner banks offer you loans faster.

#### 3.7.2 Available Loan Offers
2 cards:
- 🏦 Equity Bank Kilimo Loan
  - Up to: KSh 45,000
  - Interest: 10% per season
  - Repay after harvest
  - Button: Apply Now →
- 🏦 KCB Mashinani Loan
  - Up to: KSh 30,000
  - Interest: 8% per season
  - Flexible repayment
  - Button: Apply Now →

#### 3.7.3 Active Loan
If loan exists, display:
- Loan: KSh 20,000 from Equity Bank
- Disbursed: Mar 5, 2025
- Due: Aug 1, 2025
- Repaid: KSh 0
- Status: Repayment due after harvest 🟡
- Simple progress bar

#### 3.7.4 Past Loans
1 record:
- Oct 2024 — KSh 15,000 — Fully Repaid ✅

---

### 3.8 Reports Page

**Page Type**: Authenticated farmer page

**Tagline**: A simple summary of how your farm is doing.

**Tone**: Simple language. Like a school report card, not a financial audit.

#### 3.8.1 Season Summary Card
Long Rains 2025:
- Crop: Maize | Planted: Mar 3 | Harvest: Jul 18
- Farm size: 3.2 acres
- Expected yield: 18 bags
- Last season yield: 13 bags
- Improvement: ↑ 38% 🎉

#### 3.8.2 Soil Health Over Time
Simple line chart — 4 months (Mar–Jun) of soil pH readings. Ideal range marked in green.

#### 3.8.3 Rainfall & Irrigation
Bar chart — Monthly rainfall (mm) vs irrigation events. Mar, Apr, May, Jun.

#### 3.8.4 Input Spending Summary
Simple table:
- Seeds: KSh 2,400
- Fertilizer: KSh 5,800
- Pesticides: KSh 1,200
- Labour: KSh 3,000
- Total: KSh 12,400

#### 3.8.5 Download Button
📄 Download Season Report (PDF)

---

### 3.9 Profile Page

**Page Type**: Authenticated farmer page

**Tagline**: Your farm, your details.

#### 3.9.1 Farmer Profile Card
- Avatar (initial circle — P)
- Name: Priscah Wanjiku
- Phone: +254 712 xxx xxx
- Email: priscah_1@miaoda.com
- Country: Kenya 🇰🇪
- Member since: January 2025
- Button: ✏️ Edit Profile

#### 3.9.2 Farm Details
- Farm name: Wanjiku Farm
- Location: Nakuru, Rift Valley
- Total area: 3.2 acres
- Primary crop: Maize
- IoT sensors installed: 3
- Last drone scan: June 20, 2025

#### 3.9.3 Linked Bank Account
- Bank: Equity Bank
- Account: ••••4521
- Status: ✅ Verified
- Button: Update Bank Details

#### 3.9.4 SMS Notification Preferences
Toggle switches (all ON by default):
- Market price alerts
- Harvest reminders
- Pest & disease warnings
- Loan repayment reminders
- Weather alerts

#### 3.9.5 Language Preference
Dropdown: English / Swahili

---

### 3.10 Buyer Portal — Home (Dashboard)

**Page Type**: Authenticated web portal (buyer-facing)

**Target Audience**: Crop buyers, aggregators, food processors, and traders across East & West Africa

**Device Priority**: Mobile-first with full desktop layout

**Navigation Sidebar / Bottom Nav**:
- 🏠 Home (Dashboard)
- 🌾 Browse Farms
- 📋 My Watchlist
- 📦 Procurement
- 📊 Quality Reports
- 👤 Profile

**Welcome Banner**: Good morning, James 👋 Here's what's ready for sourcing today.

**4 Stat Cards (top row)**:
- 🌾 Farms Watched: 12
- 📦 Active Offers: 3
- ✅ Completed Purchases: 8
- 📅 Upcoming Harvests: 5 in next 30 days

**Upcoming Harvests Feed** (3 cards, each showing):
- Farm name + farmer first name
- Location (county + country)
- Crop + variety
- Expected harvest date
- Estimated yield available
- Quality grade badge
- Button: View Farm →

Dummy entries:
- Wanjiku Farm | Nakuru, Kenya | Maize — Duma 43 | Jul 18 | 18 bags | Grade B+
- Okello Farm | Gulu, Uganda | Sorghum | Jul 25 | 32 bags | Grade A
- Adaeze Farm | Enugu, Nigeria | Soybeans | Aug 2 | 45 bags | Grade A-

**Price Pulse** (small card):
Current market prices this week:
- Maize: KSh 3,100/bag ↑
- Sorghum: UGX 85,000/bag →
- Soybeans: NGN 48,000/bag ↓

---

### 3.11 Browse Farms Page

**Tagline**: Find verified farms growing what you need.

**Filter Bar** (horizontal, scrollable on mobile):
- Crop type (dropdown)
- Country (dropdown)
- Harvest date range (date picker)
- Quality grade (A / B / C)
- Farm size (small / medium / large)
- Clear filters button

**Farm Cards Grid** (2 columns mobile, 3 desktop):
Each card shows:
- Farm photo (placeholder)
- Farm name + farmer first name
- 📍 Location
- 🌾 Crop + variety
- 📅 Harvest date
- ⚖️ Available quantity
- ⭐ Quality grade badge
- 🔵 Verified by Outgrow badge
- Button: View Profile →

Dummy farms (6 cards):
1. Wanjiku Farm | Nakuru, Kenya | Maize | Jul 18 | 18 bags | B+
2. Okello Farm | Gulu, Uganda | Sorghum | Jul 25 | 32 bags | A
3. Adaeze Farm | Enugu, Nigeria | Soybeans | Aug 2 | 45 bags | A-
4. Mensah Farm | Kumasi, Ghana | Maize | Aug 10 | 22 bags | B
5. Phiri Farm | Lilongwe, Malawi | Groundnuts | Aug 15 | 28 bags | A
6. Achieng Farm | Kisumu, Kenya | Sorghum | Aug 20 | 15 bags | B+

---

### 3.12 Farm Profile Page (Buyer View)

**Dummy farm**: Wanjiku Farm — Priscah W. — Nakuru, Kenya

**Sections**:

**1. Hero Card**:
- Farm name, farmer name, location, crop, acreage
- Verified badge ✅ + IoT Monitored badge 📡
- Harvest date + days remaining countdown
- Two buttons: 💬 Make an Offer | ❤️ Add to Watchlist

**2. Farm Vitals** (from Outgrow field visit):
- Soil pH: 6.4 (Optimal)
- Soil moisture: 68%
- Farm size: 3.2 acres
- Planting date: Mar 3, 2025
- Last drone scan: Jun 20, 2025

**3. Yield Information**:
- Expected yield: 18 bags (90kg each)
- Last season yield: 13 bags
- Quality grade: B+
- Small bar chart comparing expected vs last season vs regional average

**4. IoT Live Readings**:
3 small cards — Temperature, Humidity, Soil Moisture — with current values and status dots

**5. Drone Map Thumbnail**:
Color zone preview image of the farm (static placeholder). Button: View Full Map → (for Outgrow team use only note)

**6. Make an Offer Panel**:
Simple form:
- Quantity needed (number input, max 18 bags)
- Offered price per bag (KSh)
- Pickup preference: Farm pickup / Buyer arranges / Outgrow logistics
- Message to farmer (optional text area)
- Button: Send Offer →

---

### 3.13 My Watchlist Page

**Tagline**: Farms you're keeping an eye on.

Same farm cards as Browse, but only saved farms. Each card has:
- ❌ Remove from watchlist
- 🔔 Harvest alert toggle (ON/OFF)
- View Farm → button

3 dummy watchlisted farms pre-populated.

---

### 3.14 Procurement Page

**Tagline**: Track your offers and purchases in one place.

**Tabs**: Active Offers | Completed | Cancelled

**Active Offers** (2 entries):
- Wanjiku Farm | Maize | 10 bags | KSh 3,200/bag | Sent Jun 28 | Status: Awaiting Farmer Response 🟡
- Okello Farm | Sorghum | 20 bags | UGX 82,000/bag | Sent Jun 25 | Status: Accepted — Awaiting Harvest 🟢

Each entry has: View Details | Cancel Offer buttons

**Completed** (2 entries):
- Mensah Farm | Maize | 15 bags | Delivered Apr 2025 | ✅ Paid
- Achieng Farm | Sorghum | 10 bags | Delivered Jan 2025 | ✅ Paid

---

### 3.15 Quality Reports Page

**Tagline**: Data-backed assurance on every farm.

List of farms with available reports. Each entry:
- Farm name + crop
- Report date
- Overall quality score (e.g., 84/100)
- Sub-scores: Soil Health, Moisture Consistency, Pest History, Yield Reliability
- Button: Download Report (PDF)

2 dummy reports:
- Wanjiku Farm | Maize | Jun 20, 2025 | Score: 84/100
- Okello Farm | Sorghum | Jun 15, 2025 | Score: 91/100

---

### 3.16 Buyer Profile Page

Simple profile page:
- Name: James Kariuki
- Company: Unga Group Ltd
- Email + Phone
- Country: Kenya 🇰🇪
- Crop interests: Maize, Sorghum, Soybeans
- Verified buyer badge ✅
- Edit Profile button
- Notification preferences (toggles): Harvest alerts, New farm listings, Price updates

---

### 3.17 Admin & Field Team Portal

**App Name**: Outgrow — Admin Portal

**Type**: Internal operations dashboard (Outgrow staff only)

**Users**: Two roles — Admin (headquarters) and Field Agent (on-farm team)

**Device Priority**: Desktop-first for Admin, Mobile-first for Field Agents

**Access**: Fully gated — Outgrow staff login only

**Design Style**: Darker, more utilitarian version of the Outgrow brand. Deep green (#1B4332) sidebar, white main area, amber (#D4A017) for alerts and action items. Data-dense but organized. Professional internal tool feel — not a marketing page.

**Dummy Context**:
- Admin: Sarah Mwangi | Head of Operations | Nairobi HQ
- Field Agent: David Ouma | Field Agent | Nakuru Region, Kenya
- Platform stats: 4,847 farms enrolled | 5 countries | 312 active this season

#### 3.17.1 Role-Based Access

| Feature | Admin | Field Agent |
|---|---|---|
| Operations Dashboard | ✅ Full | ✅ Own region only |
| Farm Onboarding | ✅ View all | ✅ Submit new |
| Device Management | ✅ Full | ✅ Own farms only |
| Farmer Accounts | ✅ Full | 👁 View only |
| Buyer Accounts | ✅ Full | ❌ No access |
| Analytics | ✅ Full | ❌ No access |
| Extension Services | ✅ Full | ✅ Own farms |
| Platform Settings | ✅ Full | ❌ No access |

#### 3.17.2 Navigation Sidebar

**Admin view**:
- 📊 Operations Dashboard
- 🌱 Farm Onboarding
- 📡 Device Management
- 👩‍🌾 Farmer Accounts
- 🛒 Buyer Accounts
- 🌾 Extension Services
- 📈 Analytics
- ⚙️ Settings

**Field Agent view**:
- 📊 My Region Dashboard
- 🌱 Farm Onboarding
- 📡 Device Management
- 🌾 Extension Services
- 👤 My Profile

#### 3.17.3 Operations Dashboard (Admin)

**Welcome banner**: Good morning, Sarah 👋 Here's today's overview across all 5 countries.

**Top Stat Row** (6 cards):
- 🌱 Total Farms Enrolled: 4,847
- 🗓 New This Month: 134
- 📡 IoT Devices Online: 3,921 / 4,102
- 🚁 Drone Scans This Month: 89
- ⚠️ Active Alerts: 23
- 🤝 Buyer Offers Pending: 41

**Farms by Country** (horizontal bar chart):
- Kenya: 1,840
- Uganda: 1,120
- Nigeria: 980
- Ghana: 640
- Malawi: 267

**Field Visit Schedule** (today's list):
Table with columns — Agent name, Farm name, Location, Visit type, Time, Status

| Agent | Farm | Location | Visit Type | Time | Status |
|---|---|---|---|---|---|
| David Ouma | Wanjiku Farm | Nakuru, KE | IoT Check | 9:00 AM | ✅ Done |
| Amina Hassan | Okello Farm | Gulu, UG | Onboarding | 11:00 AM | 🟡 In Progress |
| Chidi Eze | Adaeze Farm | Enugu, NG | Drone Scan | 2:00 PM | ⬜ Upcoming |

**Active Alerts Feed** (most urgent first):
- 🔴 IoT sensor offline — Phiri Farm, Malawi — 6 hrs ago
- 🔴 High pest alert — Mensah Farm, Ghana — 12 hrs ago
- 🟡 Soil pH critical — Achieng Farm, Kisumu — 1 day ago
- 🟡 Device battery low — Okello Farm, Uganda — 1 day ago

Each alert has: Assign to Agent → button

#### 3.17.4 Farm Onboarding

**Admin view**: Full list of all farms at every onboarding stage

**Field Agent view**: Only their assigned farms

**Onboarding Pipeline** (Kanban-style columns or tab view):

Tabs: Pending Visit | Visit Done | Data Processing | Active on Platform

Each farm card shows:
- Farm name + farmer name
- Location + country flag
- Assigned field agent
- Sign-up date
- Checklist progress bar (e.g. 3/5 steps complete)
- Button: View Details →

**Farm Onboarding Detail Page** (opens on click):
Farmer info at top. Then a checklist form for field agents to complete:

Checklist:
- ✅ Farmer interview completed
- ✅ Farm boundary mapped (GPS coordinates logged)
- ✅ Soil pH sample taken — Result: 6.4
- ✅ Drone scan completed — upload GeoTIFF file
- 🟡 IoT sensors installed — Pending
- ⬜ Dashboard access given to farmer

Fields to fill:
- Soil pH reading (number)
- Expected yield estimate (bags)
- Primary crop confirmed (dropdown)
- Number of IoT sensors installed (number)
- Notes for agronomist (text area)
- Upload drone imagery (file upload)
- Button: Submit Field Report →

#### 3.17.5 Device Management

**Tagline**: Monitor all IoT sensors and devices across the network.

**Summary Row**:
- 📡 Total Devices: 4,102
- ✅ Online: 3,921
- 🔴 Offline: 181
- 🔋 Low Battery: 94

**Device Table** (filterable by country, status, farm):

| Farm | Location | Sensor ID | Status | Battery | Last Ping | Action |
|---|---|---|---|---|---|---|
| Wanjiku Farm | Nakuru, KE | SN-00124 | 🟢 Online | 87% | 2 min ago | View |
| Phiri Farm | Lilongwe, MW | SN-00891 | 🔴 Offline | 12% | 6 hrs ago | Assign Fix |
| Okello Farm | Gulu, UG | SN-00432 | 🟡 Low Battery | 18% | 45 min ago | View |

**Offline Device Alert Panel**:
List of all offline devices with one-click Dispatch Field Agent button per device

#### 3.17.6 Farmer Accounts

**Search bar**: Search by name, phone, location, crop

**Farmer Table**:

| Name | Country | Crop | Farm Size | Season | IoT | Status | Action |
|---|---|---|---|---|---|---|---|
| Priscah W. | 🇰🇪 Kenya | Maize | 3.2 ac | Active | ✅ | ✅ Active | View |
| Samuel O. | 🇺🇬 Uganda | Sorghum | 5.1 ac | Active | ✅ | ✅ Active | View |
| Ngozi A. | 🇳🇬 Nigeria | Soybeans | 2.8 ac | Inactive | ❌ | 🟡 Pending | View |

**Farmer Detail Page** (opens on View):
- Full profile: personal info, farm details, IoT status, loan history, yield history, SMS log, buyer interactions
- Admin actions: Edit profile, Suspend account, Reassign field agent, Send SMS

#### 3.17.7 Buyer Accounts

**Search bar**: Search by name, company, country, crop interest

**Buyer Table**:

| Name | Company | Country | Crops | Offers Made | Status | Action |
|---|---|---|---|---|---|---|
| James K. | Unga Group | 🇰🇪 Kenya | Maize | 5 | ✅ Verified | View |
| Ama S. | GhanaFoods | 🇬🇭 Ghana | Soybeans | 2 | 🟡 Pending | View |

Admin actions per buyer: Verify account, Suspend, View all offers

#### 3.17.8 Extension Services

**Tagline**: Assign agronomists, schedule visits, and log recommendations.

**Sections**:

1. **Pending Farm Queries** (from AI Advisor escalations):
List of cases where AI flagged confirm with agronomist:
- Wanjiku Farm | Maize Streak Virus suspicion | Jun 28 | Assign Agronomist →
- Mensah Farm | Unexplained yellowing | Jun 27 | Assign Agronomist →

2. **Scheduled Extension Visits**:
Table — Farm, Agent, Date, Visit type, Status

3. **Log a Recommendation** (Field Agent form):
- Select farm (dropdown)
- Issue observed (text)
- Recommendation given (text)
- Follow-up needed? (yes/no toggle)
- Send to farmer via SMS? (yes/no toggle)
- Submit button

4. **Extension History**:
Log of all past recommendations per farm, searchable

#### 3.17.9 Analytics (Admin only)

**Sections**:

1. **Yield Performance**:
Line chart — average yield per season across all farms, by country

2. **Platform Growth**:
Bar chart — farms enrolled per month over the last 12 months

3. **Buyer Activity**:
- Total offers made this season: 312
- Offers accepted: 198
- Average price per bag (by crop)
- Top 5 most active buyers

4. **Loan Disbursement**:
- Total disbursed this season: KSh 48.2M
- Repayment rate: 91%
- Partner breakdown (Equity Bank vs KCB vs other)

5. **AI Advisor Usage**:
- Total queries this season: 1,847
- Top 3 diagnosed issues: Fall Armyworm, Nitrogen Deficiency, Gray Leaf Spot
- Escalated to agronomist: 134

6. **SMS Alerts Sent**:
Donut chart by category — Market, Weather, Pest, Finance, Extension

#### 3.17.10 Settings (Admin only)

**Sections**:
- User Management: Add/remove admin and field agent accounts, assign regions
- SMS Templates: Edit standard SMS messages sent to farmers
- Crop Library: Add/edit supported crop types and varieties
- Partner Banks: Manage bank integration details
- Country Settings: Toggle which countries are active on the platform
- AI Advisor Settings: Confidence threshold for escalation to agronomist

#### 3.17.11 My Profile (Field Agent View)

**Design**: Match existing admin portal style — cream background, white cards, green headings, amber accents.

**Section 1 — Profile Card**
Large card at top:
- Avatar circle: DO (dark green, white initials)
- Full Name: David Ouma
- Role badge: 🟢 Field Agent
- Region: Nakuru, Kenya 🇰🇪
- Staff ID: OG-KE-0042
- Member since: February 2024
- Email: david.ouma@outgrow.africa
- Phone: +254 722 445 881
- Button: ✏️ Edit Profile

**Section 2 — My Region Stats**
4 small stat cards in a row:
- 🌱 Farms Assigned: 38
- ✅ Visits This Month: 14
- 📡 Devices Managed: 112
- ⚠️ Open Alerts: 3

**Section 3 — Upcoming Field Visits**
Simple list, next 3 scheduled visits:

| Farm | Location | Visit Type | Date & Time |
|---|---|---|---|
| Wanjiku Farm | Nakuru | IoT Check | Jul 2, 9:00 AM |
| Kariuki Farm | Subukia | Onboarding | Jul 3, 11:00 AM |
| Njoroge Farm | Molo | Drone Scan | Jul 5, 8:30 AM |

Button at bottom: View Full Schedule →

**Section 4 — Recent Activity**
Last 5 actions David has taken on the platform:

- ✅ Submitted field report — Wanjiku Farm — Jun 28
- 📡 Replaced sensor — Phiri Farm — Jun 26
- 🌱 Completed onboarding — Achieng Farm — Jun 24
- 📋 Logged extension recommendation — Mensah Farm — Jun 22
- 🚁 Uploaded drone scan — Okello Farm — Jun 20

**Section 5 — Account Settings**
Simple toggles and preferences:
- 🔔 Push notifications: ON
- 📱 SMS alerts for farm emergencies: ON
- 🌐 Language: English
- Button: 🔒 Change Password
- Button: 🚪 Sign Out (red outline, bottom of page)