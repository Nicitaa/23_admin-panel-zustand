"use client"

import { Suspense, lazy } from "react"
import { AnimatePresence } from "framer-motion"
import useToast from "@/store/ui/useToast"

const LazyToast = lazy(() => import("@/components/ui/Toast"))

export default function ToastProvider() {
  const toast = useToast()
  // Don't use async here to avoid error "async/await allowed in Server components only"
  return (
    <AnimatePresence>
      {toast.isOpen && (
        // Suspence required to handle fallback state
        <Suspense fallback={null}>
          <LazyToast />
        </Suspense>
      )}
    </AnimatePresence>
  )
}
