// Bengali Transliteration Map
export const bengaliMap = {
  "ঁ": "",
  "ং": "ng",
  "ঃ": "",
  অ: "o",
  আ: "a",
  ই: "i",
  ঈ: "i",
  উ: "u",
  ঊ: "u",
  ঋ: "ri",
  এ: "e",
  ঐ: "oi",
  ও: "o",
  ঔ: "ou",
  ক: "k",
  খ: "kh",
  গ: "g",
  ঘ: "gh",
  ঙ: "ng",
  চ: "ch",
  ছ: "chh",
  জ: "j",
  ঝ: "jh",
  ঞ: "n",
  ট: "t",
  ঠ: "th",
  ড: "d",
  ঢ: "dh",
  ণ: "n",
  ত: "t",
  থ: "th",
  দ: "d",
  ধ: "dh",
  ন: "n",
  প: "p",
  ফ: "ph",
  ব: "b",
  ভ: "bh",
  ম: "m",
  য: "j",
  র: "r",
  ল: "l",
  শ: "sh",
  ষ: "sh",
  স: "s",
  হ: "h",
  "়": "",
  ঽ: "",
  "্": "",
  "া": "a",
  "ি": "i",
  "ী": "i",
  "ু": "u",
  "ূ": "u",
  "ৃ": "ri",
  "ে": "e",
  "ৈ": "oi",
  "ো": "o",
  "ৌ": "ou",
  "্য": "y",
  "্র": "r",
  ৎ: "t",
  "ৗ": "",
  ড়: "r",
  ঢ়: "r",
  য়: "y",
  ৠ: "rri",
  ৡ: "lli",
  "ৢ": "l",
  "ৣ": "l",
  "০": "0",
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9",
}

// Arabic Transliteration Map
export const arabicMap = {
  ا: "a",
  أ: "a",
  إ: "i",
  آ: "aa",
  ء: "",
  ؤ: "w",
  ئ: "y",
  ب: "b",
  ت: "t",
  ث: "th",
  ج: "j",
  ح: "h",
  خ: "kh",
  د: "d",
  ذ: "dh",
  ر: "r",
  ز: "z",
  س: "s",
  ش: "sh",
  ص: "s",
  ض: "d",
  ط: "t",
  ظ: "z",
  ع: "a",
  غ: "gh",
  ف: "f",
  ق: "q",
  ك: "k",
  ل: "l",
  م: "m",
  ن: "n",
  ه: "h",
  و: "w",
  ي: "y",
  ى: "a",
  ة: "h",
  "َ": "a",
  "ُ": "u",
  "ِ": "i",
  "ً": "an",
  "ٌ": "un",
  "ٍ": "in",
  "ْ": "",
  "ّ": "",
  "ٰ": "a",
}

// Bengali Pattern Map
const bengaliPatternMap = [
  { pattern: /সংকলিত/g, replace: "songkolito" },
  { pattern: /গ্রন্থসমূহের/g, replace: "gronthosomooher" },
  { pattern: /গ্রন্থ/g, replace: "gronth" },
  { pattern: /সমূহ/g, replace: "somooher" },
  { pattern: /বিখ্যাত/g, replace: "bikhyat" },
  { pattern: /মধ্যে/g, replace: "moddhe" },
  { pattern: /বিশুদ্ধতার/g, replace: "bishuddhatar" },
  { pattern: /মাপকাঠিতে/g, replace: "mapokathite" },
  { pattern: /সহীহাইনা/g, replace: "sohihoina" },
  { pattern: /বুখারী/g, replace: "bukhari" },
  { pattern: /মুসলিম/g, replace: "muslim" },
]

// Slugify Function
function slugifyText(text) {
  if (!text) return ""

  let slug = text.toString()

  // Bengali patterns
  for (const { pattern, replace } of bengaliPatternMap) {
    slug = slug.replace(pattern, replace)
  }

  // Character-level transliteration
  let transliterated = ""
  for (let i = 0; i < slug.length; i++) {
    const char = slug[i]
    if (bengaliMap[char]) {
      transliterated += bengaliMap[char]
    } else if (arabicMap[char]) {
      transliterated += arabicMap[char]
    } else {
      transliterated += char
    }
  }

  // Clean and format the slug
  const cleanSlug = transliterated
    .toLowerCase()
    .trim()
    .replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-z0-9\s-]/g, "") // Allow Arabic Unicode ranges and alphanumerics
    .replace(/\s+/g, "-") // Spaces to hyphens
    .replace(/-+/g, "-") // Collapse multiple hyphens
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens

  // Ensure the slug is valid for Strapi (must not be empty and contain valid characters)
  if (!cleanSlug || cleanSlug.length === 0) {
    // Generate a fallback slug using timestamp
    return `slug-${Date.now()}`
  }

  // Ensure minimum length and maximum length for Strapi compatibility
  let finalSlug = cleanSlug
  if (finalSlug.length < 3) {
    finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`
  }
  if (finalSlug.length > 100) {
    finalSlug = finalSlug.substring(0, 97) + "..."
  }

  return finalSlug
}

// Enhanced event triggering for Strapi (without focus interruption)
function triggerStrapiEvents(element, value) {
  try {
    // Store the current value
    const oldValue = element.value

    // Set the value directly
    element.value = value

    // Find React internal instance for proper state management
    const reactInternalInstance = element._reactInternalFiber || 
                                  element._reactInternalInstance ||
                                  element.__reactInternalInstance

    // Try to trigger React's internal value setter
    if (reactInternalInstance) {
      const props = reactInternalInstance.memoizedProps
      if (props && props.onChange) {
        // Create synthetic event
        const syntheticEvent = {
          target: element,
          currentTarget: element,
          type: 'change',
          bubbles: true,
          cancelable: true,
          preventDefault: () => {},
          stopPropagation: () => {}
        }
        props.onChange(syntheticEvent)
      }
    }

    // Force React value tracker update
    if (element._valueTracker) {
      element._valueTracker.setValue(oldValue)
    }

    // Create and dispatch events without focus manipulation
    const inputEvent = new Event("input", { bubbles: true, cancelable: true })
    const changeEvent = new Event("change", { bubbles: true, cancelable: true })
    
    // Set input event properties
    Object.defineProperty(inputEvent, 'target', {
      writable: false,
      value: element
    })
    Object.defineProperty(changeEvent, 'target', {
      writable: false,
      value: element
    })

    // Dispatch events
    element.dispatchEvent(inputEvent)
    element.dispatchEvent(changeEvent)

    // Additional events for Strapi compatibility (without focus events)
    const additionalEvents = [
      new KeyboardEvent("keyup", { bubbles: true, cancelable: true, key: "Enter" })
    ]

    additionalEvents.forEach((event) => {
      element.dispatchEvent(event)
    })

    // Gentle validation trigger without stealing focus
    setTimeout(() => {
      // Only trigger blur/focus if the element is not currently focused
      if (document.activeElement !== element) {
        element.dispatchEvent(new Event("blur", { bubbles: true, cancelable: true }))
      }
    }, 100)

    console.log("Slug updated successfully:", value)
    
  } catch (error) {
    console.error("Error triggering Strapi events:", error)
    // Fallback: simple value assignment
    element.value = value
  }
}

// Setup slug sync with enhanced Strapi integration
function setupSlugSync() {
  const allInputs = document.querySelectorAll('input[type="text"], input:not([type])')
  let titleInput = null
  let slugInput = null

  // More comprehensive input detection
  for (const input of allInputs) {
    const name = input.getAttribute("name") || ""
    const id = input.getAttribute("id") || ""
    const placeholder = input.getAttribute("placeholder") || ""
    const ariaLabel = input.getAttribute("aria-label") || ""
    const dataAttribute = input.getAttribute("data-strapi-field") || ""
    const type = input.getAttribute("type") || ""

    const combinedText = (name + id + placeholder + ariaLabel + dataAttribute).toLowerCase()

    // Check for title/name fields (but exclude URL fields)
    if (!titleInput && (/title|name|heading|^text$/i.test(combinedText) || 
        name === "title" || name === "name" || id.includes("title")) &&
        !combinedText.includes("url") && !combinedText.includes("link")) {
      titleInput = input
      console.log("Found title input:", input.name || input.id, input)
    }
    
    // Check for slug/uid fields - be more specific to avoid URL fields
    if (!slugInput && (
        // Exact matches for slug/uid fields
        name === "slug" || name === "uid" || 
        id.includes("slug") || id.includes("uid") ||
        // Check for UID type fields specifically
        (combinedText.includes("slug") && !combinedText.includes("purchase")) ||
        (combinedText.includes("uid") && !combinedText.includes("purchase")) ||
        // Look for permalink but not purchase/pdf/other URLs
        (combinedText.includes("permalink") && !combinedText.includes("purchase") && !combinedText.includes("pdf"))
    )) {
      // Additional validation to ensure it's not a URL field
      if (!name.includes("url") && !name.includes("Url") && !name.includes("URL") &&
          !name.includes("link") && !name.includes("Link")) {
        slugInput = input
        console.log("Found slug input:", input.name || input.id, input)
      }
    }
  }

  // Alternative search using more specific selectors - prioritize UID fields
  if (!titleInput) {
    titleInput = document.querySelector('input[name="title"], input[name="name"], input[id*="title"]') ||
                 document.querySelector('input[placeholder*="title" i], input[aria-label*="title" i]')
  }
  
  if (!slugInput) {
    // First try to find exact slug/uid matches
    slugInput = document.querySelector('input[name="slug"], input[name="uid"]') ||
                document.querySelector('input[id*="slug"], input[id*="uid"]') ||
                // Then try broader searches excluding URL fields
                document.querySelector('input[name*="slug"]:not([name*="url"]):not([name*="Url"])') ||
                document.querySelector('input[name*="uid"]:not([name*="url"]):not([name*="Url"])') ||
                // Look for UID type inputs
                document.querySelector('input[type="text"][placeholder*="slug" i]') ||
                document.querySelector('input[type="text"][aria-label*="slug" i]')
  }

  if (titleInput && slugInput) {
    console.log("✅ Found title and slug inputs, setting up sync...")
    console.log("📝 Title field:", {
      name: titleInput.name || titleInput.id,
      value: titleInput.value,
      element: titleInput
    })
    console.log("🔗 Slug field:", {
      name: slugInput.name || slugInput.id,
      value: slugInput.value,
      element: slugInput
    })

    // Validate that we have the correct fields
    const titleFieldName = (titleInput.name || "").toLowerCase()
    const slugFieldName = (slugInput.name || "").toLowerCase()
    
    // Ensure we're not targeting URL fields accidentally
    if (slugFieldName.includes("url") || slugFieldName.includes("link")) {
      console.warn("⚠️ Warning: Detected URL field as slug target:", slugFieldName)
      console.log("Searching for better slug field...")
      
      // Try to find a better slug field
      const betterSlugInput = document.querySelector('input[name="slug"], input[name="uid"]') ||
                              Array.from(allInputs).find(input => {
                                const name = (input.name || "").toLowerCase()
                                return (name.includes("slug") || name.includes("uid")) && 
                                       !name.includes("url") && !name.includes("link")
                              })
      
      if (betterSlugInput) {
        slugInput = betterSlugInput
        console.log("✅ Found better slug field:", slugInput.name || slugInput.id)
      } else {
        console.log("❌ Could not find appropriate slug field, skipping setup")
        return
      }
    }

    // Store original values and state
    let isUpdating = false
    let lastGeneratedSlug = ""

    const updateSlug = () => {
      if (isUpdating) return

      const titleValue = titleInput.value.trim()
      if (!titleValue) return

      // Double-check we're still targeting the right field
      const currentSlugFieldName = (slugInput.name || "").toLowerCase()
      if (currentSlugFieldName.includes("url") || currentSlugFieldName.includes("link")) {
        console.warn("❌ Aborting: Current slug target is a URL field:", currentSlugFieldName)
        return
      }

      const newSlug = slugifyText(titleValue)
      
      // Only update if slug has changed and is valid
      if (newSlug && newSlug !== slugInput.value && newSlug !== lastGeneratedSlug) {
        isUpdating = true
        lastGeneratedSlug = newSlug

        console.log("🔄 Updating slug from:", titleValue, "to:", newSlug)
        console.log("🎯 Target field:", slugInput.name || slugInput.id)

        // Use enhanced event triggering
        triggerStrapiEvents(slugInput, newSlug)

        // Validate the slug was set correctly (without interfering with user input)
        setTimeout(() => {
          if (slugInput.value !== newSlug) {
            console.log("🔄 Retrying slug update...")
            // Only retry if the title input is not currently focused (user not typing)
            if (document.activeElement !== titleInput) {
              triggerStrapiEvents(slugInput, newSlug)
            }
          }
          
          // Final validation
          setTimeout(() => {
            if (slugInput.value !== newSlug) {
              console.warn("⚠️ Slug update failed, manual intervention may be required")
              console.log("Expected:", newSlug, "Actual:", slugInput.value)
            } else {
              console.log("✅ Slug successfully updated to:", slugInput.value)
            }
            isUpdating = false
          }, 200)
        }, 100)
      }
    }

    // Add event listeners with faster debouncing for better responsiveness
    let timeoutId
    const debouncedUpdate = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateSlug, 300) // Reduced from 500ms to 300ms for faster response
    }

    // Remove existing listeners to avoid duplicates
    titleInput.removeEventListener("input", debouncedUpdate)
    titleInput.removeEventListener("change", debouncedUpdate)
    titleInput.removeEventListener("blur", updateSlug)

    // Add new listeners - prioritize input event for real-time updates
    titleInput.addEventListener("input", debouncedUpdate)
    titleInput.addEventListener("change", updateSlug) // Immediate update on change
    titleInput.addEventListener("blur", updateSlug) // Update when leaving field
    
    // Remove the keyup event that might interfere with typing
    // titleInput.addEventListener("keyup", (e) => {
    //   if (e.key === "Enter" || e.key === "Tab") {
    //     updateSlug()
    //   }
    // })

    // Initial update if title already has value
    if (titleInput.value.trim()) {
      setTimeout(updateSlug, 1000) // Increased delay for initial update
    }

    // Setup reset button handler
    setupReloadIconHandler(titleInput, slugInput)

    // Monitor form submission and save actions
    monitorSaveActions(titleInput, slugInput, updateSlug)

    // Set up periodic validation (less aggressive)
    const validationInterval = setInterval(() => {
      if (!document.body.contains(titleInput) || !document.body.contains(slugInput)) {
        clearInterval(validationInterval)
        return
      }
      
      // Only check if slug field is empty but title has content AND user is not currently typing
      if (titleInput.value.trim() && !slugInput.value.trim() && 
          document.activeElement !== titleInput) {
        console.log("Detected empty slug with content in title, updating...")
        updateSlug()
      }
    }, 5000) // Increased from 3 seconds to 5 seconds

  } else {
    console.log("Title or slug input not found, retrying...")
    // Retry with exponential backoff
    setTimeout(setupSlugSync, Math.min(2000, 1000 * Math.pow(1.5, (window.retryCount || 0))))
    window.retryCount = (window.retryCount || 0) + 1
    if (window.retryCount > 10) {
      console.warn("Max retries reached for slug sync setup")
    }
  }

  // Debug: Log all found inputs for troubleshooting
  console.log("=== Input Field Detection Debug ===")
  allInputs.forEach((input, index) => {
    const name = input.getAttribute("name") || ""
    const id = input.getAttribute("id") || ""
    const placeholder = input.getAttribute("placeholder") || ""
    const type = input.getAttribute("type") || ""
    
    console.log(`Input ${index}:`, {
      name: name,
      id: id,
      placeholder: placeholder,
      type: type,
      element: input
    })
  })
  console.log("=== End Debug ===")
}

// Monitor save actions to ensure slug is set before saving
function monitorSaveActions(titleInput, slugInput, updateSlug) {
  // Monitor form submission
  const form = titleInput.closest("form")
  if (form) {
    form.addEventListener("submit", (e) => {
      console.log("Form submission detected, ensuring slug is updated...")
      updateSlug()
      
      // Validate slug before allowing submission
      setTimeout(() => {
        if (titleInput.value.trim() && !slugInput.value.trim()) {
          console.warn("Blocking form submission - slug is empty")
          e.preventDefault()
          updateSlug()
        }
      }, 100)
    })
  }

  // Monitor save button clicks with multiple selectors
  const saveSelectors = [
    'button[type="submit"]',
    'button[data-testid*="save"]',
    'button[aria-label*="save"]',
    'button[title*="save"]',
    'button:contains("Save")',
    'button:contains("Publish")',
    '[role="button"][aria-label*="save"]',
    '.btn-primary',
    '[data-strapi-header-button="true"]'
  ]

  const saveButtons = document.querySelectorAll(saveSelectors.join(', '))
  
  saveButtons.forEach((button) => {
    // Clone to remove existing listeners
    const newButton = button.cloneNode(true)
    if (button.parentNode) {
      button.parentNode.replaceChild(newButton, button)
    }

    newButton.addEventListener("click", (e) => {
      console.log("Save button clicked, ensuring slug is updated...")
      updateSlug()
      
      // Small delay to ensure processing
      setTimeout(() => {
        if (titleInput.value.trim() && !slugInput.value.trim()) {
          console.warn("Save blocked - generating slug first")
          e.preventDefault()
          e.stopPropagation()
          updateSlug()
          
          // Retry save after slug generation
          setTimeout(() => {
            if (slugInput.value.trim()) {
              newButton.click()
            }
          }, 500)
        } else {
          console.log("Save proceeding with slug:", slugInput.value)
        }
      }, 100)
    })
  })

  // Monitor keyboard shortcuts (Ctrl+S)
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      console.log("Save shortcut detected, ensuring slug is updated...")
      updateSlug()
    }
  })
}

// Enhanced reset icon handler
function setupReloadIconHandler(titleInput, slugInput) {
  const buttons = document.querySelectorAll('button, [role="button"]')

  for (const btn of buttons) {
    const label = (btn.getAttribute("aria-label") || "").toLowerCase()
    const title = (btn.title || "").toLowerCase()
    const textContent = (btn.textContent || "").toLowerCase()

    if (
      label.includes("reset") ||
      title.includes("reset") ||
      label.includes("regenerate") ||
      title.includes("regenerate") ||
      textContent.includes("reset") ||
      btn.querySelector('svg[data-testid*="reset"]')
    ) {
      // Clone button to remove existing listeners
      const newButton = btn.cloneNode(true)
      if (btn.parentNode) {
        btn.parentNode.replaceChild(newButton, btn)
      }

      newButton.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()

        const titleValue = titleInput.value.trim()
        if (titleValue) {
          const newSlug = slugifyText(titleValue)
          console.log("Reset button clicked, generating slug:", newSlug)

          triggerStrapiEvents(slugInput, newSlug)

          // Ensure the field is visible (without forcing focus)
          slugInput.style.display = "block"
          slugInput.style.visibility = "visible"
        }
      })
      break
    }
  }
}

// Enhanced mutation observer variables
let observerTimeout
let observer

// Main initialization function
function initializeBengaliSlug() {
  console.log("Initializing Bengali slug functionality...")

  // Ensure maps are available globally for debugging
  if (typeof window !== "undefined") {
    window.bengaliMap = bengaliMap
    window.arabicMap = arabicMap
    window.slugifyText = slugifyText
  }

  // Reset retry counter
  window.retryCount = 0

  // Start observing with enhanced configuration
  if (observer) {
    observer.disconnect() // Disconnect existing observer
  }
  
  const newObserver = new MutationObserver((mutations) => {
    let shouldSetup = false
    
    mutations.forEach((mutation) => {
      // Check if new input elements were added
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName === 'INPUT' || node.querySelector('input')) {
              shouldSetup = true
            }
          }
        })
      }
      
      // Check if input attributes changed
      if (mutation.type === 'attributes' && 
          mutation.target.tagName === 'INPUT' &&
          ['name', 'id', 'placeholder'].includes(mutation.attributeName)) {
        shouldSetup = true
      }
    })

    if (shouldSetup) {
      clearTimeout(observerTimeout)
      observerTimeout = setTimeout(() => {
        console.log("DOM changes detected, reinitializing slug sync...")
        setupSlugSync()
      }, 1000)
    }
  })

  newObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["name", "id", "placeholder", "data-strapi-field"],
  })

  // Initial setup with delay to ensure DOM is ready
  setTimeout(() => {
    setupSlugSync()
  }, 1000)

  // Setup on route changes (for SPA navigation)
  let currentPath = window.location.pathname
  let currentHash = window.location.hash
  
  const checkRouteChange = () => {
    const newPath = window.location.pathname
    const newHash = window.location.hash
    
    if (newPath !== currentPath || newHash !== currentHash) {
      currentPath = newPath
      currentHash = newHash
      console.log("Route changed to:", newPath, "reinitializing slug sync...")
      
      // Reset retry counter on route change
      window.retryCount = 0
      
      setTimeout(() => {
        setupSlugSync()
      }, 1500) // Longer delay for route changes
    }
  }

  setInterval(checkRouteChange, 2000)

  // Listen for Strapi's navigation events
  window.addEventListener("popstate", () => {
    setTimeout(setupSlugSync, 1000)
  })

  // Listen for hash changes
  window.addEventListener("hashchange", () => {
    setTimeout(setupSlugSync, 1000)
  })
}

// Debug function to test slug generation
function testSlugGeneration() {
  const testCases = [
    "আল্লাহুম্মা বারিক",
    "বুখারী শরীফ",
    "সহীহ মুসলিম",
    "গ্রন্থসমূহের বিশুদ্ধতার মাপকাঠি",
    "الحمد لله رب العالمين",
    "محمد رسول الله",
    "Test English Title",
    "Mixed বাংলা and English",
    "Arabic عربي and Bengali বাংলা"
  ]

  console.log("=== Bengali/Arabic Slug Generation Test ===")
  testCases.forEach(test => {
    const slug = slugifyText(test)
    console.log(`Input: "${test}" → Slug: "${slug}"`)
  })
  console.log("=== Test Complete ===")
}

// Debug function to check current field detection
function debugFieldDetection() {
  console.log("=== Current Field Detection Status ===")
  
  const allInputs = document.querySelectorAll('input[type="text"], input:not([type])')
  console.log(`Found ${allInputs.length} text inputs total`)
  
  allInputs.forEach((input, index) => {
    const name = input.getAttribute("name") || ""
    const id = input.getAttribute("id") || ""
    const placeholder = input.getAttribute("placeholder") || ""
    const value = input.value || ""
    
    console.log(`Input ${index + 1}:`, {
      name: name,
      id: id,
      placeholder: placeholder,
      value: value.substring(0, 50) + (value.length > 50 ? "..." : ""),
      isTitle: name === "title" || id.includes("title"),
      isSlug: (name === "slug" || name === "uid" || id.includes("slug")) && !name.includes("url"),
      isPossibleUrl: name.includes("url") || name.includes("Url") || name.includes("link")
    })
  })
  
  const titleInput = document.querySelector('input[name="title"], input[name="name"], input[id*="title"]')
  const slugInput = document.querySelector('input[name="slug"], input[name="uid"]')
  
  console.log("Detected title input:", titleInput)
  console.log("Detected slug input:", slugInput)
  console.log("=== End Debug ===")
}

// Make test functions available globally for debugging
if (typeof window !== "undefined") {
  window.testBengaliSlug = testSlugGeneration
  window.debugFieldDetection = debugFieldDetection
}

// Export the initialization function
export default function () {
  if (typeof window !== "undefined") {
    // Ensure the script only initializes once
    if (window.bengaliSlugInitialized) {
      console.log("Bengali slug already initialized, skipping...")
      return
    }
    
    window.bengaliSlugInitialized = true
    
    // Make functions available globally for debugging
    window.bengaliSlugFunctions = {
      slugifyText,
      triggerStrapiEvents,
      setupSlugSync,
      initializeBengaliSlug
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initializeBengaliSlug)
    } else {
      // Use setTimeout to ensure other scripts have loaded
      setTimeout(initializeBengaliSlug, 500)
    }
    
    console.log("Bengali slug extension loaded and initialized")
  } else {
    console.log("Bengali slug extension loaded in non-browser environment")
  }
}
