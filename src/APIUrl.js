let APIUrl = "http://localhost:3001";
// check if we're running on heroku
// if(window.location.host.indexOf('.herokuapp.com') !== -1){
//     APIUrl = "https://dougmr-blog-backend.herokuapp.com";
// }
// check if we're running on AWS S3
if(window.location.host.indexOf('shopfaster.app') !== -1){
    // APIUrl = "capstoneshopfaster-env.eba-qpq3xf3k.us-east-1.elasticbeanstalk.com";
    // APIUrl = "https://capstoneshopfaster-env.eba-qpq3xf3k.us-east-1.elasticbeanstalk.com"
    APIUrl = "https://api.shopfaster.app";
}

export default APIUrl;
