document.getElementById('convertButton').addEventListener('click', function() {
    let fromCurrency = document.getElementById('fromCurrency').value;
    let toCurrency = document.getElementById('toCurrency').value;
    let amount = parseFloat(document.getElementById('amount').value.replace(/[^\d.-]/g, ''));
    let resultDiv = document.getElementById('result');

    if (fromCurrency === toCurrency) {
        resultDiv.innerHTML = '<p>Selecione moedas diferentes para conversão.</p>';
        return;
    }

    let apiKey = '08dc97b1dcf3fb951eac4aa4';
    let apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}?timestamp=${new Date().getTime()}`;

    console.log(`Fetching data from API: ${apiUrl}`);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data);
            if (data.result === 'success') {
                let exchangeRate = data.conversion_rates[toCurrency];
                console.log(`Exchange rate from ${fromCurrency} to ${toCurrency}: ${exchangeRate}`);
                
                let convertedAmount = amount * exchangeRate;
                resultDiv.innerHTML = `
                    <p>
                        <img src="./img/${fromCurrency.toLowerCase()}.png" alt="${fromCurrency}">
                        ${fromCurrency} ${amount.toFixed(2)}
                    </p>
                    <p>
                        <img src="./img/arrow.png" alt="Seta">
                    </p>
                    <p>
                        <img src="./img/${toCurrency.toLowerCase()}.png" alt="${toCurrency}">
                        ${toCurrency} ${convertedAmount.toFixed(2)}
                    </p>
                `;

                console.log(`Converted ${amount} ${fromCurrency} to ${convertedAmount.toFixed(2)} ${toCurrency}`);
            } else {
                resultDiv.innerHTML = '<p>Erro ao obter taxa de câmbio.</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar a taxa de câmbio:', error);
            resultDiv.innerHTML = '<p>Erro ao buscar a taxa de câmbio.</p>';
        });
});
