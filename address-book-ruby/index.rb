require "./address.rb"
require "./helper.rb"
extend Helper

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
  when  map_main_menu_choice("add_address_book")
    Address.initialize_add_address
  when map_main_menu_choice("delete_address_book")
    Address.initialize_delete_address
  when map_main_menu_choice("display_all_address_books")
    Address.initialize_display_address
  when map_main_menu_choice("update_address_book")
    Address.initialize_update_address
  when map_main_menu_choice("search_contacts")
    Address.initialize_contact_search
  when map_main_menu_choice("exit")
    break
  else
    puts "Invalid choice!"
  end

  puts "\n********* Press Enter to continue *************"
  gets.chomp
  system "clear"
  break if choice == map_main_menu_choice("exit")
end
