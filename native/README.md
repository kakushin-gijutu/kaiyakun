# 解約くん Native App

Expo + Tailwind + TypeScript + microCMS で構築されたサブスクサービス解約アプリのネイティブ版です。

## 技術スタック

- Expo (React Native / TypeScript)
- Expo Router
- NativeWind (Tailwind CSS for React Native)
- microCMS
- react-native-webview
- EAS Build & Update

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
# または
yarn install
```

### 2. 環境変数の設定

以下の3つの環境変数ファイルを作成してください：

#### `.env.development`
```env
EXPO_PUBLIC_SUPABASE_URL="https://dev.supabase.co"
EXPO_PUBLIC_SUPABASE_ANON_KEY="dev-key"
EXPO_PUBLIC_MICROCMS_SERVICE_DOMAIN="dev-service"
EXPO_PUBLIC_MICROCMS_API_KEY="dev-microcms"

APP_ENV="development"
```

#### `.env.preview`
```env
EXPO_PUBLIC_SUPABASE_URL="https://preview.supabase.co"
EXPO_PUBLIC_SUPABASE_ANON_KEY="preview-key"
EXPO_PUBLIC_MICROCMS_SERVICE_DOMAIN="preview-service"
EXPO_PUBLIC_MICROCMS_API_KEY="preview-microcms"

APP_ENV="preview"
```

#### `.env.production`
```env
EXPO_PUBLIC_SUPABASE_URL="https://prod.supabase.co"
EXPO_PUBLIC_SUPABASE_ANON_KEY="prod-key"
EXPO_PUBLIC_MICROCMS_SERVICE_DOMAIN="prod-service"
EXPO_PUBLIC_MICROCMS_API_KEY="prod-microcms"

APP_ENV="production"
```

### 3. 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
```

## スクリプト

### 開発

- `npm run dev` - Expo開発サーバーを起動
- `npm run android` - Androidエミュレータで起動
- `npm run ios` - iOSシミュレータで起動

### EAS Build

- `npm run build:dev:ios` - Development環境でiOSビルド
- `npm run build:dev:android` - Development環境でAndroidビルド
- `npm run build:preview:ios` - Preview環境でiOSビルド
- `npm run build:preview:android` - Preview環境でAndroidビルド
- `npm run build:prod:ios` - Production環境でiOSビルド
- `npm run build:prod:android` - Production環境でAndroidビルド

## プロジェクト構成

```
native/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # サービス一覧画面
│   │   └── _layout.tsx
│   ├── service/
│   │   └── [id].tsx           # サービス詳細画面
│   ├── cancel/
│   │   └── [id].tsx           # 解約WebView画面
│   └── _layout.tsx
├── components/
│   ├── CategoryTabs.tsx       # カテゴリタブコンポーネント
│   └── ServiceCard.tsx        # サービスカードコンポーネント
├── lib/
│   ├── client.ts              # microCMSクライアント
│   └── type.ts                # 型定義
├── app.config.ts              # Expo設定（環境変数対応）
├── eas.json                   # EAS Build設定
└── package.json
```

## 機能

1. **サービス一覧画面**
   - microCMSからサービス一覧を取得
   - カテゴリでフィルタリング
   - サービスカードから詳細・解約ページへ遷移

2. **サービス詳細画面**
   - サービス情報の表示
   - 解約ページへの遷移
   - 登録ページへの遷移（外部ブラウザ）

3. **解約WebView画面**
   - react-native-webviewを使用
   - 解約ページをネイティブアプリ内で表示
   - 戻るボタンとローディングインジケーター

## EAS環境設定

`eas.json`で以下の3つのプロファイルを定義しています：

- **development**: 開発用（developmentClient: true, APK形式）
- **preview**: プレビュー用（内部配布）
- **production**: 本番用（ストア配布）

各環境で対応する`.env.*`ファイルが自動的に読み込まれます。

## 注意事項

- `app.json`は使用しません。`app.config.ts`が唯一の設定ファイルです
- 環境変数は`app.config.ts`の`extra`フィールドを通じてアプリからアクセス可能です
- EAS Build時は、対応する`.env.*`ファイルが自動的に読み込まれます
