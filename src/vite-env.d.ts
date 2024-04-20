/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly DB_URI: string
	readonly VITE_ACCESS_TOKEN: string
	readonly VITE_LOG_API: string
	readonly VITE_DASHBOARD_KEY: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
