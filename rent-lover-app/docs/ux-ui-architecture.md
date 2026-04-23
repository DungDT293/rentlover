# UX/UI Architecture Report — "Companion & Healing Connection" Platform

> **Role:** Lead Product Designer & Senior UX/UI Architect
> **Date:** 2026-04-23
> **Status:** Draft — Awaiting Product Owner decisions on 3 critical questions (see bottom)

---

## Table of Contents

1. [Design System & Visual Vibe](#1-design-system--visual-vibe)
2. [Information Architecture (Sitemap)](#2-information-architecture-sitemap)
3. [Core User Flows](#3-core-user-flows)
4. [Home Screen Wireframe — User Mode](#4-home-screen-wireframe--user-mode)
5. [Critical Questions for Product Owner](#5-critical-questions-for-product-owner)

---

## 1. Design System & Visual Vibe

### 1.1 Color Palette — Option A: "Warm Dusk"

| Token          | Hex       | Usage                                          |
| -------------- | --------- | ---------------------------------------------- |
| `primary`      | `#6B5CE7` | Soft lavender — CTA buttons, active states, trust badges |
| `primaryLight` | `#EDE9FC` | Card backgrounds, selected states              |
| `secondary`    | `#F2A154` | Warm amber — highlights, pricing, notifications |
| `surface`      | `#FBF8F4` | Page background — warm off-white, not clinical |
| `surfaceCard`  | `#FFFFFF` | Elevated cards                                 |
| `textPrimary`  | `#2D2A3E` | Deep plum-black — high readability             |
| `textSecondary`| `#8E8A9D` | Muted descriptions                             |
| `success`      | `#4CAF82` | Verified badges, booking confirmed             |
| `danger`       | `#E5544B` | SOS, cancel, report                            |
| `border`       | `#E8E4EF` | Subtle dividers                                |

**Rationale:** Lavender signals calm and safety (used heavily in Vietnamese spa/wellness branding). Warm amber adds approachability without romantic connotation. The off-white surface avoids the cold "marketplace" feel.

### 1.2 Color Palette — Option B: "Morning Garden"

| Token          | Hex       | Usage                                          |
| -------------- | --------- | ---------------------------------------------- |
| `primary`      | `#3A8F7C` | Deep teal — grounded, mature, trustworthy      |
| `primaryLight` | `#E6F5F1` | Card backgrounds                               |
| `secondary`    | `#D4915E` | Terracotta — warmth, human touch               |
| `surface`      | `#F9F7F3` | Warm linen                                     |
| `surfaceCard`  | `#FFFFFF` | Cards                                          |
| `textPrimary`  | `#1F2D2B` | Near-black with green undertone                |
| `textSecondary`| `#7A8B88` | Muted                                          |
| `success`      | `#5BB98B` | Confirmations                                  |
| `danger`       | `#D94E4E` | SOS, alerts                                    |
| `border`       | `#E2DED6` | Dividers                                       |

**Rationale:** Teal evokes healing and stability — common in Vietnamese traditional medicine aesthetics. Terracotta adds earthiness. This palette skews slightly more "mature professional" vs Option A's "gentle wellness."

### 1.3 Typography

| Role               | Font      | Weight | Size  |
| ------------------ | --------- | ------ | ----- |
| Display / H1       | **Inter** | 700    | 28px  |
| H2 / Section title | Inter     | 600    | 20px  |
| Body               | Inter     | 400    | 15px  |
| Caption / metadata | Inter     | 400    | 12px  |
| Button             | Inter     | 600    | 15px  |

**Why Inter:** Native Vietnamese diacritics rendering is flawless (full OpenType support for all tonal marks: `ắ ặ ẫ ố ừ ự`). Geometric enough to feel modern, humanist enough to feel warm. Ships with Expo/Google Fonts with zero config.

**Alternative:** **Be Vietnam Pro** for a more distinctly Vietnamese typographic identity if the brand leans local.

### 1.4 UI Component Style

- **Border radius:** `16px` for cards, `12px` for buttons, `24px` (pill) for tags/badges — everything soft, no sharp corners
- **Shadows:** Minimal. Use `elevation: 2` equivalent (`0 2px 8px rgba(0,0,0,0.06)`) — cards should feel "resting on paper," not floating aggressively
- **Skill Tags over imagery:** Companion cards lead with **soft-colored tags** (`Biết lắng nghe`, `Không hút thuốc`, `Hài hước`) instead of large photos. Photos are secondary — a small circular avatar + optional 15s video intro thumbnail. This de-emphasizes physical appearance and reinforces the "personality-first" philosophy
- **Micro-interactions:** Gentle scale-up on press (`transform: scale(1.02)`), haptic feedback on booking confirmation, smooth spring animations for card expansion
- **Iconography:** Rounded line icons (Phosphor Icons or Lucide) — never filled/bold icons which feel aggressive

---

## 2. Information Architecture (Sitemap)

### 2.1 Client App — Dynamic Tab Navigation

The app uses a **single app with role-aware UI**. The bottom tab bar morphs based on active role.

#### User Mode (Nguoi dung)

```
Tab 1: Trang chu
  ├── Search / Filter bar (hyper-niche filters)
  ├── Companion cards (scrollable feed)
  └── Curated sections ("Moi tham gia", "Gan ban")

Tab 2: Lich hen
  ├── Upcoming bookings (active/pending)
  ├── Past bookings (with review prompt)
  └── Booking detail -> Chat -> SOS (during active)

Tab 3: Tin nhan
  ├── Chat threads (pre-booking negotiation)
  ├── Active session chat (during meetup)
  └── System notifications

Tab 4: Tai khoan
  ├── Profile settings
  ├── Vi & Lich su giao dich
  ├── Chuyen sang che do Companion
  ├── Cai dat quyen rieng tu
  └── Tro giup & Bao cao
```

#### Companion Mode (Nguoi dong hanh)

```
Tab 1: Tong quan
  ├── KPI dashboard (earnings, rating, bookings)
  ├── Incoming requests (accept/decline)
  └── Quick availability toggle

Tab 2: Lich
  ├── Calendar view (blocked/available slots)
  ├── Upcoming confirmed bookings
  └── Active session panel -> SOS

Tab 3: Tin nhan
  ├── Pre-booking chats (boundary negotiation)
  └── Active session chat

Tab 4: Ho so
  ├── Edit public profile (tags, intro, rates)
  ├── Portfolio / Video intro upload
  ├── Vi & Yeu cau rut tien
  ├── KYC status
  └── Chuyen sang che do Nguoi dung
```

### 2.2 Admin Dashboard — Operations Ecosystem (Web-based)

```
Sidebar Navigation:

1. Bang dieu khien (Dashboard)
   ├── Real-time metrics (active sessions, revenue)
   ├── Alert feed (SOS triggers, flagged content)
   └── City-level heatmap (Da Nang pilot)

2. Xac minh KYC
   ├── Queue: Pending applications
   ├── OCR + Face match results (auto-scored)
   ├── Manual review interface (approve/reject)
   └── KYC history & audit trail

3. Bao cao & Vi pham
   ├── Incoming reports (categorized)
   ├── AI-flagged content queue
   ├── SOS incident log (with location data)
   └── Resolution workflow (warn/suspend/ban)

4. AI Moderation
   ├── Chat content flagged by NLP
   ├── Profile content flagged (photos/text)
   ├── False positive review queue
   └── Model confidence thresholds config

5. Tai chinh
   ├── Escrow status (held/released/disputed)
   ├── Payout requests queue
   ├── Revenue & commission reports
   └── Refund processing

6. Quan ly nguoi dung
   ├── User/Companion directory
   ├── Account actions (suspend, verify, note)
   └── Dispute resolution desk

7. Cai dat he thong
   ├── Pricing & commission rules
   ├── Geo-fence configuration (pilot zones)
   ├── Feature flags
   └── Audit logs
```

---

## 3. Core User Flows

### 3.1 Flow 1 — Discovery & Escrow Booking

```
Screen 1: TRANG CHU
+------------------------------+
|  [Tim kiem / Loc]            |  <- Tap to expand filter sheet
|  +------------------------+  |
|  | Bo loc nang cao         |  |
|  | * Khong hut thuoc       |  |
|  | * Biet lang nghe        |  |
|  | * Khong an hanh/rau mui |  |  <- Hyper-niche lifestyle filters
|  | * Thich xem phim        |  |
|  | * Noi tieng Anh         |  |
|  | Khoang cach: [< 5km v]  |  |
|  | Gia: [200k - 500k/h v]  |  |
|  | [Ap dung bo loc]        |  |
|  +------------------------+  |
|                              |
|  +------------------------+  |
|  | (green) Minh Anh        |  |  <- Companion card
|  | * 4.8 - 127 danh gia    |  |
|  | #Biet_lang_nghe #Hai    |  |
|  | 350,000d/gio - Da Nang  |  |
|  | Lich trong: Hom nay 14h |  |
|  +------------------------+  |
+------------------------------+
            | Tap card
            v
Screen 2: HO SO COMPANION
+------------------------------+
|  [<- Quay lai]               |
|  +----------+               |
|  | > Video  | Avatar        |
|  |  15 giay | Minh Anh, 26  |
|  +----------+               |
|  * 4.8 - Da xac minh        |
|  "Minh thich nghe ban ke    |
|   chuyen hon la noi..."     |
|                              |
|  Tags: [Lang nghe] [Ca phe] |
|        [Khong hut thuoc]    |
|                              |
|  Cam xuc pho bien:           |
|  Am ap 92% - Vui ve 87%     |
|                              |
|  Danh gia gan day (3)        |
|  "Rat de chiu, minh cam     |
|   thay thoai mai..."        |
|                              |
|  [  Dat lich hen  ]          |  <- Primary CTA
+------------------------------+
            | Tap CTA
            v
Screen 3: DAT LICH HEN
+------------------------------+
|  [<- Quay lai]               |
|  Chon ngay: [23/04/2026 v]   |
|  Chon gio:  [14:00 v]        |
|  Thoi luong: [2 gio v]       |
|                              |
|  Loai dich vu:               |
|  * Ca phe & tro chuyen      |
|  * Xem phim                 |
|  * Di dao                   |
|  * Tham gia su kien         |
|                              |
|  Dia diem cong cong:         |
|  [Nhap ten quan / dia chi]   |
|                              |
|  Ghi chu cho Companion:      |
|  [Minh hoi huong noi...]     |
|                              |
|  ----------------------------+
|  Tam tinh:                   |
|    2 gio x 350,000d          |
|    = 700,000d                |
|  Phi nen tang: 70,000d       |
|  ----------------------------+
|  Tong ky quy: 770,000d      |
|                              |
|  (i) Tien duoc giu trong ky |
|  quy va chi chuyen cho      |
|  Companion sau khi hoan tat |
|                              |
|  [ Xac nhan & Thanh toan ]   |  <- Escrow payment
+------------------------------+
            | Tap confirm
            v
Screen 4: XAC NHAN THANH TOAN
+------------------------------+
|  (check) Da ky quy thanh cong!|
|                              |
|  Dang cho Companion xac nhan |
|  Ban se nhan thong bao khi   |
|  Minh Anh phan hoi.         |
|                              |
|  [Xem lich hen cua toi]      |
+------------------------------+
```

### 3.2 Flow 2 — Consent & Safety (Companion Side)

```
Screen 1: THONG BAO YEU CAU MOI
+------------------------------+
|  (bell) Yeu cau moi!         |
|                              |
|  Tu: Hai (* 4.6)            |
|  Ngay: 23/04 - 14:00-16:00  |
|  Loai: Ca phe & tro chuyen  |
|  Dia diem: The Coffee House  |
|  Ghi chu: "Minh hoi huong   |
|  noi, muon co nguoi lang    |
|  nghe thoi"                  |
|                              |
|  Thu nhap du kien: 630,000d  |
|                              |
|  [Nhan tin truoc] [Tu choi]  |
+------------------------------+
            | Tap "Nhan tin truoc"
            v
Screen 2: CHAT TRUOC BUOI HEN
+------------------------------+
|  Chat voi Hai                |
|  (!) Thiet lap ranh gioi    |  <- System prompt
|  ----------------------------+
|                              |
|  Minh Anh: Chao ban! Minh   |
|  muon xac nhan mot so dieu  |
|  truoc buoi hen nhe.         |
|                              |
|  +------------------------+  |
|  | Ranh gioi cua toi:     |  |  <- Pre-set boundary template
|  | [x] Chi gap noi cong cong|
|  | [x] Khong uong ruou bia|  |
|  | [x] Khong tiep xuc the |  |
|  |     chat ngoai bat tay  |  |
|  | [Gui ranh gioi]         |  |
|  +------------------------+  |
|                              |
|  Hai: Minh hoan toan dong y  |
|  voi cac dieu kien tren!     |
|                              |
|  ----------------------------+
|  [Nhap tin nhan...]    [Gui] |
|                              |
|  +-------------------------+ |
|  | [Chap nhan buoi hen]    | |  <- Unlocked ONLY after
|  | [Tu choi]               | |     boundary exchange
|  +-------------------------+ |
+------------------------------+
```

**Key UX decision:** The "Chap nhan buoi hen" button is **disabled by default** and only becomes active after at least one boundary message has been sent/acknowledged. This ensures consent is documented in-app.

### 3.3 Flow 3 — SOS & Emergency

```
DURING ACTIVE MEETUP — Persistent SOS Access
+------------------------------+
|  (green) BUOI HEN DANG DIEN RA|
|  Voi: Hai - 14:00 - 16:00   |
|  (pin) The Coffee House, DN  |
|  ----------------------------+
|                              |
|  [Chat]  [Chia se vi tri]    |
|                              |
|  ... (session content) ...   |
|                              |
|                              |
|  ----------------------------+
|  +-------------------------+ |
|  | (shield) Cam thay khong | |  <- Always visible, bottom of
|  |     an toan?            | |     active session screen
|  | [Nhan giu de goi SOS]  | |  <- HOLD 3 seconds (prevents
|  +-------------------------+ |     accidental trigger)
+------------------------------+
            | Hold 3 seconds
            v
SOS ACTIVATED
+------------------------------+
|  (!) SOS DA KICH HOAT        |
|  ----------------------------+
|  [x] Vi tri da gui cho      |
|      doi ngu ho tro          |
|  [x] Duong day nong dang    |
|      duoc ket noi...         |
|  [x] Buoi hen da tam dung   |
|  [x] Ky quy da dong bang    |
|                              |
|  (phone) Dang goi: 1900-xxxx|
|                              |
|  Neu ban dang gap nguy       |
|  hiem, hay goi 113 ngay.    |
|                              |
|  [Huy SOS - Toi on]          |  <- Cancel requires
|  (Nhap ly do huy...)         |     reason text
+------------------------------+
```

**SOS Placement Logic:**

- **Where:** Fixed at the bottom of the "Buoi hen dang dien ra" (Active Session) screen — visible on both User and Companion views
- **How to prevent accidental trigger:** Long-press (3 seconds) with a progress ring animation + haptic escalation. Not a simple tap
- **Additional access:** Also available via the system tray notification that persists during active sessions, so even if the app is backgrounded, one tap on the notification brings up the SOS screen
- **Stealth mode:** If the user shakes the phone 3 times rapidly, it triggers SOS silently (no visual alert on screen) — for situations where the user cannot openly use the phone

---

## 4. Home Screen Wireframe — User Mode

```
+--------------------------------------+
| Status Bar (system)                  |
+--------------------------------------+
|                                      |
|  Xin chao, Hai                       |  <- Greeting with user's
|  Hom nay ban can gi?                 |     first name
|                                      |
+--------------------------------------+
|  (search) Tim kiem companion...      |  <- Search bar (tap to
|  [(pin) Da Nang v] [(gear) Bo loc]   |     expand full filter)
|                                      |
|  Quick filters (horizontal scroll):  |
|  [Lang nghe] [Ca phe] [Xem phim]    |
|  [Su kien] [Goi sang] [Tam su]      |
|                                      |
+--------------------------------------+
|  (lightning) Co the gap hom nay      |  <- Section: Available now
|  ----------------------------------- |
|  +----------------------------------+|
|  | +------+                         ||
|  | | (gre)|  Minh Anh, 26           ||  <- Green dot = online
|  | | en   |  (check) Da xac minh    ||  <- Verified badge
|  | | dot  |                         ||
|  | +------+  * 4.8 (127 danh gia)   ||  <- Emotional rating
|  |  [> Xem video gioi thieu]        ||  <- 15s video thumbnail
|  |                                   ||
|  |  [Lang nghe] [Khong hut thuoc]   ||  <- Soft skill tags
|  |  [Hai huoc]                       ||
|  |                                   ||
|  |  (money) 350,000d/gio            ||  <- Hourly rate
|  |  (pin) 2.3 km - Hai Chau, DN     ||  <- Distance + district
|  |  (clock) Lich trong: Hom nay 14h ||  <- Next available slot
|  |                                   ||
|  |  Cam xuc tu khach:               ||  <- Emotional feedback
|  |  Am ap 92% - Thoai mai 88%       ||     (NOT appearance rating)
|  |                                   ||
|  |  [ Xem ho so ]                    ||  <- Secondary CTA
|  +----------------------------------+|
|                                      |
|  +----------------------------------+|
|  | (Next companion card...)         ||
|  +----------------------------------+|
|                                      |
+--------------------------------------+
|  (star) Duoc danh gia cao           |  <- Section: Top rated
|  (horizontal scroll cards)          |
|                                      |
+--------------------------------------+
|  (new) Moi tham gia                  |  <- Section: New companions
|  (horizontal scroll cards)          |
|                                      |
+--------------------------------------+
|  (headphone) Dich vu truc tuyen     |  <- Section: Online services
|  +----------+ +----------+          |
|  | (sun)    | | (bubble) |          |
|  | Goi      | | Tam su   |          |
|  | sang     | | an danh  |          |
|  | 50,000d  | | 100,000d |          |
|  +----------+ +----------+          |
|                                      |
+--------------------------------------+
|                                      |
|  [Trang chu] [Lich hen]             |  <- Bottom tab bar
|  [Tin nhan]  [Tai khoan]            |
|                                      |
+--------------------------------------+
```

### Companion Card — Data Points

| #  | Data Point              | Example                      | Purpose                              |
| -- | ----------------------- | ---------------------------- | ------------------------------------ |
| 1  | Avatar + online status  | Green dot                    | Availability at a glance             |
| 2  | Name + age              | Minh Anh, 26                 | Basic identity                       |
| 3  | Verified badge          | Da xac minh                  | KYC trust signal                     |
| 4  | Emotional rating        | * 4.8 (127 danh gia)         | Quality signal (NOT appearance)      |
| 5  | Video intro thumbnail   | 15s playable                 | Personality preview                  |
| 6  | Skill/trait tags        | [Lang nghe] [Hai huoc]       | Personality-first discovery          |
| 7  | Hourly rate             | 350,000d/gio                 | Price transparency                   |
| 8  | Distance + location     | 2.3 km - Hai Chau            | Proximity                            |
| 9  | Next availability       | Hom nay 14:00                | Urgency / convenience                |
| 10 | Emotional feedback bars | Am ap 92% - Thoai mai 88%   | Trust reinforcement                  |

---

## 5. Critical Questions for Product Owner

Before writing React Native / FastAPI code, the following decisions are needed:

### Question 1: Payment & Escrow Partner — Ai se giu tien ky quy?

Vietnam has specific regulations around escrow. Are you planning to integrate with a licensed payment gateway (VNPay, MoMo, ZaloPay) that supports hold/release mechanics, or will the platform hold funds directly? This fundamentally shapes the `payments` schema, the booking state machine, and the legal entity structure. It also determines whether we need a banking license or can operate under a payment intermediary agreement.

### Question 2: Boundary Consent — Hard-gate hay soft nudge?

In Flow 2, the "Accept" button is designed to be locked until boundaries are exchanged. Should this be a **hard requirement** (system-enforced, cannot proceed without it) or a **soft nudge** (recommended but skippable)?

- **Hard-gating:** Safer legally, positions the platform strongly for trust, but adds friction that could hurt conversion in early pilot when companion supply is limited.
- **Soft nudge:** Lower friction, but weaker legal protection and trust signal.

This affects chat UI, booking state machine, and moderation rules.

### Question 3: Stealth SOS — Muc do uu tien cho tinh nang nay?

The shake-to-SOS stealth mode is a powerful safety differentiator but requires:
- Accelerometer permissions
- Background processing
- Careful false-positive tuning (a user walking briskly could trigger it)

Should this be in the **MVP (Sprint 1-2)** or **Phase 2**? If MVP, it changes the mobile architecture significantly — we'd need a foreground service on Android and background task on iOS during active sessions.

---

*End of UX/UI Architecture Report. Awaiting Product Owner decisions to proceed with implementation.*
