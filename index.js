const arrayInput = document.getElementById('arrayInput');
const tbody = document.getElementById('tbody');
const tbodyResults = document.getElementById('tbodyResults');
const red = document.getElementById('red');
const blue = document.getElementById('blue');

// TODO: reconsider
const styleTag = document.getElementById('dynamicStyles');

const redSum = document.getElementById('redSum');
const whiteSum = document.getElementById('whiteSum');
const blueSum = document.getElementById('blueSum');

const redWhiteCondition = document.getElementById('redWhiteCondition');
const whiteBlueCondition = document.getElementById('whiteBlueCondition');

let totalRows = document.querySelectorAll('tbody tr').length;
let intArray = []
let prefixSum = []

function waysToSplit() {
    const result = []
    // left means last element in left part inclusive
    for (let left = 0; left < intArray.length - 2; left++) {
        // right means first element in right part inclusive
        for (let right = intArray.length - 1; right > left + 1; right--) {
            const totalSum = prefixSum.slice(-1)
            const lsum = prefixSum[left]
            const rsum = totalSum - prefixSum[right - 1]
            const msum = totalSum - rsum - lsum

            if (lsum <= msum && msum <= rsum) {
                result.push([left, right])
            }
        }
    }
    return result
}

function updateSums() {
    l = parseInt(red.value) - 1
    r = totalRows - parseInt(blue.value)
    const totalSum = prefixSum.slice(-1)
    const s1 = prefixSum[l]
    const s3 = totalSum - prefixSum[r - 1]
    const s2 = totalSum - s3 - s1

    redSum.value = s1
    whiteSum.value = s2
    blueSum.value = s3

    redWhiteCondition.style.color = s1 <= s2 ? 'lime' : 'red'
    whiteBlueCondition.style.color = s2 <= s3 ? 'lime' : 'red'
}

function validCSVNonNegativeIntegerString(str) {
    // non-negative, integers, 3+ elements, csv format.
    return str.split(',').every(value => /^[0-9]*$/.test(value.trim()))
}

function calculatePrefixSum(nums) {
    let result = [nums[0]]
    for (let i = 1; i < nums.length; i++) {
        result.push(result[i - 1] + nums[i]);
    }
    return result
}

function handleInputChange() {
    const nums = arrayInput.value
        .split(',')
        .map(value => value.trim())
        .map(x => +x)

    // Check if the input is valid
    const isValid = arrayInput.value;

    if (isValid) {
        red.value = 1
        blue.value = 1
        intArray = nums
        prefixSum = calculatePrefixSum(nums)

        tbody.innerHTML = '';
        nums.forEach((value, index) => {
            const row = document.createElement('tr');
            const indexTd = document.createElement('td');
            indexTd.textContent = index;
            const valueTd = document.createElement('td');
            valueTd.textContent = value;
            row.appendChild(indexTd);
            row.appendChild(valueTd);
            tbody.appendChild(row);
        });
        totalRows = nums.length
        updateTableStyles()
    } else {
        tbody.innerHTML = '';
    }
}

function updateTableStyles() {
    const redCount = parseInt(red.value);
    const blueCount = parseInt(blue.value);

    updateSums();

    red.setAttribute("max", totalRows - blueCount - 1)
    blue.setAttribute("max", totalRows - redCount - 1)

    // TODO: replace by simply removing for number lowers and adding for number increases
    styleTag.textContent = `#tbody tr:nth-child(-n+${redCount}) { color: #E74856; }`;
    styleTag.textContent += `#tbody tr:nth-last-child(-n+${blueCount}) { color: #3498DB; }`;
}

arrayInput.addEventListener('input', handleInputChange);
red.addEventListener('input', updateTableStyles);
blue.addEventListener('input', updateTableStyles);

computeButton.addEventListener('click', () => {
    const ways = waysToSplit()

    tbodyResults.innerHTML = '';
    ways.forEach((value, index) => {
        const row = document.createElement('tr');
        const redsTd = document.createElement('td');
        redsTd.textContent = value[0] + 1;
        const bluesTd = document.createElement('td');
        bluesTd.textContent = totalRows - value[1];
        row.appendChild(redsTd);
        row.appendChild(bluesTd);
        tbodyResults.appendChild(row);
    });
    // TODO: click on the row to load those values into the red/blue number inputs
})

handleInputChange();
updateTableStyles();
