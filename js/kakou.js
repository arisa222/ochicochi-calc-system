const prices = {
    '着物': {
        '国内': {
            '裄直し': 18700,
            '袖丈直し': 12100,
            '身巾直し': 26400,
            '身丈直し（内揚げ）': 26400,
            '身丈直し（裾）': 14300,
            '胴裏交換': 28600,
            '八掛交換': 26400,
            'バチ衿→広衿': 13200,
            '広衿→バチ衿': 13200
        },
        '海外': {
            '裄直し': 12100,
            '袖丈直し': 9900,
            '身巾直し': 15400,
            '身丈直し（内揚げ）': 13200,
            '身丈直し（裾）': 12100,
            '胴裏交換': 15400,
            '八掛交換': 13200
        }
    },
    '襦袢': {
        '国内': {
            '裄直し': 16500,
            '袖丈直し': 9900,
            '身巾直し': 16500,
            '身丈直し（内揚げ）': 16500,
            '身丈直し（裾）': 9900
        },
        '海外': {
            '裄直し': 9900,
            '袖丈直し': 9900,
            '身巾直し': 12100,
            '身丈直し（内揚げ）': 12100,
            '身丈直し（裾）': 9900
        }
    }
};

// 前処理の料金
const preprocessingPrices = {
    'なし': 0,
    '湯のし': 1000,
    '筋消し': 3000
};



document.getElementById('product').addEventListener('change', function() {
    updateServices();
    calculateCost(); // 加工内容が更新されるたびに自動的に見積もりを表示
});
document.getElementById('location').addEventListener('change', function() {
    updateServices();
    calculateCost(); // 加工内容が更新されるたびに自動的に見積もりを表示
});
document.getElementById('service').addEventListener('change', calculateCost); // 加工内容が変更されたときに見積もりを自動的に表示

// updateServices の最後にも calculateCost を呼び出して、サービスの選択肢が変更されたときにも自動的に合計を更新
function updateServices() {
    const product = document.getElementById('product').value;
    const location = document.getElementById('location').value;
    const serviceSelect = document.getElementById('service');
    serviceSelect.innerHTML = '';

    const services = prices[product][location];
    Object.keys(services).forEach(service => {
        const option = document.createElement('option');
        option.value = service;
        option.textContent = service;
        serviceSelect.appendChild(option);
    });
    calculateCost(); // 加工内容の選択肢が更新されるたびに見積もりを自動的に更新
}

// 以前定義されたイベントリスナーに加え、前処理が変わった場合も処理を実行
document.getElementById('preprocessing').addEventListener('change', calculateCost);
// calculateCost 関数を更新して、前処理のコストも含める



// calculateCost 関数を更新して、前処理のコストも含める
function calculateCost() {
    const product = document.getElementById('product').value;
    const location = document.getElementById('location').value;
    const service = document.getElementById('service').value;
    const preprocessing = document.getElementById('preprocessing').value;
    
    // 前処理のコストを取得（数値として）
    const preprocessCost = preprocessingPrices[preprocessing] || 0;
    
    // 加工内容の価格を取得（数値として）
    let serviceCost = prices[product] && prices[product][location] && prices[product][location][service];
    if (typeof serviceCost === 'string') {
        serviceCost = parseInt(serviceCost.replace("¥", "").replace(/,/g, ""), 10);
    }

    // 総コストの計算
    const totalCost = serviceCost + preprocessCost;

    // 内訳と合計コストの表示処理
    const detailsElement = document.getElementById('details');
    const costElement = document.getElementById('totalCost');

    detailsElement.innerHTML = `<p>商品: ${product}</p>
                                <p>加工地: ${location}</p>
                                <p>加工内容: ${service}: ¥${serviceCost.toLocaleString()}</p>
                                <p>前処理: ${preprocessing}: ¥${preprocessCost.toLocaleString()}</p>`;

    costElement.textContent = `合計: ¥${totalCost.toLocaleString()}`;
}


// 最初にページが読み込まれたときの実行
updateServices();
calculateCost(); // 初期状態での計算も行います