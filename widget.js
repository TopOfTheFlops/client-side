function callCloudinary(){
  cloudinary.openUploadWidget({ cloud_name: 'toothandpail', upload_preset: 'fasiveib'},
    function(error, result){
      if(error) console.log("There was an error", error);
      console.log(result[0].secure_url)
      return result[0].secure_url
    }
  )
}

module.exports = callCloudinary
