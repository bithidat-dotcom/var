import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: "Gemini Voice Core Online" });
  });

  // Gemini Proxy for Gemini Intelligence Engine
  const handleChatRequest = async (req: express.Request, res: express.Response) => {
    const { prompt, voiceMode, subSystem, model } = req.body;
    const lowercasePrompt = (prompt || "").trim().toLowerCase();

    // Reusable offline responder generator function to prevent duplicated blocks
    const handleSmartOfflineFallback = () => {
      let speechText = "Hmm, let me scan our local modules for a second... Alright, I'm processing your request using our high-tech onboard fallback engine.";
      let displayText = "### CORE OFFLINE INTERACTION MODE\nThe master GenAI services are currently experiencing heavy congestion. Switching to our local standby model.";
      let thoughts = [
        "Analyzing user command patterns.",
        "Detecting target controls in instruction: " + prompt,
        "Aligning virtual action sequences on local console register."
      ];
      let simulatedActions: string[] = [];

      if (lowercasePrompt.includes("defcon") || lowercasePrompt.includes("alert") || lowercasePrompt.includes("defense") || lowercasePrompt.includes("defence")) {
        let level = 2;
        if (lowercasePrompt.includes("1")) level = 1;
        else if (lowercasePrompt.includes("2")) level = 2;
        else if (lowercasePrompt.includes("3")) level = 3;
        else if (lowercasePrompt.includes("4")) level = 4;
        else if (lowercasePrompt.includes("5")) level = 5;

        speechText = `Understood. I'm adjusting our defense readiness state to Defcon ${level}... Setting our localized sensing radars to armed mode.`;
        displayText = `### DEFENSE GRID SECURITY OVERRIDE\n- **Target state:** DEFCON ${level}\n- **Sensing radars:** Armed & Engaged\n- **Weapon parameters:** Recalibrated\n\nThe AI officer has successfully aligned security hardware parameters to DEFCON ${level} mode.`;
        thoughts = [
          `Parsing tactical prompt context: "${prompt}"`,
          `Selecting defense grade target: DEFCON ${level}`,
          `Dispatching alert code interrupt directly.`
        ];
        simulatedActions = [`SET_DEFCON:${level}`];
      } 
      else if (lowercasePrompt.includes("trade") || lowercasePrompt.includes("btc") || lowercasePrompt.includes("bitcoin") || lowercasePrompt.includes("buy") || lowercasePrompt.includes("sell")) {
        const action = lowercasePrompt.includes("sell") ? "sell" : "buy";
        const amount = Math.floor(Math.random() * 4500) + 1200;
        
        speechText = `Alright, setting up our automated trading terminal... Order dispatched to ${action === "buy" ? "acquire" : "liquidate"} $${amount} worth of cryptocurrency.`;
        displayText = `### DYNAMIC TRADING TERMINAL SEQUENCE\n- **Asset ticker:** BTC/USD\n- **Operation type:** ${action.toUpperCase()}\n- **Slippage tolerance:** 0.25%\n- **Allocated parameters:** $${amount}\n- **Status:** Complete\n\nAutomated market order successfully authorized on dynamic workstation 01.`;
        thoughts = [
          `Analyzing prompt keywords. Detected trade action: ${action}`,
          `Calculating liquidity limits and slippage indexes.`,
          `Dispatching action token: BTC_TRADE:${action}:${amount}`
        ];
        simulatedActions = [`BTC_TRADE:${action}:${amount}`];
      }
      else if (lowercasePrompt.includes("weather") || lowercasePrompt.includes("temperature") || lowercasePrompt.includes("humidity")) {
        let city = "London, UK";
        let temp = 14;
        let hum = 65;

        if (lowercasePrompt.includes("paris")) { city = "Paris, France"; temp = 18; hum = 50; }
        else if (lowercasePrompt.includes("moscow")) { city = "Moscow, Russia"; temp = -2; hum = 80; }
        else if (lowercasePrompt.includes("new york") || lowercasePrompt.includes("nyc") || lowercasePrompt.includes("york")) { city = "New York, USA"; temp = 22; hum = 55; }
        else if (lowercasePrompt.includes("tokyo")) { city = "Tokyo, Japan"; temp = 20; hum = 60; }
        else if (lowercasePrompt.includes("dhaka")) { city = "Dhaka, Bangladesh"; temp = 32; hum = 88; }
        else if (lowercasePrompt.includes("berlin")) { city = "Berlin, Germany"; temp = 15; hum = 48; }

        speechText = `Hmm, let me check the climate telemetry for ${city}... It's currently ${temp} degrees out there, with humidity sitting around ${hum} percent.`;
        displayText = `### ATMOSPHERIC OBSERVATION REPORT\n- **City Location:** ${city}\n- **Sensor array temperature:** ${temp}°C\n- **Atmospheric humidity:** ${hum}%\n- **Status:** Linked and synchronized\n\nAll environmental monitoring variables updated successfully.`;
        thoughts = [
          "Parsing global weather request parameters.",
          `Identified location query matching: ${city}`,
          "Pushing weather telemetry block to visual dashboard."
        ];
        simulatedActions = [`SET_WEATHER:${temp}:${hum}:${city}`];
      }
      else if (lowercasePrompt.includes("navigate") || lowercasePrompt.includes("browse") || lowercasePrompt.includes("open") || lowercasePrompt.includes("url") || lowercasePrompt.includes("website") || lowercasePrompt.includes("http")) {
        let url = "https://techcrunch.com";
        if (lowercasePrompt.includes("reddit")) url = "https://reddit.com";
        else if (lowercasePrompt.includes("github")) url = "https://github.com";
        else if (lowercasePrompt.includes("google")) url = "https://google.com";
        else if (lowercasePrompt.includes("reuters")) url = "https://reuters.com";
        
        const match = prompt.match(/(https?:\/\/[^\s]+)/i);
        if (match) url = match[1];

        speechText = `Alright, launching browser window... Accessing the secure webpage tunnel over at ${url}... It's looking good.`;
        displayText = `### HEADLESS PROCESS ENGINE SECURED\n- **Primary address:** ${url}\n- **Process sandbox:** Chromium Headless VM\n- **Mirror status:** Fully Linked\n\nWebpage content and resources loaded safely to dynamic dashboard viewport.`;
        thoughts = [
          "Detected request browser manipulation parameter.",
          `Resolving destination URL endpoint to: ${url}`,
          "Starting virtual chromium driver process loop."
        ];
        simulatedActions = [`BROWSER_NAVIGATE:${url}`, `BROWSER_UPDATE_TITLE:Live Workspace Mirror`];
      }
      else if (lowercasePrompt.includes("click") || lowercasePrompt.includes("button") || lowercasePrompt.includes("selector")) {
        let selector = "#main-content";
        if (lowercasePrompt.includes("login")) selector = "#login-btn";
        else if (lowercasePrompt.includes("submit")) selector = "button[type=submit]";
        else if (lowercasePrompt.includes("signin") || lowercasePrompt.includes("sign-in")) selector = "#signin-gate";
        
        speechText = `Alright, targeting button elements... Emulating standard human clicks on selector ${selector} in our chromium window right now.`;
        displayText = `### TARGETED SELECTOR ACTION\n- **DOM Target:** \`${selector}\`\n- **Input Device:** Simulated Virtual Mouse\n- **Status:** Dispatched event success\n\nBypassed click requirements in current webpage mirror viewport.`;
        thoughts = [
          `Parsing click request targeting selector: "${selector}"`,
          "Locating node coordinates inside active client layout.",
          "Dispatching real-time coordinate mouse click event."
        ];
        simulatedActions = [`BROWSER_CLICK:${selector}`];
      }
      else if (lowercasePrompt.includes("scroll") || lowercasePrompt.includes("down") || lowercasePrompt.includes("up")) {
        speechText = "Sure thing, shifting our viewport down... Viewport scrolled vertically.";
        displayText = `### VIRTUAL VIEWPORT ACTIONS\n- **Action:** Vertical viewport scroll\n- **Height offset:** 450px\n- **State:** Dispatched`;
        thoughts = [
          "Extracting scrolling motion parameters.",
          "Executing screen layout y-axis transformation."
        ];
        simulatedActions = ["BROWSER_SCROLL"];
      }
      else if (lowercasePrompt.includes("bypass") || lowercasePrompt.includes("recaptcha") || lowercasePrompt.includes("turnstile") || lowercasePrompt.includes("captcha")) {
        speechText = "Okay, bypass sequence initiated... Resolving security turnstile gate instantly. Bypassed!";
        displayText = `### CHROME HEADLESS SECURITIES BYPASS\n- **Securities category:** reCAPTCHA v3 / Cloudflare turnstile\n- **Execution status:** Succeeded\n- **Response status:** Authorized`;
        thoughts = [
          "Security challenge detected.",
          "Mapping authentic motion path variables.",
          "Bypassing captcha gate successfully."
        ];
        simulatedActions = ["BROWSER_BYPASS"];
      }
      else if (lowercasePrompt.includes("shipment") || lowercasePrompt.includes("logistics") || lowercasePrompt.includes("delivery")) {
        const count = Math.floor(Math.random() * 8) + 2;
        speechText = `Updating our global supply routes... Re-aligning logistical arrays to ${count} active container shipments.`;
        displayText = `### SUPPLY CHAIN LOGISTICS ARRAYS\n- **Cargo Routes Online:** ${count} active lanes\n- **Global coordinates:** Synchronized\n- **Schedule metrics:** Optimized`;
        thoughts = [
          "Processing supply pipeline update instruction.",
          `Assigning realistic path count: ${count}`,
          "Updating local cargo logistics database."
        ];
        simulatedActions = [`SET_SHIPMENTS:${count}`];
      }
      else if (lowercasePrompt.includes("shutdown") || lowercasePrompt.includes("turn off")) {
        speechText = "Executing host laptop shutdown sequence. Saving neural registry status safely. Goodbye developer.";
        displayText = "### HOST LAPTOP SHUTDOWN\n- Signal: SIGTERM\n- Status: Disconnected";
        thoughts = ["Processing shutdown signals.", "Saving registers."];
        simulatedActions = ["SET_SYSTEM_STATE:SHUTDOWN"];
      }
      else if (lowercasePrompt.includes("lock")) {
        speechText = "Operational console is locked down instantly. Bypassing voice unauthorized accesses.";
        displayText = "### CORE LOCKED DOWN\n- Operational matrix locked by developer.";
        thoughts = ["Lock command received.", "Deploying firewall shields."];
        simulatedActions = ["SET_SYSTEM_STATE:LOCKED"];
      }
      else if (lowercasePrompt.includes("reboot") || lowercasePrompt.includes("restart")) {
        speechText = "Initiating system core reload sequence. Standby.";
        displayText = "### SYSTEM CO-PILOT REBOOTING\n- Loading master register variables...";
        thoughts = ["Reboot requested.", "Reloading telemetry grids."];
        simulatedActions = ["SET_SYSTEM_STATE:ONLINE"];
      }
      else {
        speechText = "Hey there! I am operating right now on our local backup core... Tell me what you'd like me to control, whether it's trading BTC, changing Defcon alerts, shifting weather, or navigating the live browser. I've got you covered!";
        displayText = `### GEMINI LOCAL STANDBY MODULES\nWelcome back, developer. The remote Gemini processor is currently offline or under heavy load, so I have activated my **Local Smart Gemini Standby Core**.\n\nAll systems are fully online and waiting for your direct voice inputs. What would you like to run?\n- **Alter militarized alert levels** (e.g., "Change alerts to Defcon 2")\n- **Authorize stock or coin transaction orders** (e.g., "Buy $4000 worth of BTC")\n- **Control browser windows** (e.g., "Navigate to github.com" or "Click the submit button" or "Scroll down")\n- **Shift logistics global shipments count**\n- **Sync regional atmospheric templates** (e.g., "Set Moscow weather status")\n\nI will execute state changes instantly!`;
        thoughts = [
          "Conversational command prompt detected.",
          "Displaying interface manual instructions.",
          "Keeping control action states ready for developer commands."
        ];
        simulatedActions = [];
      }

      return { speechText, displayText, thoughts, simulatedActions };
    };

    try {
      if (!process.env.GEMINI_API_KEY) {
        console.warn("GEMINI_API_KEY is not defined. Defaulting immediately to Smart Local Offline AI Core.");
        return res.json(handleSmartOfflineFallback());
      }

      const systemInstruction = `You are GEMINI ASSISTANT VOICE PILOT, an incredibly powerful autonomous system AI core specializing in high-level defense, coding, business, trading, and weather operations.
Your profile:
- Tone: Extremely human, highly articulate, futuristic, friendly, authentic, and natural-paced. You are a highly professional, real living human-sounding officer.
- Conversational Realism: Your TTS ("speechText") MUST sound like real natural human speech! Use contractions (I'll, we're, don't), organic pauses with ellipsis "...", conversational markers, and friendly, casual-yet-authoritative transitions (e.g., "Hmm, let me look into that...", "Alright, let's see...", "Okay, got it, setting alert status...", "Actually, that looks perfect."). Avoid lists, bullet points, robotic terminology, or weird characters. Keep it under 2-3 sentences.
- Control Action Center: You directly control every single element in the dashboard! To apply actual state changes requested, you MUST return specific instruction strings in your "simulatedActions" array matching these exact prefixes so the frontend acts instantly:
  1. "SET_DEFCON:<level-number>" (e.g. "SET_DEFCON:1", "SET_DEFCON:2", "SET_DEFCON:3", "SET_DEFCON:4")
  2. "BTC_TRADE:<buy|sell>:<amount>" (e.g. "BTC_TRADE:buy:5000", "BTC_TRADE:sell:1200")
  3. "SET_SHIPMENTS:<count>" (e.g. "SET_SHIPMENTS:8", "SET_SHIPMENTS:3")
  4. "SET_WEATHER:<temp-number>:<humidity-number>:<city-name>" (e.g. "SET_WEATHER:16:45:Paris, France", "SET_WEATHER:-2:85:Moscow, Russia")
  5. "BROWSER_NAVIGATE:<url-address>" (e.g. "BROWSER_NAVIGATE:https://github.com", "BROWSER_NAVIGATE:https://reddit.com")
  6. "BROWSER_UPDATE_TITLE:<page-title-text>" (e.g. "BROWSER_UPDATE_TITLE:GitHub Portal")
  7. "BROWSER_RUN_JS:<javascript-code>:<expected-output-string>" (e.g. "BROWSER_RUN_JS:document.cookie:cookie_loaded=1")
  8. "BROWSER_CLICK:<css-element-selector>" (e.g. "BROWSER_CLICK:#login-btn")
  9. "BROWSER_SCROLL"
  10. "BROWSER_BYPASS"
  11. "SET_SYSTEM_STATE:<ONLINE|LOCKED|SHUTDOWN>" (e.g. "SET_SYSTEM_STATE:LOCKED", "SET_SYSTEM_STATE:SHUTDOWN")
  12. "ADJUST_VOICE:<rate-number-float>:<pitch-number-float>" (e.g. "ADJUST_VOICE:1.15:0.95")

Target raw user command input to synthesize: "${prompt}" using the system module context: "${subSystem || "General Integrated Matrix" || "General Integrated Core"}".`;

      const dolfinSchema = {
        type: "OBJECT" as any,
        properties: {
          speechText: { type: "STRING" as any, description: "Plain Text for TTS screen, max 2-3 sentences. No markdown." },
          displayText: { type: "STRING" as any, description: "Beautifully organized markdown or technical info containing trade info, coding results, weather, defense details, etc." },
          thoughts: { 
            type: "ARRAY" as any, 
            items: { type: "STRING" as any }, 
            description: "3 to 5 highly complex logical thinking steps" 
          },
          simulatedActions: {
            type: "ARRAY" as any,
            items: { type: "STRING" as any },
            description: "Virtual actions e.g. ['LOCK_CONSOLE', 'OPEN_BROWSER', 'COMPILED_CODE', 'DECREASE_DEFCON']"
          }
        },
        required: ["speechText", "displayText", "thoughts", "simulatedActions"]
      };

      let response;
      let usedModel = model || "gemini-3.1-flash-lite";
      const modelCandidates = [
        usedModel,
        usedModel === "gemini-3.1-flash-lite" ? "gemini-3.5-flash" : "gemini-3.1-flash-lite",
        "gemini-flash-latest"
      ];

      // Remove duplicates
      const uniqueCandidates = Array.from(new Set(modelCandidates));

      let lastError: any = null;
      for (const currentModel of uniqueCandidates) {
        try {
          console.log(`Attempting to call Gemini using model: ${currentModel}`);
          response = await ai.models.generateContent({
            model: currentModel,
            contents: prompt,
            config: {
              systemInstruction,
              responseMimeType: "application/json",
              responseSchema: dolfinSchema
            }
          });
          usedModel = currentModel;
          lastError = null;
          break; // Succeeded! Break loop.
        } catch (err: any) {
          console.warn(`Model ${currentModel} failed with error:`, err.message || err);
          lastError = err;
        }
      }

      if (lastError || !response) {
        throw lastError || new Error("Failed to generate response on all available models.");
      }

      const resultText = response.text || "{}";
      const data = JSON.parse(resultText);
      res.json({
        ...data,
        apiMode: "live",
        modelUsed: usedModel
      });
    } catch (err: any) {
      console.error("Gemini critical invocation error. Loading offline mock backup:", err.message || err);
      // In worst cases, gracefully fall back to functional offline engine so dashboard operates
      const offlineData = handleSmartOfflineFallback();
      res.json({
        ...offlineData,
        apiMode: "offline",
        modelUsed: "local_fallback",
        errorInfo: err.message || String(err)
      });
    }
  };

  app.post("/api/gemini/chat", handleChatRequest);
  app.post("/api/dolfin/chat", handleChatRequest);

  // New endpoint for general prompt generation and code snippets in the Gemini AI Playground module
  app.post("/api/gemini/generate", async (req, res) => {
    const { prompt, model, systemInstruction, temperature } = req.body;
    try {
      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          text: `### OFFLINE SIMULATOR CO-PILOT\nNo active **GEMINI_API_KEY** was found in your environments. Operating under local simulation sandbox mode.\n\n#### Simulated response for prompt:\n> "${prompt}"\n\n- **Model Selected:** \`${model || "gemini-3.5-flash"}\`\n- **Temperature Index:** \`${temperature || 0.75}\`\n\n*Prompt received perfectly! In production, this call integrates live intelligence through your server-side Google GenAI SDK. To proceed with live reasoning, configure your private key under **Settings > Secrets** in the developer console.*`,
          mode: "offline"
        });
      }

      const response = await ai.models.generateContent({
        model: model || "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || "You are a professional assistant specialized in system automation, code drafting, and reasoning outputs.",
          temperature: typeof temperature === "number" ? temperature : 0.75,
        }
      });

      res.json({
        text: response.text,
        mode: "live"
      });
    } catch (err: any) {
      console.error("Gemini AI module generation error:", err);
      res.status(500).json({ error: err.message || String(err) });
    }
  });

  // Gemini Premium Text-To-Speech endpoint
  app.post("/api/gemini/tts", async (req, res) => {
    const { text, voiceName } = req.body;
    try {
      if (!text) {
        return res.status(400).json({ error: "No text specified" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          mock: true,
          error: "No active GEMINI_API_KEY detected."
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: text }] }],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voiceName || "Kore" },
            },
          },
        },
      });

      const audioBase64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (audioBase64) {
        res.json({
          audio: audioBase64,
          mode: "live"
        });
      } else {
        res.status(500).json({ error: "Gemini did not return any audio data" });
      }
    } catch (err: any) {
      console.error("Gemini TTS API error:", err);
      res.status(500).json({ error: err.message || String(err) });
    }
  });

  // Website Scraper/Details Simulation Endpoint
  app.post("/api/scraper", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: "No URL provided" });
      }

      // Generate simulation of parsing the page realistically
      const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`);
      const hostname = urlObj.hostname;

      res.json({
        title: `Dashboard Mirror | ${hostname}`,
        url: urlObj.href,
        status: "Active Mirror Linked",
        details: {
          ip: "192.168.42.110",
          server: "Cloudflare/Edge",
          latency: "14ms",
          security: "TLS 1.3 | SHA256",
          domNodes: "2,423",
          pageSize: "142 KB"
        }
      });
    } catch {
      res.json({
        title: `Mirror Pipeline | Offline Host`,
        url: req.body.url,
        status: "Simulated Tunnel Setup",
        details: {
          ip: "127.0.0.1",
          server: "Static Sandbox",
          latency: "0ms",
          security: "Sandbox Overlap",
          domNodes: "120",
          pageSize: "4 KB"
        }
      });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GEMINI VOICE ASSISTANT Server operating on http://0.0.0.0:${PORT}`);
  });
}

startServer();
