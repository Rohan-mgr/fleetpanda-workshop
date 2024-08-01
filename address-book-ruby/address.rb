require 'uuid7'
require './address_manager.rb'

class Address < AddressManager
  def self.initialize_add_address
    id = UUID7.generate
    puts "Enter Name: "
    name = gets.chomp
    puts "Enter contact number: "
    contact = gets.chomp.to_i
    puts "Enter address: "
    address = gets.chomp

    info = {
      id: id, 
      name: name, 
      contact: contact, 
      address: address
    }

    add_address(info)
  end

  def self.initialize_delete_address
    puts "Enter address Id to delete: "
    id = gets.chomp
    delete_address(id)
  end

  def self.initialize_display_address
    puts "========================================== Address Book Records ========================================="
    puts "                Id                                Name                 Contact                  Address\n"

    display_address
  end

  def self.initialize_contact_search
    loop do
      puts "\n*********** Choose how you want to search ***********"
      puts "1. Search by name"
      puts "2. Search by contact"
      puts "3. Search by address"
      puts "4. Exit Searching"

      puts "Please choose editing action: "
      choice = gets.chomp.to_i

      case choice
      when 1
        puts "Enter name to search: "
        name_search = gets.chomp
        search_result = search_by_name(name_search)
        puts "========================================== Address Book Search Records ========================================="
        puts "                Id                                Name                 Contact                  Address\n"
        search_result.each do |info|
          puts "#{info['id']}           #{info['name']}             #{info['contact']}               #{info['address']}"
        end
        break
      when 2
        puts "Enter contact to search: "
        contact_search = gets.chomp.to_i
        search_result = search_by_contact(contact_search)
        puts "========================================== Address Book Search Records ========================================="
        puts "                Id                                Name                 Contact                  Address\n"
        search_result.each do |info|
          puts "#{info['id']}           #{info['name']}             #{info['contact']}               #{info['address']}"
        end
        break
      when 3
        puts "Enter address to search: "
        address_search = gets.chomp
        search_result = search_by_address(address_search)
        puts "========================================== Address Book Search Records ========================================="
        puts "                Id                                Name                 Contact                  Address\n"
        search_result.each do |info|
          puts "#{info['id']}           #{info['name']}             #{info['contact']}               #{info['address']}"
        end
        break
      when 4
        break
      else
        puts "Invalid Editing Choice"
      end

      break if choice == 4
    end
  end

  def self.initialize_update_address
    puts "Enter address Id to update: "
    id = gets.chomp
    loop do
      puts "\n*********** Choose what you want to update ***********"
      puts "1. Update Name"
      puts "2. Update Contact"
      puts "3. Update Address"
      puts "4. Edit all"
      puts "5. Exit Editing"

      puts "Please choose editing action: "
      choice = gets.chomp.to_i

      case choice
      when 1
        puts "Enter new Name: "
        new_name = gets.chomp
        update_name(id, new_name)
        break
      when 2
        puts "Enter new Contact: "
        new_contact = gets.chomp
        update_contact(id, new_contact)
        break
      when 3
        puts "Enter new Address: "
        new_address = gets.chomp
        update_address(id, new_address)
        break
      when 4
        puts "Enter new Name: "
        new_name = gets.chomp 
        puts "Enter new Contact: "
        new_contact = gets.chomp 
        puts "Enter new Address: "
        new_address = gets.chomp
        update_name(id, new_name)
        update_contact(id, new_contact)
        update_address(id, new_address)
        break
      when 5
        break
      else
        puts "Invalid Editing Choice"
      end

      break if choice == 5
    end
  end
end