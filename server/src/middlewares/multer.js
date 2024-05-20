import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //Cambio
    const { docType } = req.params
    let destinationFolder
    switch (docType) {
      case 'identification':
        destinationFolder = 'src/public/uploads/documents/identification'
        break
      case 'address':
        destinationFolder = 'src/public/uploads/documents/address'
        break
      case 'status':
        destinationFolder = 'src/public/uploads/documents/status'
        break
      case 'profileImg':
        destinationFolder = 'src/public/uploads/profiles'
        break
      case 'productImg':
        destinationFolder = 'src/public/uploads/products'
        break
      default:
        cb(new Error('Invalid document type'))
    }
    cb(null, destinationFolder)
  },
  filename: function (req, file, cb) {
    //Cambio
    const { uId, docType } = req.params

    let newFileName
    switch (docType) {
      case 'identification':
        newFileName = `${uId}-${docType}.${file.originalname}`
        break
      case 'address':
        newFileName = `${uId}-${docType}.${file.originalname}`
        break
      case 'status':
        newFileName = `${uId}-${docType}.${file.originalname}`
        break
      case 'profileImg':
        newFileName = `${uId}-${docType}.${file.originalname}`
        break
      case 'productImg':
        newFileName = `${uId}-${docType}.${file.originalname}`
        break
      default:
        cb(new Error('Invalid document type'))
    }
    cb(null, newFileName)
  },
})

const uploader = multer({ storage: storage })

export default uploader
