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
end
