def fibs(n)
  fibs__series = []
  fibs__series[0] = 0 
  fibs__series[1] = 1
  for i in 2...n
    fibs__series[i] = fibs__series[i-1] + fibs__series[i-2]
  end
  puts "fibonacci series without recursion: "
  puts fibs__series.join(" ")
end
fibs(8)

N = 8

def fibs_rec(n)
  if n == 0
    return 0
  end
  if n == 1
    return 1
  end
  fibs_rec(n-1) + fibs_rec(n-2)
end

fibs_series = []
for i in 0...N
  fibs_series << fibs_rec(i)
end

puts "fibonacci series with recursion: "
puts fibs_series.join(" ")