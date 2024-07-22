import { useLoading } from "@/store/ui/useLoading"
import useToast from "@/store/ui/useToast"
import useCartStore from "@/store/user/cartStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const useNoProductsRedirect = () => {
  const router = useRouter()
  const cartStore = useCartStore()
  const toast = useToast()
  const { hasCartStoreInitialized } = useLoading()

  useEffect(() => {
    if (!hasCartStoreInitialized) return

    if (!cartStore.products || Object.values(cartStore.products).length === 0) {
      toast.show(
        "error",
        "You should not use protected routes!",
        <p>
          Please add some products to cart and
          <br /> buy products through payment
        </p>,
        12000,
      )
      router.replace("/")
    }
    router.prefetch("/")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasCartStoreInitialized])
}
