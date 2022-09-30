const backBtn = document.querySelector(".back");
backBtn.addEventListener("click", () => {
    location.assign("./index.html");
});

setTimeout(() => {
    if (db) {
        let imageDBTransaction = db.transaction("image", "readonly");
        let imageStore = imageDBTransaction.objectStore("image");
        let imageRequest = imageStore.getAll();
        imageRequest.onsuccess = function () {
            if (imageRequest.result !== undefined) {
                console.log("Images", imageRequest.result);
                let imageResult = imageRequest.result;
                let galleryCont = document.querySelector(".gallery-cont");
                imageResult.forEach((imageObj) => {
                    //create a img container
                    console.log(imageObj);
                    let url = imageObj.url;
                    let imageEle = document.createElement("div");
                    imageEle.setAttribute("class", "media-cont");
                    // add image to that container
                    imageEle.innerHTML = `
                <div class="media">
                <img src="${url}"/>
                </div>
                <div class="delete action-btn">DELETE</div>
                <div class="download action-btn">DOWNLOAD</div>
              `;
                    //appendchild in gallery-cont
                    galleryCont.appendChild(imageEle);
                });
            } else {
                console.log("No such images");
            }
        };
    }
}, 100);

function deleteListener(e) {
    //get id from e
    let id = e.target.parentElement.getAttribute("id");
    console.log(id);
    //find id belongs to which store
    let mediaType = id.split("-")[0]; //img
    console.log(mediaType);
    // go into the db of video/img
    //delete it
    if (mediaType == "img") {
      let imageDBTransaction = db.transaction("image", "readwrite");
      let imageStore = imageDBTransaction.objectStore("image");
      imageStore.delete(id);
    } else {
      //video
      let videoDBTransaction = db.transaction("video", "readwrite");
      let videoStore = videoDBTransaction.objectStore("video");
      videoStore.delete(id);
    }
    //delete from frontend
      e.target.parentElement.remove();
  }
  
  function downloadListener() {
      
  }
  