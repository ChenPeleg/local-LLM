/**
 * Calculates the Fibonacci sequence up to the nth number.
 * 
 * @param {number} n - The number of Fibonacci numbers to generate.
 * @returns {number[]} An array of Fibonacci numbers up to the nth number.
 * @throws {Error} If n is negative.
 */
function fibonacci(n: number): number[] {
    if (n < 0) {
        throw new Error('n must be non-negative');
    }

    if (n === 0) {
        return [];
    }

    if (n === 1) {
        return [0];
    }

    const result: number[] = [0, 1];

    for (let i = 2; i < n; i++) {
        result.push(result[i - 1] + result[i - 2]);
    }

    return result;
}

// Example usage:
console.log(fibonacci(5)); // [0, 1, 1, 2, 3]

export default fibonacci;