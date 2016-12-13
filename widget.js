function callCloudinary (dispatch) {
  cloudinary.openUploadWidget({ cloud_name: 'top-of-the-flops', upload_preset: 'clientuploads' } ,
    function(error, result){
      if(error) console.log("There was an error", error);
      dispatch({ type: 'SAVE_PHOTO_URL', payload: result[0].secure_url })
    }
  )
}

module.exports = callCloudinary
