interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_GOOGLE_CLIENT_SECRET: string
  readonly VITE_REDIRECT_IP: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
