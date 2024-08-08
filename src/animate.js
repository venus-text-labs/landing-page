import { animate, inView, stagger } from "motion";

inView(".hero-heading", () => {
    animate(".hero-heading", { opacity: [null, 0.4, 1], x: [100, 10, 0] }, { duration: 2, ease: "ease-in", endDelay: 0.5 });
    animate(".hero-img", { opacity: [null, 0.2, 0.3, 0.4, 0.7, 0.8, 1] }, { duration: 4, ease: "ease-in-out", endDelay: 0.5 });
    animate(".hero-text", { opacity: [null, 0.2, 0.3, 0.4, 0.7, 0.8, 1] }, { duration: 4, ease: "ease-in-out", endDelay: 0.5 });
    animate(".hero-btn", { scale: [0, 0.2, 0.6, 1] }, { duration: 1.4, ease: "ease-in-out", endDelay: 0.5 });
})

inView(".chunk", ({ target }) => {
    const cones = animate(".cone", { opacity: [null, 0.4, 1], scale: [0.3, 0.5, 1, 0.5, 0.3] }, { duration: 5, ease: "ease-in", delay: stagger(0.5), repeat: Infinity });
    return () => cones.stop();
})

inView(".card-container", ({ target }) => {
    animate(".card", { opacity: [0, 1], transform: ['translateY(50px)', 'translateY(0)'] }, {
        duration: 0.8,
        delay: stagger(0.2),
        easing: 'ease-out'
    });
})

animate(".radial-cube", { opacity: [1, 0.8, 0.7, 0.6, 0.5, 0.6, 0.7, 0.8, 1], scale: [1, 1.05, 1] }, { duration: 5, repeat: Infinity });
