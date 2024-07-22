import { Dispatch, SetStateAction } from "react"

import { logFn } from "@/utils/logFn"

export async function fetchProductsDataFromDBFn(
  hasCartStoreInitialized: boolean,
  currentStep: number,
  setCurrentStep: Dispatch<SetStateAction<number>>,
  fetchProductsData: () => Promise<void>,
) {
  logFn("!hasCartStoreInitialized - return")
  if (!hasCartStoreInitialized) return
  if (currentStep === 3) {
    try {
      await fetchProductsData()
    } catch (error) {
      if (error instanceof Error) {
        logFn("error fetchProductsData - ", error.message)
      }
    }
  }

  logFn("products data fetched - set step 4")
  setCurrentStep(4)
}
