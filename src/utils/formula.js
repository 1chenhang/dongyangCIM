/**
 * 计算摄像机俯仰角
 * @param  参数 R圆圈半径 L点离圆心的距离
 */
export const calculateT2 = (R, L) => {
  // 常量
  const factor = 0.087
  const pi = Math.PI
  // 计算 T2
  const T2 = Math.atan(factor * R / L) * 180 / pi
  return T2
}

/**
 * 计算L点离圆心的距离
 * @param  参数 R圆圈半径 T2
 */
export const calculateR = (R, T2) => {
  // 常量
  const factor = 0.087
  const pi = Math.PI
  // 计算L
  const L = (factor * R) / Math.tan(T2 * pi / 180)
  return L
}
