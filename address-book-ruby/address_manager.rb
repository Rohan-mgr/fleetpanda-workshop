require 'json'
require './helper.rb'

FILE_PATH = "./addressbook.json"

class AddressManager
  # extend Helper
  def self.add_address(info)
    if File.exist?(FILE_PATH) && !File.zero?(FILE_PATH)
      file = File.open(FILE_PATH, "r")
      data = JSON.load(file)
      file.close
    else
      data = { 'records' => [] } 
    end
    new_address = {
      "id": info[:id], 
      "name": info[:name], 
      "contact": info[:contact], 
      "address": info[:address]
    }
    data['records'] << new_address
    File.write(FILE_PATH, JSON.pretty_generate(data))
    puts "Address addedd successfully";
  end

  def self.delete_address addressId
    if File.exist?(FILE_PATH) && !File.zero?(FILE_PATH)
      file = File.open(FILE_PATH, "r")
      data = JSON.load(file)
      file.close
    else
      data = { 'records' => [] } 
    end
    
    data['records'].delete_if {|record| record['id'] == addressId}
    File.write(FILE_PATH, JSON.pretty_generate(data))
    puts "Address deleted successfully";
  end

  def self.display_address
    if File.exist?(FILE_PATH) && !File.zero?(FILE_PATH)
      file = File.open(FILE_PATH, "r")
      data = JSON.load(file)
      file.close
    else
      data = { 'records' => [] } 
    end
    
    data['records'].each do |info|
      puts "#{info['id']}           #{info['name']}             #{info['contact']}               #{info['address']}"
    end
  end

  def self.update_name(id, new_name)
    if File.exist?(FILE_PATH) && !File.zero?(FILE_PATH)
      file = File.open(FILE_PATH, "r")
      data = JSON.load(file)
      file.close
    else
      data = { 'records' => [] } 
    end
    rec = data['records'].find {|info| info['id'] == id}
    rec['name'] = new_name
    File.write(FILE_PATH, JSON.pretty_generate(data))
    puts "Name updated successfully";
  end

  def self.update_contact(id, new_name)
    if File.exist?(FILE_PATH) && !File.zero?(FILE_PATH)
      file = File.open(FILE_PATH, "r")
      data = JSON.load(file)
      file.close
    else
      data = { 'records' => [] } 
    end
    rec = data['records'].find {|info| info['id'] == id}
    rec['contact'] = new_name
    File.write(FILE_PATH, JSON.pretty_generate(data))
    puts "Contact updated successfully";
  end

  def self.update_address(id, new_name)
    if File.exist?(FILE_PATH) && !File.zero?(FILE_PATH)
      file = File.open(FILE_PATH, "r")
      data = JSON.load(file)
      file.close
    else
      data = { 'records' => [] } 
    end
    rec = data['records'].find {|info| info['id'] == id}
    rec['address'] = new_name
    File.write(FILE_PATH, JSON.pretty_generate(data))
    puts "Address updated successfully";
  end

  def self.search_by_name(name_search)
    if File.exist?(FILE_PATH) && !File.zero?(FILE_PATH)
      file = File.open(FILE_PATH, "r")
      data = JSON.load(file)
      file.close
    else
      data = { 'records' => [] } 
    end
    searched_name_results = data['records'].select do |info| 
      info['name'].downcase.split(" ").include?(name_search.downcase)
    end
    searched_name_results
  end

  def self.search_by_contact(contact_search)
    if File.exist?(FILE_PATH) && !File.zero?(FILE_PATH)
      file = File.open(FILE_PATH, "r")
      data = JSON.load(file)
      file.close
    else
      data = { 'records' => [] } 
    end
    searched_contact_results = data['records'].select do |info| 
      info['contact'] == contact_search
    end
    searched_contact_results
  end

  def self.search_by_address(address_search)
    if File.exist?(FILE_PATH) && !File.zero?(FILE_PATH)
      file = File.open(FILE_PATH, "r")
      data = JSON.load(file)
      file.close
    else
      data = { 'records' => [] } 
    end
    searched_address_results = data['records'].select do |info| 
      info['address'].downcase == address_search.downcase
    end
    searched_address_results
  end

end