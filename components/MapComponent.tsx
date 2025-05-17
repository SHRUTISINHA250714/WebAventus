"use client";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl.src,
  iconUrl: iconUrl.src,
  shadowUrl: shadowUrl.src,
});

interface Coordinate {
  id: string;
  latitude: string;
  longitude: string;
}

interface DistressSignal {
  id: string;
  message: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
}

const MapComponent: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [searchResults, setSearchResults] = useState<Coordinate[]>([]);
  const circleRef = useRef<L.Circle | null>(null);
  const [message, setMessage] = useState("");
  const [distressSignals, setDistressSignals] = useState<DistressSignal[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const userCircleRef = useRef<L.Circle | null>(null);
  const distressMarkersRef = useRef<L.Marker[]>([]);

  const addMarkers = (data: Coordinate[]) => {
    if (mapRef.current) {
      data.forEach((coord) => {
        L.marker([parseFloat(coord.latitude), parseFloat(coord.longitude)])
          .addTo(mapRef.current!)
          .openPopup()
          .on("click", () => {
            window.location.href = `/users/${coord.id}`;
          });
      });
    }
  };

  const addDistressMarkers = (signals: DistressSignal[]) => {
    console.log("Adding distress markers:", signals); // Debug log
    // Clear existing distress markers
    distressMarkersRef.current.forEach((marker) => {
      if (mapRef.current) {
        mapRef.current.removeLayer(marker);
      }
    });
    distressMarkersRef.current = [];

    // Add new markers
    if (mapRef.current) {
      signals.forEach((signal) => {
        console.log("Creating marker for signal:", signal); // Debug log
        const marker = L.marker([signal.latitude, signal.longitude]).addTo(
          mapRef.current!
        ).bindPopup(`
            <div class="distress-popup">
              <h3 class="font-bold text-red-600">Distress Signal</h3>
              <p class="my-2">${signal.message}</p>
              <small class="text-gray-500">Sent at: ${new Date(
                signal.timestamp
              ).toLocaleString()}</small>
            </div>
          `);
        distressMarkersRef.current.push(marker);
      });
    }
  };

  const fetchDistressSignals = async () => {
    try {
      console.log("Fetching distress signals..."); // Debug log
      const response = await fetch("/api/distress");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Received distress signals:", data); // Debug log
      setDistressSignals(data);
      addDistressMarkers(data);
    } catch (error) {
      console.error("Error fetching distress signals:", error);
    }
  };

  const sendDistressSignal = async () => {
    if (!position || !message.trim()) return;

    try {
      const signal: DistressSignal = {
        id: crypto.randomUUID(),
        message: message.trim(),
        latitude: position[0],
        longitude: position[1],
        timestamp: new Date(),
      };

      // Send to API
      const response = await fetch("/api/distress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signal),
      });

      if (response.ok) {
        // Update local state
        setDistressSignals((prev) => [...prev, signal]);

        // Update marker popup
        if (userMarkerRef.current) {
          userMarkerRef.current
            .setPopupContent(
              `
            <div class="distress-popup">
              <h3 class="font-bold text-red-600">Distress Signal</h3>
              <p class="my-2">${signal.message}</p>
              <small class="text-gray-500">Sent at: ${signal.timestamp.toLocaleString()}</small>
            </div>
          `
            )
            .openPopup();
        }

        // Add new marker
        addDistressMarkers([...distressSignals, signal]);

        // Clear input
        setMessage("");
      }
    } catch (error) {
      console.error("Error sending distress signal:", error);
      alert("Failed to send distress signal. Please try again.");
    }
  };

  useEffect(() => {
    const fetchCoordinates = async (): Promise<void> => {
      try {
        const response = await fetch("/api/dashboard");
        const data: Coordinate[] = await response.json();
        setCoordinates(data);
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    const initializeMap = (latitude: number, longitude: number) => {
      if (!mapRef.current) {
        const map = L.map("map").setView([latitude, longitude], 13);
        mapRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© Kethideal contributors",
        }).addTo(map);

        // Create user marker
        userMarkerRef.current = L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup("Your location")
          .openPopup();

        // Create circle around user
        userCircleRef.current = L.circle([latitude, longitude], {
          color: "red",
          fillColor: "#f03",
          fillOpacity: 0.3,
          radius: 1000, // 1km radius
        }).addTo(map);

        map.on("click", (event: L.LeafletMouseEvent) => {
          const latLng = event.latlng;
          map.flyTo(latLng, 13);
        });

        addMarkers(coordinates);
      }
    };

    // Fetch initial data
    fetchCoordinates();
    fetchDistressSignals(); // Fetch initial distress signals

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
          initializeMap(latitude, longitude);
          // Fetch distress signals after map is initialized
          fetchDistressSignals();
        },
        (error) => {
          console.error(error);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }

    // Set up polling for new distress signals
    const interval = setInterval(fetchDistressSignals, 30000); // Poll every 30 seconds

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.eachLayer((layer: L.Layer) => {
        if (layer instanceof L.Marker && layer !== userMarkerRef.current) {
          mapRef.current?.removeLayer(layer);
        }
      });

      addMarkers(searchResults);

      if (searchResults.length > 0) {
        const firstResult = searchResults[0];
        const lat = parseFloat(firstResult.latitude);
        const lng = parseFloat(firstResult.longitude);
        mapRef.current.setView([lat, lng], 13);

        if (circleRef.current) {
          mapRef.current.removeLayer(circleRef.current);
        }

        circleRef.current = L.circle([lat, lng], {
          color: "blue",
          fillColor: "#30f",
          fillOpacity: 0.4,
          radius: 5000,
        }).addTo(mapRef.current);
      }
    }
  }, [searchResults]);

  return (
    <div className="flex flex-col w-full">
      {/* Distress Signal Input */}
      <div className="w-full p-4 mb-4">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-medium text-white mb-2 text-center">
            Send Distress Signal
          </h2>
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your distress message..."
              className="w-full md:w-2/3 h-10 p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all bg-white/80 backdrop-blur-sm"
            />
            <button
              onClick={sendDistressSignal}
              className="w-full md:w-1/3 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all font-medium"
            >
              Send Signal
            </button>
          </div>
        </div>
      </div>

      {/* Map */}
      <div
        id="map"
        style={{ height: "calc(100vh - 100px)", width: "100%" }}
        className="flex justify-center items-center"
      >
        {!position && <p className="font-extrabold">Loading map...</p>}
      </div>
    </div>
  );
};

export default MapComponent;
