import copy
s={'r':'2', 'f':'3' ,'u':[4,5,6]}
p=['e','f','g','h']
print(p[-3:-1])
s['r']=3
print(s['u'][2])
print(s.get('f'))
s.setdefault('m','op')
m=copy.copy(s)
print(m)
s['f']=5
print(s)
if 'u' in s:
    print('y')
else:
    print('n')
s.pop('f')
print(s)
print('abc'.upper())
x=10
def of():
    y=5
    def it():
        z=3
        print(x+y+z)
    it()
    print(x+y)
of()
print(x)
o='my name is pranav'
count=0
for n in o:
    count=count+1
print(count)
q='my name is pranav'
if q.endswith('pranav'):
    print(q)
else:
    print('nothing ')