st={}
n=int(input())
for i in range(n):
    name= input()
    score=float(input())
    st[name]=score
vals=list(st.values())
maxi=vals[0]
for i in range(n):
    if(maxi>vals[i]):
        maxi=vals[i]
maxi2=vals[0]
for i in range(n):
    if(maxi2>vals[i] and vals[i]!=maxi):
        maxi2= vals[i]
keyl=[]
for key, val in st.items():
    if(val==maxi2):
        keyl.append(key)
keyl.sort()
for i in range(len(keyl)):
    print(keyl[i])