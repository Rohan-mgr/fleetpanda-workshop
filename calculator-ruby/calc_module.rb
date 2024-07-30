module Calc
  def add(*nums)
    sum = 0
    nums.each {|num| sum += num}
    sum
  end
  def sub(*nums)
    sum = nums.shift()
    nums.each {|num| sum -= num}
    sum
  end
  def multiply(*nums)
    sum = 1
    nums.each {|num| sum *= num}
    sum
  end
  def divide(args)
    quotient = args[:dividend]/args[:divisor]
    remainder = args[:dividend]%args[:divisor]
    {quotient: quotient, remainder: remainder}
  end
end