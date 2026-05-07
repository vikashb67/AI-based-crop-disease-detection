import cv2

image=cv2.imread('/Users/gpranavkaushik/ieee git/black.jpg')
resized = cv2.resize(image,(244,244)) #(width, height)
cv2.imshow("resized image",resized)
sliced=image[0:100, 0:100]
cv2.imshow("sliced image",sliced)
cv2.waitKey(0)
cv2.destroyAllWindows()