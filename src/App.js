import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Seat3D from "./Seat3D";
import "./App.css";
import Login from "./Login";

function App() {
  const videoRef = useRef(null);

  // 🎬 Setup video ONCE
  if (!videoRef.current) {
    const vid = document.createElement("video");
    vid.src = "https://www.w3schools.com/html/mov_bbb.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.playsInline = true;

    vid.play().catch(() => {});
    videoRef.current = vid;
  }

  // 🎬 Movies
const movies = [
  {
    id: 1,
    name: "RRR",
    price: 250,
    image: "https://upload.wikimedia.org/wikipedia/en/d/d7/RRR_Poster.jpg",
    trailer: "https://www.youtube.com/embed/f_vbAtFSEc0", // ✅ ADD HERE
  },
  {
  id: 21,
  name: "Baahubali: The Beginning",
  price: 250,
  language: "Telugu",
  image: "https://upload.wikimedia.org/wikipedia/en/5/5f/Baahubali_The_Beginning_poster.jpg",
 trailer: "https://www.youtube.com/embed/sOEg_YZQsTI"
},
   {
    id: 3,
    name: "Sita Ramam",
    price: 200,
    image: "https://upload.wikimedia.org/wikipedia/en/1/1d/Sita_Ramam.jpg",
    trailer: "https://www.youtube.com/embed/Ljk6tGZ1l3A",
  },
  {
    id: 2,
    name: "Interstellar",
    price: 320,
    image: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
  },
  {
    id: 3,
    name: "Spider-Man: No Way Home",
    price: 280,
    image: "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg",
    trailer: "https://www.youtube.com/embed/JfVOs4VSpmA",
  },
  {
    id: 5,
    name: "Joker",
    price: 250,
    image: "https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg",
    trailer: "https://www.youtube.com/embed/zAGVQLHvwOY",
  },
  {
    id: 7,
    name: "3 Idiots",
    price: 180,
    image: "https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg",
    trailer: "https://www.youtube.com/embed/xvszmNXdM4w",
  },
  {
    id: 8,
    name: "Dangal",
    price: 190,
    image: "https://upload.wikimedia.org/wikipedia/en/9/99/Dangal_Poster.jpg",
    trailer: "https://www.youtube.com/embed/x_7YlGv9u1g",
  },
{
  id: 13,
  name: "Jawan",
  price: 300,
  image: "https://upload.wikimedia.org/wikipedia/en/3/39/Jawan_film_poster.jpg",
  trailer: "https://www.youtube.com/embed/k8YiqM0Y-78",
},
{
  id: 14,
  name: "Pathaan",
  price: 290,
  image: "https://upload.wikimedia.org/wikipedia/en/c/c3/Pathaan_film_poster.jpg",
  trailer: "https://www.youtube.com/embed/vqu4z34wENw",
},
{
  id: 15,
  name: "Avengers: Endgame",
  price: 350,
  image: "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
  trailer: "https://www.youtube.com/embed/TcMBFSGVi1c",
},
{
  id: 17,
  name: "Doctor Strange in the Multiverse of Madness",
  price: 320,
  image: "https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg",
  trailer: "https://www.youtube.com/embed/aWzlQ2N6qqg",
},
];

  // 🔐 States
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("login") === "true"
  );
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("email") || ""
  );

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingDone, setBookingDone] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [snacks, setSnacks] = useState([]);
  const snackItems = [
  { name: "Popcorn", price: 150 },
  { name: "Coke", price: 80 },
  { name: "Nachos", price: 120 },
  { name: "Burger", price: 200 },
];

  const bookedSeats = ["A1", "A3", "B2", "C4"];

  const rows = ["A", "B", "C", "D"];
  const seatsPerRow = 5;

  const handleSeatClick = (seatNumber) => {
    if (!selectedMovie) return;
    if (bookedSeats.includes(seatNumber)) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const totalPrice = selectedMovie
    ? selectedSeats.length * selectedMovie.price
    : 0;

  // 📄 PDF Download
 const downloadTicket = () => {
  const doc = new jsPDF();

  doc.rect(10, 10, 180, 100);

  doc.setFontSize(18);
  doc.text("MOVIE TICKET", 60, 25);

  doc.setFontSize(12);

  doc.text(`User: ${userEmail}`, 20, 45);
  doc.text(`Movie: ${selectedMovie?.name}`, 20, 55);
  doc.text(`Seats: ${selectedSeats.join(", ")}`, 20, 65);

  // ✅ ADD SNACKS
  doc.text(
    `Snacks: ${snacks.length > 0 ? snacks.join(", ") : "None"}`,
    20,
    75
  );

  doc.text(`Total Paid: Rs. ${totalPrice}`, 20, 85);
  doc.text("Enjoy your movie!", 60, 100)

  doc.save("ticket.pdf");
};
  // 🔐 LOGIN
  if (!isLoggedIn) {
    return (
      <Login
        onLogin={(email) => {
          localStorage.setItem("login", "true");
          localStorage.setItem("email", email);
          setUserEmail(email);
          setIsLoggedIn(true);
        }}
      />
    );
  }

  // 💳 PAYMENT
  if (showPayment) {
    return (
      <div className="payment-container">
        <h1>💳 Payment Page</h1>

        <h3>Movie: {selectedMovie?.name}</h3>
        <h3>Seats: {selectedSeats.join(", ")}</h3>
        <h3>Total: ₹{totalPrice}</h3>
        <h3>Select Snacks 🍿</h3>

{snackItems.map((item) => (
  <div key={item.name}>
    <label>
      <input
        type="checkbox"
        checked={snacks.includes(item.name)}
        onChange={() => {
          if (snacks.includes(item.name)) {
            setSnacks(snacks.filter((s) => s !== item.name));
          } else {
            setSnacks([...snacks, item.name]);
          }
        }}
      />
      {item.name} - ₹{item.price}
    </label>
  </div>
))}

        <button
          onClick={() => {
            setShowPayment(false);
            setBookingDone(true);
          }}
        >
          Pay Now
        </button>
        <button
  onClick={() => setShowPayment(false)}
>
  ⬅ Back
</button>
        
      </div>
    );
  }
  if (showTrailer && selectedMovie) {
  return (
    <div className="trailer-container">
      <h2>{selectedMovie.name} Trailer 🎥</h2>

      <iframe
        width="700"
        height="400"
        src={selectedMovie.trailer}
        title="Trailer"
        allowFullScreen
      ></iframe>

      <br /><br />

     <button onClick={() => setShowTrailer(true)}>
  Watch Trailer 🎥
</button>
<button onClick={() => setShowTrailer(false)}>
  Back 🔙
</button>
    </div>
  );
}

  // 🎟️ BOOKING SCREEN
  if (bookingDone) {
    return (
      <div className="ticket-container">
        <div className="ticket">
          <h1>🎟 Movie Ticket</h1>

          <p><strong>User:</strong> {userEmail}</p>
          <p><strong>Movie:</strong> {selectedMovie?.name}</p>
          <p><strong>Seats:</strong> {selectedSeats.join(", ")}</p>
          <p><strong>Total Paid:</strong> ₹{totalPrice}</p>
          <p><strong>Snacks:</strong> {snacks.join(", ")}</p>

          <button
            onClick={() => {
              setBookingDone(false);
              setSelectedMovie(null);
              setSelectedSeats([]);
            }}
          >
            Book Again
          </button>

          <button onClick={downloadTicket}>
            Download Ticket 📄
          </button>
        </div>
      </div>
    );
  }

  // 🎬 MAIN UI
  return (
    <div className="container">
      <button
        onClick={() => {
          localStorage.removeItem("login");
          localStorage.removeItem("email");
          setIsLoggedIn(false);
        }}
      >
        Logout
      </button>

      <h1>🎬 BookMyShow 3D</h1>

      <div className="movie-list">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`movie-card ${
              selectedMovie?.id === movie.id ? "selected-movie" : ""
            }`}
            onClick={() => {
              setSelectedMovie(movie);
              setSelectedSeats([]);
            }}
          >
            <img src={movie.image} alt={movie.name} />
            <h3>{movie.name}</h3>
            <p>₹{movie.price}</p>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <>
          <div className="selected-movie-details">
            <img src={selectedMovie.image} alt={selectedMovie.name} />
            <h2>{selectedMovie.name}</h2>
            <button onClick={() => setShowTrailer(true)}>
  Watch Trailer 🎥
</button>
            <p>Price: ₹{selectedMovie.price}</p>
          </div>

          <h2>Select Seats</h2>

          <Canvas style={{ height: 400 }} camera={{ position: [0, 5, 10], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 5, 5]} />
            <Environment preset="city" />
            <OrbitControls />

            <mesh position={[0, 1, 2]} rotation={[-0.2, 0, 0]}>
              <planeGeometry args={[6, 3]} />
              <meshBasicMaterial>
                <videoTexture attach="map" args={[videoRef.current]} />
              </meshBasicMaterial>
            </mesh>

          {rows.map((row, rowIndex) =>
  Array.from({ length: seatsPerRow }, (_, seatIndex) => {
    const seatLabel = `${rows[rowIndex]}${seatIndex + 1}`;

    const isBooked = bookedSeats.includes(seatLabel);
    const isSelected = selectedSeats.includes(seatLabel);

    const color = isBooked
      ? "#444"
      : isSelected
      ? "#22c55e"
      : "#3b82f6";

    return (
      <Seat3D
        key={seatLabel}
        position={[seatIndex - 2, 0, -rowIndex * 1.2]}
        color={color}
        onClick={() => handleSeatClick(seatLabel)}
      />
    );
  })
)}
          </Canvas>
        </>
      )}

      {selectedSeats.length > 0 && (
        <div className="booking-info">
          <h3>Welcome, {userEmail} 👋</h3>
          <h3>Seats: {selectedSeats.join(", ")}</h3>
          <h3>Total: ₹{totalPrice}</h3>

          <button onClick={() => setShowPayment(true)}>
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
}

export default App;