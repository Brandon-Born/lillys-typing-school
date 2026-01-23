# Game Design Document: Lilly's Typing School

## 1. Vision & Overview
**Concept**: "Mavis Beacon Teaches Typing" meets "Dress To Impress".
**Target Audience**: Girls approx. age 8-9.
**Core Philosophy**: "Trick" the user into learning typing through a compelling loop of fashion, unlocking clothes, and runway dominance.
**Platform**: Web-based (Chromebook compatible), offline-capable persistence.

## 2. Architecture & Technology
To ensure the game is lightweight, fast, and runs locally on Chromebooks:

- **Framework**:
  - **Vite** with **React** (Balance of component architecture and performance).
  - **Three.js** (via **React Three Fiber**) for the 3D "Runway" and "Dressing Room" elements to capture the *Dress To Impress* vibe. *Alternative: High-quality 2D canvas if 3D is too heavy, but 3D is preferred for the fashion element.*
  - **Tailwind CSS** for UI overlay styling.
- **Persistence**:
  - **LocalStorage / IndexedDB**: Save player progress (unlocked items, current level, wpm stats) directly in the browser.
  - **State Management**: Zustand or React Context for managing inventory and lesson progress.
- **Assets**:
  - Low-poly 3D models with glTF format for fast loading.
  - CSS animations for UI flair.

## 3. Game Features

### A. The Avatar (The "Model")
- Customizable appearance (hair, skin tone, initial outfit).
- The central figure of the game. All typing progress reflects on the model's wardrobe and fame.

### B. The Gameplay Loop
1. **The Agency (Home)**: View status, access Wardrobe, select next Job.
2. **Rehearsal (The Lesson)**: The core typing practice.
   - Context: "Training for the big show."
   - Mechanics: Typing drills disguised as dance moves or pose preparations.
   - Grading: Accuarcy and Speed determine the quality of the "Runway Walk."
3. **The Gig (The Test)**: A timed typing challenge (Runway Show).
   - Typing specific words triggers poses.
   - Success earns "Fashion Coins" (FC) and Fans.
4. **The Mall (Rewards)**: Spend FC on new clothes, accessories, and makeup.

### C. Progression System
- **Ranks**: New Face -> Junior Model -> Supermodel -> Fashion Icon.
- **Unlocks**: New keys (lessons) unlock new clothing categories (shoes -> skirts -> tops -> accessories).

## 4. App Flow

1. **Splash Screen**: "Lilly's Typing School" logo with glitzy animations. "Click to Start".
2. **Save Slot Selection**: 3 Local slots.
3. **Character Creator** (First time only): Simple setup.
4. **Main Hub (The Dressing Room)**:
   - **Mirror**: See current outfit.
   - **Job Board**: Select the next lesson/level.
   - **Boutique**: Shop for items.
   - **Settings**: Audio/Difficulty.
5. **Gameplay Screen**:
   - **Top**: 3D view of the character (walking or posing).
   - **Bottom/Overlay**: The typing prompt (large, clear text).
   - **Feedback**: Immediate visual flair (sparkles, hearts) on correct keypress. Red "X" or stumble animation on miss.
6. **Results Screen**:
   - "Slayed!" (High score) vs "Trip!" (Low score).
   - Currency earned.

## 5. Visual & Audio Style Guide

### Visuals
- **Aesthetic**: Y2K Fashion / Roblox "Baddie" aesthetic / Bratz dolls influence.
- **Palette**: Pinks, Purples, Holographic Silver, High-contrast Black/White for text readability.
- **Typography**:
  - Headings: Fun, bubbly or bold editorial font (e.g., 'Outfit', 'Chango').
  - Typing Text: Monospace, extremely legible font (e.g., 'Fira Code' or 'Roboto Mono'). High contrast is non-negotiable.

### Audio
- **Music**: Upbeat, runway house music (think royalty-free fashion show beats). Low-pass filter applied during pauses.
- **SFX**:
  - **Typing**: Satisfying "clack" (ASMR mechanical keyboard sounds).
  - **Success**: Camera shutter sound, crowd cheer.
  - **Error**: Subtle "wobble" sound, no harsh buzzers (keep it low pressure).

## 6. Lesson Curriculum
The goal is to teach touch typing without the user looking down.

### Phase 1: The Basics (Training Camp)
- **Home Row (ASDF JKL;)**:
  - Theme: "Learning to Walk".
  - Drills: Repetitive patterns ("dad fad jak sad").
- **Home Row Punctuation**:
  - Theme: "Accessories".

### Phase 2: Reaching Out (Fashion Week Prep)
- **E & I / R & U**:
  - Theme: "Strike a Pose".
  - Introduction of simple words.
- **Shift Keys**:
  - Theme: "Capital Fashion". Capitalizing names of Brands/Designers.

### Phase 3: The Full Collection (World Tour)
- **Bottom Row**:
  - Theme: "Shoe Collection".
- **Numbers/Symbols**:
  - Theme: "Price Tags".

### Engagement Tactics
- **Streak Bonus**: Keeping a streak makes the character glow.
- **"Don't Look" Mechanic**: If technical feasibility allows (webcam?), bonus points for not looking at hands. Otherwise, gameplay speed encourages eyes on screen.

## 7. Technical Requirements for "Antigravity Agents"
- **Code Style**: Functional React, Hooks, clean component separation.
- **Accessibility**: Support for high-contrast modes.
- **Performance**: Must hit 60fps on low-end hardware (Chromebooks). Optimize 3D assets aggressively.
