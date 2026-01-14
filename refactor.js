// お題：イベント予約システムの料金計算・表示処理
//
// 仕様
// 1. 参加人数（participants）と、会員かどうか（isMember）を受け取る
// 2. 基本料金は 1 人 1,000 円
// 3. 5 人以上の団体なら 10%オフ
// 4. 会員ならさらに一律 500 円引き
// 5. 最終的なメッセージを画面の特定の要素（ID: result）に表示する

const PRICE_PER_PERSON = 1000;
const GROUP_DISCOUNT_THRESHOLD = 5;
const GROUP_DISCOUNT_RATE = 0.1;
const MEMBER_DISCOUNT = 500;

function calculatePrice(participants, isMember) {
    if (participants < 1) {
        return null;
    }
    
    let price = participants * PRICE_PER_PERSON;
    
    if (participants >= GROUP_DISCOUNT_THRESHOLD) {
        price = price * (1 - GROUP_DISCOUNT_RATE);
    }
    
    if (isMember) {
        price = price - MEMBER_DISCOUNT;
    }
    
    if (price < 0) {
        price = 0;
    }
    
    return price;
}

function displayResult(message) {
    const resultElement = document.getElementById('result');
    if (resultElement) {
        resultElement.textContent = message;
    }
}

function handleCalculation(participants, isMember) {
    const price = calculatePrice(participants, isMember);
    
    if (price === null) {
        displayResult('参加人数は1人以上で入力してください');
        return;
    }
    
    const message = `合計料金: ${price}円`;
    displayResult(message);
    return message;
}

handleCalculation(3, true);