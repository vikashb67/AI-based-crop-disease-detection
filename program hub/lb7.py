fname=input('enter a file name: ')
fhand=open(fname)
count={}
for line in fhand:
    words= line.split()
    for word in words:
        if word in count:
            coount[word] += 1
        else:
            count[word]=1
print('dictionary before sorting')
print()
print('sorted dictionary : ',dict(sorted(count.items())))
print()
print('reverse sorted dictionary: ',dict(reversed(sorted(count.items()))))
print()
print('1st 10 items',dict(list(reversed(sorted(count.items())))))