name=input('enter your name: ')
usn=input('enter your usn: ')
ttl=0
avg=0
for i in range(3):
    m=int(input("enter the marks of %s in subject %d: "%(name,i+1)))
    ttl=ttl+m
avg=ttl/3
print('name: ',name)
print('usn: ',usn)
print('the total marks = ',ttl)
print('the avarage marks = ',avg)