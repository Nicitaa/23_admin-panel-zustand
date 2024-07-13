import { getCookie, setCookie } from "./helpersCSR"

/**
 *
 * If anonymousId already exist - return anonymousId value from cookies
 *
 * Otherwise this function set random anonymousId in cookie like `anonymousId_4gu95e6IEKjATNJFxOAL7`
 *
 * @returns anonymousId
 */
export function setAnonymousId(): string {
  const anonymousId = getCookie("anonymousId")
  // Check that anonymousId doesn't exist - if so set new anonymousId
  if (!anonymousId) {
    const newAnonymousId = `anonymousId_${crypto.randomUUID()}`
    setCookie("anonymousId", newAnonymousId)
    return newAnonymousId
    // If anonymousId already exist - return it
  } else return anonymousId
}
