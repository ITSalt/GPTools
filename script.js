function splitText() {
  var input = document.getElementById("input-text").value;
  var contentType = getContentType();

  if (contentType === "text") {
    var blockSize = parseInt(document.getElementById("block-size-input").value);
    var sentences = input.match(/[^\.!\?]+[\.!\?]+/g);
    var blocks = splitIntoBlocks(sentences, blockSize);

    displayBlocks(blocks, contentType);
  } else if (contentType === "code") {
    var blockSize = parseInt(document.getElementById("block-size-input").value);
    var codeBlocks = splitCodeIntoBlocks(input, blockSize);
    displayBlocks(codeBlocks, contentType);
  }
}

function getContentType() {
  var textTypeRadio = document.getElementById("text-type");
  if (textTypeRadio.checked) {
    return "text";
  } else {
    return "code";
  }
}

function splitIntoBlocks(sentences, blockSize) {
  var blocks = [];
  var currentBlock = "";

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

  return blocks;
}

function splitCodeIntoBlocks(code, blockSize) {
  var codeBlocks = [];
  var lines = code.split("\n");
  var currentBlock = "";

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    if (currentBlock.length + line.length <= blockSize) {
      currentBlock += line + "\n";
    } else {
      codeBlocks.push(currentBlock);
      currentBlock = line + "\n";
    }
  }

  if (currentBlock.length > 0) {
    codeBlocks.push(currentBlock);
  }

  return codeBlocks;
}

function createBlock(text) {
  var block = document.createElement("div");
  block.classList.add("block");
  
  var content = document.createElement("div");
  content.classList.add("block-content");
  content.textContent = text;
  block.appendChild(content);

  var copyButton = createCopyButton(text);
  block.appendChild(copyButton);
  
  return block;
}

function displayBlocks(blocks, contentType) {
  var output = document.getElementById("output");
  output.innerHTML = "";

  if (blocks.length > 0) {
    var introText = "Мой текст превышает ограничение по количеству символов, которое можно вставить в одно сообщение, поэтому я разделю его на " + blocks.length + " сообщений. Каждое следующее сообщение будет частью общего текста, в начале будет указан номер части.";
    var introBlock = createBlock(introText);
    output.appendChild(introBlock);
  }

  for (var j = 0; j < blocks.length; j++) {
    var blockText = "Часть номер " + (j + 1) + "\n" + blocks[j];
    var block = createBlock(blockText);
    output.appendChild(block);
  }

  var outroText = "";
  if (contentType === "text") {
    outroText = "Весь текст передан. Теперь задание для тебя: основываясь на прочитанном тексте, выдели главную мысль и предложи материалы с реальными ссылками, которые можно почитать на эту тему.";
  } else if (contentType === "code") {
    outroText = "Весь код передан. Теперь задание для тебя: объедини код в один блок и сделай рефакторинг данного кода с учетом современных требований.";
  }
  var outroBlock = createBlock(outroText);
  output.appendChild(outroBlock);
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
