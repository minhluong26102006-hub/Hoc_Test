(function (global) {
    'use strict';

    // Module tự động cập nhật active menu theo vị trí cuộn trang
    const MLScrollspy = {
        init: function (navSelector, sectionSelector, activeClass = "ml-nav-link--active", offsetTop = 130) {
            const navLinks = document.querySelectorAll(navSelector);
            const sections = document.querySelectorAll(sectionSelector);
            if (!navLinks.length || !sections.length) return;

            function updateActiveLink() {
                let currentSectionId = "";
                const scrollY = window.pageYOffset || document.documentElement.scrollTop;

                sections.forEach(function (section) {
                    const top = section.offsetTop - offsetTop;
                    const height = section.offsetHeight;
                    if (scrollY >= top && scrollY < top + height) {
                        currentSectionId = section.getAttribute("id");
                    }
                });

                navLinks.forEach(function (link) {
                    link.classList.remove(activeClass);
                    if (link.getAttribute("href") === "#" + currentSectionId) {
                        link.classList.add(activeClass);
                    }
                });
            }

            window.addEventListener("scroll", updateActiveLink, { passive: true });
            updateActiveLink();
        }
    };

    global.MLScrollspy = MLScrollspy;
})(typeof window !== 'undefined' ? window : this);
