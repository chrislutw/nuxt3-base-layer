/**
 * 取得不分大小寫的物件屬性
 * @param { object } obj 物件
 * @returns { object } 只有小寫屬性的物件
 */
export function getCaseInsensitiveProperty(obj: Record<string, any> = {}) {
  const caseInsensitiveQuery: Record<string, any> = {}
  Object.entries(obj).forEach(([key, value]) => {
    caseInsensitiveQuery[key.toLowerCase()] = value
  })
  return caseInsensitiveQuery
}
