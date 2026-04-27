const http = require('http');

const html = `
<!DOCTYPE html>
<html lang="el">
<head>
  <meta charset="UTF-8">
  <title>AKS Cloud Calculator</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #282c34; color: #fff; margin: 0; }
    .calculator { background: #20232a; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); text-align: center; }
    input, select, button { margin: 10px 5px; padding: 12px; font-size: 18px; border: none; border-radius: 8px; outline: none; }
    input { width: 100px; text-align: center; }
    button { background-color: #61dafb; color: #20232a; cursor: pointer; font-weight: bold; transition: 0.3s; }
    button:hover { background-color: #21a1c4; }
    h2 { margin-top: 0; color: #61dafb; }
    h3 { margin-bottom: 0; color: #98c379; }
  </style>
</head>
<body>
  <div class="calculator">
    <h2>☁️ AKS Cloud Calculator ☁️</h2>
    <input type="number" id="num1" placeholder="Αριθμός 1">
    <select id="operator">
      <option value="+">+</option>
      <option value="-">-</option>
      <option value="*">x</option>
      <option value="/">÷</option>
    </select>
    <input type="number" id="num2" placeholder="Αριθμός 2">
    <br>
    <button onclick="calculate()">Υπολογισμός</button>
    <h3 id="result">Αποτέλεσμα: -</h3>
  </div>
  <script>
    function calculate() {
      const n1 = parseFloat(document.getElementById('num1').value);
      const n2 = parseFloat(document.getElementById('num2').value);
      const op = document.getElementById('operator').value;
      let res = 'Σφάλμα';
      
      if (!isNaN(n1) && !isNaN(n2)) {
        if(op === '+') res = n1 + n2;
        if(op === '-') res = n1 - n2;
        if(op === '*') res = n1 * n2;
        if(op === '/') res = n2 !== 0 ? n1 / n2 : 'Δεν ορίζεται η διαίρεση με το μηδέν!';
      } else {
        res = 'Βάλε αριθμούς!';
      }
      document.getElementById('result').innerText = 'Αποτέλεσμα: ' + res;
    }
  </script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200);
    res.end('OK');
  } else {
    // Στέλνουμε το HTML της αριθμομηχανής
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  }
});

server.listen(8080, () => console.log('Server listening on port 8080'));