function splitText() {
  var input = document.getElementById("input-text").value;
  var blockSize = parseInt(document.getElementById("block-size-input").value);
  var sentences = input.match(/[^\.!\?]+[\.!\?]+/g);
  var output = document.getElementById("output");
  var charCount = document.getElementById("char-count");
  output.innerHTML = "";
  charCount.innerHTML = "";

  if (sentences) {
    var blocks = [];
    var currentBlock = "";
    var blockIndex = 1;

    for (var i = 0; i < sentences.length; i++) {
      if (currentBlock.length + sentences[i].length <= blockSize) {
        currentBlock += sentences[i];
      } else {
        blocks.push(currentBlock);
        currentBlock = sentences[i];
      }
    }

    if (currentBlock.length > 0) {
      blocks.push(currentBlock);
    }

    for (var j = 0; j < blocks.length; j++) {
      var block = document.createElement("div");
      block.classList.add("block");

      var header = document.createElement("div");
      header.classList.add("block-header");
      header.innerText = "Вот часть номер " + (blockIndex++);
      block.appendChild(header);

      var content = document.createElement("div");
      content.innerText = blocks[j];
      block.appendChild(content);

      var copyButton = document.createElement("button");
      copyButton.innerText = "Скопировать в буфер обмена";
      copyButton.onclick = function() {
        copyToClipboard(blocks[j]);
      };
      block.appendChild(copyButton);

      output.appendChild(block);
    }

    var totalChars = input.replace(/\s/g, "").length;
    charCount.innerText = "Общее количество символов: " + totalChars;
  }
}

function copyToClipboard(text) {
  var textarea = document.createElement("textarea");
    textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  alert("Текст скопирован в буфер обмена!");
}

function clearText() {
  document.getElementById("input-text").value = "";
  document.getElementById("output").innerHTML = "";
  document.getElementById("char-count").innerHTML = "";
}
