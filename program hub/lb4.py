def factorial(n):
    if n==1 or n==0:
        return 1
    else:
        return n*factorial(n-1)
def bico(N,R):
    return factorial(N)/(factorial(R)*factorial(N-R))
p=int(input(': '))
q=int(input(': '))
if q>p:
    print(factorial(p))
    print('invalid inputs for bico')
elif p<0 or q<0:
    pritn('enter positive values ')
else:
    print(factorial(p))
    print(bico(p,q))