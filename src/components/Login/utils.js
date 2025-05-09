export const addActiveClass = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.add("active");
    }
  };
  
  // Fonction pour supprimer la classe "active"
  export const removeActiveClass = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.remove("active");
    }
  };