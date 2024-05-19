import randomatic from 'randomatic'

export const generateRandomStringNumber = (size: number) => {
  const randomNumber = randomatic('0', size)

  return randomNumber
}
