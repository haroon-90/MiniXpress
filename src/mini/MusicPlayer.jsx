import React, { useState, useRef, useEffect, useContext } from "react";
import music_bg from "../assets/svg/music_bg.svg";
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { ThemeContext } from "../contexts/ThemeContext.jsx"
import musicIMG from "../assets/images/music1.jpg"
import { motion } from "framer-motion"
import './views.css'

const MusicPlayer = () => {
    const [audioFile, setAudioFile] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [audioFileName, setAudioFileName] = useState("");
    const [isReady, setIsReady] = useState(false);
    const audioPlayerRef = useRef(null);

    const { theme } = useContext(ThemeContext)
    const isDark = theme === "dark"

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === "Space" || e.key === " ") {
                e.preventDefault();
                togglePlayPause();
            }
            if (e.code === "ArrowRight") {
                skipForward();
            } else if (e.code === "ArrowLeft") {
                skipBackward();
            } else if (e.code === "ArrowUp") {
                e.preventDefault();
                if (audioPlayerRef.current) {
                    const currentVol = audioPlayerRef.current.volume;
                    const newVolume = Math.min(currentVol + 0.05, 1);
                    audioPlayerRef.current.volume = newVolume;
                    setVolume(newVolume);
                }
            } else if (e.code === "ArrowDown") {
                e.preventDefault();
                if (audioPlayerRef.current) {
                    const currentVol = audioPlayerRef.current.volume;
                    const newVolume = Math.max(currentVol - 0.05, 0);
                    audioPlayerRef.current.volume = newVolume;
                    setVolume(newVolume);
                }
            } else if (e.key.toLowerCase() === "m") {
                e.preventDefault();
                toggleMute();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isPlaying, isReady, audioFile, isMuted]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAudioFileName(file.name);
            const audio = new Audio(URL.createObjectURL(file));
            audioPlayerRef.current = audio;
            setAudioFile(file);
            audio.onloadedmetadata = () => {
                setDuration(audio.duration);
            };
            audio.oncanplaythrough = () => {
                setIsReady(true);
            };
            audio.ontimeupdate = () => {
                setCurrentTime(audio.currentTime);
            };
        }
    };

    const togglePlayPause = () => {
        if (!audioPlayerRef.current) return;

        if (isPlaying) {
            audioPlayerRef.current.pause();
        } else {
            audioPlayerRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const skipForward = () => {
        if (audioPlayerRef.current) {
            audioPlayerRef.current.currentTime += 10;
        }
    };

    const skipBackward = () => {
        if (audioPlayerRef.current) {
            audioPlayerRef.current.currentTime -= 10;
        }
    };

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        if (audioPlayerRef.current) {
            audioPlayerRef.current.volume = newVolume;
        }
    };

    const toggleMute = () => {
        if (audioPlayerRef.current) {
            audioPlayerRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleProgressChange = (e) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (audioPlayerRef.current) {
            audioPlayerRef.current.currentTime = newTime;
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    useEffect(() => {
        if (audioPlayerRef.current) {
            audioPlayerRef.current.addEventListener("ended", () => {
                setIsPlaying(false);
                setCurrentTime(0);
                audioPlayerRef.current.play();
                setIsPlaying(true);
            });
        }
    }, [audioFile]);

    return (
        <motion.div
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(150% at 50% 50%)' }}
            exit={{ clipPath: 'circle(0% at 50% 50%)' }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
            <div
                className={`${isPlaying ? "bg" : ""} bg-blue-800/20 backdrop-blur-[2px] p-4 rounded-4xl shadow-xl w-[90vw] md:w-[70vw] lg:min-h-[90vh] mx-auto my-10 flex flex-col items-center justify-center`}
                style={{
                    backgroundImage: `url(${music_bg})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center"
                }}
            >
                {/* <h2 className={`text-2xl md:text-3xl ${isDark ? "bg-[#0f1056]" : "bg-[#E8F9FF]"} w-[fit-content] font-semibold text-center mb-4 md:mb-6 rounded-full p-2`}>Music Player</h2> */}
                <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className={`block w-auto text-sm ${isDark ? "text-white bg-[#0f1056] " : "text-black bg-[#E8F9FF]"}  p-2 md:p-3 mb-4 md:mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA500]`}
                />
                {audioFile ? (
                    <div className="bg-transparent p-4 rounded-lg max-w-full md:max-w-lg mx-auto flex flex-col items-center justify-center">
                        <div
                            className="h-50 md:h-56 rounded-2xl overflow-hidden mb-6 shadow-lg border-4 border-[#FFA500] flex flex-col items-center justify-center bg-gradient-to-br from-[#25d366]/30 to-[#000]/10"
                            style={{
                                backgroundImage: `url(${musicIMG})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <p className={`text-center text-lg font-medium ${isDark ? "text-white bg-gray-800/30" : "text-black bg-gray-200/30"} mb-4 backdrop-blur-md`}> {audioFileName}</p>
                        </div>
                        <div className="flex items-center justify-center gap-4 mb-4 md:gap-6 md:mb-6">
                            <button
                                onClick={skipBackward}
                                title="Backward 10s"
                                className="bg-[#FFA500] hover:bg-[#ffd484] text-black font-bold py-2 px-4 md:px-6 rounded-full shadow-md"
                            >
                                <FaBackward size={20} />
                            </button>
                            <button
                                onClick={togglePlayPause}
                                disabled={!isReady}
                                className={`bg-[#FFA500] hover:bg-[#ffd484] text-black font-bold py-2 md:py-3 px-4 md:px-6 rounded-full shadow-md transition-all duration-300 ${!isReady ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                            </button>
                            <button
                                onClick={skipForward}
                                title="Forward 10s"
                                className="bg-[#FFA500] hover:bg-[#ffd484] text-black font-bold py-2 px-4 md:px-6 rounded-full shadow-md"
                            >
                                <FaForward size={20} />
                            </button>
                        </div>
                        <div className="w-full mb-4 md:mb-6">
                            <div className={`flex justify-between text-sm mb-2`}>
                                <span className={`p-2 rounded-full ${isDark ? "text-white bg-[#0f1056]" : "text-black bg-[#E8F9FF]"}`}>{formatTime(currentTime)}</span>
                                <span className={`p-2 rounded-full ${isDark ? "text-white bg-[#0f1056]" : "text-black bg-[#E8F9FF]"}`}>{formatTime(duration)}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                value={currentTime || 0}
                                onChange={handleProgressChange}
                                className="w-full h-2 bg-[#333] rounded-lg"
                            />
                        </div>
                        <div className="flex flex-row items-center justify-between gap-4 mb-4 md:mb-6">
                            <button
                                onClick={toggleMute}
                                className="bg-[#df0000] hover:bg-[#ff0000] text-black font-bold py-2 px-4 md:px-6 rounded-full shadow-md"
                            >
                                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-1/2 md:w-32 h-2 bg-[#333] rounded-lg"
                            />
                        </div>
                    </div>
                ) : (
                    <p/>
                )}
            </div>
        </motion.div>
    );
};

export default MusicPlayer;
