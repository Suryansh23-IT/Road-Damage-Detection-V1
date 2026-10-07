const uploadTab = document.getElementById("uploadTab");
const predictBtn = document.getElementById("predictBtn");

const uploadSection = document.getElementById("uploadSection");
const dropZone = document.getElementById("dropZone");
const mediaUpload = document.getElementById("mediaUpload");
const preview = document.getElementById("preview");
const loader = document.getElementById("loader");

let selectedFile = null;


// Upload button
uploadTab.addEventListener("click", () => {
    uploadSection.classList.remove("hidden");
});


// Open file selector
dropZone.addEventListener("click", () => {
    mediaUpload.click();
});


// File selected
mediaUpload.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (file) {
        handleFile(file);
    }

});


// Drag and drop
dropZone.addEventListener("dragover", (event) => {

    event.preventDefault();

    dropZone.style.borderColor = "#2563eb";

});


dropZone.addEventListener("dragleave", () => {

    dropZone.style.borderColor = "#94a3b8";

});


dropZone.addEventListener("drop", (event) => {

    event.preventDefault();

    dropZone.style.borderColor = "#94a3b8";

    const file = event.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {

        handleFile(file);

    } else {

        alert("Please upload an image file.");

    }

});


// Display selected image
function handleFile(file) {

    if (!file.type.startsWith("image/")) {

        alert("Please select an image file.");

        return;

    }

    selectedFile = file;

    const reader = new FileReader();

    reader.onload = (event) => {

        preview.innerHTML = `
            <img src="${event.target.result}" 
                 alt="Selected Road Image">
        `;

    };

    reader.readAsDataURL(file);
}


// Analyze button
predictBtn.addEventListener("click", async () => {

    if (!selectedFile) {

        alert("Please upload a road image first.");

        return;

    }

    loader.classList.remove("hidden");
    loader.innerHTML = "⏳ Analyzing road damage...";

    const formData = new FormData();

    formData.append("file", selectedFile);


    try {

        const response = await fetch("/predict_image", {

            method: "POST",

            body: formData

        });


        const data = await response.json();


        if (data.error) {

            alert(data.error);

            return;

        }


        // Display YOLO annotated result
        preview.innerHTML = `
            <img src="${data.result_image}?t=${Date.now()}"
                 alt="Road Damage Detection Result">
        `;


        // Update detection counts
        document.getElementById("D00").textContent = data.counts.D00;
        document.getElementById("D10").textContent = data.counts.D10;
        document.getElementById("D20").textContent = data.counts.D20;
        document.getElementById("D40").textContent = data.counts.D40;
        document.getElementById("OTHER").textContent = data.counts.OTHER;


    } catch (error) {

        console.error(error);

        alert("Something went wrong while analyzing the image.");

    } finally {

        loader.classList.add("hidden");

    }

});