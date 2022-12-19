let num = "1000000000"
let reg = /(?=\B(\d{3})+$)/g
console.log(num.replace(reg, ","));
console.log(num.match(reg));

let nums = [1,2,3]

function sum(nums) {
    return fn(nums,0)
}
function fn(nums,i) {
    if (i < nums.length) {
        return nums[i] + fn(nums,i+1)
    }
    return 0
}

console.log(sum(nums));
