import React, { useState, useEffect, useRef } from "react";
import { 
  Lock, 
  Unlock, 
  Terminal, 
  Shield, 
  Cpu, 
  TrendingUp, 
  CloudSun, 
  Laptop, 
  Globe, 
  UserCheck, 
  HelpCircle, 
  VolumeX, 
  Volume2, 
  Play, 
  CodeXml,
  Database,
  ArrowRight,
  Zap,
  Gauge
} from "lucide-react";
import { Visualizer } from "./components/Visualizer";
import { SystemStatus, SubsystemData, VoiceProfile, BrowserMirror, TerminalLog } from "./types";

const AVAILABLE_VOICES: VoiceProfile[] = [
  { id: "gemini-aoede", name: "Gemini Aoede (Melodic & Expressive)", lang: "en-US", gender: "female", pitch: 1.35, rate: 1.05 },
  { id: "gemini-puck", name: "Gemini Puck (Energetic & Bright)", lang: "en-US", gender: "male", pitch: 1.18, rate: 1.1 },
  { id: "gemini-charon", name: "Gemini Charon (Deep & Mellow)", lang: "en-US", gender: "male", pitch: 0.9, rate: 0.95 },
  { id: "gemini-kore", name: "Gemini Kore (Calm & Clear)", lang: "en-US", gender: "female", pitch: 1.1, rate: 1.0 },
  { id: "gemini-fenrir", name: "Gemini Fenrir (Deep Authority)", lang: "en-US", gender: "male", pitch: 0.7, rate: 0.85 },
  { id: "gemini-ursa", name: "Gemini Ursa (Warm & Professional)", lang: "en-US", gender: "female", pitch: 1.0, rate: 1.0 }
];

export default function App() {
  // Main states
  const [systemState, setSystemState] = useState<SystemStatus>("ONLINE");
  const [selectedVoice, setSelectedVoice] = useState<VoiceProfile>(AVAILABLE_VOICES[0]);
  const [isListening, setIsListening] = useState<boolean>(false);
  const isListeningRef = useRef<boolean>(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [hyperSpeedEnabled, setHyperSpeedEnabled] = useState<boolean>(true);
  const [voiceStatus, setVoiceStatus] = useState<string>("System Idle");
  const [spokenText, setSpokenText] = useState<string>("");
  const [scannedUrlInput, setScannedUrlInput] = useState<string>("https://techcrunch.com/autonomous-agents");
  const [isScraping, setIsScraping] = useState<boolean>(false);
  
  // Interactive Browser Control states
  const [activeBrowserTab, setActiveBrowserTab] = useState<"control" | "vision" | "js-cli" | "gemini-ai">("control");
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);
  const [customSelectorInput, setCustomSelectorInput] = useState<string>("#main-content");
  const [customJsInput, setCustomJsInput] = useState<string>("document.title");

  // Gemini AI Playground specific states
  const [playgroundPrompt, setPlaygroundPrompt] = useState<string>("");
  const [playgroundModel, setPlaygroundModel] = useState<string>("gemini-3.5-flash");
  const [playgroundTemp, setPlaygroundTemp] = useState<number>(0.75);
  const [playgroundInstruction, setPlaygroundInstruction] = useState<string>("You are a professional assistant specialized in system automation, code drafting, and reasoning outputs.");
  const [playgroundResult, setPlaygroundResult] = useState<string>("Enter a prompt over in the playground input and click 'Compile & Generate' to query the Gemini module.");
  const [isPlaygroundGenerating, setIsPlaygroundGenerating] = useState<boolean>(false);
  const [virtualBrowserActionLog, setVirtualBrowserActionLog] = useState<string[]>([
    "[SYSTEM] Browser link connected on port 3000.",
    "[SESSION] Live Active Mirror linked securely."
  ]);
  
  // Simulated speech config adjustments
  const [voiceRate, setVoiceRate] = useState<number>(1.0);
  const [voicePitch, setVoicePitch] = useState<number>(1.0);
  const [animationStyle, setAnimationStyle] = useState<"siri-flow" | "neon-matrix" | "solar-flare" | "radar-helix">("siri-flow");
  const [ttsMode, setTtsMode] = useState<"off" | "browser" | "gemini">("gemini");
  
  // Custom Speech & Agent Speed Control optimizations
  const [onlySpeakOk, setOnlySpeakOk] = useState<boolean>(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en-US");
  const [singleTurnListen, setSingleTurnListen] = useState<boolean>(true);

  const [reasoningSteps, setReasoningSteps] = useState<string[]>([]);
  const [learningLogs, setLearningLogs] = useState<string[]>([
    "[02:00:10] [DLF-KNOWLEDGE]: Compiling matrix layout vector mappings...",
    "[02:00:15] [DLF-SELF-REF]: Evaluated 42 voice execution patterns. Restored baseline cadence.",
    "[02:00:20] [DLF-SCRAPE]: Optimized automatic browser scroll logic loops.",
    "[02:00:25] [DLF-AI-OPTIMIZE]: Dynamic rate constant updated to 1.1x to buffer human voice response latency."
  ]);

  // Subsystem variables containing realistic data
  const [subsystemData, setSubsystemData] = useState<SubsystemData>({
    btcPrice: 64231.40,
    btcChange: 1.2,
    shipments: 4,
    defcon: 4,
    weatherTemp: 24,
    weatherHumidity: 42,
    weatherCity: "New York, USA"
  });

  // Browser control and Live Device parameters
  const [browserMirror, setBrowserMirror] = useState<BrowserMirror>({
    url: "https://workstation.01/dashboard/real-time",
    title: "Gemini 1.5 Web Monitor",
    active: true,
    status: "Active Mirror Linked",
    ip: "192.168.42.110",
    server: "Cloudflare/Edge",
    latency: "14ms",
    domNodes: "2,423",
    pageSize: "142 KB"
  });

  // Logs stream
  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([
    { id: "log-1", timestamp: "02:00:28", text: "GEMINI AUTONOMOUS CORE initialized.", type: "success" },
    { id: "log-2", timestamp: "02:00:30", text: "Voice Control Module ready. Listening capability loaded.", type: "info" },
    { id: "log-3", timestamp: "02:00:32", text: "Device Live Override Tunnel bypassed. Defcon: 4.", type: "warning" },
  ]);

  // Track panel currently under Gemini voice controller override
  const [controlledPanel, setControlledPanel] = useState<"business" | "weather" | "voice" | "browser" | "terminal" | "shell" | "vox" | "none">("none");
  const controlledPanelTimeoutRef = useRef<any>(null);

  const triggerPanelControlStyle = (panel: "business" | "weather" | "voice" | "browser" | "terminal" | "shell" | "vox") => {
    if (controlledPanelTimeoutRef.current) {
      clearTimeout(controlledPanelTimeoutRef.current);
    }
    setControlledPanel(panel);
    controlledPanelTimeoutRef.current = setTimeout(() => {
      setControlledPanel("none");
    }, 4500);
  };

  // Command input text for typing trigger besides voice
  const [voiceInputOverrideText, setVoiceInputOverrideText] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("gemini-3.5-flash");
  const [apiStatus, setApiStatus] = useState<"standby" | "live" | "warning">("standby");
  const [activeModelInfo, setActiveModelInfo] = useState<string>("");
  const [geminiThinking, setGeminiThinking] = useState<string>("Gemini Co-Pilot is analyzing market volatility.");
  const [displayTextResponse, setDisplayTextResponse] = useState<string>(
    "### GEMINI NEURAL VOICE LINKED\nWelcome to the supreme operational platform of GEMINI AUTONOMOUS CORE.\n\nYour microphone is continuous! Speak commands anytime. I control trading engines, defense coordinates, browser scanners, and automated device parameters seamlessly."
  );

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const [browserVoices, setBrowserVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setBrowserVoices(voices);
      };
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
    // Set periodic market and defense flutter simulator
    const interval = setInterval(() => {
      let btcVal = 64000;
      setSubsystemData(prev => {
        const delta = (Math.random() - 0.49) * 80;
        const newBtc = Math.round((prev.btcPrice + delta) * 100) / 100;
        btcVal = newBtc;
        const change = Math.round(((newBtc - 64000) / 64000) * 1000) / 10;
        return {
          ...prev,
          btcPrice: newBtc,
          btcChange: change
        };
      });

      // Append random background access simulation line
      const bypasses = [
        "Analyzing live TCP packet handshake from session_02",
        "Refreshing global weather indexes for defense grids",
        "Validating autonomous trading pipeline logic constraints"
      ];
      const randomLine = bypasses[Math.floor(Math.random() * bypasses.length)];
      appendLog(randomLine, "info");

      // Dynamic learning updates
      setLearningLogs(prev => {
        const timestamp = new Date().toLocaleTimeString();
        const learnedLessons = [
          `[${timestamp}] [DLF-KNOWLEDGE]: Synced market ledger indices. BTC is USD ${btcVal}.`,
          `[${timestamp}] [DLF-SCRAPE]: Crawled tech news layout anchors. Dynamic viewport scrolled successfully.`,
          `[${timestamp}] [DLF-REASONING]: Computed weight mappings for quick-fire response matrix.`,
          `[${timestamp}] [DLF-OPTIMIZE]: Dynamic telemetry rate optimized. Latency decreased to 11ms.`,
          `[${timestamp}] [DLF-VOICE]: Calibrated pitch scales; premium soundwave animations active.`,
          `[${timestamp}] [DLF-SYSTEM]: Defcon defense levels fully mapped with zero exceptions.`
        ];
        const randomLesson = learnedLessons[Math.floor(Math.random() * learnedLessons.length)];
        return [randomLesson, ...prev].slice(0, 8);
      });
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isAutoScrolling) return;

    const autoScrollInterval = setInterval(() => {
      const scrollAmt = Math.round(Math.random() * 200 + 100);
      const ts = new Date().toLocaleTimeString();
      setVirtualBrowserActionLog(prev => [
        `[${ts}] [LOOP] Viewport scrolled +${scrollAmt}px automatically.`,
        ...prev
      ].slice(0, 8));
      appendLog(`Dolfin Loop: Autoscrolled viewport by +${scrollAmt}px.`, "info");
    }, 4500);

    return () => clearInterval(autoScrollInterval);
  }, [isAutoScrolling]);

  const appendLog = (text: string, type: "info" | "success" | "warning" | "error" | "input" | "gemini" = "info") => {
    const now = new Date();
    const ts = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
    setTerminalLogs(prev => [
      ...prev,
      { id: `log-${Date.now()}-${Math.random()}`, timestamp: ts, text, type }
    ].slice(-8)); // keep last 8
  };

  // Play raw PCM 16-bit little-endian audio returned from Gemini flash-tts model at 24kHz
  const playRawPCM24k = (base64Data: string) => {
    try {
      const raw = window.atob(base64Data);
      const len = raw.length;
      const arrayBuffer = new ArrayBuffer(len);
      const uint8 = new Uint8Array(arrayBuffer);
      for (let i = 0; i < len; i++) {
        uint8[i] = raw.charCodeAt(i);
      }
      const int16Array = new Int16Array(arrayBuffer);
      
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const buffer = audioCtx.createBuffer(1, int16Array.length, 24000);
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < int16Array.length; i++) {
        channelData[i] = int16Array[i] / 32768.0;
      }
      
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.start(0);
    } catch (err) {
      console.error("Gemini Premium Voice PCM playback error:", err);
    }
  };

  // Human voice speaking emulator
  const triggerVoiceSpeak = async (textToSay: string) => {
    let actualText = textToSay;
    if (onlySpeakOk) {
      if (selectedLanguage.startsWith("es")) actualText = "OK";
      else if (selectedLanguage.startsWith("fr")) actualText = "D'accord";
      else if (selectedLanguage.startsWith("ja")) actualText = "了解";
      else if (selectedLanguage.startsWith("de")) actualText = "Okay";
      else if (selectedLanguage.startsWith("bn")) actualText = "ঠিক আছে";
      else if (selectedLanguage.startsWith("it")) actualText = "Va bene";
      else actualText = "Okay";
    }

    if (ttsMode === "off") {
      // Muted - completely offline/not vocalized but shown on terminal display
      setSpokenText(actualText);
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 2400);
      return;
    }

    if (ttsMode === "browser") {
      if (!synthRef.current) {
        setSpokenText(actualText);
        setIsSpeaking(true);
        setTimeout(() => setIsSpeaking(false), 2400);
        return;
      }

      try {
        synthRef.current.cancel(); // Abort existing voice quickly
        const utterance = new SpeechSynthesisUtterance(actualText);
        utterance.lang = selectedLanguage;
        
        // Match voice standard to available web voices
        const voicesList = browserVoices.length > 0 ? browserVoices : (synthRef.current.getVoices() || []);
        
        // Try to filter by selected language first
        let matchedVoice = voicesList.find(v => v.lang.toLowerCase().replace("_", "-").startsWith(selectedLanguage.toLowerCase().split("-")[0]));
        
        if (!matchedVoice) {
          // Look for highest quality English natural/neural voice first
          matchedVoice = voicesList.find(v => v.lang.includes("en-US") && (v.name.toLowerCase().includes("natural") || v.name.toLowerCase().includes("google") || v.name.toLowerCase().includes("neural")));
        }
        
        if (!matchedVoice) {
          matchedVoice = voicesList.find(v => v.lang.startsWith("en"));
        }
        
        if (selectedVoice.id === "gemini-aoede") {
          matchedVoice = voicesList.find(v => 
            v.lang.startsWith("en") && 
            (v.name.toLowerCase().includes("samantha") || 
             v.name.toLowerCase().includes("aria") || 
             v.name.toLowerCase().includes("google us english") || 
             v.name.toLowerCase().includes("female") || 
             v.name.toLowerCase().includes("sweet") || 
             v.name.toLowerCase().includes("zira") || 
             v.name.toLowerCase().includes("google uk english"))
          ) || matchedVoice;
        } else if (selectedVoice.id === "gemini-puck") {
          matchedVoice = voicesList.find(v => 
            v.lang.startsWith("en") && 
            (v.name.toLowerCase().includes("david") || 
             v.name.toLowerCase().includes("google uk english male") || 
             v.name.toLowerCase().includes("male") || 
             v.name.toLowerCase().includes("guy") || 
             v.name.toLowerCase().includes("young") || 
             v.name.toLowerCase().includes("kid") || 
             v.name.toLowerCase().includes("google us english"))
          ) || matchedVoice;
        } else if (selectedVoice.id === "gemini-charon") {
          matchedVoice = voicesList.find(v => 
            v.lang.startsWith("en") && 
            (v.name.toLowerCase().includes("google us english") || 
             v.name.toLowerCase().includes("male") || 
             v.name.toLowerCase().includes("david") ||
             v.name.toLowerCase().includes("guy") ||
             v.name.toLowerCase().includes("natural"))
          ) || matchedVoice;
        } else if (selectedVoice.id === "gemini-kore") {
          matchedVoice = voicesList.find(v => 
            v.lang.startsWith("en") && 
            (v.name.toLowerCase().includes("female") || 
             v.name.toLowerCase().includes("zira") || 
             v.name.toLowerCase().includes("samantha") || 
             v.name.toLowerCase().includes("aria") || 
             v.name.toLowerCase().includes("google uk english"))
          ) || matchedVoice;
        } else if (selectedVoice.id === "gemini-fenrir") {
          matchedVoice = voicesList.find(v => 
            v.name.toLowerCase().includes("robotic") || 
            v.name.toLowerCase().includes("microsoft david") || 
            v.name.toLowerCase().includes("whisper")
          ) || matchedVoice;
        } else if (selectedVoice.id === "gemini-ursa") {
          matchedVoice = voicesList.find(v => 
            v.lang.startsWith("en") &&
            (v.name.toLowerCase().includes("natural") ||
             v.name.toLowerCase().includes("neural"))
          ) || matchedVoice;
        }

        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }

        utterance.pitch = voicePitch * selectedVoice.pitch;
        utterance.rate = voiceRate * selectedVoice.rate;
        
        utterance.onstart = () => {
          setIsSpeaking(true);
          setSpokenText(actualText);
          setVoiceStatus("Speaking like human");
        };
        utterance.onend = () => {
          setIsSpeaking(false);
          setVoiceStatus(isListening ? "Listening for Audio" : "Operational Mode Connected");
        };
        utterance.onerror = () => {
          setIsSpeaking(false);
        };

        synthRef.current.speak(utterance);
      } catch {
        setIsSpeaking(true);
        setSpokenText(actualText);
        setTimeout(() => setIsSpeaking(false), 3000);
      }
      return;
    }

    if (ttsMode === "gemini") {
      try {
        setIsSpeaking(true);
        setSpokenText(actualText);
        setVoiceStatus("Gemini Voice Model Generating...");

        // Map frontend voices to standard Gemini Voice Names: Puck, Charon, Kore, Fenrir, Zephyr
        let voiceName = "Kore";
        if (selectedVoice.id === "gemini-aoede") voiceName = "Zephyr";
        else if (selectedVoice.id === "gemini-puck") voiceName = "Puck";
        else if (selectedVoice.id === "gemini-charon") voiceName = "Charon";
        else if (selectedVoice.id === "gemini-kore") voiceName = "Kore";
        else if (selectedVoice.id === "gemini-fenrir") voiceName = "Fenrir";

        const response = await fetch("/api/gemini/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: actualText, voiceName })
        });
        const data = await response.json();

        if (data.audio) {
          setVoiceStatus("Playing Gemini Voice Model audio...");
          playRawPCM24k(data.audio);
          
          // Mimic speaking overlay timings
          const approximateDuration = Math.max(1500, actualText.split(" ").length * 400);
          setTimeout(() => {
            setIsSpeaking(false);
            setVoiceStatus(isListening ? "Listening for Audio" : "Operational Mode Connected");
          }, approximateDuration);
        } else {
          // If mock or offline mode, fall back beautifully to Browser voices or silent logging
          if (synthRef.current) {
            synthRef.current.cancel();
            const utterance = new SpeechSynthesisUtterance(actualText);
            utterance.lang = selectedLanguage;
            utterance.pitch = voicePitch * selectedVoice.pitch;
            utterance.rate = voiceRate * selectedVoice.rate;
            utterance.onstart = () => {
              setIsSpeaking(true);
              setVoiceStatus("Local Synthesis Backup Active");
            };
            utterance.onend = () => {
              setIsSpeaking(false);
              setVoiceStatus("Operational Mode Connected");
            };
            synthRef.current.speak(utterance);
          } else {
            setTimeout(() => {
              setIsSpeaking(false);
              setVoiceStatus("Operational Mode Connected");
            }, 2500);
          }
        }
      } catch (err) {
        console.error("Gemini Premium TTS call failed:", err);
        setIsSpeaking(false);
        setVoiceStatus("Operational Mode Connected");
      }
    }
  };

  // Mock speech recognition setup so developer has total control as requested
  const startSpeechRecognitionSimulation = () => {
    if (isListeningRef.current) {
      // Toggle OFF: Stop continuous listening completely
      setIsListening(false);
      setVoiceStatus("System Listening Standby");
      appendLog("Continuous Gemini Voice Assistant Link Deactivated.", "info");
      
      if (recognitionRef.current) {
        try {
          recognitionRef.current.onend = null; // Remove auto-restart callback before stopping
          recognitionRef.current.onerror = null;
          recognitionRef.current.stop();
        } catch (err) {
          console.log("Error stopping recognition:", err);
        }
        recognitionRef.current = null;
      }
      return;
    }

    // Toggle ON: Start listening
    setIsListening(true);
    if (singleTurnListen) {
      setVoiceStatus("Capture turn active...");
      appendLog("Single-turn voice link engaged. Speak 1 request now!", "success");
    } else {
      setVoiceStatus(hyperSpeedEnabled ? "Quantum Continuous Active" : "Continuous Listening Active");
      appendLog(hyperSpeedEnabled ? "Ultra-fast continuous voice link enabled. Speak anytime!" : "Continuous Gemini Assistant system linked. Listening continuously...", "info");
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        if (recognitionRef.current) {
          try { recognitionRef.current.stop(); } catch (err) {}
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        
        // Match user's preferred speech language for input speech recognition as well! This is super genius.
        recognition.lang = selectedLanguage;
        
        // We set continuous = true when we want infinite loop, else false so it naturally stops after speech ends.
        recognition.continuous = !singleTurnListen;
        recognition.interimResults = false;

        recognition.onstart = () => {
          if (singleTurnListen) {
            setVoiceStatus("Listening for single request...");
          } else {
            setVoiceStatus(hyperSpeedEnabled ? "Gemini continuous stream active" : "Capturing speech streams...");
          }
        };

        recognition.onresult = (event: any) => {
          // Extract the latest spoken text
          let latestTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              latestTranscript += event.results[i][0].transcript;
            }
          }
          
          if (latestTranscript.trim()) {
            const finalCleanText = latestTranscript.trim();
            setTranscript(finalCleanText);
            setVoiceStatus("Gemini Core Stream Received");
            
            if (singleTurnListen) {
              // Immediately turn off listening states and stop recognition
              setIsListening(false);
              isListeningRef.current = false;
              try {
                recognition.stop();
              } catch (err) {}
            }
            
            executeCoreAICommand(finalCleanText);
          }
        };

        recognition.onend = () => {
          // Critical Requirement: Auto restart when continuous listening is enabled
          if (isListeningRef.current && !singleTurnListen) {
            console.log("Speech recognition socket ended naturally. Auto-restarting continuous listener...");
            try {
              recognition.start();
            } catch (err) {
              console.log("Error restarting voice recognition:", err);
            }
          }
        };

        recognition.onerror = (e: any) => {
          console.warn("Speech recognition error:", e);
          if (e.error === "not-allowed") {
            appendLog("Gemini mic access denied. Please allow microphone permissions.", "error");
            setIsListening(false);
            setVoiceStatus("System Listening Standby");
          } else {
            // Restart automatically upon general errors if stream expects it
            if (isListeningRef.current) {
              setTimeout(() => {
                try {
                  if (isListeningRef.current) recognition.start();
                } catch (err) {}
              }, 1200);
            }
          }
        };

        recognition.start();
      } catch (err) {
        console.warn("SpeechRecognition initialization failed. Falling back to simulator stream.", err);
        simulateSpeechCommand();
      }
    } else {
      simulateSpeechCommand();
    }
  };

  const simulateSpeechCommand = () => {
    if (!isListeningRef.current) return;

    // Standard fast command suggestion array to guide simulation
    const simulatedCommands = [
      "Gemini, scan page details raw real-time",
      "Gemini, update Trade Engine BTC stats right now",
      "Gemini, elevate alert status to Defcon 2",
      "Gemini, sync weather atmospheric parameters",
      "Gemini, look into active chrome browser and scan elements",
      "Gemini, generate code module for trader neural engine",
      "Gemini, access real-time target device console safely"
    ];
    
    // Choose randomly to showcase voice execution
    const chosen = simulatedCommands[Math.floor(Math.random() * simulatedCommands.length)];
    const simulatedDelay = hyperSpeedEnabled ? 1500 : 3500;
    
    setTimeout(() => {
      if (!isListeningRef.current) return;
      setTranscript(chosen);
      executeCoreAICommand(chosen);
      
      // Keep simulating again and again since the user wants it to continuous loop in simulation too!
      setTimeout(() => {
        if (isListeningRef.current) {
          simulateSpeechCommand();
        }
      }, 7000);
    }, simulatedDelay);
  };

  // Central processor linking voice inputs, actions, and simulated device controls
  const executeCoreAICommand = async (commandLine: string) => {
    if (!commandLine.trim()) return;
    
    appendLog(`VOICE TRIGGERED: "${commandLine}"`, "input");
    setGeminiThinking("Processing command streams in Neural Core...");
    setIsThinking(true);

    const timestamp = new Date().toLocaleTimeString();
    setReasoningSteps([
      `🟢 [${timestamp}] INTERCEPTED COMMAND: Ready [0.1s]`,
      `🟡 [${timestamp}] PARSED INTENT: Autodetecting parameters... [0.2s]`,
      `🔵 [${timestamp}] ROUTED: Dispatching payload... [0.3s]`,
      `🟣 [${timestamp}] ACTION RESOLVED: State calibrated. [0.4s]`
    ]);

    // Immediate action detection for critical commands
    const lowercaseCmd = commandLine.toLowerCase();

    // 1. Voice Host Lock Simulation
    if (lowercaseCmd.includes("lock") || lowercaseCmd.includes("lock system") || lowercaseCmd.includes("lockdown") || lowercaseCmd.includes("lock console")) {
      setIsThinking(false);
      setSystemState("LOCKED");
      appendLog("CRITICAL ACTION: Terminal Lock Engaged via voice command.", "warning");
      triggerVoiceSpeak("Locked down. Access to the main console is locked. Disengage voice shield to proceed.");
      setGeminiThinking("Secure firewall locks established. Halting standard telemetry displays.");
      setDisplayTextResponse("### SYSTEM LOCK ENGAGED\n\nTo restore continuous neural link operations, please click the secure unlock trigger in the lock display viewport.");
      return;
    }

    // 2. Voice Host Shutdown Simulation
    if (lowercaseCmd.includes("shutdown") || lowercaseCmd.includes("turn off") || lowercaseCmd.includes("power off") || lowercaseCmd.includes("power down")) {
      setIsThinking(false);
      setSystemState("SHUTDOWN");
      appendLog("CRITICAL ACTION: Terminal Shutdown Sequence triggered via voice.", "error");
      triggerVoiceSpeak("Initiating secure host laptop shutdown sequence. Disconnecting active audio channels. Goodbye developer.");
      setGeminiThinking("OS kernel shutdown signal dispatched safely.");
      setDisplayTextResponse("### TERMINAL OFFLINE STATUS\n\nThe central Gemini brain and local hosting services are fully powered down. Use the visual boot switch to restore connections.");
      return;
    }

    // 0. Scroll Up / Down Commands
    if (lowercaseCmd.includes("scroll down") || lowercaseCmd.includes("scrolling down") || lowercaseCmd.includes("scroll bottom")) {
      setIsThinking(false);
      appendLog("AUTOMATION ACTION: Scrolled viewport downwards.", "success");
      setVirtualBrowserActionLog(prev => [
        `[SCROLL] Viewport shifted vertical coordinate +420px.`,
        ...prev
      ].slice(0, 8));
      triggerVoiceSpeak("I have initiated advanced browser scrolling. Viewport pushed down forty percent.");
      setGeminiThinking("Advanced browser scrolling active: vertical shift completed.");
      setBrowserMirror(prev => ({
        ...prev,
        status: "Active Mirror Scrolled Down",
        latency: "12ms"
      }));
      return;
    }

    if (lowercaseCmd.includes("scroll up") || lowercaseCmd.includes("scrolling up") || lowercaseCmd.includes("scroll top")) {
      setIsThinking(false);
      appendLog("AUTOMATION ACTION: Scrolled viewport upwards.", "success");
      setVirtualBrowserActionLog(prev => [
        `[SCROLL] Viewport shifted vertical coordinate -420px.`,
        ...prev
      ].slice(0, 8));
      triggerVoiceSpeak("I have scrolled the viewport upwards by forty percent successfully.");
      setGeminiThinking("Advanced browser scrolling active: shifted to higher scroll anchor.");
      setBrowserMirror(prev => ({
        ...prev,
        status: "Active Mirror Scrolled Up",
        latency: "11ms"
      }));
      return;
    }
    
    // Standard voice triggers are routed seamlessly without lockdown interruptions.

    // Execute standard AI Agent endpoint
    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: commandLine,
          voiceMode: selectedVoice.id,
          subSystem: "General Integrated Core",
          speedReasoning: hyperSpeedEnabled,
          model: selectedModel
        }),
      });

      const data = await response.json();
      
      // Dynamic fallback/status indicator mapping
      if (data.apiMode === "live") {
        setApiStatus("live");
        setActiveModelInfo(data.modelUsed || selectedModel);
      } else {
        setApiStatus("warning");
        setActiveModelInfo("local_fallback");
      }
      
      if (data.speechText) {
        triggerVoiceSpeak(data.speechText);
      }
      if (data.displayText) {
        setDisplayTextResponse(data.displayText);
      }
      if (data.thoughts && data.thoughts.length > 0) {
        setGeminiThinking(data.thoughts[0]);
        // log all thinking parts
        data.thoughts.forEach((t: string) => {
          appendLog(`[GEMINI THINKING]: ${t}`, "gemini");
        });
      }
      if (data.simulatedActions) {
        data.simulatedActions.forEach((act: string) => {
          appendLog(`ACTION FIRED: ${act}`, "success");
          
          try {
            // Highly advanced state controller parsing
            if (act.startsWith("SET_DEFCON:")) {
              const val = parseInt(act.split(":")[1]);
              if (!isNaN(val) && val >= 1 && val <= 5) {
                setSubsystemData(prev => ({ ...prev, defcon: val }));
                appendLog(`[CO-PILOT] DEFCON state updated to level ${val}.`, "success");
                triggerPanelControlStyle("business");
              }
            } else if (act.startsWith("BTC_TRADE:")) {
              const parts = act.split(":");
              const action = parts[1]; // buy or sell
              const amount = parseFloat(parts[2]);
              if (!isNaN(amount)) {
                setSubsystemData(prev => {
                  const multiplier = action === "buy" ? 1 : -1;
                  const priceShift = (amount / 100) * (Math.random() * 5 + 1);
                  const newPrice = Math.round((prev.btcPrice + (priceShift * multiplier)) * 100) / 100;
                  return {
                    ...prev,
                    btcPrice: newPrice,
                  };
                });
                appendLog(`[CO-PILOT] Executed automated market order: ${action.toUpperCase()} for $${amount}.`, "success");
                triggerPanelControlStyle("business");
              }
            } else if (act.startsWith("SET_SHIPMENTS:")) {
              const val = parseInt(act.split(":")[1]);
              if (!isNaN(val)) {
                setSubsystemData(prev => ({ ...prev, shipments: val }));
                appendLog(`[CO-PILOT] Logistics shipments queue modified: ${val} active paths.`, "success");
                triggerPanelControlStyle("business");
              }
            } else if (act.startsWith("SET_WEATHER:")) {
              const parts = act.split(":");
              const temp = parseInt(parts[1]);
              const hum = parseInt(parts[2]);
              const city = parts.slice(3).join(":"); // reconstruct city name
              if (!isNaN(temp) && !isNaN(hum) && city) {
                setSubsystemData(prev => ({
                  ...prev,
                  weatherTemp: temp,
                  weatherHumidity: hum,
                  weatherCity: city
                }));
                appendLog(`[CO-PILOT] Synced sensing array parameters for: ${city}.`, "success");
                triggerPanelControlStyle("weather");
              }
            } else if (act.startsWith("BROWSER_NAVIGATE:")) {
              const url = act.substring("BROWSER_NAVIGATE:".length);
              if (url) {
                setBrowserMirror(prev => ({
                  ...prev,
                  url: url,
                  status: "Active Mirror Linked"
                }));
                appendLog(`[CO-PILOT] Redirected browser terminal coordinates to: ${url}`, "success");
                triggerPanelControlStyle("browser");
              }
            } else if (act.startsWith("BROWSER_UPDATE_TITLE:")) {
              const title = act.substring("BROWSER_UPDATE_TITLE:".length);
              if (title) {
                setBrowserMirror(prev => ({
                  ...prev,
                  title: title
                }));
                triggerPanelControlStyle("browser");
              }
            } else if (act.startsWith("BROWSER_RUN_JS:")) {
              const parts = act.split(":");
              const script = parts[1];
              const result = parts.slice(2).join(":");
              if (script) {
                const ts = new Date().toLocaleTimeString();
                setVirtualBrowserActionLog(prev => [
                  ...prev,
                  `[${ts}] > ${script}`,
                  `[${ts}] < ${result || "undefined"}`
                ].slice(-6));
                appendLog(`[CO-PILOT] Script processed on chromium instance: "${script}"`, "success");
                triggerPanelControlStyle("browser");
              }
            } else if (act.startsWith("BROWSER_CLICK:")) {
              const selector = act.substring("BROWSER_CLICK:".length);
              if (selector) {
                const ts = new Date().toLocaleTimeString();
                setVirtualBrowserActionLog(prev => [
                  ...prev,
                  `[${ts}] [CLICK SIM] Bypassing security on selector: "${selector}"`
                ].slice(-6));
                appendLog(`[CO-PILOT] Emulated mouse click on target selector: "${selector}"`, "success");
                triggerPanelControlStyle("browser");
              }
            } else if (act === "BROWSER_SCROLL") {
              const ts = new Date().toLocaleTimeString();
              setVirtualBrowserActionLog(prev => [...prev, `[${ts}] [SCROLL] Page viewport shifted vertically.`].slice(-6));
              appendLog("[CO-PILOT] Viewport scroll down dispatched successfully.", "success");
              triggerPanelControlStyle("browser");
            } else if (act === "BROWSER_BYPASS") {
              const ts = new Date().toLocaleTimeString();
              setVirtualBrowserActionLog(prev => [...prev, `[${ts}] [BYPASS] Dynamic reCAPTCHA token generated successfully.`].slice(-6));
              appendLog("[CO-PILOT] Automated security reCAPTCHA checkpoint bypassed.", "success");
              triggerPanelControlStyle("browser");
            } else if (act.startsWith("SET_SYSTEM_STATE:")) {
              const state = act.split(":")[1];
              if (state === "ONLINE" || state === "LOCKED" || state === "SHUTDOWN" || state === "REBOOTING") {
                setSystemState(state as any);
                appendLog(`[CO-PILOT] Direct state override sequence applied: ${state}`, "warning");
                triggerPanelControlStyle("shell");
              }
            } else if (act.startsWith("ADJUST_VOICE:")) {
              const parts = act.split(":");
              const rate = parseFloat(parts[1]);
              const pitch = parseFloat(parts[2]);
              if (!isNaN(rate)) setVoiceRate(rate);
              if (!isNaN(pitch)) setVoicePitch(pitch);
              appendLog(`[CO-PILOT] Dynamic speech synthesis calibrations aligned.`, "success");
              triggerPanelControlStyle("voice");
            }
          } catch (err) {
            console.error("Action execution failed for:", act, err);
          }
        });
      }
    } catch (e: any) {
      appendLog("Neural pipeline bottleneck. Reverted safely.", "error");
    } finally {
      setIsThinking(false);
    }
  };

  const handleOverrideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voiceInputOverrideText.trim()) return;
    executeCoreAICommand(voiceInputOverrideText);
    setVoiceInputOverrideText("");
  };

  // Real-time Page Detail scanning simulation function
  const scanRealTimePageDetails = async () => {
    if (!scannedUrlInput.trim()) return;
    setIsScraping(true);
    appendLog(`Scanning metadata and page metrics: ${scannedUrlInput}`, "info");

    try {
      const res = await fetch("/api/scraper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: scannedUrlInput })
      });
      const data = await res.json();
      
      setBrowserMirror({
        url: data.url,
        title: data.title,
        active: true,
        status: data.status,
        ip: data.details.ip,
        server: data.details.server,
        latency: data.details.latency,
        domNodes: data.details.domNodes,
        pageSize: data.details.pageSize
      });

      appendLog(`Successfully mirrored external page elements into memory matrix`, "success");
      triggerVoiceSpeak(`Page metrics modeled. Latency logged at ${data.details.latency}. Host mapped.`);
    } catch {
      appendLog("Scanner fallback executed.", "warning");
    } finally {
      setIsScraping(false);
    }
  };

  const handlePlaygroundSubmit = async () => {
    if (!playgroundPrompt.trim()) return;
    setIsPlaygroundGenerating(true);
    setPlaygroundResult("Analyzing prompt sequence... Pinging remote Gemini Node...");
    appendLog(`Fired Gemini AI Playground prompt request using ${playgroundModel}`, "info");

    try {
      const res = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: playgroundPrompt,
          model: playgroundModel,
          temperature: playgroundTemp,
          systemInstruction: playgroundInstruction
        })
      });
      const data = await res.json();
      if (data.error) {
        setPlaygroundResult(`### GENERATION CONSTRAINTS HIT\n\n${data.error}`);
        appendLog("Gemini AI Playground query encountered warnings", "error");
      } else {
        setPlaygroundResult(data.text || "### EMPTY RESPONSE\nThe dynamic stream completed without printable content.");
        appendLog(`Gemini playground completed. Received response successfully.`, "success");
        triggerVoiceSpeak("Gemini response compiled successfully.");
      }
    } catch (e: any) {
      setPlaygroundResult(`### TRANSMISSION BOTTLENECK\nUnable to establish direct handshaking with internal routes.\n- State details: ${e.message || String(e)}`);
      appendLog("Playground request connection failed", "error");
    } finally {
      setIsPlaygroundGenerating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden border border-white/10 m-2 rounded-xl" id="gemini-main-shell">
      {/* HEADER SECTION */}
      <header className="px-6 py-4 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-black/60 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white rounded-lg flex items-center justify-center">
            <Cpu className="text-black w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-widest text-white uppercase flex items-center gap-2">
              GEMINI VOICE MODEL <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white tracking-normal normal-case border border-white/20">VOICE PILOT Core</span>
            </h1>
            <p className="label-mono flex items-center gap-2 text-white/50 text-[10px] mt-0.5">
              <span className="inline-block w-2 h-2 rounded-full bg-white animate-ping"></span>
              Autonomous AI Agent Core (Controlled strictly via Voice command systems)
            </p>
          </div>
        </div>

        {/* Global Control Status */}
        <div className="flex gap-4 items-center flex-wrap">
          <div className="text-right hidden sm:block">
            <p className="text-[9px] text-white/50 uppercase font-mono tracking-wider">System State</p>
            <p className={`text-xs font-bold font-mono tracking-widest uppercase transition-colors ${
              systemState === "ONLINE" ? "text-emerald-400" :
              systemState === "LOCKED" ? "text-amber-500 animate-pulse" :
              "text-red-500 font-extrabold animate-pulse"
            }`}>{systemState}</p>
          </div>
        </div>
      </header>

      {/* 📰 LIVE GLOBAL NEWS HOLDER & BROADCAST TICKER */}
      <div className="bg-black/85 border-b border-white/10 px-6 py-2 overflow-hidden flex items-center select-none shrink-0" id="news-holder-ticker-bar">
        <div className="flex items-center gap-2 pr-4 border-r border-white/20 shrink-0 font-mono text-[9px] font-black uppercase text-white tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping shrink-0" />
          <span>DOLFIN NEWS REAL-TIME</span>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="whitespace-nowrap animate-marquee flex items-center gap-16 font-mono text-[10px] text-zinc-300 font-bold uppercase tracking-wider">
            <span>★ [TECH] GEMINI AUTO-SCROLLER WITH INTEGRATED SCROLL VIEW INTERCEPTS ONLINE</span>
            <span>★ [COGNITIVE] DOLFIN WORKING CONTINUOUSLY 24/7 ENHANCING REASONING LEDGER CONSTRAINTS</span>
            <span>★ [SENSORS] 'ALL-TIME LISTEN' TRIGGER ACTIVE AND PULSING RELIABLY ON PORT 3000</span>
            <span>★ [MARKETS] STOCK TRENDS AND BITCOIN INTRA-MINUTE CORRECTIONS SIMULATED IN REALTIME</span>
            <span>★ [WEATHER] PARALLEL ATMOSPHERIC PARAMETERS SYNCHRONIZED ACROSS KEY SENSING SATELLITES</span>
            <span>★ [DEVICES] INTEGRATED CONTROLLERS GIVING ACCELERATED LINK STABILITY NOMINAL</span>
          </div>
        </div>
      </div>

      {/* CHIEF SYSTEM WORKSPACE AREA */}
      {systemState === "SHUTDOWN" ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black/95 text-center min-h-[500px]" id="shutdown-screen">
          <div className="relative w-24 h-24 flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-red-500/10 rounded-full animate-ping pointer-events-none duration-1000" />
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <Cpu className="w-8 h-8 text-red-500 animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-black tracking-widest text-[#eeeeee] uppercase font-mono">DOLFIN HOST LAPTOP SHUTDOWN</h2>
          <p className="text-xs font-mono text-zinc-500 tracking-tight max-w-sm mt-3 leading-relaxed">
            Autonomous Core shut down successfully. Central voice node offline. Saving neural data registries... Status mapped.
          </p>
          
          <button
            onClick={() => {
              setSystemState("ONLINE");
              appendLog("Dolfin voice co-pilot booted back up successfully.", "success");
              triggerVoiceSpeak("Welcome back developer. Main operational console restored successfully.");
            }}
            className="mt-8 px-6 py-3 bg-[#e11d48] hover:bg-[#be123c] text-white text-xs font-black tracking-widest uppercase rounded shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:scale-105 duration-200 cursor-pointer flex items-center gap-2 font-mono transition-all"
            id="boot-app-btn"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            WAKE HOST LAPTOP
          </button>
        </div>
      ) : systemState === "LOCKED" ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black/90 text-center min-h-[500px]" id="locked-screen">
          <div className="relative w-24 h-24 flex items-center justify-center mb-5">
            <div className="absolute inset-0 bg-amber-500/10 rounded-full animate-ping pointer-events-none duration-1000" />
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <Lock className="w-7 h-7 text-amber-500" />
            </div>
          </div>
          <h2 className="text-xl font-black tracking-widest text-white uppercase font-mono">CONSOLE SYSTEM LOCKED DOWN</h2>
          <p className="text-xs font-mono text-zinc-500 mt-3 max-w-xs leading-relaxed">
            The neural links are temporarily locked due to access safety operations or lock trigger requests. Voice inputs restricted.
          </p>
          
          <button
            onClick={() => {
              setSystemState("ONLINE");
              appendLog("System lock disengaged.", "success");
              triggerVoiceSpeak("Console lock disengaged. Main layout accessible.");
            }}
            className="mt-6 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-black tracking-widest uppercase rounded shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all cursor-pointer font-mono flex items-center gap-2"
            id="unlock-app-btn-center"
          >
            <Unlock className="w-3.5 h-3.5" />
            Disengage Voice Shield Lock
          </button>
        </div>
      ) : (
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 lg:p-6 bg-[#050505]" id="workspace-grid">
          
          {/* COLUMN 1: INTEGRATED CORE OPERATIONS (Business, Military, Weather stats) */}
          <aside className="lg:col-span-1 flex flex-col gap-4">
            
            {/* BUSINESS INTEGRATIONS CARD */}
            <div 
              className={`glass p-4 rounded-lg flex flex-col border transition-all duration-500 relative ${
                controlledPanel === "business" 
                  ? "border-white ring-2 ring-white/35 shadow-[0_0_20px_rgba(255,255,255,0.35)] scale-[1.01] bg-white/[0.04]" 
                  : "border-white/10 bg-white/[0.02]"
              }`} 
              id="business-card"
            >
              {controlledPanel === "business" && (
                <div className="absolute -top-2 left-4 bg-white text-black text-[8px] font-mono tracking-widest px-1.5 py-0.5 rounded font-black uppercase animate-pulse flex items-center gap-1 z-10 shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping"></span>
                  Gemini Override Engaged
                </div>
              )}
              <p className="label-mono mb-3 flex justify-between items-center text-[10px]">
                <span className="flex items-center gap-1.5 font-bold tracking-widest">
                  <TrendingUp className="w-3.5 h-3.5 text-white" />
                  Business & Markets
                </span>
                <span className="status-dot w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]"></span>
              </p>

              <div className="space-y-3">
                <div className="border-b border-white/5 pb-2">
                  <p className="text-[10px] text-white/40 font-mono">Autonomous Trading System</p>
                  <p className="text-sm font-bold tracking-tight">
                    BTC/USD: ${subsystemData.btcPrice.toLocaleString()} 
                    <span className={`text-[10px] font-mono ml-2 ${subsystemData.btcChange >= 0 ? "text-white/80" : "text-white/40"}`}>
                      {subsystemData.btcChange >= 0 ? "+" : ""}{subsystemData.btcChange}%
                    </span>
                  </p>
                </div>
                
                <div className="border-b border-white/5 pb-2">
                  <p className="text-[10px] text-white/40 font-mono">Business Logistics</p>
                  <p className="text-sm">{subsystemData.shipments} Active Global Shipments En Route</p>
                </div>

                <div>
                  <p className="text-[10px] text-white/40 font-mono">Military Defense Status</p>
                  <p className="text-sm flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 animate-pulse" />
                    Alert Level: DEFCON {subsystemData.defcon} <span className="opacity-50 text-[10px] font-mono">(NOMINAL)</span>
                  </p>
                </div>
              </div>

              {/* GEMINI LIVE AI THINKING ENGINE BOX */}
              <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded-md">
                <p className="text-[10px] font-bold mb-1 italic text-white flex items-center gap-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                  GEMINI CORE INTELLIGENCE:
                </p>
                <p className="text-[11px] leading-relaxed opacity-70 font-mono">
                  {geminiThinking}
                </p>
              </div>
            </div>

            {/* REAL TIME WEATHER SCANNER INTEGRATION CARD */}
            <div 
              className={`glass p-4 rounded-lg border transition-all duration-500 relative ${
                controlledPanel === "weather" 
                  ? "border-white ring-2 ring-white/35 shadow-[0_0_20px_rgba(255,255,255,0.35)] scale-[1.01] bg-white/[0.04]" 
                  : "border-white/10 bg-white/[0.02]"
              }`} 
              id="weather-card"
            >
              {controlledPanel === "weather" && (
                <div className="absolute -top-2 left-4 bg-white text-black text-[8px] font-mono tracking-widest px-1.5 py-0.5 rounded font-black uppercase animate-pulse flex items-center gap-1 z-10 shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping"></span>
                  Gemini Override Engaged
                </div>
              )}
              <p className="label-mono mb-3 flex items-center gap-1.5 text-[10px] tracking-widest font-bold">
                <CloudSun className="w-3.5 h-3.5" />
                Weather Sensing array
              </p>
              <div className="flex justify-between items-end border-b border-white/5 pb-3">
                <div>
                  <span className="text-3xl font-light tracking-tighter block">{subsystemData.weatherTemp}°C</span>
                  <p className="text-[10px] text-white/50">{subsystemData.weatherCity}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] opacity-40 font-mono">Humidity</p>
                  <p className="text-xs font-mono">{subsystemData.weatherHumidity}%</p>
                  <p className="text-[9px] opacity-40 font-mono mt-1">Satellite State</p>
                  <p className="text-xs uppercase font-mono text-white/80">Active</p>
                </div>
              </div>
              <p className="text-[10px] text-white/50 italic mt-2">
                "Weather grids synced to defence analytics instantly."
              </p>
            </div>

            {/* VOICE DYNAMICS SETTINGS CARD */}
            <div 
              className={`glass p-4 rounded-lg border transition-all duration-500 relative flex flex-col gap-2 ${
                controlledPanel === "voice" 
                  ? "border-white ring-2 ring-white/35 shadow-[0_0_20px_rgba(255,255,255,0.35)] scale-[1.01] bg-white/[0.04]" 
                  : "border-white/10 bg-white/[0.02]"
              }`} 
              id="voice-settings-card"
            >
              {controlledPanel === "voice" && (
                <div className="absolute -top-2 left-4 bg-white text-black text-[8px] font-mono tracking-widest px-1.5 py-0.5 rounded font-black uppercase animate-pulse flex items-center gap-1 z-10 shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping"></span>
                  Gemini Override Engaged
                </div>
              )}
              <p className="label-mono text-[10px] font-bold tracking-widest mb-1">Human Voice configuration</p>
              
              <div className="space-y-2">
                <label className="text-[10px] text-white/60 font-mono block">Vocal Synthesis Engine Mode</label>
                <div className="grid grid-cols-3 gap-1 bg-black/40 p-1 rounded border border-white/10 mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      setTtsMode("off");
                      appendLog("Vocal synthesis turned completely off. Silent Mode active.", "warning");
                    }}
                    className={`text-[9px] font-mono py-1 rounded transition-all cursor-pointer ${
                      ttsMode === "off" 
                        ? "bg-white text-black font-bold shadow-sm" 
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    Off/Mute
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTtsMode("browser");
                      appendLog("Vocal synthesis set to Browser Web Speech API.", "info");
                    }}
                    className={`text-[9px] font-mono py-1 rounded transition-all cursor-pointer ${
                      ttsMode === "browser" 
                        ? "bg-white text-black font-bold shadow-sm" 
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    Local Synth
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTtsMode("gemini");
                      appendLog("Vocal synthesis set to premium server-side Gemini Voice Model.", "success");
                    }}
                    className={`text-[9px] font-mono py-1 rounded transition-all cursor-pointer ${
                      ttsMode === "gemini" 
                        ? "bg-white text-black font-bold shadow-sm" 
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    Gemini AI
                  </button>
                </div>

                <label className="text-[10px] text-white/60 font-mono block">Voice Profile Identity</label>
                <select
                  value={selectedVoice.id}
                  onChange={(e) => {
                    const found = AVAILABLE_VOICES.find(v => v.id === e.target.value);
                    if (found) {
                      setSelectedVoice(found);
                      appendLog(`Voice channel converted to: ${found.name}`, "info");
                    }
                  }}
                  className="w-full bg-black border border-white/20 rounded p-1 text-xs font-mono focus:border-white focus:outline-none"
                  id="voice-select"
                >
                  {AVAILABLE_VOICES.map(v => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>

                <label className="text-[10px] text-white/60 font-mono block mt-2">Visualizer Animation Atmosphere</label>
                <select
                  value={animationStyle}
                  onChange={(e) => {
                    const style = e.target.value as "siri-flow" | "neon-matrix" | "solar-flare" | "radar-helix";
                    setAnimationStyle(style);
                    appendLog(`Visualizer atmosphere converted to: ${style}`, "info");
                  }}
                  className="w-full bg-black border border-white/20 rounded p-1 text-xs font-mono focus:border-white focus:outline-none"
                  id="visualizer-style-select"
                >
                  <option value="siri-flow">Siri Flow (Crisp Silver Wave)</option>
                  <option value="neon-matrix">Neon Matrix (Cyber Punk Pink/Cyan)</option>
                  <option value="solar-flare">Solar Flare (Warm Fire & Sparks)</option>
                  <option value="radar-helix">Radar Helix (Matrix Bionic Green)</option>
                </select>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-[9px] text-white/50 font-mono block mb-1">Speed Rate: {voiceRate.toFixed(2)}x</span>
                    <input
                      type="range"
                      min="0.5"
                      max="1.8"
                      step="0.05"
                      value={voiceRate}
                      onChange={(e) => setVoiceRate(parseFloat(e.target.value))}
                      className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                      title="Adjust speed rate"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] text-white/50 font-mono block mb-1">Pitch Scale: {voicePitch.toFixed(2)}pt</span>
                    <input
                      type="range"
                      min="0.5"
                      max="1.5"
                      step="0.05"
                      value={voicePitch}
                      onChange={(e) => setVoicePitch(parseFloat(e.target.value))}
                      className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                      title="Adjust pitch scale"
                    />
                  </div>
                </div>

                {/* ADVANCED MULTI-LANGUAGE & UTTERANCE CONSTRAINTS */}
                <div className="border border-white/5 bg-black/30 p-2 rounded-md space-y-2 mt-2">
                  <span className="text-[8.5px] uppercase font-black text-white/50 tracking-wider block">Advanced Core Settings</span>
                  
                  <div>
                    <label className="text-[9.5px] text-white/60 font-mono block mb-1">Active Core Language</label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => {
                        setSelectedLanguage(e.target.value);
                        appendLog(`Vocal channel translated/mapped to: ${e.target.value}`, "success");
                        triggerVoiceSpeak("Language map synchronized successfully.");
                      }}
                      className="w-full bg-black border border-white/10 rounded p-1 text-[11px] font-mono text-emerald-400 focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="en-US">English (United States)</option>
                      <option value="es-ES">Español (España) - Spanish</option>
                      <option value="fr-FR">Français (France) - French</option>
                      <option value="ja-JP">日本語 (日本) - Japanese</option>
                      <option value="de-DE">Deutsch (Deutschland) - German</option>
                      <option value="bn-BD">বাংলা (বাংলাদেশ) - Bengali</option>
                      <option value="it-IT">Italiano (Italia) - Italian</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between py-1 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-white block">Speak "OK" Only Mode</span>
                      <span className="text-[8px] text-zinc-400 block max-w-[140px]">Shorten speaking cycle outputs strictly to "OK" or "Okay" equivalents.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const nextVal = !onlySpeakOk;
                        setOnlySpeakOk(nextVal);
                        appendLog(`Muted speech output to OK-Only: ${nextVal ? "ENABLED" : "DISABLED"}`, "info");
                        // Timeout allows the state setter to flush before triggering speech
                        setTimeout(() => triggerVoiceSpeak("Speech cycle updated"), 50);
                      }}
                      className={`px-2 py-1 text-[8.5px] font-mono uppercase tracking-wider rounded transition-all cursor-pointer border ${
                        onlySpeakOk 
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" 
                          : "bg-black/30 text-zinc-500 border-white/10"
                      }`}
                    >
                      {onlySpeakOk ? "Active" : "Normal"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-1 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-white block">Single Turn Listen</span>
                      <span className="text-[8px] text-zinc-400 block max-w-[140px]">Release microphone instantly after a single spoken query request.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const nextVal = !singleTurnListen;
                        setSingleTurnListen(nextVal);
                        appendLog(`Single-turn Listening: ${nextVal ? "ENABLED" : "DISABLED"}`, "info");
                        setTimeout(() => triggerVoiceSpeak("Listening pattern synchronized"), 50);
                      }}
                      className={`px-2 py-1 text-[8.5px] font-mono uppercase tracking-wider rounded transition-all cursor-pointer border ${
                        singleTurnListen 
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" 
                          : "bg-black/30 text-zinc-500 border-white/10"
                      }`}
                    >
                      {singleTurnListen ? "Single" : "Cont."}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => triggerVoiceSpeak("Linking telemetry active. Speak into the core device grid, developer.")}
                  className="w-full flex items-center justify-center gap-1.5 py-1 mt-1 border border-white/20 hover:border-white text-[10px] text-white uppercase rounded bg-white/5 hover:bg-white/10 cursor-pointer"
                  id="test-voice-btn"
                >
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  Test Voice Identity
                </button>
              </div>
            </div>

            {/* AGENT SPEED OPTIMIZER CORE */}
            <div className="glass p-4 rounded-lg border border-emerald-500/20 bg-emerald-950/5 flex flex-col gap-2" id="hyper-speed-booster-card">
              <p className="label-mono flex justify-between items-center text-[10px] font-black tracking-widest text-emerald-400">
                <span className="flex items-center gap-1.5 uppercase">
                  <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                  Agent Speed Optimizer
                </span>
                <span className="px-1.5 py-0.5 bg-emerald-500 text-black font-extrabold text-[8px] uppercase tracking-normal">Turbo Active</span>
              </p>

              <div className="space-y-2 font-mono text-[9px] text-zinc-300">
                <p className="text-[10px] leading-snug">
                  The voice agent is overclocked using streamlined directives and <span className="text-emerald-400 font-bold">ThinkingLevel.MINIMAL</span> to achieve <span className="text-white font-bold">&lt;80ms pre-fill</span> and instant tool execution.
                </p>

                <div className="grid grid-cols-2 gap-1 bg-black/50 p-2 rounded border border-white/5 font-mono text-[8.5px]">
                  <div>
                    <span className="opacity-50">Model Preset:</span>
                    <p className="text-white font-bold truncate">Gemini 3.5 Flash</p>
                  </div>
                  <div>
                    <span className="opacity-50">Thinking Level:</span>
                    <p className="text-emerald-400 font-bold">Minimal (Ultra)</p>
                  </div>
                  <div>
                    <span className="opacity-50">Pre-fill Latency:</span>
                    <p className="text-white font-bold">12ms - Instant</p>
                  </div>
                  <div>
                    <span className="opacity-50">Output Limits:</span>
                    <p className="text-white font-bold">Concise (Single sentence)</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-center justify-between mt-1 bg-emerald-950/20 border border-emerald-500/20 p-2 rounded-md">
                  <div>
                    <span className="text-[9.5px] font-bold text-white block">Hyper-Speed Core Bypass</span>
                    <span className="text-[7.5px] text-zinc-400 block leading-tight">Bypasses long pre-reasoning cycles</span>
                  </div>
                  <button
                    onClick={() => {
                      setHyperSpeedEnabled(prev => !prev);
                      appendLog(`Hyper-Speed Overclock state set to: ${!hyperSpeedEnabled ? "ENABLED" : "DISABLED"}`, !hyperSpeedEnabled ? "success" : "warning");
                      triggerVoiceSpeak(!hyperSpeedEnabled ? "Rapid response overclock engaged. Telemetry latency minimized." : "Standard reasoning depth restored.");
                    }}
                    className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center gap-1 border ${
                      hyperSpeedEnabled
                        ? "bg-emerald-500 text-black border-emerald-400"
                        : "bg-black/40 text-zinc-400 border-white/10"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${hyperSpeedEnabled ? "bg-black animate-ping" : "bg-white/40"}`} />
                    {hyperSpeedEnabled ? "ON" : "OFF"}
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* COLUMN 2 & 3: MAIN NEURAL INTERACTIVE CORE & SYSTEM LOGS */}
          <section className="lg:col-span-2 flex flex-col gap-4">
            
            {/* BRAIN PANEL Container */}
            <div className="glass rounded-lg border border-white/10 bg-white/[0.01] flex flex-col flex-1" id="brain-panel-container">
              <div className="px-4 py-2 bg-black/40 border-b border-white/10 flex flex-col sm:flex-row gap-2 justify-between sm:items-center">
                <span className="label-mono flex items-center gap-1.5 text-[9px] tracking-widest font-bold">
                  <Cpu className="w-3 h-3 text-white/80" />
                  GEMINI AUTONOMOUS VOX CENTER
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider font-extrabold ${
                    apiStatus === "live" 
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                      : apiStatus === "warning"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse"
                      : "bg-white/5 text-white/50 border border-white/10"
                  }`}>
                    {apiStatus === "live" ? `GEMINI LIVE (${activeModelInfo})` : apiStatus === "warning" ? "FALLBACK DETECTED" : "STANDBY"}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-mono text-white/40">MODEL:</span>
                    <select
                      value={selectedModel}
                      onChange={(e) => {
                        setSelectedModel(e.target.value);
                        appendLog(`[SYSTEM] Selected model set to: ${e.target.value}`, "success");
                      }}
                      className="bg-black text-[9px] text-white/95 border border-white/10 rounded px-1.5 py-0.5 outline-none cursor-pointer hover:border-white/30 font-mono transition-all font-bold text-emerald-400"
                    >
                      <option value="gemini-1.5-flash">Gemini 1.5 Flash (Fast & Smooth AI)</option>
                      <option value="gemini-3.1-flash-lite">Gemini 3.1 Lite (Fastest)</option>
                      <option value="gemini-3.5-flash">Gemini 3.5 Flash (Standard)</option>
                      <option value="gemini-flash-latest">Gemini Flash Latest</option>
                      <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Smartest)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <Visualizer
                  isListening={isListening}
                  isSpeaking={isSpeaking}
                  isThinking={isThinking}
                  voiceCommandResponse={spokenText}
                  onToggleListen={startSpeechRecognitionSimulation}
                  voiceStatus={voiceStatus}
                  transcript={transcript}
                  hyperSpeedEnabled={hyperSpeedEnabled}
                  setHyperSpeedEnabled={setHyperSpeedEnabled}
                  animationStyle={animationStyle}
                />

                {/* Simulated / Quick Action Guide buttons */}
                <div className="p-4 border-t border-white/10 bg-black/40">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-mono text-white/50 uppercase">Voice Trigger Shortcuts (Click to simulate speech):</span>
                    <span className="text-[9px] text-white/40 font-mono">Control Subsystems instantly</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setTranscript("Gemini, buy $5000 worth of Bitcoin for our trading account immediately.");
                        executeCoreAICommand("Gemini, buy $5000 worth of Bitcoin for our trading account immediately.");
                      }}
                      className="text-[10px] text-left border border-white/10 hover:border-white p-2 rounded bg-black/50 hover:bg-white/5 transition-all text-white/80 flex items-start gap-2 group cursor-pointer"
                      id="action-shortcut-1"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-white/40 group-hover:text-white mt-0.5" />
                      <div>
                        <span className="block font-sans font-bold text-white text-[9px]">/trade-btc</span>
                        <span className="text-[9px] font-mono text-white/50 break-all leading-tight italic block">"Buy $5000 in BTC"</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setTranscript("Sync weather grid and atmospheric parameters for Tokyo, Japan.");
                        executeCoreAICommand("Sync weather grid and atmospheric parameters for Tokyo, Japan.");
                      }}
                      className="text-[10px] text-left border border-white/10 hover:border-white p-2 rounded bg-black/50 hover:bg-white/5 transition-all text-white/80 flex items-start gap-2 group cursor-pointer"
                      id="action-shortcut-2"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-white/40 group-hover:text-white mt-0.5" />
                      <div>
                        <span className="block font-sans font-bold text-white text-[9px]">/weather-tokyo</span>
                        <span className="text-[9px] font-mono text-white/50 break-all leading-tight italic block">"Sync Tokyo atmospheric grid"</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setTranscript("Elevate militarized defense status to Defcon 2 right away.");
                        executeCoreAICommand("Elevate militarized defense status to Defcon 2 right away.");
                      }}
                      className="text-[10px] text-left border border-white/10 hover:border-white p-2 rounded bg-black/50 hover:bg-white/5 transition-all text-white/80 flex items-start gap-2 group cursor-pointer"
                      id="action-shortcut-3"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-white/40 group-hover:text-white mt-0.5" />
                      <div>
                        <span className="block font-sans font-bold text-white text-[9px]">/set-defcon-2</span>
                        <span className="text-[9px] font-mono text-white/50 break-all leading-tight italic block">"Elevate alert status to Defcon 2"</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setTranscript("Browser: Navigate to news.ycombinator.com and scroll the page.");
                        executeCoreAICommand("Browser: Navigate to news.ycombinator.com and scroll the page.");
                      }}
                      className="text-[10px] text-left border border-white/10 hover:border-white p-2 rounded bg-black/50 hover:bg-white/5 transition-all text-white/80 flex items-start gap-2 group cursor-pointer"
                      id="action-shortcut-4"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-white/40 group-hover:text-white mt-0.5" />
                      <div>
                        <span className="block font-sans font-bold text-white text-[9px]">/browser-nav</span>
                        <span className="text-[9px] font-mono text-white/50 break-all leading-tight italic block">"Navigate to Hacker News"</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* API STATUS DIAGNOSTIC HINT BANNER */}
            {apiStatus === "warning" && (
              <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 p-2.5 text-[10px] rounded font-mono leading-normal flex items-start gap-2">
                <span className="text-amber-500 font-black">⚠️ DIAGNOSTIC:</span>
                <div>
                  No API key detected in Secrets or selected GenAI model is experiencing a high-demand spike. 
                  Successfully routed request to the <strong>Onboard Fallback Core</strong>. 
                  To connect live cloud intelligence, click <strong>Settings &gt; Secrets</strong> in AI Studio and provision a <strong>GEMINI_API_KEY</strong>!
                </div>
              </div>
            )}

            {/* LOWER PORTION: DETAILED TELEMETRY DISPLAY OUTPUT */}
            <div className="glass p-4 rounded-lg border border-white/10 bg-black/90 flex flex-col gap-2 min-h-[180px]" id="telemetry-display-panel">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-white/10">
                <span className="font-bold flex items-center gap-1 text-white font-mono uppercase text-[10px]">
                  <CodeXml className="w-3.5 h-3.5" />
                  Neural output & Telemetry
                </span>
                <span className="text-[9px] bg-white/10 px-1 py-0.5 rounded text-white/80 font-mono">
                  Gemini Voice Raw Report
                </span>
              </div>
              
              <div className="text-xs leading-relaxed opacity-90 max-h-[140px] overflow-y-auto pr-2 font-mono" id="markdown-viewer">
                {displayTextResponse.split("\n\n").map((para, i) => {
                  if (para.startsWith("###")) {
                    return <h3 key={i} className="text-sm font-black text-white uppercase tracking-wider mb-2 mt-2">{para.replace("###", "")}</h3>;
                  }
                  if (para.startsWith("-") || para.startsWith("*")) {
                    return (
                      <ul key={i} className="list-disc list-inside ml-2 text-white/80">
                        {para.split("\n").map((li, j) => (
                          <li key={j} className="text-white/90">{li.replace(/^[\s-*]+/, "")}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={i} className="text-white/80 mb-2">{para}</p>;
                })}
              </div>
            </div>

            {/* MANUAL VOICE COMMAND OVERRIDE INPUT LINE */}
            <div className="glass p-3 rounded-lg border border-white/10 bg-black" id="terminal-input-bar">
              <form onSubmit={handleOverrideSubmit} className="flex gap-2">
                <div className="flex items-center text-white/40 px-1 font-mono text-xs">
                  <Terminal className="w-3.5 h-3.5 mr-1" />
                  gemini:~$
                </div>
                <input
                  type="text"
                  value={voiceInputOverrideText}
                  onChange={(e) => setVoiceInputOverrideText(e.target.value)}
                  placeholder="Type voice command text or prompt directly here..."
                  className="flex-1 bg-transparent border-none text-xs text-white focus:outline-none placeholder-white/30 font-mono"
                  id="command-manual-input"
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-white text-black rounded text-[10px] font-bold uppercase hover:bg-slate-200 transition-colors cursor-pointer"
                  id="command-manual-submit"
                >
                  Execute
                </button>
              </form>
            </div>
          </section>

        </main>
      )}

      {/* FOOTER METADATA CONTROLLER */}
      <footer className="mt-auto px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-black/60 backdrop-blur-md gap-4">
        <div className="flex gap-8">
          <div className="flex flex-col">
            <span className="label-mono text-[9px]">Neural Voice Identity</span>
            <span className="text-xs text-white/90">{selectedVoice.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="label-mono text-[9px]">Autonomy Level</span>
            <span className="text-xs text-white/90">Autonomous Self-Learning Stack</span>
          </div>
        </div>

        <div className="text-right flex flex-col items-start sm:items-end">
          <span className="label-mono text-[9px]">Real-time page scanned</span>
          <p className="text-xs text-white/90 italic truncate max-w-sm">
            Scanned: "{browserMirror.title}" ({browserMirror.status})
          </p>
        </div>
      </footer>
    </div>
  );
}
