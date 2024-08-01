require "./address.rb"

loop do
  puts "************ Address Book Menu ****************"
  puts "1. Add your new address book"
  puts "2. Delete your address book"
  puts "3. Display all your address book"
  puts "4. Update your address book"
  puts "5. Search contacts"
  puts "6. Exit"

  puts "Enter your choice of action: "
  choice = gets.chomp.to_i

  case choice
  when 1
    Address.initialize_add_address
  when 2
    Address.initialize_delete_address
  when 3
    Address.initialize_display_address
  when 4
    Address.initialize_update_address
  when 5
    Address.initialize_contact_search
  when 6
    break
  else
    puts "Invalid choice!"
  end

  puts "\n********* Press Enter to continue *************"
  gets.chomp
  system "clear"
  break if choice == 6
end
