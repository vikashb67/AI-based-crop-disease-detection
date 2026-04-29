import zipfile
newZip=zipfile.ZipFile('compressed.zip','w')
newZip.write('Class-1.pdf')
newZip.close()