// 建议1：不要使用 mixins，因为 mixins 会导致组件的状态变得不可预测
// 建议2：只在外部模块做校验、判断，不要修改组件内的响应式状态，否则会导致数据混乱

export function validate(node) {
  if (node.dataType === 1)
    return validateText(node)

  else if (node.dataType === 2)
    return validateDate(node)

  else if (node.dataType === 3)
    return validateNumber(node)

  return null
}

export function validateDate(node) {
  const date = node.$form.data
  if (!date.length || !date[0] || !date[1])
    return false

  return true
}

export function validateText(node) {
  const selection = node.$form.data
  return selection.length > 0
}

export function validateNumber(node) {
  const { condition, items } = node.$form.data

  if (!items.length)
    return false
  for (const item of items) {
    if (!item.type)
      return false
    if ((item.type !== '4' && item.type !== '5') && !item.value)
      return false
  }

  return true
}
