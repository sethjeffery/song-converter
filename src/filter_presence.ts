/**
 * Type-safe way to filter all non-blank values from an array
 */
export default function filterPresence<T>(array: (T | undefined | null)[]): T[] {
  const result: T[] = []
  array.forEach(item => { if (item) result.push(item) })
  return result
}
