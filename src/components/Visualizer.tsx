import React, { useEffect, useState, useRef } from "react";
import { Mic, MicOff, Volume2, Flame, Zap, Compass, RefreshCw, BarChart2 } from "lucide-react";

interface VisualizerProps {
  isListening: boolean;
  isSpeaking: boolean;
  isThinking: boolean;
  voiceCommandResponse: string;
  onToggleListen: () => void;
  voiceStatus: string;
  transcript: string;
  hyperSpeedEnabled: boolean;
  setHyperSpeedEnabled: (val: boolean) => void;
  animationStyle: "siri-flow" | "neon-matrix" | "solar-flare" | "radar-helix";
}

export const Visualizer: React.FC<VisualizerProps> = ({
  isListening,
  isSpeaking,
  isThinking,
  voiceCommandResponse,
  onToggleListen,
  voiceStatus,
  transcript,
  hyperSpeedEnabled,
  setHyperSpeedEnabled,
  animationStyle,
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Spark particles for Solar Flare animation
  const particlesRef = useRef<{ x: number; y: number; size: number; speedY: number; opacity: number }[]>([]);

  // Binary floating elements for Radar Helix
  const binaryElementsRef = useRef<{ x: number; y: number; val: string; speedX: number; opacity: number }[]>([]);

  // Speed-controlled neural rotation animation loop
  useEffect(() => {
    let animId: number;
    const updateRotation = () => {
      const currentSpeedFactor = hyperSpeedEnabled ? 2.5 : 1.25;
      setRotationAngle(prev => (prev + (isListening ? 4.5 : isThinking ? 9 : 0.8) * currentSpeedFactor) % 360);
      animId = requestAnimationFrame(updateRotation);
    };
    animId = requestAnimationFrame(updateRotation);
    return () => cancelAnimationFrame(animId);
  }, [isListening, isSpeaking, isThinking, hyperSpeedEnabled]);

  // Premium Canvas-based dynamic custom audio flow animation styles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = canvas.parentElement?.clientWidth || 360;
        canvas.height = 64; // Slightly height-expanded for detailed style elements
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles once
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 20; i++) {
        particlesRef.current.push({
          x: Math.random() * (canvas.width || 360),
          y: Math.random() * 64,
          size: Math.random() * 2.5 + 0.5,
          speedY: Math.random() * 0.8 + 0.2,
          opacity: Math.random() * 0.8 + 0.2
        });
      }
    }

    // Initialize binary items once
    if (binaryElementsRef.current.length === 0) {
      for (let i = 0; i < 8; i++) {
        binaryElementsRef.current.push({
          x: Math.random() * (canvas.width || 360),
          y: Math.random() * 40 + 10,
          val: Math.random() > 0.5 ? "1" : "0",
          speedX: Math.random() * 0.4 + 0.1,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    }

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let numWaves = 3;
      let speed = 0.04;
      let maxAmplitude = 12;
      let frequency = 0.015;

      // Adjust wave parameters dynamically based on status
      if (isListening) {
        speed = hyperSpeedEnabled ? 0.26 : 0.15;
        maxAmplitude = 22;
        frequency = 0.024;
        numWaves = 4;
      } else if (isThinking) {
        speed = 0.07;
        maxAmplitude = 8;
        frequency = 0.012;
        numWaves = 3;
      } else if (isSpeaking) {
        speed = 0.11;
        maxAmplitude = Math.sin(Date.now() / 200) * 10 + 14;
        frequency = 0.02;
        numWaves = 3.5;
      } else {
        // Standby breathing hum
        speed = 0.02;
        maxAmplitude = 4;
        frequency = 0.008;
        numWaves = 2;
      }

      phase += speed;

      // --- ANIMATION STYLE CUSTOM RENDERERS ---

      if (animationStyle === "solar-flare") {
        // Draw rising warm flame particles
        ctx.save();
        particlesRef.current.forEach(p => {
          p.y -= p.speedY * (isSpeaking ? 2 : isListening ? 3 : 1);
          if (p.y < 0) {
            p.y = canvas.height;
            p.x = Math.random() * canvas.width;
          }
          ctx.beginPath();
          ctx.fillStyle = `rgba(249, 115, 22, ${p.opacity * (isSpeaking || isListening ? 1.0 : 0.5)})`;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }

      if (animationStyle === "radar-helix") {
        // Draw drifting binary hacker elements
        ctx.save();
        ctx.font = "8px 'Fira Code', 'JetBrains Mono', monospace";
        binaryElementsRef.current.forEach(b => {
          b.x += b.speedX * (isSpeaking ? 1.5 : 1);
          if (b.x > canvas.width) {
            b.x = 0;
            b.y = Math.random() * 40 + 10;
            b.val = Math.random() > 0.5 ? "1" : "0";
          }
          ctx.fillStyle = `rgba(34, 197, 94, ${b.opacity})`;
          ctx.fillText(b.val, b.x, b.y);
        });
        ctx.restore();
      }

      // Multi-layer sine drawing
      for (let i = 0; i < numWaves; i++) {
        ctx.beginPath();
        
        const waveOffset = (i * Math.PI) / 2;
        const currentPhase = phase + waveOffset;
        
        let alpha = 0.12;
        let lineWidth = i === 0 ? 2 : 1;
        
        if (i === 0) {
          alpha = 0.85;
        } else if (i === 1) {
          alpha = 0.45;
        } else {
          alpha = 0.20;
        }

        // Apply theme-specific stroke color profile
        if (animationStyle === "neon-matrix") {
          // Purple, Cyan, Deep Pink premium cyberpunk overlapping waves
          if (i === 0) {
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`; // cyan
          } else if (i === 1) {
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`; // purple
          } else {
            ctx.strokeStyle = `rgba(236, 72, 153, ${alpha})`; // pink
          }
        } else if (animationStyle === "solar-flare") {
          // Orange, Yellow, Crimson flames colors
          if (i === 0) {
            ctx.strokeStyle = `rgba(249, 115, 22, ${alpha})`; // orange
          } else if (i === 1) {
            ctx.strokeStyle = `rgba(234, 179, 8, ${alpha})`; // yellow
          } else {
            ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`; // red
          }
        } else if (animationStyle === "radar-helix") {
          // Bionic Matrix Green codes shades
          if (i === 0) {
            ctx.strokeStyle = `rgba(34, 197, 94, ${alpha})`; // bright green
          } else if (i === 1) {
            ctx.strokeStyle = `rgba(74, 222, 128, ${alpha})`; // light pastel green
          } else {
            ctx.strokeStyle = `rgba(22, 101, 52, ${alpha})`; // deep forest green
          }
        } else {
          // Siri Flow (Crisp Silver & pure clean whites)
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        }

        ctx.lineWidth = lineWidth;

        // Draw individual segments
        for (let x = 0; x < canvas.width; x++) {
          const progress = x / canvas.width;
          const k = Math.sin(progress * Math.PI); // envelope pinch logic
          const envelope = Math.pow(k, 1.8);

          const y = (canvas.height / 2) + Math.sin(x * frequency + currentPhase) * maxAmplitude * envelope;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // If Neon style, let's draw random data packets crossing
      if (animationStyle === "neon-matrix" && (isListening || isSpeaking)) {
        ctx.save();
        ctx.fillStyle = "rgba(6, 182, 212, 0.3)";
        const count = isSpeaking ? 3 : 1;
        for (let idx = 0; idx < count; idx++) {
          const packetX = (phase * 120 + idx * 80) % canvas.width;
          const packetY = (canvas.height / 2) + Math.sin(packetX * 0.02 + phase) * 8;
          ctx.beginPath();
          ctx.arc(packetX, packetY, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isListening, isSpeaking, isThinking, hyperSpeedEnabled, animationStyle]);

  // Color mappings for UI Orbit Elements
  const getThemeRingColors = () => {
    switch (animationStyle) {
      case "neon-matrix":
        return {
          glowClass: "shadow-[0_0_50px_rgba(168,85,247,0.3)] border-purple-500/40",
          innerRippleColor: "border-purple-500/20",
          pingColor: "border-[#67e8f9]/30",
          radarBg: "bg-purple-500/5",
          accentText: "text-purple-400"
        };
      case "solar-flare":
        return {
          glowClass: "shadow-[0_0_50px_rgba(249,115,22,0.3)] border-orange-500/40",
          innerRippleColor: "border-orange-500/20",
          pingColor: "border-[#fdba74]/30",
          radarBg: "bg-orange-500/5",
          accentText: "text-orange-400"
        };
      case "radar-helix":
        return {
          glowClass: "shadow-[0_0_50px_rgba(34,197,94,0.3)] border-emerald-500/40",
          innerRippleColor: "border-emerald-500/20",
          pingColor: "border-[#86efac]/30",
          radarBg: "bg-emerald-500/5",
          accentText: "text-emerald-400"
        };
      default:
        return {
          glowClass: "shadow-[0_0_50px_rgba(255,255,255,0.2)] border-white/20",
          innerRippleColor: "border-white/10",
          pingColor: "border-white/10",
          radarBg: "",
          accentText: "text-white/40"
        };
    }
  };

  const themeColors = getThemeRingColors();

  return (
    <div className={`flex flex-col items-center justify-center relative p-6 h-full min-h-[440px] transition-all rounded-xl border ${
      isListening 
        ? "bg-gradient-to-b from-[#061214] to-[#010609] border-[#10b981]/30 shadow-[0_0_50px_rgba(16,185,129,0.06)]"
        : isThinking
        ? "bg-gradient-to-b from-[#0c0c16] to-[#030307] border-white/15 shadow-[0_0_40px_rgba(255,255,255,0.04)]"
        : isSpeaking
        ? "bg-gradient-to-b from-[#070b18] to-[#020308] border-blue-500/20 shadow-[0_0_45px_rgba(59,130,246,0.05)]"
        : "bg-[#04060c]/90 border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
    }`} id="gemini-brain-visualizer">
      
      {/* HUD Speed Optimizer Overlay */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${hyperSpeedEnabled ? "bg-[#ffffff]" : "bg-white/40"}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${hyperSpeedEnabled ? "bg-white" : "bg-white/40"}`}></span>
          </span>
          <span className="text-[9px] font-mono tracking-widest text-white/70 uppercase">
            {hyperSpeedEnabled ? "QUANTUM SPEED LOGIC: ACTIVE" : "STANDARD REASONING ACTIVE"}
          </span>
        </div>

        {/* Ultra-Fast listening & parameter controls */}
        <button
          onClick={() => setHyperSpeedEnabled(!hyperSpeedEnabled)}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase rounded border transition-all cursor-pointer ${
            hyperSpeedEnabled
              ? "bg-white text-black border-white shadow-[0_0_12px_rgba(255,255,255,0.4)] font-bold"
              : "bg-black/80 hover:bg-white/10 text-white/60 border-white/15"
          }`}
          title="Toggle Hyper-Fast Audio Processing & Reasoning"
          id="toggle-hyperspeed-btn"
        >
          <Zap className={`w-3 h-3 ${hyperSpeedEnabled ? "text-black fill-black" : "text-white/60"}`} />
          {hyperSpeedEnabled ? "DUAL-CORE (FAST)" : "HYPER-SPEED"}
        </button>
      </div>

      {/* DOLFIN AI AGENT PROFILE AVATAR & CALL NODE */}
      <div className="mt-14 mb-3 w-full flex flex-col items-center justify-center gap-2.5 bg-black/40 border border-white/10 p-3.5 rounded-lg">
        <div className="flex items-center justify-between gap-4 w-full">
          {/* Circular avatar frame */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full border-1.5 border-white bg-black flex items-center justify-center overflow-hidden shrink-0 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-slate-900 border-dashed">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#151518] to-slate-800 flex items-center justify-center text-white font-black text-[10px] tracking-widest uppercase">
                DLF
              </div>
              {/* Pulsing overlay ring if AI is talking or listening */}
              {(isListening || isSpeaking || isThinking) && (
                <div className="absolute inset-0 border-2 border-white animate-ping rounded-full opacity-60 pointer-events-none" />
              )}
            </div>

            <div className="min-w-0">
              <h4 className="text-xs font-black tracking-wider text-white uppercase flex items-center gap-1.5 font-mono">
                DOLFIN PILOT CORE
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping shadow-[0_0_5px_#fff]" />
              </h4>
              <p className="text-[9px] font-mono text-white/50 lowercase truncate">dolfin.agent.node@matrix_system</p>
            </div>
          </div>

          {/* Staggered Vertical-Bar Soundwave mimicking User's GIF */}
          <div className="flex items-end justify-center gap-0.5 h-8 pr-1 shrink-0">
            {[...Array(14)].map((_, i) => (
              <div
                key={i}
                style={{
                  animationDelay: `${i * 0.05}s`,
                  animationDuration: `${0.55 + Math.sin(i) * 0.25}s`
                }}
                className={`w-0.5 rounded-full bg-white transition-all ${
                  isListening || isSpeaking || isThinking
                    ? "animate-soundwave" 
                    : "h-2.5 opacity-20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call Controls Bar: Standard Tap Mic vs ALWAYS-ON CONTINUOUS VOICE LINK (Call button) */}
        <div className="flex gap-2 w-full pt-2 border-t border-white/10">
          <button
            onClick={onToggleListen}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-mono tracking-widest uppercase rounded transition-all cursor-pointer border ${
              isListening
                ? "border-emerald-500 bg-emerald-500/15 text-emerald-300 font-extrabold shadow-[0_0_12px_rgba(16,185,129,0.3)] scale-[0.98]" 
                : "border-white/15 hover:border-white/40 text-white/70 hover:text-white bg-white/5 hover:bg-white/10"
            }`}
            title="Toggle speech recognition trigger"
            id="voice-mic-main-btn"
          >
            <Mic className={`w-3.5 h-3.5 ${isListening ? "text-emerald-400 animate-pulse" : "text-white/60"}`} />
            Voice Mic
          </button>

          {/* ALL TIME LISTEN / CONTINUOUS CALL BUTTON (PULSING ACTIVE DIAL) */}
          <button
            onClick={onToggleListen}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-mono tracking-widest uppercase rounded border transition-all cursor-pointer ${
              isListening
                ? "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 animate-pulse font-extrabold shadow-[0_0_15px_rgba(16,185,129,0.5)] scale-[0.98]"
                : "bg-black/60 text-emerald-400 border-emerald-500/20 hover:border-emerald-500/50 hover:text-white"
            }`}
            title="Always-listening stream: stay on continuous feedback channel"
            id="always-listening-call-btn"
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isListening ? "bg-white" : "bg-emerald-400"}`}></span>
              <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isListening ? "bg-white" : "bg-emerald-400"}`}></span>
            </span>
            {isListening ? "📞 ACTIVE CALL" : "📞 ALL-TIME LISTEN"}
          </button>
        </div>
      </div>

      {/* Central Visualizer Orbit Ring */}
      <div
        className={`brain-glow w-68 h-68 border flex items-center justify-center relative transition-all duration-500 rounded-full ${themeColors.glowClass} ${
          isThinking
            ? "border-dashed animate-pulse"
            : isSpeaking
            ? "scale-102"
            : isListening
            ? "scale-[1.04]"
            : "hover:border-white/35"
        }`}
        style={{
          boxShadow: isListening 
            ? "inset 0 0 30px rgba(255,255,255,0.12), 0 0 50px rgba(16,185,129,0.3)" 
            : isThinking 
            ? "inset 0 0 20px rgba(255,255,255,0.1), 0 0 30px rgba(255,255,255,0.08)"
            : ""
        }}
      >
        {/* Kinetic vector guidelines */}
        <div 
          className="absolute inset-0 flex items-center justify-center opacity-30 transition-transform"
          style={{ transform: `rotate(${rotationAngle}deg)` }}
        >
          <div className="w-full h-[1px] bg-white/20"></div>
          <div className="w-[1px] h-full bg-white/20"></div>
          
          {/* Radar ticks */}
          <div className="absolute w-full h-full border border-dashed border-white/5 rounded-full" />
          <div className="absolute w-48 h-48 border border-white/10 rounded-full" />
          <div className="absolute w-28 h-28 border border-dashed border-white/20 rounded-full" />
        </div>

        {/* Expandable kinetic rings responding to fast-mode parameters (Selector 1) */}
        <div 
          className={`absolute rounded-full border border-dashed transition-all duration-500 ${themeColors.innerRippleColor} ${
            isListening 
              ? "w-56 h-56 opacity-90 scale-110 animate-[spin_8s_linear_infinite] border-white/60 shadow-[0_0_20px_rgba(255,255,255,0.15)]" 
              : isThinking
              ? "w-48 h-48 opacity-70 animate-[spin_4s_linear_infinite]"
              : "w-44 h-44 opacity-40 scale-100 animate-[spin_30s_linear_infinite]"
          }`}
          style={{
            borderWidth: hyperSpeedEnabled ? "2px" : "1px"
          }}
        />

        {/* Dynamic high-tech listening ripple rings to enhance user excitement */}
        {isListening && (
          <>
            <div className={`absolute w-[302px] h-[302px] rounded-full border-2 animate-ping opacity-30 pointer-events-none ${themeColors.pingColor}`} />
            <div className={`absolute w-[340px] h-[340px] rounded-full border animate-pulse opacity-20 pointer-events-none ${themeColors.innerRippleColor}`} />
            <div className="absolute w-[260px] h-[260px] rounded-full bg-white/2 animate-pulse scale-[1.08] pointer-events-none" />
          </>
        )}

        {/* Central interactive neural voice hub (Selector 2) */}
        <button
          onClick={onToggleListen}
          className={`w-36 h-36 rounded-full border-2 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-500 relative z-10 ${
            isListening
              ? "bg-gradient-to-b from-[#10b981] to-[#047857] text-white border-emerald-300 scale-95 shadow-[0_0_40px_rgba(16,185,129,0.55),inset_0_2px_8px_rgba(255,255,255,0.3)]"
              : isThinking
              ? "bg-gradient-to-tr from-[#151a29] to-[#070b13] text-white border-white scale-100 animate-pulse shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              : isSpeaking
              ? "bg-gradient-to-b from-[#2563eb] to-[#1e3a8a] text-white border-blue-400 scale-105 shadow-[0_0_35px_rgba(59,130,246,0.5),inset_0_2px_8px_rgba(255,255,255,0.2)]"
              : "bg-gradient-to-b from-[#090e1a] to-[#02050c] hover:from-[#11192e] hover:to-[#090e1a] text-white border-white/20 hover:border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)]"
          }`}
          title="Toggle Voice Controller (Microphone Link)"
          id="interactive-voice-trigger"
        >
          {isListening ? (
            <div className="flex flex-col items-center">
              <Zap className="w-10 h-10 text-white animate-bounce fill-white" />
              <span className="text-[9.5px] uppercase tracking-widest font-black text-white mt-1">
                LISTENING
              </span>
            </div>
          ) : isThinking ? (
            <div className="flex flex-col items-center">
              <RefreshCw className="w-8 h-8 text-white animate-spin" />
              <span className="text-[9.5px] uppercase tracking-widest font-black text-white mt-1">
                THINKING
              </span>
            </div>
          ) : isSpeaking ? (
            <div className="flex flex-col items-center">
              <Volume2 className="w-10 h-10 text-white animate-pulse" />
              <span className="text-[9.5px] uppercase tracking-widest font-bold text-white mt-1">
                SPEAKING
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center p-2 text-center">
              <Mic className="w-8 h-8 text-white/80 group-hover:scale-110 duration-200" />
              <span className="text-[9.5px] uppercase tracking-widest text-white/50 font-mono mt-1">
                TAP MIC
              </span>
            </div>
          )}
        </button>

        {/* Circular Orbit ring indicator labels */}
        <span className={`absolute text-[8px] font-mono tracking-widest rotate-12 bottom-6 left-6 uppercase ${themeColors.accentText}`}>
          {animationStyle.replace("-", " ")}
        </span>
        <span className={`absolute text-[8px] font-mono tracking-widest -rotate-12 top-6 right-6 uppercase ${themeColors.accentText}`}>
          Visuals Active
        </span>
      </div>

      {/* Real-time Voice Wave and Text Command Feedback */}
      <div className="mt-8 text-center w-full max-w-sm px-2">
        <div className="flex items-center justify-center gap-1.5 mb-1.5">
          <p className="text-xs font-semibold tracking-widest font-mono uppercase text-white">
            {voiceStatus}
          </p>
          {hyperSpeedEnabled && (
            <span className="text-[7.5px] px-1 bg-white text-black font-extrabold uppercase rounded">
              0.4s Fast-Mode
            </span>
          )}
        </div>
        
        {/* Advanced Dynamic Equalizer Waveform */}
        <div className="relative mt-3 h-16 w-full bg-white/5 border border-white/10 rounded-lg py-1 px-4 overflow-hidden flex items-center justify-center">
          <canvas ref={canvasRef} className="w-full h-full block animate-fade-in" />
        </div>

        {/* Live voice transcription preview */}
        {transcript && (
          <div className="mt-4 p-2 bg-white/5 border border-white/10 rounded-md text-left relative overflow-hidden">
            <span className="label-mono block text-white/50 text-[10px]">Real-time Transcription stream:</span>
            <p className="text-xs font-mono text-white italic truncate pr-8 mt-1">
              "{transcript}"
            </p>
            <Zap className="w-3.5 h-3.5 text-white/40 absolute right-2.5 top-3.5" />
          </div>
        )}

        {/* Last spoken response feedback */}
        {voiceCommandResponse && (
          <div className="mt-3 text-[11px] leading-relaxed italic text-white/70 max-h-16 overflow-y-auto font-mono scrollbar-none bg-black/40 p-2 rounded border border-white/5">
            Gemini Core Audio: "{voiceCommandResponse}"
          </div>
        )}
      </div>
    </div>
  );
};


