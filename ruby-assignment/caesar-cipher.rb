
def caesar_cipher word, salt
  convertedStr = "";
  str = word.split("").each do |char|
    if(char =~ /[a-zA-Z]/) 
      base = char.ord < 91 ? 65 : 97
      shiftedChar = (((char.ord - base) + salt) % 26) + base
      convertedStr += shiftedChar.chr
    else
      convertedStr += char
    end
  end
  puts convertedStr
end
caesar_cipher("Z", 5)