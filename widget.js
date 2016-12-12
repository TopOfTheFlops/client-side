function callCloudinary(dispatch){
  cloudinary.openUploadWidget({ cloud_name: 'toothandpail', upload_preset: 'fasiveib'},
    function(error, result){
      if(error) console.log("There was an error", error);
      dispatch({ type: 'SAVE_PHOTO_URL', payload: result[0].secure_url })
    }
  )
}

module.exports = callCloudinary
