// This code will run as soon as the page loads
window.onload = function() {
    startSlideshow();
  };

// Put links to our images in this image array.
var images = ["assets/images/beach.jpg", "assets/images/flamingo.jpg", "assets/images/golf.jpg", "assets/images/kayak.jpg", "assets/images/soccer_stadium2.jpg", "assets/images/springs.jpg", "assets/images/universal-day1.jpg", "assets/images/winterpark-station.jpg"];

// Variable showImage will hold the setInterval when we start the slideshow
var showImage;

// Count will keep track of the index of the currently displaying picture.
var count = 0;

// This function will replace display whatever image it's given
// in the 'src' attribute of the img tag.
function displayImage() {
  $("#image-holder").html("<img src=" + images[count] + " width='400px'>");
}

function nextImage() {
  //  TODO: Increment the count by 1.
  count++;

  // TODO: Show the loading gif in the "image-holder" div.
  $("#image-holder").html("<img src='images/loading.gif' width='200px'/>");

  // TODO: Use a setTimeout to run displayImage after 1 second.
  setTimeout(displayImage, 1000);

  // TODO: If the count is the same as the length of the image array, reset the count to 0.
  if (count === images.length) {
    count = 0;
  }
}

function startSlideshow() {

  // TODO: Use showImage to hold the setInterval to run nextImage.
  showImage = setInterval(nextImage, 3000);

}

// This will run the display image function as soon as the page loads.
displayImage();