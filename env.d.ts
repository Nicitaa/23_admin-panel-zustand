/* for import.meta.env */

/// <reference types="vite/client" />

interface ImportMetaEnv {

  REACT_PRODUCTION_URL:string

  VITE_SUPABASE_URL:string
  VITE_SUPABASE_ANON_KEY:string

  VITE_STRIPE_PUBLIC:string
  REACT_STRIPE_SECRET:string

  REACT_RESEND_PUBLIC:string

  REACT_PAYPAL_PUBLIC:string
  REACT_PAYPAL_SECRET:string

  REACT_METAMASK_ADRESS:string

  REACT_COINMARKETCAP_SECRET:string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}



/* for metamask detecting */

/// <reference types="vite/client" />

interface Window {
  ethereum: any;
}