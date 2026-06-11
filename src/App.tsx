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
  ArrowRight
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
  const [selectedModel, setSelectedModel] = useState<string>("gemini-3.1-flash-lite");
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
    if (ttsMode === "off") {
      // Muted - completely offline/not vocalized but shown on terminal display
      setSpokenText(textToSay);
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 2400);
      return;
    }

    if (ttsMode === "browser") {
      if (!synthRef.current) {
        setSpokenText(textToSay);
        setIsSpeaking(true);
        setTimeout(() => setIsSpeaking(false), 2400);
        return;
      }

      try {
        synthRef.current.cancel(); // Abort existing voice quickly
        const utterance = new SpeechSynthesisUtterance(textToSay);
        
        // Match voice standard to available web voices
        const voicesList = browserVoices.length > 0 ? browserVoices : (synthRef.current.getVoices() || []);
        
        // Look for highest quality English natural/neural voice first
        let matchedVoice = voicesList.find(v => v.lang.includes("en-US") && (v.name.toLowerCase().includes("natural") || v.name.toLowerCase().includes("google") || v.name.toLowerCase().includes("neural")));
        
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
          setSpokenText(textToSay);
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
        setSpokenText(textToSay);
        setTimeout(() => setIsSpeaking(false), 3000);
      }
      return;
    }

    if (ttsMode === "gemini") {
      try {
        setIsSpeaking(true);
        setSpokenText(textToSay);
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
          body: JSON.stringify({ text: textToSay, voiceName })
        });
        const data = await response.json();

        if (data.audio) {
          setVoiceStatus("Playing Gemini Voice Model audio...");
          playRawPCM24k(data.audio);
          
          // Mimic speaking overlay timings
          const approximateDuration = Math.max(1500, textToSay.split(" ").length * 400);
          setTimeout(() => {
            setIsSpeaking(false);
            setVoiceStatus(isListening ? "Listening for Audio" : "Operational Mode Connected");
          }, approximateDuration);
        } else {
          // If mock or offline mode, fall back beautifully to Browser voices or silent logging
          if (synthRef.current) {
            synthRef.current.cancel();
            const utterance = new SpeechSynthesisUtterance(textToSay);
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

    // Toggle ON: Start continuous listening
    setIsListening(true);
    setVoiceStatus(hyperSpeedEnabled ? "Quantum Continuous Active" : "Continuous Listening Active");
    appendLog(hyperSpeedEnabled ? "Ultra-fast continuous voice link enabled. Speak anytime!" : "Continuous Gemini Assistant system linked. Listening continuously...", "info");

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        if (recognitionRef.current) {
          try { recognitionRef.current.stop(); } catch (err) {}
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        
        // We set continuous = true so the browser listens for a full sentence sequence without cutting off immediately.
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => {
          setVoiceStatus(hyperSpeedEnabled ? "Gemini continuous stream active" : "Capturing speech streams...");
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
            executeCoreAICommand(finalCleanText);
          }
        };

        recognition.onend = () => {
          // Critical Requirement: Auto restart when continuous listening is enabled
          if (isListeningRef.current) {
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
    
    // 1. Laptop Shutdown Simulation
    if (lowercaseCmd.includes("shutdown") || lowercaseCmd.includes("turn off")) {
      setSystemState("SHUTDOWN");
      setIsThinking(false);
      appendLog("CRITICAL: SHUTDOWN SIGNAL PROPAGATED.", "error");
      triggerVoiceSpeak("Executing host laptop shutdown sequence. Saving neural registry status safely. Goodbye developer.");
      setGeminiThinking("Initiating secure OS host terminal shutdown.");
      setDisplayTextResponse("### HOST LAPTOP SHUTDOWN\n- Signal: `SIGTERM`\n- State: Disconnected\n- Core status: Closed down securely.\n\nSimulated Host Laptop power supply bypass has been completed selfly.");
      return;
    }

    // 2. Lock System Simulation
    if (lowercaseCmd.includes("lock") || lowercaseCmd.includes("stop console") || lowercaseCmd.includes("lock system")) {
      setSystemState("LOCKED");
      setIsThinking(false);
      appendLog("System lock applied instantly.", "warning");
      triggerVoiceSpeak("Operational console is locked down instantly. Bypassing voice unauthorized accesses.");
      setGeminiThinking("Guard rails deployed. Restricting voice control interface.");
      setDisplayTextResponse("### SYSTEM ACCESS STRICTLY CONSTRAINED\nClick 'Unlock Core' to return with voice authorizations safely.");
      return;
    }

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
            <p className="text-xs font-bold font-mono tracking-widest">{systemState}</p>
          </div>
          <div className="h-8 w-[1px] bg-white/20 hidden sm:block"></div>

          {/* Quick Lock & Reboot Triggers */}
          <div className="flex gap-2">
            {systemState === "LOCKED" ? (
              <button 
                onClick={() => {
                  setSystemState("ONLINE");
                  appendLog("Neural system lock disengaged safely.", "success");
                  triggerVoiceSpeak("Lock disengaged developer. Welcome back to the main layout.");
                }}
                className="btn-white bg-white text-black flex items-center gap-2 px-3 py-1.5 text-xs rounded font-bold uppercase cursor-pointer"
                id="unlock-app-btn"
              >
                <Unlock className="w-3.5 h-3.5" />
                Unlock Core
              </button>
            ) : (
              <button 
                onClick={() => executeCoreAICommand("Lock system instantly")}
                className="btn-white bg-white text-black flex items-center gap-2 px-3 py-1.5 text-xs rounded font-semibold uppercase cursor-pointer hover:bg-white/90"
                id="lock-app-btn"
              >
                <Lock className="w-3.5 h-3.5" />
                Lock System
              </button>
            )}

            <button
              onClick={() => {
                setSystemState("REBOOTING");
                appendLog("Warm system restart signaled. Rebuilding state matrices...", "warning");
                triggerVoiceSpeak("Warm restart sequence initiated. Clearing stack memories.");
                setTimeout(() => {
                  setSystemState("ONLINE");
                  appendLog("GEMINI VOICE PILOT Boot sequence completed. Status NOMINAL.", "success");
                }, 3000);
              }}
              className="px-3 py-1.5 rounded bg-white/5 border border-white/20 text-xs hover:bg-white/10 transition-colors cursor-pointer"
              id="reboot-app-btn"
            >
              Reboot Kernel
            </button>
          </div>
        </div>
      </header>

      {/* SHUTDOWN / LOCK SCREEN BANNER */}
      {systemState === "SHUTDOWN" && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black/95 text-center min-h-[450px]" id="shutdown-screen">
          <Laptop className="w-20 h-20 text-white/40 mb-4 animate-pulse" />
          <h2 className="text-2xl font-black tracking-widest text-[#eeeeee]">GEMINI VOICE MODEL OFFLINE</h2>
          <p className="text-sm font-mono text-white/60 tracking-tight max-w-md mt-2">
            The laptop host and developer console have received a secure hardware close signal.
          </p>
          <button
            onClick={() => {
              setSystemState("ONLINE");
              appendLog("Simulated host laptop rebooted successfully.", "success");
              triggerVoiceSpeak("Neural link established. Operating offline simulation.");
            }}
            className="btn-white mt-6"
            id="boot-app-btn"
          >
            BOOT GEMINI VOICE MODEL UP AGAIN
          </button>
        </div>
      )}

      {systemState === "LOCKED" && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black/90 text-center min-h-[450px]" id="locked-screen">
          <Lock className="w-16 h-16 text-white mb-4 animate-[bounce_2s_infinite]" />
          <h2 className="text-xl font-bold tracking-widest">CONSOLE COMPROMISED OR SECURED</h2>
          <p className="text-xs font-mono text-white/50 mt-2 max-w-sm">
            Access to autonomous system modules is secure. Re-authorize to link external browser control.
          </p>
          <button
            onClick={() => {
              setSystemState("ONLINE");
              appendLog("System lock disengaged.", "success");
            }}
            className="btn-white mt-6"
            id="unlock-app-btn-center"
          >
            DISENGAGE VOICE SHIELD LOCK
          </button>
        </div>
      )}

      {systemState === "REBOOTING" && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#050505] text-center min-h-[450px]" id="rebooting-screen">
          <div className="w-16 h-16 border-2 border-dashed border-white rounded-full animate-spin"></div>
          <h2 className="text-lg font-mono tracking-widest mt-6">REBUILDING KERNEL STACK...</h2>
          <progress className="w-48 h-1 bg-white/10 progress-indicator mt-4" value={65} max={100}></progress>
        </div>
      )}

      {/* 📰 LIVE GLOBAL NEWS HOLDER & BROADCAST TICKER */}
      {systemState === "ONLINE" && (
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
      )}

      {/* CHIEF SYSTEM WORKSPACE AREA */}
      {systemState === "ONLINE" && (
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 lg:p-6 bg-[#050505]" id="workspace-grid">
          
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
                        appendLog(`[SYSTEM] Selected model changed to: ${e.target.value}`, "info");
                      }}
                      className="bg-black text-[9px] text-white/95 border border-white/10 rounded px-1.5 py-0.5 outline-none cursor-pointer hover:border-white/30 font-mono transition-all"
                    >
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

          {/* COLUMN 4: BROWSER APP CONTROL & LIVE DEVICE SIMULATORS */}
          <aside className="lg:col-span-1 flex flex-col gap-4">
            
            {/* BROWSER AND APP CONTROLLER CARD */}
            <div 
              className={`glass p-4 rounded-lg flex flex-col border transition-all duration-500 relative ${
                controlledPanel === "browser" 
                  ? "border-white ring-2 ring-white/35 shadow-[0_0_20px_rgba(255,255,255,0.35)] scale-[1.01] bg-white/[0.04]" 
                  : "border-white/10 bg-white/[0.02]"
              }`} 
              id="browser-controller-card"
            >
              {controlledPanel === "browser" && (
                <div className="absolute -top-2 left-4 bg-white text-black text-[8px] font-mono tracking-widest px-1.5 py-0.5 rounded font-black uppercase animate-pulse flex items-center gap-1 z-10 shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping"></span>
                  Gemini Override Engaged
                </div>
              )}
              <p className="label-mono flex justify-between items-center mb-3 text-[10px] font-black tracking-widest border-b border-white/10 pb-2">
                <span>DOLFIN AI AGENT EXPLORER</span>
                <span className="px-1.5 py-0.5 bg-white text-black font-extrabold text-[8px] uppercase tracking-normal">Continuous System</span>
              </p>

              {/* 📡 SECTION 1: DOLFIN CONTINUOUS LEARNING MATRIX */}
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-black text-white/95 uppercase flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-emerald-500 animate-pulse shadow-[0_0_6px_#10b981]" />
                    Cognitive Learning Matrix
                  </span>
                  <span className="text-[7.5px] font-mono text-emerald-400 font-bold uppercase animate-pulse">Onboard Working 24/7</span>
                </div>
                
                <div className="bg-black/90 p-2 border border-emerald-500/20 rounded-md font-mono text-[9px] leading-relaxed text-emerald-300 max-h-[106px] min-h-[106px] overflow-y-auto scrollbar-none space-y-1 select-none">
                  {learningLogs.map((logLine, idx) => (
                    <p key={idx} className="truncate">{logLine}</p>
                  ))}
                </div>
              </div>

              {/* 🌐 SECTION 2: BROWSER CONTROL & ADVANCED VIEW SCROLL */}
              <div className="space-y-2.5 mb-4 border-t border-white/10 pt-3">
                <span className="text-[10px] font-mono font-black text-white/95 uppercase block">Browser Scraper Operations</span>
                
                {/* Real-time Scrape URL */}
                <div className="space-y-1 bg-black/40 p-2 rounded border border-white/5">
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={scannedUrlInput}
                      onChange={(e) => setScannedUrlInput(e.target.value)}
                      placeholder="Enter URL to scrape..."
                      className="flex-1 bg-black border border-white/20 rounded p-1 text-[10px] text-white font-mono focus:border-white focus:outline-none"
                      id="scanner-url-input"
                    />
                    <button
                      onClick={scanRealTimePageDetails}
                      disabled={isScraping}
                      className="px-2 py-1 bg-white text-black text-[9px] font-bold rounded hover:bg-slate-200 disabled:opacity-50 cursor-pointer"
                      title="Parse Live Page Elements"
                      id="scanner-scan-btn"
                    >
                      {isScraping ? "Scraping..." : "Scan"}
                    </button>
                  </div>
                </div>

                {/* Sandbox Browser Info Display */}
                <div className="bg-black/80 px-2.5 py-2 rounded border border-white/5 font-mono text-[9.5px]">
                  <div className="flex justify-between items-center text-white/50 mb-1">
                    <span className="flex items-center gap-1 text-[8.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                      Sandbox Browser Mirror
                    </span>
                    <span className="text-[7.5px] uppercase">Active Mode</span>
                  </div>
                  <p className="text-white truncate">URL: {browserMirror.url}</p>
                  <p className="text-[8.5px] text-white/50 truncate mt-0.5">Title: {browserMirror.title}</p>
                </div>

                {/* ADVANCED VIEW SCROLL CONTROL BAR */}
                <div className="space-y-1.5 bg-black/20 p-2 rounded border border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[9px] text-white/60 font-mono">Advanced Viewport Scrolling</label>
                    <button
                      onClick={() => setIsAutoScrolling(prev => !prev)}
                      className={`text-[8px] font-mono px-1.5 py-0.5 rounded border transition-all uppercase cursor-pointer flex items-center gap-1 ${
                        isAutoScrolling
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold"
                          : "bg-black/40 text-white/40 border-white/10"
                      }`}
                      title="Toggle Continuous Autonomous Scroll Loop"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isAutoScrolling ? "bg-emerald-400 animate-ping" : "bg-white/20"}`} />
                      🔁 Loop: {isAutoScrolling ? "AUTO" : "MANUAL"}
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-1">
                    <button
                      onClick={() => {
                        const ts = new Date().toLocaleTimeString();
                        setVirtualBrowserActionLog(prev => [`[${ts}] [SCROLL] Shifted viewport vertical coordinate +420px.`, ...prev].slice(-6));
                        appendLog("Scrolled browser down 40%", "info");
                        triggerVoiceSpeak("Viewport shifted down forty percent.");
                        setBrowserMirror(prev => ({ ...prev, status: "Active Mirror Scrolled Down", latency: "11ms" }));
                      }}
                      className="py-1 text-[8.5px] font-mono text-center border border-white/10 hover:border-white text-white/80 rounded hover:bg-white/5 cursor-pointer"
                      title="Scroll Down 40% vertical viewport"
                    >
                      ↓ Down
                    </button>
                    <button
                      onClick={() => {
                        const ts = new Date().toLocaleTimeString();
                        setVirtualBrowserActionLog(prev => [`[${ts}] [SCROLL] Shifted viewport vertical coordinate -420px.`, ...prev].slice(-6));
                        appendLog("Scrolled browser up 40%", "info");
                        triggerVoiceSpeak("Viewport shifted up forty percent.");
                        setBrowserMirror(prev => ({ ...prev, status: "Active Mirror Scrolled Up", latency: "11ms" }));
                      }}
                      className="py-1 text-[8.5px] font-mono text-center border border-white/10 hover:border-white text-white/80 rounded hover:bg-white/5 cursor-pointer"
                      title="Scroll Up 40% vertical viewport"
                    >
                      ↑ Up
                    </button>
                    <button
                      onClick={() => {
                        const ts = new Date().toLocaleTimeString();
                        setVirtualBrowserActionLog(prev => [`[${ts}] [SCROLL] Relocated coordinate yOffset to 0px.`, ...prev].slice(-6));
                        appendLog("Scrolled viewport to top header.", "info");
                        triggerVoiceSpeak("Web page viewport relocated to top header anchor.");
                        setBrowserMirror(prev => ({ ...prev, status: "Active Mirror Top", latency: "10ms" }));
                      }}
                      className="py-1 text-[8.5px] font-mono text-center border border-white/10 hover:border-white text-white/80 rounded hover:bg-white/5 cursor-pointer"
                      title="Scroll to Top anchor"
                    >
                      ⏮️ Top
                    </button>
                    <button
                      onClick={() => {
                        const ts = new Date().toLocaleTimeString();
                        setVirtualBrowserActionLog(prev => [`[${ts}] [SCROLL] Relocated coordinate yOffset to 2500px bottom.`, ...prev].slice(-6));
                        appendLog("Scrolled viewport to bottom footer.", "info");
                        triggerVoiceSpeak("Web page viewport relocated to bottom footer absolute.");
                        setBrowserMirror(prev => ({ ...prev, status: "Active Mirror Bottom", latency: "12ms" }));
                      }}
                      className="py-1 text-[8.5px] font-mono text-center border border-white/10 hover:border-white text-white/80 rounded hover:bg-white/5 cursor-pointer"
                      title="Scroll to Bottom anchor"
                    >
                      ⏭️ End
                    </button>
                  </div>
                </div>
              </div>

              {/* 🔌 SECTION 3: DEVICE ACCESS & LAUNCHER HUB */}
              <div className="space-y-2 border-t border-white/10 pt-3 flex-grow">
                <span className="text-[10px] font-mono font-black text-white/95 uppercase block">Universal Device App Launcher</span>
                
                <div className="grid grid-cols-2 gap-1.5 text-[9px] font-mono">
                  {/* APP 1: CHROME OPEN */}
                  <button
                    onClick={() => {
                      const ts = new Date().toLocaleTimeString();
                      setVirtualBrowserActionLog(prev => [`[${ts}] [SYSTEM] Target Chrome browser session initialized successfully.`, ...prev].slice(-6));
                      setBrowserMirror(prev => ({ ...prev, active: true, url: "https://google.com/chrome-node", title: "Chrome Sandbox Workspace" }));
                      appendLog("Bypassed device system parameters: Spawned Chromium.", "success");
                      triggerVoiceSpeak("Target chromium session opened.");
                    }}
                    className="flex items-center gap-1.5 p-1.5 bg-black border border-white/15 hover:border-white rounded text-white/80 cursor-pointer"
                  >
                    <span>🌐</span>
                    <span className="truncate">Open Browser</span>
                  </button>

                  {/* APP 2: FILE EXPLORER */}
                  <button
                    onClick={() => {
                      appendLog("System File Browser Launched: scanned root directory.", "success");
                      triggerVoiceSpeak("System files loaded successfully. All directories verified.");
                    }}
                    className="flex items-center gap-1.5 p-1.5 bg-black border border-white/15 hover:border-white rounded text-white/80 cursor-pointer"
                  >
                    <span>📂</span>
                    <span className="truncate">File Browser</span>
                  </button>

                  {/* APP 3: MATRIX SEARCH */}
                  <button
                    onClick={() => {
                      setTranscript("Gemini, global research matrix database for automated intelligence.");
                      executeCoreAICommand("Gemini, global research matrix database for automated intelligence.");
                    }}
                    className="flex items-center gap-1.5 p-1.5 bg-black border border-white/15 hover:border-white rounded text-white/80 cursor-pointer"
                  >
                    <span>🔍</span>
                    <span className="truncate">Search Matrix</span>
                  </button>

                  {/* APP 4: TRACK SATELLITE HANDSHAKE */}
                  <button
                    onClick={() => {
                      appendLog("Satellite handshake ping dispatching... Handshake 100% nominal.", "info");
                      triggerVoiceSpeak("Active satellite communication link validated.");
                    }}
                    className="flex items-center gap-1.5 p-1.5 bg-black border border-white/15 hover:border-white rounded text-white/80 cursor-pointer"
                  >
                    <span>🛰️</span>
                    <span className="truncate">Verify Link</span>
                  </button>
                </div>

                {/* METADATA SUMMARY METRICS */}
                <div className="p-2 border border-white/5 bg-black/20 rounded space-y-1 text-[8.5px] font-mono mt-3">
                  <div className="flex justify-between">
                    <span className="opacity-50">Handshake IP:</span>
                    <span>{browserMirror.ip}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-50">CDN Cache Routing:</span>
                    <span>{browserMirror.server}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-50">Mirror Response Latency:</span>
                    <span className="font-bold text-white/95">{browserMirror.latency}</span>
                  </div>
                </div>

                {/* Bottom Core Restart and Terminators */}
                <div className="mt-4 flex gap-1.5 pt-1.5">
                  <button
                    onClick={() => {
                      const ts = new Date().toLocaleTimeString();
                      setVirtualBrowserActionLog(prev => [`[${ts}] [THREAD] Spawned new active chromium container.`, ...prev].slice(-6));
                      setBrowserMirror(prev => ({ ...prev, active: true, url: "https://workstation.01/dashboard/real-time", title: "Gemini 1.5 Web Monitor", status: "Active Mirror Linked" }));
                      appendLog("Simulated new active browser controller session initialized.", "info");
                      triggerVoiceSpeak("Active browser container initialized.");
                    }}
                    className="flex-1 py-1 bg-white text-black text-[9px] font-bold rounded cursor-pointer text-center select-none"
                  >
                    Spawn Sandbox
                  </button>
                  <button
                    onClick={() => {
                      const ts = new Date().toLocaleTimeString();
                      setVirtualBrowserActionLog(prev => [`[${ts}] [THREAD] Process tree terminated.`, ...prev].slice(-6));
                      setBrowserMirror(prev => ({ ...prev, active: false, url: "workstation.closed/idle" }));
                      appendLog("Killed redundant process threads.", "warning");
                      triggerVoiceSpeak("Process trees terminated.");
                    }}
                    className="flex-1 py-1 text-[9px] cursor-pointer border border-white bg-transparent text-white hover:bg-white/5 rounded text-center select-none"
                  >
                    Kill Thread
                  </button>
                </div>
              </div>
            </div>

            {/* REMOTE DEVICE CONTROL & LIVE ACCESS MIRROR OVERRIDE CARD */}
            <div 
              className={`glass p-4 rounded-lg flex-grow flex flex-col border transition-all duration-500 relative min-h-[180px] ${
                controlledPanel === "terminal" || controlledPanel === "shell"
                  ? "border-white ring-2 ring-white/35 shadow-[0_0_20px_rgba(255,255,255,0.35)] scale-[1.01] bg-white/[0.04]" 
                  : "border-white/10 bg-white/[0.02]"
              }`} 
              id="device-access-override-card"
            >
              {(controlledPanel === "terminal" || controlledPanel === "shell") && (
                <div className="absolute -top-2 left-4 bg-white text-black text-[8px] font-mono tracking-widest px-1.5 py-0.5 rounded font-black uppercase animate-pulse flex items-center gap-1 z-10 shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping"></span>
                  Gemini Override Engaged
                </div>
              )}
              <p className="label-mono flex justify-between items-center mb-3 text-[10px] font-bold tracking-widest">
                <span>Device Access Log</span>
                <span className="text-[8px] bg-red-600 px-1 rounded animate-pulse uppercase tracking-normal">Bypassed</span>
              </p>

              {/* LIVE ACCESS STREAM LOGGER */}
              <div className="bg-black border border-white/10 p-2.5 rounded flex-1 font-mono text-[9px] leading-relaxed overflow-y-auto max-h-[140px] scrollbar-none space-y-1">
                {terminalLogs.map(log => (
                  <p key={log.id} className={
                    log.type === "success" ? "text-white" :
                    log.type === "warning" ? "text-yellow-400" :
                    log.type === "error" ? "text-red-500 font-bold" :
                    log.type === "input" ? "text-teal-300" :
                    log.type === "gemini" ? "text-purple-400 italic" : "text-white/60"
                  }>
                    <span className="text-white/30 mr-1.5 font-light">[{log.timestamp}]</span>
                    {log.text}
                  </p>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    executeCoreAICommand("Shutdown HOST system");
                  }}
                  className="btn-white w-full py-2 bg-white text-black hover:bg-slate-200 uppercase text-[10px] font-black cursor-pointer"
                  id="force-shutdown-btn"
                >
                  Shutdown Host Laptop
                </button>
              </div>
            </div>
          </aside>
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
