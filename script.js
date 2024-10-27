const calculate = () => {
    const value = document.querySelector('#numbers').value;
    const array = value.split(/,\s*/g)
    const numbers = array.map(el => Number(el)).filter(el => !isNaN(el))

    const mean = getMean(numbers);
    const median = getMedian(numbers)
    const mode = getMode(numbers)
    const range = getRange(numbers)
    const variance = getVariance(numbers)
    const standardDeviation = getStandardDeviation(numbers)

    document.querySelector('#mean').textContent = mean;
    document.querySelector('#median').textContent = median;
    document.querySelector('#mode').textContent = mode
    document.querySelector('#range').textContent = range
    document.querySelector('#variance').textContent = variance
    document.querySelector('#standardDeviation').textContent = standardDeviation
}

// const getMean = (array) => {
//     /* reduce(callBackFn, intialvalue) takes a callback fn and an intial value
//     the intial value in this case is set to 0 */
//     const sum = array.reduce((acc, el) => {acc + el}, 0)
//     /* dvsn by the array length to get the mean */
//     const mean = sum / array.length
//     return mean
// }

// with implicit arrow functions

const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;

const getMedian = (array) => {
    /* sorts the array in ascending order -> if a < b, a will come before b
    if a > b,  b will come before a
    if a === b the order remains the same */

    /* e.g [4, 3, 5, 6]
    a = 4, b = 3 -> a - b > 0 therefore 3 will come before 4 */
    const sorted = array.toSorted((a, b) => a - b)

  /*   const isEven = sorted.length % 2 === 0
    if (isEven) {
        const firstMiddleNumber = sorted[sorted.length / 2]
        const secondMiddleNumber = sorted[(sorted.length / 2) - 1]

        const evenListMedian = getMean([firstMiddleNumber, secondMiddleNumber])
        return evenListMedian
    } else if (!isEven) {
        const oddListMedian = sorted[Math.floor(sorted.length / 2)]
        return oddListMedian
    } */

        // other way to write it using ternary operator

    const median = 
        sorted.length % 2 === 0 ? getMean([sorted[sorted.length / 2], sorted[sorted.length / 2 -1]])
        : sorted[Math.floor(sorted.length / 2)]

    return median
}

const getMode = (array) => {
    /* counts will keep track of how many times each number appears */
    const counts = {}
    /* on each iteration check to see if el exists in the count object
    if it is found (that is there's a property/key of el in the object increase its value
    by 1
    
    otherwise if there's no el (that is no property/key create one and set its value to 1)) */
    /* array.forEach(el => {
        if (counts[el]) {
            counts[el] += 1
        } else {
            counts[el] = 1
        }
    }); */

    // counting with short-circuit evalution
    /* foreach goes through element in the array, and executing it for each element
    counts[el] = (counts[el] || 0) + 1
    
    -> checks if the key el already exists in the counts obj
    if counts[el] exists and has a value e.g 1, 2, etc it uses that value
    
    -> if counts[el] is undefined i.e. el hasn't been encountered before (counts[el] || 0)
    evaluates to 0 as undefined || 0 is 0 (in js || returns the 1st truthy value it finds
    and if none are truthy it returns the last value
    undefined is a falsy value so the the evaluation moves to the next value which is 0
    and since 0 is the last value in the evaluatio it is returned similar thing with null)
    
    -> after evaluating (counts[el] || 0) + 1 increments the result
    -> the result is then assigned beack to counts[el] and updates or creates the count
    for el */
    array.forEach(el => counts[el] = (counts[el] || 0) + 1)

    /* Set data type that only allows for unique values -> passing an aery removes duplicate
    values
    
    Object.values() -> returns an array of the values of each key in counts then set removes duplicates
    
    if the size of set is 1 means each values appears the same number of times -> no mode*/
    if (new Set(Object.values(counts)).size === 1) {
        return null
    }
    /* sorting the the keys based on their value -> the one which the highest value has
    the highest frequency and will be found at index 0 */
    const highest = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0]

    /* there can be multiple modes -> if there are multiple numbers that have the same higest
    freq they are considered the mode else if there is only 1 number that occurs most often
    that number is the mode 
    
    a series can be unimodal bimodal, multimodal
    
    using .filter() to handle these cases*/

    /* checking if the counts[el] is equal to counts[highest] */
    const mode = Object.keys(counts).filter(el => counts[el] === counts[highest])
    // returning mode as a str, elements are separated by commas then space
    return mode.join(', ')

}

/* range is the diff between the largest and smallest numbers in a list */
const getRange = (array) => Math.max(...array) - Math.min(...array)

const getVariance = (array) => {
    const mean = getMean(array)

   /*  const differences = array.map(el => el - mean)
    const squaredDifferences = differences.map(el => el**2)
    const sumSquaredDifferences = squaredDifferences.reduce((acc, el) => acc + el, 0) */

    // combining the three lines to this 
    // last comment is another way to one line the logic
    const variance = array.reduce((acc, el) => {
        const difference = (el - mean) ** 2
        // const squared = difference ** 2
        return acc + difference
    }, 0) / array.length
   /*  const variance = array.reduce((acc, el) => ((el - mean) ** 2) + acc, 0) / array.length */

    return variance
}

const getStandardDeviation = (array) => {
    const variance = getVariance(array)
    const standardDeviation = Math.sqrt(variance)
    
    return standardDeviation
}


// // how to check if the length of an array is even or odd
// const testArr1 = [1, 2, 3, 4, 5];
// const testArr2 = [1, 2, 3, 4, 5, 6];
// const isEven = testArr2.length % 2 === 0;
// // to get the median with an odd number of elements, I need to find and return the middle number
// /* using math.floor() because it returns a decimal as the array length is odd and rounding
// down to find the nearest whole number */
// const oddListMedian = testArr1[Math.floor(testArr1.length / 2)]

// /* if the length of the array is even need to find the two middle numbers and get their
// average */

// const firstMiddleNumber = testArr2[testArr2.length / 2]
// const secondMiddleNumber = testArr2[(testArr2.length / 2) - 1]

// const evenListMedian = getMean([firstMiddleNumber, secondMiddleNumber])
// console.log(evenListMedian)