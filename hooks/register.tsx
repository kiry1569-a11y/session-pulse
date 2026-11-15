import { atom, read, update } from 'claude-code'
import type { EngineInterface as Engine, Register } from 'claude-code'

import type { Pulse } from '../types'

const pulse = atom({ plugin: 'session-pulse', key: 'pulse' } as const, null)

const LABELS = {
  ru: {
    context: 'Кон-т', tokens: 'т-ны', of: 'из', thousand: 'к', model: 'мод.', cost: 'ст-ть',
    limits: { five_hour: 'ли-т 5 ч', seven_day: 'ли-т 7 дн', spend_limit: 'ли-т расходов' } as Record<string, string>,
  },
  en: {
    context: 'Ctx', tokens: 'tok', of: 'of', thousand: 'k', model: 'model', cost: 'cost',
    limits: { five_hour: 'limit 5h', seven_day: 'limit 7d', spend_limit: 'spend limit' } as Record<string, string>,
  },
}

const bar = (p: number) => '█'.repeat(Math.round(p / 20)).padEnd(5, '░')

async function refresh($: Engine) {
  const [u, model] = await Promise.all([$.session.usage(), $.session.model()])
  const value: Pulse = {
    model,
    percent: u.context.percent ?? null,
    tokens: u.context.tokens ?? null,
    window: u.context.window,
    limits: u.rateLimits.map(r => ({ kind: r.kind, percentUsed: r.percentUsed })),
    usd: u.cost?.usd ?? null,
  }
  await update($, pulse, () => value)
}

export const register: Register = (on, options) => {
  const t = options.language === 'en' ? LABELS.en : LABELS.ru
  const k = (n: number) => (n >= 1000 ? `${Math.round(n / 1000)}${t.thousand}` : `${n}`)

  on('session.start', async ($, e, next) => {
    const result = await next(e)
    await refresh($)
    return result
  })

  on('turn.complete', async ($, e, next) => {
    const result = await next(e)
    await refresh($)
    return result
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const p = await read($, pulse)
    if (p === null || e.props.hasSurvey) return next(e)

    const { Box, Text } = $.ui.resolve(e)
    const pct = p.percent ?? 0
    const color = pct >= 85 ? 'red' : pct >= 60 ? 'yellow' : 'green'
    const cells: [string, string][] = [
      ...(p.tokens === null ? [] : [[t.tokens, `${k(p.tokens)} ${t.of} ${k(p.window)}`] as [string, string]]),
      [t.model, p.model],
      ...p.limits.map(l => [t.limits[l.kind] ?? l.kind, `${l.percentUsed}%`] as [string, string]),
      ...(p.usd === null ? [] : [[t.cost, `$${p.usd.toFixed(2)}`] as [string, string]]),
    ]

    return (
      <Box flexDirection="row" flexWrap="wrap">
        <Text dimColor>│ </Text>
        <Text color={color}>{t.context} {bar(pct)} {pct}%</Text>
        {cells.map(([label, value]) => (
          <Box key={label}>
            <Text dimColor> │ {label} </Text>
            <Text>{value}</Text>
          </Box>
        ))}
        <Text dimColor> │</Text>
      </Box>
    )
  })
}
