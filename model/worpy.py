a=[]
n=int(input("Enter the number of elements: "))
for i in range(n):
    element=int(input("Enter the element: "))
    a.append(element)
max=a[0]
for i in range(1,n):
    if a[i]>max:
        max=a[i]
smax=a[0]
for i in range(1,n):
    if a[i]>smax and a[i]!=max:
        smax=a[i]
print("The second largest element is: ",smax)