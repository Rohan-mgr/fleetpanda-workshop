require "./calculator.rb"

loop do
  puts "********** Calculator Menu ****************"
  puts "1. Addition"
  puts "2. Subtraction"
  puts "3. Multiplication"
  puts "4. Division"
  puts "5. Exit"

  puts "Please Enter Your Action Choice: "
  choice = gets.chomp.to_i

  case choice
  when 1
    # Calculator.new.Addition
    Calculator.Addition
  when 2
    Calculator.Subtraction
  when 3
    Calculator.Multiplication
  when 4
    Calculator.Division
  when 5
    break
  else
    puts "Invalid choice of action"
  end


  puts "\n********** Press Enter to continue **************"
  gets.chomp
  system "clear"
  break if choice == 5
end