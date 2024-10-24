const calculate = () => {
    const value = document.querySelector('#numbers').value;
    const array = value.split(/,\s*/g)
    const numbers = array.map(el => Number(el)).filter(el => !isNaN(el))

    const mean = getMean(numbers);
    document.querySelector('#mean').textContent = mean;
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