import numpy as np

a= int(input("enter the 1st number: "))
b= int(input("enter the 2nd number: "))
c=input("enter the operator: ")
if c=="+":
    print(a+b)
elif c=="-":
    print(a-b)
elif c=="*":
    print(a*b)
elif c=="/":
    print(a/b)
elif c=="%":
    print(a%b)
else:    
    print("invalid operator")  