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

    document.getElementById('convertButton').addEventListener('click', async function() {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        const amount = parseFloat(document.getElementById('amount').value);
        const fromAmountSpan = document.getElementById('fromAmount');
        const toAmountSpan = document.getElementById('toAmount');

        if (fromCurrency === toCurrency) {
            resultDiv.innerHTML = '<p>Selecione moedas diferentes para conversão.</p>';
            return;
        }

        const apiUrl = `https://economia.awesomeapi.com.br/last/${fromCurrency}-${toCurrency}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const conversionKey = `${fromCurrency}${toCurrency}`;
            const exchangeRate = data[conversionKey].bid;
            const convertedAmount = amount * exchangeRate;

            fromAmountSpan.textContent = amount.toFixed(2);
            toAmountSpan.textContent = convertedAmount.toFixed(2);
        } catch (error) {
            console.error('Erro ao buscar a taxa de câmbio:', error);
            resultDiv.innerHTML = '<p>Erro ao buscar a taxa de câmbio.</p>';
        }
    });

    // Initialize the result display
    updateResult();
});
