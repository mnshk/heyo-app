/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly DB_URI: string
	readonly VITE_API_URL: string
	readonly VITE_DASHBOARD_KEY: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
