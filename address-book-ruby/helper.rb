module Helper
  @@FILE_PATH = "./addressbook.json"
  @@data = {}

  def file_exists
    if File.exist?(@@FILE_PATH) && !File.zero?(@@FILE_PATH)
      file = File.open(@@FILE_PATH, "r")
      @@data = JSON.load(file)
      file.close
    else
      @@data = { 'records' => [] } 
    end
    return [@@FILE_PATH, @@data]
  end 

  def map_main_menu_choice choice
    choice_map = {
      add_address_book: 1,
      delete_address_book: 2,
      display_all_address_books: 3,
      update_address_book: 4,
      search_contacts: 5,
      exit: 6
    } 
    choice_map[choice.to_sym]
  end

  def map_search_menu_choice choice
    choice_map = {
      search_by_name: 1,
      search_by_contact: 2,
      search_by_address: 3,
      exit_searching: 4,
    } 
    choice_map[choice.to_sym]
  end

  def map_update_menu_choice choice
    choice_map = {
      update_by_name: 1,
      update_by_contact: 2,
      update_by_address: 3,
      update_all: 4,
      exit_updating: 5,
    } 
    choice_map[choice.to_sym]
  end
end
