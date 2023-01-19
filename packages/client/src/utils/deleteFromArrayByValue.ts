export const deleteByValue = <T>(
  givenArray: T[],
  prop: keyof T,
  value: string | number | boolean
): T[] => {
  return givenArray.filter((item: T) => {
    return item[prop] !== value
  })
}
