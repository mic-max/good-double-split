import bisect
import itertools
from typing import List

class Solution:
    def waysToSplit(self, nums: List[int]) -> int:
        result = 0
        prefix_sum = list(itertools.accumulate(nums))
        n = len(nums)
        total_sum = prefix_sum[-1]
        for left in range(n - 2):
            left_sum = prefix_sum[left]
            if 3 * left_sum > total_sum:
                break
            right_start = bisect.bisect_left(prefix_sum, 2 * left_sum, left + 1, n - 1)
            right_end = bisect.bisect_right(prefix_sum, (total_sum + left_sum) // 2, right_start, n - 1)
            if ways := right_end - right_start:
                result += ways
        return result % (10 ** 9 + 7)
