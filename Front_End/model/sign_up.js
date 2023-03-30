const mongoose = require('mongoose');

const sign_up_data = new mongoose.Schema({
    user_email:{
        type: String
    },
    user_pass:{
        type: String
    },
    user_confpass:{
        type: String
    }
   
  });

  const sign_up_model = mongoose.model('sign_up',sign_up_data);

  module.exports = sign_up_model ;

