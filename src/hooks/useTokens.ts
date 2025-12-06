import { useTokenStore } from '@/lib/token-store'
import { useTheme } from '@/lib/theme-context'
import { getTokensByCategory, getTokensByGroup, getColorFamily } from '@/lib/token-helpers'
import { DesignToken } from '@/lib/token-parser'

/**
 * Hook to get tokens filtered by current brand
 */
export const useTokens = () => {
  const { designTokens } = useTokenStore()
  const { theme } = useTheme()
  
  // Normalize brand name (e.g., "Iris" -> "iris")
  const brand = theme.brand.toLowerCase()

  const getTokensByCategoryWithBrand = (category: string): DesignToken[] => {
    return getTokensByCategory(designTokens, category, brand)
  }

  const getTokensByGroupWithBrand = (group: string): DesignToken[] => {
    return getTokensByGroup(designTokens, group, brand)
  }

  const getColorFamilyWithBrand = (family: string): DesignToken[] => {
    const filtered = getColorFamily(designTokens, family)
    // Filter by brand if needed
    return filtered
  }

  return {
    designTokens,
    brand,
    getTokensByCategory: getTokensByCategoryWithBrand,
    getTokensByGroup: getTokensByGroupWithBrand,
    getColorFamily: getColorFamilyWithBrand,
  }
}

