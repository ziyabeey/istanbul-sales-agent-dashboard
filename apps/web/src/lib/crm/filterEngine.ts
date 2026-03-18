/**
 * Filter Expression Engine
 * ────────────────────────
 * Evaluates FilterExpression against a contact document.
 * Used by: segments, automations, contact query API.
 * 
 * Supports: $and, $or, $not, $eq, $ne, $gt/$gte/$lt/$lte,
 *           $in/$nin, $contains, $startsWith, $exists,
 *           $hasSome, $hasAll, $daysAgo, $between
 */

type FilterExpression = { $and?: FilterExpression[] } | { $or?: FilterExpression[] } | { $not?: FilterExpression } | FieldFilter
interface FieldFilter { field: string; operator: string; value: any }

/**
 * Get nested value from object by dot-notation path.
 */
function getNestedValue(obj: any, path: string): any {
  const parts = path.split('.')
  let current = obj
  for (const part of parts) {
    if (current === null || current === undefined) return undefined
    if (Array.isArray(current)) {
      // Search in array (any element matches)
      return current.map(item => getNestedValue(item, parts.slice(parts.indexOf(part)).join('.'))).flat()
    }
    current = current[part]
  }
  return current
}

/**
 * Evaluate a field comparison.
 */
function evaluateFieldFilter(contact: any, filter: FieldFilter): boolean {
  const { field, operator, value } = filter
  const actual = getNestedValue(contact, field)

  switch (operator) {
    case '$eq':
      return actual === value
    case '$ne':
      return actual !== value
    case '$gt':
      return typeof actual === 'number' && actual > value
    case '$gte':
      return typeof actual === 'number' && actual >= value
    case '$lt':
      return typeof actual === 'number' && actual < value
    case '$lte':
      return typeof actual === 'number' && actual <= value
    case '$in':
      return Array.isArray(value) && value.includes(actual)
    case '$nin':
      return Array.isArray(value) && !value.includes(actual)
    case '$contains':
      return typeof actual === 'string' && actual.toLowerCase().includes(String(value).toLowerCase())
    case '$startsWith':
      return typeof actual === 'string' && actual.toLowerCase().startsWith(String(value).toLowerCase())
    case '$exists':
      return value ? actual !== undefined && actual !== null : actual === undefined || actual === null
    case '$hasSome':
      return Array.isArray(actual) && Array.isArray(value) && value.some((v: any) => actual.includes(v))
    case '$hasAll':
      return Array.isArray(actual) && Array.isArray(value) && value.every((v: any) => actual.includes(v))
    case '$daysAgo': {
      if (!actual) return false
      const date = new Date(actual)
      const now = new Date()
      const diffDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
      return diffDays >= value
    }
    case '$between': {
      if (!Array.isArray(value) || value.length !== 2) return false
      const [min, max] = value
      if (typeof actual === 'number') return actual >= min && actual <= max
      if (typeof actual === 'string') return actual >= min && actual <= max
      return false
    }
    default:
      return false
  }
}

/**
 * Evaluate a filter expression against a contact.
 */
export function evaluateFilter(contact: any, filter: FilterExpression): boolean {
  if (!filter || typeof filter !== 'object') return true

  // $and
  if ('$and' in filter && Array.isArray((filter as any).$and)) {
    return (filter as any).$and.every((f: FilterExpression) => evaluateFilter(contact, f))
  }

  // $or
  if ('$or' in filter && Array.isArray((filter as any).$or)) {
    return (filter as any).$or.some((f: FilterExpression) => evaluateFilter(contact, f))
  }

  // $not
  if ('$not' in filter && (filter as any).$not) {
    return !evaluateFilter(contact, (filter as any).$not)
  }

  // Field filter
  if ('field' in filter && 'operator' in filter) {
    return evaluateFieldFilter(contact, filter as FieldFilter)
  }

  return true
}

/**
 * Filter contacts array by expression.
 */
export function filterContacts(contacts: any[], filter: FilterExpression): any[] {
  return contacts.filter(c => evaluateFilter(c, filter))
}
