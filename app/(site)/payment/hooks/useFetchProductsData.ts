import { Dispatch, SetStateAction, useEffect } from "react"

import { useLoading } from "@/store/ui/useLoading"
import useCartStore from "@/store/user/cartStore"
import { fetchProductsDataFromDBFn } from "../functions/fetchProductsDataFn"

export const useFetchProductsData = (currentStep: number, setCurrentStep: Dispatch<SetStateAction<number>>) => {
  const { hasCartStoreInitialized } = useLoading()
  const cartStore = useCartStore()

  useEffect(() => {
    if (!hasCartStoreInitialized) return
    // to avoid issue where products is {} because cartStore is not initialized
    fetchProductsDataFromDBFn(hasCartStoreInitialized, currentStep, setCurrentStep, cartStore.fetchProductsData)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasCartStoreInitialized])
}
