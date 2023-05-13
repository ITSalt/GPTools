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

    if (blocks.length > 0) {
      var introBlock = document.createElement("div");
      introBlock.classList.add("block");

      var introHeader = document.createElement("div");
      introHeader.classList.add("block-header");
      var introHeaderText = document.createElement("div");
      introHeaderText.classList.add("block-header-text");
      introHeaderText.innerText = "Мой текст превышает ограничение по количеству символов, которое можно вставить в одно сообщение, поэтому я разделю его на " + blocks.length + " сообщений. Каждое следующее сообщение будет частью общего текста, в начале будет указан номер части. После того, как я передам все части текста, собери воедино все части и напиши основные мысли, которые изложены в переданном тексте. Выдели главную. Предложи материалы с реальными ссылками, которые можно почитать на тему из текста";
      introHeader.appendChild(introHeaderText);
      introBlock.appendChild(introHeader);

      output.appendChild(introBlock);
    }

    for (var j = 0; j < blocks.length; j++) {
      var block = document.createElement("div");
      block.classList.add("block");

      var header = document.createElement("div");
      header.classList.add("block-header");
      var headerText = document.createElement("div");
      headerText.classList.add("block-header-text");
      headerText.innerText = "Часть номер " + (j + 1);
      header.appendChild(headerText);
      block.appendChild(header);

      var content = document.createElement("div");
      content.innerText = blocks[j];
      block.appendChild(content);

      var copyButton = document.createElement("button");
      copyButton.innerText = "Скопировать в буфер обмена";
      copyButton.onclick = (function(text) {
        return function() {
          copyToClipboard(text);
        };
      })(blocks[j]);
      header.appendChild(copyButton);

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
