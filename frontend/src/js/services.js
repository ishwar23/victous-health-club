document.addEventListener("DOMContentLoaded", function() {
    console.log("Services Page Loaded!");

    // Hover Effect for Services
    document.querySelectorAll(".service-card").forEach(card => {
        card.addEventListener("mouseover", function() {
            this.style.boxShadow = "0px 8px 20px rgba(0, 0, 0, 0.2)";
        });

        card.addEventListener("mouseleave", function() {
            this.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)";
        });
    });
});
