export type SystemStatus = "ONLINE" | "OFFLINE" | "REBOOTING" | "SHUTDOWN" | "LOCKED";

export interface SubsystemData {
  btcPrice: number;
  btcChange: number;
  shipments: number;
  defcon: number;
  weatherTemp: number;
  weatherHumidity: number;
  weatherCity: string;
}

export interface VoiceProfile {
  id: string;
  name: string;
  lang: string;
  gender: "male" | "female" | "robot";
  pitch: number;
  rate: number;
}

export interface BrowserMirror {
  url: string;
  title: string;
  active: boolean;
  status: string;
  ip: string;
  server: string;
  latency: string;
  domNodes: string;
  pageSize: string;
}

export interface TerminalLog {
  id: string;
  timestamp: string;
  text: string;
  type: "info" | "success" | "warning" | "error" | "input" | "gemini";
}
