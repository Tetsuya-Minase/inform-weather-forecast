# inform-weather-forecast
inform discord about weather forecast

GitHub Actions の定期実行（毎日 07:30 JST に今日、21:30 JST に明日の天気）で Yahoo 天気を取得し、Discord に通知する。
定期実行の開始は数分〜数十分遅れることがある。

## 設定（Repository secrets）
- `DISCORD_URL`（必須）: 通知先の Discord webhook URL
- `DISCORD_MENTION`（任意）: 通知に付けるメンション（例: `<@&123>`）。未設定ならメンションなし

## 実行
```
npm ci
npm run build
DISCORD_URL=... DISCORD_MENTION=... node dist/main.js today   # または tomorrow
```
手動実行は Actions の `inform-weather` を `workflow_dispatch` で `target` を選んで実行する。

## 失敗時
実行が失敗するとワークフローが `DISCORD_MENTION` 付きで失敗通知を `DISCORD_URL` に送る。
