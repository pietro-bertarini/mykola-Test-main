import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import backgroundGif from "../assets/images/play.gif";
import backgroundMusic from "../assets/audio/background-music.mp3";
import buttonHoverSound from "../assets/audio/button-hover.mp3";
import buttonClickSound from "../assets/audio/button-click.mp3";
import { X } from "lucide-react";
import "./Play.css";
import axios from "axios";
import COLORS from "../styles/colors";
import { useWallet } from "../main";

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  content: {
    backgroundColor: "#2c2c54",
    border: `2px solid #00d9ff`,
    borderRadius: "20px",
    padding: "40px",
    maxWidth: "600px",
    height: "300px",
    width: "90%",
    color: "white",
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
  },
};

const modalPlayStyles = {
  overlay: {
    backgroundColor: COLORS.background.transparent,
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  content: {
    backgroundColor: COLORS.background.main,
    border: `2px solid ${COLORS.border.light}`,
    borderRadius: "20px",
    padding: "40px",
    maxWidth: "600px",
    height: "200px",
    width: "90%",
    color: COLORS.text.primary,
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
  },
};

const modalHistoryStyles = {
  overlay: {
    backgroundColor: COLORS.background.transparent,
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  content: {
    backgroundColor: COLORS.background.main,
    border: `2px solid ${COLORS.border.light}`,
    borderRadius: "20px",
    padding: "40px",
    maxWidth: "800px",
    height: "500px",
    width: "90%",
    color: COLORS.text.primary,
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "auto", // Changed to auto to allow scrolling
  },
};

const Play = () => {
  const navigate = useNavigate();
  const { walletAddress, formatWalletAddress } = useWallet();
  const [SettingsmodalIsOpen, setModalSettingIsOpen] = useState(false);
  const [PlaymodalIsOpen, setModalPlayIsOpen] = useState(false);
  const [HistorymodalIsOpen, setModalHistoryIsOpen] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyLimit] = useState(5); // Number of results per page
  const [totalHistoryPages, setTotalHistoryPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const [bgVolume, setBgVolume] = useState(
    localStorage.getItem("bgVolume") !== null ? parseInt(localStorage.getItem("bgVolume"), 10) : 50
  );
  const [sfxVolume, setSfxVolume] = useState(
    localStorage.getItem("sfxVolume") !== null ? parseInt(localStorage.getItem("sfxVolume"), 10) : 50
  );

  const [mutedBg, setMutedBg] = useState(false);
  const [mutedSfx, setMutedSfx] = useState(false);

  const bgAudioRef = useRef(null);
  const hoverAudioRef = useRef(null);
  const clickAudioRef = useRef(null);

  useEffect(() => {
    bgAudioRef.current = new Audio(backgroundMusic);
    hoverAudioRef.current = new Audio(buttonHoverSound);
    clickAudioRef.current = new Audio(buttonClickSound);

    const bgAudio = bgAudioRef.current;
    bgAudio.loop = true;
    bgAudio.volume = bgVolume / 100;

    const startMusic = () => {
      bgAudio.play().catch((error) => console.error("Autoplay failed:", error));
    };

    document.addEventListener("click", startMusic, { once: true });

    return () => {
      document.removeEventListener("click", startMusic);
      bgAudio.pause();
      bgAudio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (bgAudioRef.current) {
      bgAudioRef.current.volume = bgVolume / 100;
    }
    localStorage.setItem("bgVolume", bgVolume);
  }, [bgVolume]);

  useEffect(() => {
    hoverAudioRef.current.volume = sfxVolume / 100;
    clickAudioRef.current.volume = sfxVolume / 100;
    localStorage.setItem("sfxVolume", sfxVolume);
  }, [sfxVolume]);

  const handleBgVolumeChange = (event) => {
    const newVolume = parseInt(event.target.value, 10);
    setBgVolume(newVolume);
    setMutedBg(newVolume === 0);
  };

  const handleSfxVolumeChange = (event) => {
    const newVolume = parseInt(event.target.value, 10);
    setSfxVolume(newVolume);
    setMutedSfx(newVolume === 0);
  };

  const playHoverSound = () => {
    hoverAudioRef.current.currentTime = 0;
    hoverAudioRef.current.play().catch((error) =>
      console.error("Hover sound playback failed:", error)
    );
  };

  const playClickSound = () => {
    clickAudioRef.current.currentTime = 0;
    clickAudioRef.current.play().catch((error) =>
      console.error("Click sound playback failed:", error)
    );
  };

  const SettingopenModal = () => {
    setModalSettingIsOpen(true);
    playClickSound();
  };

  const SettingcloseModal = () => {
    setModalSettingIsOpen(false);
    playClickSound();
  };

  const PlayopenModal = () => {
    playClickSound();
    setModalPlayIsOpen(true);
  };

  const PlaycloseModal = () => {
    playClickSound();
    setModalPlayIsOpen(false);
  };

  const HistoryopenModal = () => {
    playClickSound();
    setModalHistoryIsOpen(true);
    fetchGameHistory(1); // Fetch the first page when opening
  };

  const HistorycloseModal = () => {
    playClickSound();
    setModalHistoryIsOpen(false);
  };

  const fetchGameHistory = async (page) => {
    setIsLoading(true);
    try {
      const userID = localStorage.getItem("userID");
      if (!userID) {
        alert("User ID is missing. Please log in again.");
        setIsLoading(false);
        return;
      }

      const response = await axios.get(
        `http://localhost:5001/api/memory/results/user/${userID}?page=${page}&limit=${historyLimit}`
      );

      setGameHistory(response.data.results);
      setTotalHistoryPages(response.data.totalPages);
      setHistoryPage(page);
    } catch (error) {
      console.error("Error fetching game history:", error);
      if (error.response && error.response.status === 404) {
        // No results found
        setGameHistory([]);
        setTotalHistoryPages(0);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalHistoryPages) {
      fetchGameHistory(newPage);
      playClickSound();
    }
  };

  // Format date to a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Format time taken in seconds to minutes and seconds
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const handleDifficultySelect = (level) => {
    setDifficulty(level);
  };

  const handlePlay = () => {
    playClickSound();
    const userID = localStorage.getItem("userID");
    if (!userID) {
      alert("UserID is missing. Please log in again.");
      return;
    }
    localStorage.setItem("gameStarted", "true");

    if (difficulty === "red") {
      navigate("/memory-card-game");
    } else if (difficulty === "yellow") {
      navigate("/medium");
    } else if (difficulty === "green") {
      navigate("/easy");
    } else {
      alert(`Selected difficulty: ${difficulty}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    navigate('/login');
  };

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${backgroundGif})`,
      }}
    >
      {/* Simple Header */}
      <div style={{
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "10px 20px", 
        color: "white",
        fontFamily: "monospace"
      }}>
        <div>Memory Game</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {walletAddress && (
            <div style={{ marginRight: "20px" }}>
              Playing with wallet: {formatWalletAddress(walletAddress)}
            </div>
          )}
          <button 
            onClick={handleLogout}
            style={{ 
              padding: "5px 15px", 
              backgroundColor: "transparent", 
              color: "white", 
              border: "1px solid red", 
              borderRadius: "3px", 
              cursor: "pointer" 
            }}
          >
            LOGOUT
          </button>
        </div>
      </div>

      <h1 className="game-title">
        WonderCards
      </h1>

      <div className="button-container">
        <button
          className="game-button"
          onClick={PlayopenModal}
          onMouseEnter={playHoverSound}
        >
          Play
        </button>
        <button
          className="game-button"
          onClick={HistoryopenModal}
          onMouseEnter={playHoverSound}
        >
          History
        </button>
        <button
          className="game-button"
          onClick={() => {
            playClickSound();
            alert("Instructions coming soon!");
          }}
          onMouseEnter={playHoverSound}
        >
          Instructions
        </button>
        <button
          className="game-button"
          onClick={SettingopenModal}
          onMouseEnter={playHoverSound}
        >
          Settings
        </button>
      </div>
      <Modal
        isOpen={SettingsmodalIsOpen}
        onRequestClose={SettingcloseModal}
        style={{
          ...modalStyles,
          content: {
            ...modalStyles.content,
            backgroundColor: COLORS.background.main,
            color: COLORS.text.primary,
          },
        }}
      >
        <button
          onClick={SettingcloseModal}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: COLORS.text.primary,
          }}
        >
          <X size={24} />
        </button>

        <h2 className="modal-h2">
          Background Music
        </h2>
        <div className="volume-control">
          <span className="volume-icon">{mutedBg ? "🔇" : "🔊"}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={bgVolume}
            onChange={handleBgVolumeChange}
            className="volume-slider"
          />
        </div>

        <h2 className="modal-h2">
          Sound Effects
        </h2>
        <div className="volume-control">
          <span className="volume-icon">{mutedSfx ? "🔇" : "🔊"}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={sfxVolume}
            onChange={handleSfxVolumeChange}
            className="volume-slider"
          />
        </div>
      </Modal>

      <Modal
        isOpen={PlaymodalIsOpen}
        onRequestClose={PlaycloseModal}
        style={{
          ...modalPlayStyles,
          content: {
            ...modalPlayStyles.content,
            backgroundColor: COLORS.background.main,
            color: COLORS.text.primary,
          },
        }}
      >
        <button
          onClick={PlaycloseModal}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: COLORS.text.primary,
          }}
        >
          <X size={24} />
        </button>

        <h2 className="modal-h2">
          Select Difficulty
        </h2>
        <div className="difficulty-selection">
          <button
            onClick={() => {
              handleDifficultySelect("green");
              playClickSound();
            }}
            className={`difficulty-button green ${
              difficulty === "green" ? "selected" : ""
            }`}
            onMouseEnter={playHoverSound}
          >
            Easy
          </button>
          <button
            onClick={() => {
              handleDifficultySelect("yellow");
              playClickSound();
            }}
            className={`difficulty-button yellow ${
              difficulty === "yellow" ? "selected" : ""
            }`}
            onMouseEnter={playHoverSound}
          >
            Normal
          </button>
          <button
            onClick={() => {
              handleDifficultySelect("red");
              playClickSound();
            }}
            className={`difficulty-button red ${
              difficulty === "red" ? "selected" : ""
            }`}
            onMouseEnter={playHoverSound}
          >
            Hard
          </button>
        </div>

        <div>
          <button
            onClick={handlePlay}
            className="play-button"
            onMouseEnter={playHoverSound}
          >
            Accept
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={HistorymodalIsOpen}
        onRequestClose={HistorycloseModal}
        style={{
          ...modalHistoryStyles,
          content: {
            ...modalHistoryStyles.content,
            backgroundColor: COLORS.background.main,
            color: COLORS.text.primary,
          },
        }}
      >
        <button
          onClick={HistorycloseModal}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: COLORS.text.primary,
          }}
        >
          <X size={24} />
        </button>

        <h2 className="modal-h2">
          Game History
        </h2>

        {isLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : gameHistory.length === 0 ? (
          <div className="no-history">
            <p>No game history found. Play a game to see your results!</p>
          </div>
        ) : (
          <>
            <div className="history-table-container">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Difficulty</th>
                    <th>Completed</th>
                    <th>Failed Attempts</th>
                    <th>Time Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {gameHistory.map((game, index) => (
                    <tr key={index}>
                      <td>{formatDate(game.gameDate)}</td>
                      <td>{game.difficulty}</td>
                      <td>{game.completed ? "Yes" : "No"}</td>
                      <td>{game.failed}</td>
                      <td>{formatTime(game.timeTaken)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        
        {/* Pagination controls - moved to bottom */}
        {!isLoading && gameHistory.length > 0 && (
          <div className="pagination-controls">
            <button
              onClick={() => handlePageChange(historyPage - 1)}
              disabled={historyPage === 1}
              className="pagination-button"
              onMouseEnter={playHoverSound}
            >
              Previous
            </button>
            <span className="page-info">
              Page {historyPage} of {totalHistoryPages || 1}
            </span>
            <button
              onClick={() => handlePageChange(historyPage + 1)}
              disabled={historyPage >= totalHistoryPages}
              className="pagination-button"
              onMouseEnter={playHoverSound}
            >
              Next
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Play;
