export type Pulse = {
  model: string
  percent: number | null
  tokens: number | null
  window: number
  limits: { kind: string; percentUsed: number }[]
  usd: number | null
}

declare module 'claude-code' {
  interface PluginState {
    'session-pulse': { pulse: Pulse | null }
  }
}
