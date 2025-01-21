type DynamicPageDataType = { index: number; path: string; slugs: string[] }[]

// Function to generate all combinations

export const generateCombinations = ({
  replaceList,
  combinationsList,
}: {
  replaceList: string[]
  combinationsList: DynamicPageDataType
}) => {
  // Start with a single combination which is the replaceList itself
  let result = [replaceList]

  // Iterate through each combination rule
  combinationsList.forEach(({ index, slugs }) => {
    const newResult: string[][] = []

    // Expand existing combinations by replacing the specified index
    result.forEach(currentCombination => {
      slugs.forEach(replacement => {
        // Create a copy of the current combination
        const newCombination = [...currentCombination]
        // Replace the value at the specified index with the new combination value
        newCombination[index] = replacement
        // Add the modified combination to the result
        newResult.push(newCombination)
      })
    })

    // Update the result with the newly generated combinations
    result = newResult
  })

  return result
}
