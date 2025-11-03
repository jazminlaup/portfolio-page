document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (!hamburger || !navMenu) return;

  const setMenuState = (isOpen) => {
    hamburger.classList.toggle("active", isOpen);
    navMenu.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.classList.toggle("menu-open", isOpen);
  };

  hamburger.addEventListener("click", () => {
    const nextState = !navMenu.classList.contains("active");
    setMenuState(nextState);
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  const desktopQuery = window.matchMedia("(min-width: 601px)");
  const handleViewportChange = (event) => {
    if (event.matches) {
      setMenuState(false);
    }
  };

  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener("change", handleViewportChange);
  } else if (desktopQuery.addListener) {
    desktopQuery.addListener(handleViewportChange);
  }
});
