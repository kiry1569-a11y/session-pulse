# session-pulse

[Русский](#русский) · [English](#english)

```
│ Кон-т ██░░░ 32% │ т-ны 64к из 200к │ мод. claude-opus-5-5 │ ли-т 5 ч 12% │ ли-т 7 дн 40% │ ст-ть $1.84 │
│ Ctx ██░░░ 32% │ tok 64k of 200k │ model claude-opus-5-5 │ limit 5h 12% │ limit 7d 40% │ cost $1.84 │
```

---

## Русский

Мод для Claude Code: строка над полем ввода с состоянием сессии. Работает и в терминале, и во вкладке Code десктоп-приложения Claude.

| Ячейка | Что показывает |
| --- | --- |
| **Кон-т** | Заполнение окна контекста: шкала и процент. Зелёная до 60%, жёлтая до 85%, дальше красная |
| **т-ны** | Сколько токенов занято из размера окна |
| **мод.** | Текущая модель |
| **ли-т 5 ч / 7 дн** | Израсходованная доля лимитов подписки (только на подписке, после первого ответа) |
| **ст-ть** | Стоимость сессии в долларах |

Строка обновляется при старте сессии и после каждого ответа Claude.

### Установка

В терминале, в сессии Claude Code:

```
/plugin install session-pulse --marketplace kiry1569-a11y/session-pulse
```

Или из командной строки:

```bash
claude plugin install session-pulse --marketplace kiry1569-a11y/session-pulse
```

В десктоп-приложении (там `/plugin` не работает): нажмите **+** рядом с полем ввода → **Plugins** → **Add marketplace**, введите `kiry1569-a11y/session-pulse`, затем **Add plugin**.

### Язык

Подписи по умолчанию на русском. Чтобы переключить на английский, задайте опцию `language` = `en` в настройках плагина (экран настроек при установке или меню конфигурации).

---

## English

A Claude Code mod: one line above the prompt with your session vitals. Works in the terminal and in the Code tab of the Claude desktop app.

| Cell | Shows |
| --- | --- |
| **Ctx** | Context window fill: bar and percent. Green below 60%, yellow below 85%, red above |
| **tok** | Tokens used out of the window size |
| **model** | Current model |
| **limit 5h / 7d** | Used share of subscription rate limits (subscriptions only, after the first reply) |
| **cost** | Session cost in USD |

The line refreshes at session start and after every Claude reply.

### Install

At the prompt of a Claude Code terminal session:

```
/plugin install session-pulse --marketplace kiry1569-a11y/session-pulse
```

Or from a shell:

```bash
claude plugin install session-pulse --marketplace kiry1569-a11y/session-pulse
```

In the desktop app (where `/plugin` does not run): click **+** next to the prompt box → **Plugins** → **Add marketplace** with `kiry1569-a11y/session-pulse`, then **Add plugin**.

### Language

Labels are Russian by default. Set the plugin option `language` to `en` for English (on the options screen at install, or in the config menu).
