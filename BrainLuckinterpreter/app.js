function brainLuck(code, input) {
  let byteArray = new Array(10000).fill(0, 0, 10000);
  let output = '';
  let loopBuffer = []; // contain the loop coordinates
  for (let i = 0, j = 0, k = 0; i < code.length; i++) {
    switch (code[i]) {
      case ',':
        byteArray[k] = input[j++].charCodeAt(0);
        break;
      case '.':
        output += String.fromCharCode(byteArray[k]);
        break;
      case '+':
        byteArray[k] = byteArray[k] == 255 ? 0 : byteArray[k] + 1;
        break;
      case '-':
        byteArray[k] = byteArray[k] == 0 ? 255 : byteArray[k] - 1;
        break;
      case '[':
        if (byteArray[k] == 0) {
          if (code.indexOf('[', i + 1) > code.indexOf(']', i)) {
            i = code.indexOf(']', i);
          } else {
            let shiftCoordinate = i + 1;
            let openBrackets = 0;
            while (true) {
              let nextOpenBracket = code.indexOf('[', shiftCoordinate);
              let nextClosedBracket = code.indexOf(']', shiftCoordinate);

              if (nextOpenBracket < nextClosedBracket) {
                openBrackets++;
              } else {
                openBrackets--;
              }

              if (openBrackets == -1) {
                i = nextClosedBracket;
                break;
              }

              shiftCoordinate = Math.min(nextOpenBracket + 1, nextClosedBracket + 1);
            }
          }
        } else if (!loopBuffer.includes(i)) {
          loopBuffer[loopBuffer.length] = i;
        }
        break;
      case ']':
        if (byteArray[k] != 0) {
          i = loopBuffer[loopBuffer.length - 1];
        } else {
          loopBuffer.pop();
        }
        break;
      case '>':
        k++;
        break;
      case '<':
        k--;
        break;
    }
  }
  const out = document.getElementById('output');
  out.value = output;
}

function clearCode() {
  const code = document.getElementById('code');
  code.value = "";
}