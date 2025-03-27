document.addEventListener("DOMContentLoaded", function () {
    console.log("Animations.js Loaded!");

    // 1️⃣ Smooth Scroll Animation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // 2️⃣ Fade-in & Slide-in Animations on Scroll
    const elements = document.querySelectorAll(".fade-in, .slide-in, .zoom-in");
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(element => {
        observer.observe(element);
    });

    // 3️⃣ Dynamic Text Animation (For Hero Section)
    const textElement = document.querySelector(".dynamic-text");
    if (textElement) {
        const words = ["Your Fitness Journey Starts Here!", "Achieve Your Goals!", "Join Now & Transform!"];
        let index = 0;
        setInterval(() => {
            textElement.textContent = words[index];
            index = (index + 1) % words.length;
        }, 3000);
    }

    // 4️⃣ Parallax Effect (For Background Sections)
    window.addEventListener("scroll", function () {
        document.querySelectorAll(".parallax").forEach(parallax => {
            let speed = parallax.getAttribute("data-speed");
            parallax.style.transform = `translateY(${window.scrollY * speed}px)`;
        });
    });

    // 5️⃣ Hover Animation for Buttons
    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("mouseover", function () {
            this.style.transform = "scale(1.05)";
            this.style.transition = "transform 0.3s ease-in-out";
        });
        button.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1)";
        });
    });

});
