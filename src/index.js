const swiper = new Swiper(".swiper", {
   // Optional parameters
   loop: true,
   autoplay: true,

   // If we need pagination
   pagination: {
      el: ".swiper-pagination",
   },

   // Navigation arrows
   navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
   },
});

let startIndex = 0;

async function gallery() {
   try {
      const response = await fetch("https://picsum.photos/v2/list");
      const json = await response.json();

      const galleryItems = document.querySelectorAll(".swiper-slide");

      json.slice(0, 4).forEach((photo, index) => {
         if (index < galleryItems.length) {
            const slide = galleryItems[index];
            const img = document.createElement("img");
            img.src = photo.download_url;
            img.alt = photo.author;
            slide.append(img);
         }
      });

      startIndex = 4;

      const addImageBtn = document.getElementById("add");
      const clearGalleryBtn = document.getElementById("clear");
      const deleteLastImg = document.getElementById("delete");
      const reverseBtn = document.getElementById("reverse");
      addImageBtn.addEventListener("click", () => {
         const galleryContainer = document.querySelector(".swiper-wrapper");
         const slice = json.slice(startIndex, startIndex + 4);

         slice.forEach((photo) => {
            const slide = document.createElement("div");
            const img = document.createElement("img");
            slide.classList.add("swiper-slide");
            img.src = photo.download_url;
            img.alt = photo.author;
            slide.appendChild(img);
            galleryContainer.appendChild(slide);
         });

         startIndex += 4;
         swiper.update();
         swiper.pagination.render();
         swiper.pagination.update();
      });
      clearGalleryBtn.addEventListener("click", () => {
         const galleryContainer = document.querySelector(".swiper-wrapper");
         galleryContainer.innerHTML = "";
         startIndex = 0;
      });
      deleteLastImg.addEventListener("click", () => {
         const galleryList = document.querySelectorAll(".swiper-slide");
         if (galleryList.length > 0) {
            const lastSlide = galleryList[galleryList.length - 1];
            lastSlide.parentNode.removeChild(lastSlide);
            swiper.update();
         }
      });
      reverseBtn.addEventListener("click", () => {
         const galleryList = document.querySelectorAll(".swiper-slide");
         const arrayOfImg = Array.from(galleryList);
         const galleryContainer = document.querySelector(".swiper-wrapper");
         arrayOfImg.reverse();
         galleryContainer.innerHTML = "";
         arrayOfImg.map((slide) => {
            galleryContainer.appendChild(slide);
         });
      });
   } catch (error) {
      alert(error);
   }
}

gallery();
