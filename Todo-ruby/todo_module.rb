class TodoHelper
  def self.delete_todo(todos, index) 
    if(index >= 1 && index <= todos.length)
      todos.delete_at(index-1)
    else 
      puts "Invalid Id"
    end
    todos
  end

  def self.update_todo(todos, index, new_todo_title)
    if(index >= 1 && index <= todos.length) 
      todos[index-1] = new_todo_title
    else
      puts "Invalid Id"
    end
    todos
  end
end