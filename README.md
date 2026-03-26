# WebAventus - Silent Signals

AI-powered disaster response and survival assistant.

## Problem Statement
Amidst a disaster or a conflict, internet and power outages often isolate communities from life-saving information and assistance. People can be trapped in dangerous situations without real-time guidance, first aid instructions, or survival strategies-especially in rural, remote, or infrastructure-compromised areas. In such moments, delays can become the difference between life and death.

## Solution
**Silent Signals** is an AI-powered survival partner for crisis situations like earthquakes, floods, and fires. It provides clear, step-by-step guidance using voice and text input, supports multiple languages, and includes gesture-based alerts for accessibility (including injured or non-verbal users).

Communities can report safe zones and damage via mobile interfaces, while responders use a live dashboard to identify high-risk areas and allocate resources effectively. With on-device AI and mesh networking, Silent Signals helps users stay prepared, organized, and connected when connectivity fails.

## Key Features
1. **Offline AI Survival Assistant**  
   Lightweight on-device AI provides instant emergency guidance (text/voice), including first aid and survival actions.

2. **Gesture-to-Alert Translator**  
   Uses camera/wearable input to detect distress gestures and convert them into emergency alerts quickly.

3. **Multilingual + Voice Interaction**  
   Supports multiple languages with both voice commands and text input.

4. **Local Resource Directory**  
   Maintains offline access to nearby shelters, hospitals, and supply centers by region.

5. **Crowdsourced Safe Zone Reporting**  
   Users can report and geotag safe locations; data syncs locally and uploads when online.

6. **Offline Mesh Communication**  
   Nearby devices share alerts, maps, and updates using mesh-like communication in low/no-connectivity zones.

7. **Responder Dashboard with AI Clustering**  
   Helps rescue teams prioritize incidents by grouping alerts, highlighting high-risk clusters, and supporting rapid decision-making.

## 6) Tech Stack
- **Mobile App:** React Native, React Expo
- **AI & NLP:** Python + TensorFlow Lite(for on-device AI)
- **Gesture Recognition:** MediaPipe
- **Local Storage:** SQLite
- **Mesh Networking:** Bluetooth Mesh
- **Maps & UI:** Mapbox (offline maps), Tailwind CSS

### Why this stack?
- **Offline-first:** On-device AI + local storage + mesh communication for no-internet scenarios.
- **Hackathon-friendly:** Fast development with Expo, MediaPipe, and Tailwind.
- **Real-world fit:** Robust technologies suited for disaster and defense use cases.

---

## Current Repository Implementation (WebAventus)
This repository currently contains:
- **Frontend:** Next.js 13 + TypeScript + Tailwind + Prisma (`app/`, `components/`, `prisma/`)
- **AI Chat Backend:** FastAPI + LangChain + Gemini + Chroma (`fastapi/main.py`)
- **Gesture Backend:** FastAPI + OpenCV + MediaPipe (`backend/main.py`)

## Additional App Details (Reference)
Additional app version of source code is in: [LINK](https://github.com/BhoomiAgrawal12/silentSignals)

Key capabilities represented there include:
- **Dual experience flows:** `I Need Help` and `I'm a Responder` journeys.
- **Voice AI interaction:** Speech-to-text + text-to-speech based chat flow.
- **Multilingual support:** i18n setup with at least English and Hindi.
- **Offline data layer:** SQLite-backed local storage for alerts/help records.
- **Mesh/Bluetooth communication:** BLE scanning and device-to-device emergency messaging.
- **Emergency UX modules:** quick actions (SOS, gesture mode, safe zones, contacts), first-aid cards, and safety checklist.
- **Responder dashboard concepts:** filtered risk map, priority controls, alert summaries, and mesh section.

## Local Setup

### Prerequisites
- Node.js 18+
- npm
- Python 3.10+

### Frontend (Next.js)
```bash
cd /home/bhoomi/Desktop/gsoc2026/WebAventus
npm install
npm run dev
```
Frontend runs on `http://localhost:3000`.

### AI Backend (FastAPI RAG Chat)
```bash
cd /home/bhoomi/Desktop/gsoc2026/WebAventus/fastapi
python -m venv .venv
source .venv/bin/activate.fish
pip install -r ../requirements.txt
printf "GOOGLE_API_KEY=your_key_here\n" > .env
uvicorn main:app --reload --port 8000
```
AI backend runs on `http://localhost:8000`.

### Gesture Backend (FastAPI + MediaPipe)
```bash
cd /home/bhoomi/Desktop/gsoc2026/WebAventus/backend
python -m venv .venv
source .venv/bin/activate.fish
pip install -r ../requirements.txt
uvicorn main:app --reload --port 8001
```
Gesture backend runs on `http://localhost:8001`.

## Important API Endpoints

### Next.js API routes
- `GET/POST /api/incidents`
- `GET/POST /api/distress`

### AI backend (`fastapi/main.py`)
- `POST /chat`

### Gesture backend (`backend/main.py`)
- `GET /start`
- `GET /stop`
- `GET /gesture`

## License
This project is licensed under the **MIT License**.

See the full license text in `LICENSE`.

