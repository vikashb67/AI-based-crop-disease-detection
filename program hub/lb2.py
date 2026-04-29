name=input('enter your name: ')
yob=int(input('enter your year of birth: '))
age=2025-yob
if age>=60:
    print('you are a senior citizen')
elif age<=16:
    print('you are still a kid ')
else:
    print('you are not a senior citizen ')
