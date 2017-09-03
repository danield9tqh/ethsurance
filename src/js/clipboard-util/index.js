

export const copyTextToClipboard = (text) => {
  // Create new div with text inside
  const textNode = document.createTextNode(text);
  const newDiv = document.createElement('div');
  newDiv.appendChild(textNode)
  newDiv.className = "copy-text-class-name";
  newDiv.style.opacity = "0";

  // Append new div to document body
  document.body.appendChild(newDiv);

  // Get newly appended div
  const appendedDiv = document.querySelector(".copy-text-class-name");

  // Add newly appended div to window selection
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(appendedDiv);
  selection.removeAllRanges();
  selection.addRange(range);

  // Execute copy selection
  const successful = document.execCommand('copy');

  // Clean up selection and remove appended div
  selection.removeAllRanges();
  appendedDiv.remove();
};
