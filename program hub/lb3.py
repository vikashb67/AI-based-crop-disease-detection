n=int(input('please give the no. terms: '))
f1,f2=0,1
if n==0:
    print('cannot create fibbo ')
elif n==1:
    print(f1)
    print(f2)
else:
    f3=f1+f2
    print(f1)
    print(f2)
    for i in range(3,n+1):
        print(f3)
        f1=f2
        f2=f3
        f3=f1+f2
