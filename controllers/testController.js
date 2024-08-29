const testController =(req,res)=>{
  try {
    res.status(200).json({
      success:true,
      message:'MVC pattern working fine'
    })
  } catch (error) {
    console.log(`testUserController :: ${error}`)
  }
}

module.exports = {testController}

