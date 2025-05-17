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
import { useEffect, useState } from 'react';

export default function GesturePage() {
  const [gesture, setGesture] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [running, setRunning] = useState(false);

  // Fetch location once
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
      });
    }
  }, []);

  // Poll gesture every second
  useEffect(() => {
    if (!running) return;
    const interval = setInterval(async () => {
      const res = await fetch('http://localhost:8000/gesture');
      const data = await res.json();
      setGesture(data.gesture);
      setMessage(data.message);
      console.log('Gesture:', data.gesture);
      console.log('Message:', data.message);
      console.log('Location:', location);
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const startDetection = async () => {
    await fetch('http://localhost:8000/start');
    setRunning(true);
  };

  const stopDetection = async () => {
    await fetch('http://localhost:8000/stop');
    setRunning(false);
    setGesture('');
    setMessage('');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🖐️ Hand Gesture Detection</h1>

      <button onClick={startDetection} style={{ marginRight: '1rem' }}>
        Start Gesture Detection
      </button>
      <button onClick={stopDetection}>Close Window</button>

      <div style={{ marginTop: '2rem' }}>
        <p><strong>Gesture:</strong> {gesture}</p>
        <p><strong>Message:</strong> {message}</p>
        <p><strong>Location:</strong> {location}</p>
      </div>
    </div>
  );
}
