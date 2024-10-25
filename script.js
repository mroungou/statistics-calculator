const calculate = () => {
    const value = document.querySelector('#numbers').value;
    const array = value.split(/,\s*/g)
    const numbers = array.map(el => Number(el)).filter(el => !isNaN(el))

    const mean = getMean(numbers);
    const median = getMedian(numbers)
    document.querySelector('#mean').textContent = mean;
    document.querySelector('#median').textContent = median;
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