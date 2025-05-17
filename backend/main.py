# import cv2
# import mediapipe as mp
# from fastapi import FastAPI
# from fastapi.responses import JSONResponse
# from fastapi.middleware.cors import CORSMiddleware
# import threading

# app = FastAPI()

# # CORS for frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# mp_hands = mp.solutions.hands
# mp_drawing = mp.solutions.drawing_utils

# gesture_data = {"gesture": "", "message": "", "location": ""}

# hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.7, min_tracking_confidence=0.7)

# def get_gesture(landmarks):
#     def finger_up(tip, pip):
#         return landmarks[tip].y < landmarks[pip].y

#     index_up = finger_up(8, 6)
#     middle_up = finger_up(12, 10)
#     ring_up = finger_up(16, 14)
#     pinky_up = finger_up(20, 18)
#     thumb_up = landmarks[4].x < landmarks[3].x if landmarks[17].x < landmarks[0].x else landmarks[4].x > landmarks[3].x

#     if not index_up and not middle_up and not ring_up and not pinky_up and not thumb_up:
#         return "FIST", "✊ SOS Emergency Signal Sent!"
#     if index_up and not middle_up and not ring_up and not pinky_up:
#         return "INDEX", "☝️ Mark Location on Map"
#     if index_up and middle_up and not ring_up and not pinky_up:
#         return "VICTORY", "🧭 Requesting Rescue"
#     if not index_up and not middle_up and not ring_up and not pinky_up and thumb_up:
#         return "THUMB", "👍 Safe - No Help Needed"
#     if index_up and middle_up and ring_up and pinky_up and thumb_up:
#         return "PALM", "🖐️ Need Immediate Attention"
#     return "", ""

# def capture():
#     global gesture_data
#     cap = cv2.VideoCapture(0)
#     while True:
#         _, frame = cap.read()
#         frame = cv2.flip(frame, 1)
#         result = hands.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))

#         if result.multi_hand_landmarks:
#             for hand_landmarks in result.multi_hand_landmarks:
#                 gesture, message = get_gesture(hand_landmarks.landmark)
#                 gesture_data["gesture"] = gesture
#                 gesture_data["message"] = message
#                 gesture_data["location"] = "Fetching on Frontend"

# capture_thread = threading.Thread(target=capture)
# capture_thread.start()

# @app.get("/gesture")
# def read_gesture():
#     return JSONResponse(content=gesture_data)
import cv2
import mediapipe as mp
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import threading

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"]
)

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.7, min_tracking_confidence=0.7)

gesture_data = {"gesture": "", "message": "", "location": ""}
is_running = False
cap = None
thread = None

def get_gesture(landmarks):
    def finger_up(tip, pip):
        return landmarks[tip].y < landmarks[pip].y

    index_up = finger_up(8, 6)
    middle_up = finger_up(12, 10)
    ring_up = finger_up(16, 14)
    pinky_up = finger_up(20, 18)
    thumb_up = landmarks[4].x < landmarks[3].x if landmarks[17].x < landmarks[0].x else landmarks[4].x > landmarks[3].x

    if not index_up and not middle_up and not ring_up and not pinky_up and not thumb_up:
        return "FIST", "✊ SOS Emergency Signal Sent!"
    if index_up and not middle_up and not ring_up and not pinky_up:
        return "INDEX", "☝️ Mark Location on Map"
    if index_up and middle_up and not ring_up and not pinky_up:
        return "VICTORY", "🧭 Requesting Rescue"
    if not index_up and not middle_up and not ring_up and not pinky_up and thumb_up:
        return "THUMB", "👍 Safe - No Help Needed"
    if index_up and middle_up and ring_up and pinky_up and thumb_up:
        return "PALM", "🖐️ Need Immediate Attention"
    return "", ""

def detect_gestures():
    global is_running, cap
    cap = cv2.VideoCapture(0)

    while is_running and cap.isOpened():
        success, frame = cap.read()
        if not success:
            break

        frame = cv2.flip(frame, 1)
        result = hands.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))

        if result.multi_hand_landmarks:
            for hand_landmarks in result.multi_hand_landmarks:
                gesture, message = get_gesture(hand_landmarks.landmark)
                gesture_data["gesture"] = gesture
                gesture_data["message"] = message

                cv2.putText(frame, f"Gesture: {gesture}", (10, 50), cv2.FONT_HERSHEY_SIMPLEX,
                            1, (0, 255, 0), 2)
                cv2.putText(frame, message, (10, 90), cv2.FONT_HERSHEY_SIMPLEX,
                            0.8, (255, 255, 255), 2)

        cv2.imshow("Gesture Window", frame)
        if cv2.waitKey(1) & 0xFF == ord('q') or not is_running:
            break

    cap.release()
    cv2.destroyAllWindows()

@app.get("/start")
def start_detection():
    global is_running, thread
    if not is_running:
        is_running = True
        thread = threading.Thread(target=detect_gestures)
        thread.start()
    return {"status": "started"}

@app.get("/stop")
def stop_detection():
    global is_running
    is_running = False
    return {"status": "stopped"}

@app.get("/gesture")
def get_data():
    return JSONResponse(content=gesture_data)
