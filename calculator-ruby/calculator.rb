require "./calc_module.rb"

class Calculator
  extend Calc
  def self.Addition
  # def Addition
    puts "Enter how many numbers you want to add: "
    len = gets.chomp.to_i
    nums_to_add = []
    puts "Enter numbers you want to add: "
    for i in 0...len
      number = gets.chomp.to_i
      nums_to_add << number
    end

    total_sum = add(*nums_to_add)
    puts "Total sum: #{total_sum}"
  end

  def self.Subtraction
    puts "Enter how many numbers you want to subtract: "
    len = gets.chomp.to_i
    nums_to_sub = []
    puts "Enter numbers you want to subtract: "
    for i in 0...len
      number = gets.chomp.to_i
      nums_to_sub << number
    end

    total_sum = sub(*nums_to_sub)
    puts "Subtraction Result: #{total_sum}"
  end

  def self.Multiplication
    puts "Enter how many numbers you want to multiply: "
    len = gets.chomp.to_i
    nums_to_multiply = []
    puts "Enter numbers you want to multiply: "
    for i in 0...len
      number = gets.chomp.to_i
      nums_to_multiply << number
    end

    total_sum = multiply(*nums_to_multiply)
    puts "Multiplication Result: #{total_sum}"
  end

  def self.Division
    puts "Enter your divisor: "
    divisor = gets.chomp.to_i
    puts "Enter your dividend: "
    dividend = gets.chomp.to_i

    args = {
      dividend: dividend,
      divisor: divisor
    }

    result = divide(args)
    puts "*********** Division Result ***********}"
    puts "Quotient: #{result[:quotient]}"
    puts "Remainder: #{result[:remainder]}"
  end
end