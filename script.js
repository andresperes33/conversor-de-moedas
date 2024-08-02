document.addEventListener('DOMContentLoaded', function() {
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const resultDiv = document.getElementById('result');

    function updateResult() {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        resultDiv.innerHTML = `
            <p>
                <img src="./img/${fromCurrency.toLowerCase()}.png" alt="${fromCurrency}">
                <span id="fromAmount" class="bold">0.00</span> <span class="bold">${fromCurrency}</span>
            </p>
            <p>
                <img src="./img/arrow.png" alt="Seta">
            </p>
            <p>
                <img src="./img/${toCurrency.toLowerCase()}.png" alt="${toCurrency}">
                <span id="toAmount" class="bold">0.00</span> <span class="bold">${toCurrency}</span>
            </p>
        `;
    }

    fromCurrencySelect.addEventListener('change', updateResult);
    toCurrencySelect.addEventListener('change', updateResult);

    document.getElementById('convertButton').addEventListener('click', function() {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        const amount = parseFloat(document.getElementById('amount').value);
        const fromAmountSpan = document.getElementById('fromAmount');
        const toAmountSpan = document.getElementById('toAmount');

        if (fromCurrency === toCurrency) {
            resultDiv.innerHTML = '<p>Selecione moedas diferentes para conversão.</p>';
            return;
        }

        const apiKey = '08dc97b1dcf3fb951eac4aa4';
        const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    const exchangeRate = data.conversion_rates[toCurrency];
                    const convertedAmount = amount * exchangeRate;

                    fromAmountSpan.textContent = amount.toFixed(2);
                    toAmountSpan.textContent = convertedAmount.toFixed(2);
                } else {
                    resultDiv.innerHTML = '<p>Erro ao obter taxa de câmbio.</p>';
                }
            })
            .catch(error => {
                console.error('Erro ao buscar a taxa de câmbio:', error);
                resultDiv.innerHTML = '<p>Erro ao buscar a taxa de câmbio.</p>';
            });
    });

    // Initialize the result display
    updateResult();
});
