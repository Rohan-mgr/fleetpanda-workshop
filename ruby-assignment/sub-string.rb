def substrings(words, dictionary)
  frequencies = Hash.new(0)
  words.gsub(/[^a-zA-Z\s']/, "").split(" ").each do |word|
      frequencies[word] += 1
  end
  puts frequencies
end 

# substrings("below", ["below","down","go","going","horn","how","howdy","it","i","low","own","part","partner","sit"])
substrings("Howdy partner going, sit down! How's it going?", ["below","down","go","going","horn","how","howdy","it","i","low","own","part","partner","sit"])