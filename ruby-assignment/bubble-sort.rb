def bubble_sort(nums) 
  len = nums.length
  for i in 0..len-1
    for j in i+1..len-1
      if(nums[i] > nums[j])
        temp = nums[i]
        nums[i] = nums[j]
        nums[j] = temp
      end
    end
  end
  puts nums
end

bubble_sort([4,3,78,2,0,2])