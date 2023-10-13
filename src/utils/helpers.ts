/**
 * Truncates a text string to a specified maximum length and adds an ellipsis if truncated.
 *
 * @param {string} text - The input text to be truncated.
 * @param {number} maxLength - The maximum length of the truncated text.
 * @returns {string} - The truncated text. If the input text is shorter than or equal to maxLength, it returns the original text; otherwise, it adds an ellipsis ('...') to the end of the truncated text.
 */

export function truncateText(text: string, maxLength: number): string {
  if (text?.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}
