document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("bg-video");

    // Pause video on click
    video.addEventListener("click", function() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    console.log("Video background loaded successfully!");
});
