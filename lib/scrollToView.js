export const scrollToView = (sectionRef) => {
  const orderSection = document.getElementById(sectionRef);
  if (orderSection) {
    const rect = orderSection.getBoundingClientRect();
    // Check if the section is already in view
    if (
      rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    ) {
      return; // Section is already in view; do nothing
    }
    // Scroll to the section smoothly
    orderSection.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};
