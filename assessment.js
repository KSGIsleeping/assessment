'use strict';//'use strict'; は、宣言後の記述ミスをエラーとして表示してくれる機能を呼び出すための記述
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定したHTML要素の子要素を全削除する関数
 * @param {HTMLelement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {//子供の要素が有る限り削除
        element.removeChild(element.firstChild);
    }
}
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {//名前が空の時は処理を終了する
        return;//直ちに処理を終了するガード句
    }
    console.log(userName);
    //to do　診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');//「診断結果」という h3 の見出しを作って、結果の div 要素に追加します。
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const pragraph = document.createElement('p');// p で段落要素を作成して、 以前作成した assessment 関数で診断結果の文字列を作成し、その p タグ内の文字列として入れる
    const result = assessment(userName);
    pragraph.innerText = result;
    resultDivided.appendChild(pragraph);
    //to do ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';//hrefValue 変数への代入時に、もともと 日本語文字列で書かれていた あなたのいいところ の部分を削り、 + を使った文字列結合で、URI エンコードされた あなたのいいところ という文字列を結合しています。

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};
const answers = [// const という、一度代入すると再代入できない（変数の値を後から変更できない）宣言を利用
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string}userName ユーザーの名前
 * @return{string}診断結果
 */
function assessment(userName) {
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % userName.length;//indexは添字の意味
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);//「 /\{userName\}/g 」と書かれている部分が正規表現
    return result;
}
userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
      // TODO ボタンのonclick() 処理を呼び出す
      assessmentButton.onclick();
    }
  };
console.assert(
    assessment('太郎') === '太郎のいいところは声です。太郎の特徴的な声は皆を惹きつけ、心に残ります。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
