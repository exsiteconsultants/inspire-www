window.addEventListener("load", (event) => {
  // Get the team-nav html element
  const teamNav = document.getElementById("team-nav");

  // Then get all the links and it's associated target element
  const links = teamNav.querySelectorAll("a");

  // Now hide all the content
  links.forEach((link) => {
    const target = link.getAttribute("data-target");
    const contentElement = document.querySelector(target);
    contentElement.classList.add("is-hidden");

    link.addEventListener("click", (event) => {
      event.preventDefault();

      // Turn off the existing content and tab
      const currentActive = teamNav.querySelector(".is-active");
      currentActive.classList.remove("is-active");
      const currentContentSelector = currentActive
        .querySelector("a")
        .getAttribute("data-target");
      const currentContent = document.querySelector(currentContentSelector);
      currentContent.classList.add("is-hidden");
      currentContent.classList.remove("is-active");

      // Now make the new tab and content active
      event.target.parentElement.classList.add("is-active");
      const newContentSelector = event.target.getAttribute("data-target");
      const newContent = document.querySelector(newContentSelector);
      newContent.classList.add("is-active");
      newContent.classList.remove("is-hidden");
    });
  });

  // Set the first tab as selected and also it's content
  const firstLink = links.item(0);
  firstLink.parentElement.classList.add("is-active");
  const contentTargetSelector = firstLink.getAttribute("data-target");
  const content = document.querySelector(contentTargetSelector);
  content.classList.add("is-active");
  content.classList.remove("is-hidden");
});
