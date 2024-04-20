/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly DB_URI: string
	readonly VITE_API_URL: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
