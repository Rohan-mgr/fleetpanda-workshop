def delete_todo(todos, index) 
  if(index >= 1 && index <= todos.length)
    todos.delete_at(index-1)
  else 
    puts "Invalid Id"
  end
  todos
end

def update_todo(todos, index, new_todo_title)
  if(index >= 1 && index <= todos.length) 
    todos[index-1] = new_todo_title
  else
    puts "Invalid Id"
  end
  todos
end

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
    fileObj = File.open("todos.txt")
    todos = fileObj.readlines.map(&:chomp)
    if todos.length > 0 
      puts "Enter todo id to delete: "
      todo_id_delete = gets.chomp.to_i
      updated_todos = delete_todo(todos, todo_id_delete)
      File.open("todos.txt", "w") do |file|
        updated_todos.each {|todo| file.puts(todo)}
      end
      puts "Todo deleted successfully"
    else
      puts "Todos list is empty"
    end
    fileObj.close
  when 3
    puts "================= Your Todos ======================="
    fileObj = File.open("todos.txt")
    todos = fileObj.readlines
    if todos.length > 0 
      puts "Todo Id          Todo Title"
      todos.each_with_index do |title, index|
        puts "  #{index+=1}          #{title}"
        puts
      end
    else
      puts "Todos list is empty"
    end

  when 4
    fileObj = File.open("todos.txt")
    todos = fileObj.readlines.map(&:chomp)
    if todos.length > 0 
      puts "Enter todo id to update: "
      todo_id_update = gets.chomp.to_i
      puts "Enter todo new title: "
      new_title = gets.chomp
      updated_todos = update_todo(todos, todo_id_update, new_title)
      File.open("todos.txt", "w") do |file|
        updated_todos.each {|todo| file.puts(todo)}
      end
      puts "Todo updated successfully"
    else
      puts "Todos list is empty"
    end
    fileObj.close
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