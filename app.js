const imageContainer = document.getElementById('image-container');

let photosArray = [] 
let ready = false;
let imagesloaded = 0;
let totalImages = 0;
let count=5;
const apiKey='DuQw7p8i3ocXvmjL9p7EwnHEemONH8ONx2OSB0lhL3w';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

function imageLoaded(){
    imagesloaded++;
    if(imagesloaded == totalImages){
      //  console.log('Image loaded',imagesloaded);
        ready = true;
        count=30;
      //  console.log('ready=',ready);
    }

}




function displayPhotos(photos){
    imagesloaded = 0;
    totalImages = photos.length;
  //  console.log('total images',totalImages);
    photos.forEach((photo)=>{
        //create an anchor tag
        const item = document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target','_blank');
        //create image for photo
        const img = document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title',photo.alt_description);
        //check if first n images are allowed
        img.addEventListener('load',imageLoaded);
        //appending
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

async function getphotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray =  await response.json();
        displayPhotos(photosArray);
    }catch(error){

    }
}

window.addEventListener('scroll',()=>{
    if(window.innerHeight+ window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready = false;
       getphotos();
       // console.log('load more');
    }
});
getphotos();