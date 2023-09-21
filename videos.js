var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/:id/:uid', (req, res) => {
    let data = JSON.stringify({
      "expires_after_first_usage": true,
      "annotations": [
        {
          "type": "static",
          "text": "Testpress",
          "x": 10,
          "y": 10,
          "opacity": "0.5",
          "color": "#FFF",
          "size": 6
        },
        {
          "type": "dynamic",
          "text": req.params.uid,
          "opacity": "0.5",
          "color": "#FF0000",
          "size": 6,
          "interval": 5000,
          "skip": 10 * 1000
        }
      ]
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://app.tpstreams.com/api/v1/4m8rfh/assets/'+ req.params.id +'/access_tokens/',
      headers: { 
        'Authorization': 'Token 2e0ce456f7cb4514ab90b8511de81869dd20b04de4e6e6c2d29162b022ad7884', 
        'Content-Type': 'application/json',
      },
      data : data
    };
  
  
  axios.request(config)
  .then((response) => {
      res.send(response.data.playback_url);
  })
  .catch((error) => {
    console.log(error);
  });
    
  });
  

module.exports = router;