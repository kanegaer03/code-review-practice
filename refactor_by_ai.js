// 定数定義
const BASE_PRICE_PER_PERSON = 1000;
const GROUP_DISCOUNT_THRESHOLD = 5;
const GROUP_DISCOUNT_RATE = 0.9;
const MEMBER_DISCOUNT_AMOUNT = 500;
const RANK_DISCOUNT_RATE = 0.1;
const MIN_PARTICIPANTS = 1;
const MIN_PRICE = 0;
const RESULT_ELEMENT_ID = 'result';

let rank = "gold";

// お題：イベント予約システムの料金計算・表示処理
//
// 仕様
// 1. 参加人数（num）と、会員かどうか（isMember）を受け取る
// 2. 基本料金は 1 人 1,000 円
// 3. 5 人以上の団体なら 10%オフ
// 4. 会員ならさらに一律 500 円引き
// 5. 最終的なメッセージを画面の特定の要素（ID: result）に表示する

/**
 * 料金を計算する（ビジネスロジック）
 * @param {number} num - 参加人数
 * @param {boolean} isMember - 会員かどうか
 * @param {string|null} rank - ランク（オプション）
 * @returns {number} 計算された料金
 */
function calculatePrice(num, isMember, rank) {
    // 入力検証
    if (typeof num !== 'number' || num < MIN_PARTICIPANTS) {
        throw new Error('参加人数は1人以上で入力してください');
    }

    // 基本料金を計算
    let price = num * BASE_PRICE_PER_PERSON;
    
    // 団体割引（5人以上で10%オフ）
    if (num >= GROUP_DISCOUNT_THRESHOLD) {
        price = price * GROUP_DISCOUNT_RATE;
    }
    
    // 会員割引（一律500円引き）
    if (isMember === true) {
        price = price - MEMBER_DISCOUNT_AMOUNT;
    }
    
    // ランク割引（10%オフ）
    if (rank) {
        const rankDiscount = price * RANK_DISCOUNT_RATE;
        price = price - rankDiscount;
    }
    
    // 料金が負の値にならないようにする
    return Math.max(price, MIN_PRICE);
}

/**
 * 結果を画面に表示する
 * @param {string} message - 表示するメッセージ
 */
function displayResult(message) {
    const element = document.getElementById(RESULT_ELEMENT_ID);
    if (!element) {
        throw new Error(`要素ID "${RESULT_ELEMENT_ID}" が見つかりません`);
    }
    element.innerHTML = message;
}

/**
 * 料金計算と表示を実行する
 * @param {number} num - 参加人数
 * @param {boolean} isMember - 会員かどうか
 * @param {string|null} rank - ランク（オプション）
 */
function calculateAndDisplayPrice(num, isMember, rank) {
    try {
        const total = calculatePrice(num, isMember, rank);
        const message = `合計料金: ${Math.floor(total)}円`;
        displayResult(message);
        return message;
    } catch (error) {
        const errorMessage = error.message || 'エラーが発生しました';
        displayResult(errorMessage);
        console.error('料金計算エラー:', error);
        return errorMessage;
    }
}

calculateAndDisplayPrice(3, true, rank);
