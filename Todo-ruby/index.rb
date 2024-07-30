
require "./todo_module.rb"

loop do 
  puts "1. Add todo to the list"
  puts "2. Delete todo from the list"
  puts "3. Display all todos"
  puts "4. Update the existing todo"
  puts "5. Exit"

  puts "Please Enter your choice: "
  choice = gets.chomp;

  case choice.to_i
  when 1
    puts "Enter your todo title: "
    title = gets.chomp
    file = File.open("todos.txt", "a")
    file.puts(title)
    file.close
    puts "Todo added successfully"
  when 2
    if(File.exist?("todos.txt"))
      fileObj = File.open("todos.txt")
      todos = fileObj.readlines
      if todos.length > 0 
        puts "Enter todo id to delete: "
        todo_id_delete = gets.chomp.to_i

        if todo_id_delete > todos.length || todo_id_delete <= 0
          puts "Invalid todo Id"
          puts "\n*** Press Enter key to continue ***"
          gets.chomp
          system "clear"
          next
        end

        updated_todos = TodoHelper.delete_todo(todos, todo_id_delete)
        File.open("todos.txt", "w") do |file|
          updated_todos.each {|todo| file.puts(todo)}
        end
        puts "Todo deleted successfully"
        fileObj.close
      else
        puts "Todos list is empty"
      end
    else
      puts "Todos list is empty"
    end
  when 3
    if(File.exist?("todos.txt"))
      puts "================= Your Todos ======================="
      fileObj = File.open("todos.txt")
      todos = fileObj.readlines
      if todos.length > 0 
        puts "Todo Id          Todo Title"
        todos.each_with_index do |title, index|
          puts "  #{index+=1}          #{title}"
        end
        fileObj.close
      else
        puts "Todos list is empty"
      end
    else
      puts "Todo list is empty"
    end
  when 4
   if(File.exist?("todos.txt")) 
      fileObj = File.open("todos.txt")
      todos = fileObj.readlines.map(&:chomp)
      if todos.length > 0 
        puts "Enter todo id to update: "
        todo_id_update = gets.chomp.to_i
        
        if todo_id_update > todos.length || todo_id_update <= 0
          puts "Invalid todo Id"
          puts "\n*** Press Enter key to continue ***"
          gets.chomp
          system "clear"
          next
        end

        puts "Enter todo new title: "
        new_title = gets.chomp
        updated_todos = TodoHelper.update_todo(todos, todo_id_update, new_title)
        File.open("todos.txt", "w") do |file|
          updated_todos.each {|todo| file.puts(todo)}
        end
        puts "Todo updated successfully"
        fileObj.close
      else
        puts "Todos list is empty"
      end
    else
      puts "Todos list is empty"
    end
  when 5
    break;
  else 
    puts "Invalid choice"
  end

  puts "\n*** Press Enter key to continue ***"
  gets.chomp
  system "clear"
  
  break if choice == 5
end 