// Export and import github labels

// Export, run in console:

var labels = [];
[].slice.call(document.querySelectorAll(".label-link"))
.forEach(function(element) {
  labels.push({
    name: element.textContent.trim(),
    // using style.backgroundColor might returns "rgb(...)"
    color: element.getAttribute("style")
      .replace("background-color:", "")
      .replace(/color:.*/,"")
      .trim()
      // github wants hex code only without # or ;
      .replace(/^#/, "")
      .replace(/;$/, "")
      .trim(),
  })
})
console.log(JSON.stringify(labels, null, 2))

// Import, copy output from above and replace json below then run in console:

[
  {
    "name": "label1",
    "color": "000000"
  },
].forEach(function(label) {
  addLabel(label)
})

function updateLabel (label) {
  var flag = false;
  [].slice.call(document.querySelectorAll(".labels-list-item"))
  .forEach(function(element) {
    if (element.querySelector('.label-link').textContent.trim() === label.name) {
      flag = true
      element.querySelector('.js-edit-label').click()
      element.querySelector('.label-edit-name').value = label.name
      element.querySelector('.color-editor-input').value = '#' + label.color
      element.querySelector('.new-label-actions .btn-primary').click()
    }
  })
  return flag
}

function addNewLabel (label) {
  document.querySelector('.new-label input#label-').value = label.name
  document.querySelector('.new-label input#edit-label-color-new').value = '#' + label.color
  document.querySelector('.new-label-actions .btn-primary').click()
}

function addLabel (label) {
  if (!updateLabel(label)) addNewLabel(label)
}
