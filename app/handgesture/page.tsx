// // pages/gesture.tsx
// import { useEffect, useState } from 'react';

// export default function GesturePage() {
//   const [gesture, setGesture] = useState('');
//   const [message, setMessage] = useState('');
//   const [location, setLocation] = useState('');

//   useEffect(() => {
//     const interval = setInterval(async () => {
//       try {
//         const res = await fetch('http://localhost:8000/gesture');
//         const data = await res.json();
//         setGesture(data.gesture);
//         setMessage(data.message);
//         setLocation((prev) => prev || 'Fetching...');
//         console.log('Gesture:', data.gesture);
//         console.log('Message:', data.message);
//         console.log('Location:', location);
//       } catch (err) {
//         console.error('Error fetching gesture data:', err);
//       }
//     }, 1000);

//     // Get location on load
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((pos) => {
//         const { latitude, longitude } = pos.coords;
//         setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
//       });
//     }

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1>🖐️ Hand Gesture Detection</h1>
//       <p><strong>Gesture:</strong> {gesture}</p>
//       <p><strong>Message:</strong> {message}</p>
//       <p><strong>Location:</strong> {location}</p>
//     </div>
//   );
// }
import { useEffect, useState } from "react";

export default function GesturePage() {
  const [gesture, setGesture] = useState("");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");
  const [running, setRunning] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  // Fetch location once
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
      });
    }
  }, []);

  const sendDistressSignal = async (message: string) => {
    if (!latitude || !longitude) {
      console.error("Location not available");
      return;
    }

    try {
      const response = await fetch("/api/distress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: crypto.randomUUID(),
          message,
          latitude,
          longitude,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send distress signal");
      }

      console.log("Distress signal sent successfully");
    } catch (error) {
      console.error("Error sending distress signal:", error);
    }
  };

  // Poll gesture every second
  useEffect(() => {
    if (!running) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://localhost:8000/gesture");
        const data = await res.json();
        setGesture(data.gesture);
        setMessage(data.message);
        console.log("Gesture:", data.gesture);
        console.log("Message:", data.message);
        console.log("Location:", location);

        // Send distress signal if the gesture indicates distress
        if (data.gesture === "distress" || data.gesture === "help") {
          await sendDistressSignal(
            data.message || "Emergency assistance needed"
          );
        }
      } catch (err) {
        console.error("Error fetching gesture data:", err);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [running, location, latitude, longitude]);

  const startDetection = async () => {
    await fetch("http://localhost:8000/start");
    setRunning(true);
  };

  const stopDetection = async () => {
    await fetch("http://localhost:8000/stop");
    setRunning(false);
    setGesture("");
    setMessage("");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🖐️ Hand Gesture Detection</h1>

      <button onClick={startDetection} style={{ marginRight: "1rem" }}>
        Start Gesture Detection
      </button>
      <button onClick={stopDetection}>Close Window</button>

      <div style={{ marginTop: "2rem" }}>
        <p>
          <strong>Gesture:</strong> {gesture}
        </p>
        <p>
          <strong>Message:</strong> {message}
        </p>
        <p>
          <strong>Location:</strong> {location}
        </p>
      </div>
    </div>
  );
}
