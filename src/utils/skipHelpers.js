/**
 * Utility functions for skip-related calculations and operations
 */

/**
 * Calculate the total price including VAT
 * @param {number} priceBeforeVat - The price before VAT
 * @param {number} vatRate - The VAT rate as a percentage (e.g., 20 for 20%)
 * @returns {number} - The total price including VAT (rounded)
 */
export const calculateTotalPrice = (priceBeforeVat, vatRate = 20) => {
    return Math.round(priceBeforeVat * (1 + vatRate / 100));
};

/**
 * Get the image source URL for a skip
 * @param {string} size - The size of the skip in yards
 * @returns {string} - The URL for the skip image
 */
export const getSkipImageSource = (size) => {
    return `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${size}-yarder-skip.jpg`;
}; 