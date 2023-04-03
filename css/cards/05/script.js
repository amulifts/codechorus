const inputFields = document.querySelectorAll("input.field");

inputFields.forEach((field) => {
  field.addEventListener("input", handleInput);
});

function handleInput(e) {
  let inputField = e.target;
  if (inputField.value.length >= 1) {
    let nextField = inputField.nextElementSibling;
    return nextField && nextField.focus();
  }
}
