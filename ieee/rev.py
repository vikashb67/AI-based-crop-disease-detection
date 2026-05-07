import cv2

address=input("enter the address of the image to open:")
image=cv2.imread(address)
if image is None:
    print('Could not open or find the image')
else:
    print("image opened successfully")
    gray=cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
    while True:
        n=int(input("enter\n1 - if you want to display the image\n2 - if you want to save the image\n3 - Exit: "))
        if n==1:
            cv2.imshow('gray image',gray)
            cv2.waitKey(0)
            cv2.destroyAllWindows()
        elif n==2:
            name=input("enter the name for the image to save:")
            name+=".jpg"
            cv2.imwrite(name, gray)
        elif n==3:
            break
        else:
            print("invalid input")