const select = (s) => document.querySelector(s);

const btn = select(".expandable-button");

btn.addEventListener("click", () => {
  btn.classList.toggle("expanded");
});
