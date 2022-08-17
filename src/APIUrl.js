let APIUrl = "http://localhost:3001";
// check if we're running on heroku
if(window.location.host.indexOf('.herokuapp.com') !== -1){
    APIUrl = "https://dougmr-blog-backend.herokuapp.com/";
}

export default APIUrl;
