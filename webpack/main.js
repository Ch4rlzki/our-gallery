import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
const { firebaseConfig } = require("../webpack-config");

const app = initializeApp(firebaseConfig);
const storage = getStorage();
const storageRef = ref(storage);

const imagesRef = ref(storage, "images");

async function fetchImageUrls() {
    try {
        const imageUrls = [];

        const result = await listAll(imagesRef);
        const promises = result.items.map(item => getDownloadURL(ref(storage, item.fullPath.toString())));
        const urls = await Promise.all(promises);

        imageUrls.push(urls);

        return imageUrls;
    } catch (err) {
        console.log(err.message);
    }
}

(async () => {
    const urls = await fetchImageUrls();
    const gallerycontainer = document.getElementsByClassName("gallerycontainer")[0];

    urls[0].map((url) => {
        const img = document.createElement("img");

        img.src = url;
        img.alt = url;
        img.classList.add("rounded");
        img.addEventListener("dblclick", () => {
            window.open(url);
        });

        gallerycontainer.appendChild(img);
    });
})();