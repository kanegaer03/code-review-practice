let rank = "gold";

// お題：イベント予約システムの料金計算・表示処理
//
// 仕様
// 1. 参加人数（num）と、会員かどうか（isMember）を受け取る
// 2. 基本料金は 1 人 1,000 円
// 3. 5 人以上の団体なら 10%オフ
// 4. 会員ならさらに一律 500 円引き
// 5. 最終的なメッセージを画面の特定の要素（ID: result）に表示する
function calculatePrice(num, isMember, rank) {
    try {
        if (num >= 1) {
            let price = 0;
            price = num * 1000;
            
            if (num >= 5) {
                price = price * 0.9;
            }
            
            if (isMember == "true") {
                price = price - 500;
            }
            
            let rankDiscount = 0;
            if (rank) {
                rankDiscount = price * 0.1;
            }
            
            let total = price;
            
            if (total < 0) {
                total = 0;
            }
            
            const message = '合計料金: ' + total + '円';
            const element = document.getElementById('result');
            element.innerHTML = message;
            return message;
        } else {
            const element = document.getElementById('result');
            element.innerHTML = '参加人数は1人以上で入力してください';
            return '参加人数は1人以上で入力してください';
        }
        
    } catch (error) {
        console.log(error);
    }
}

calculatePrice(3, true, rank);
