# TypeScript + React + MobX で手軽に SPA を作る

お題の通り、React + MobX で手軽に SPA を作ります。

* お題としては、TODO リストアプリを構築することを考えます。
* MobX を使って、 SPA を構築することを考えます。
  * あまり慣れない脳ミソの部位を使わずに構築していきます。
* 巷で大流行している Redux は使いません。
  * これにより下記の性質は手に入りません。
    * タイムトラベル
    * 関数型
  * アプリがオブジェクト指向寄りになります。
* MVVM モデルを使います。

## 対象読者

下記が少しずつ分かる人向け。

* React
* webpack
* TypeScript

## 全体の流れ

1. プロジェクトセットアップ
2. 画面の仕様を考える
3. 画面の設計を考えて実装する

## （読み飛ばしてもいいです）プロジェクトセットアップ

### TypeScript + React + MobX + webpack やらを入れる

1. yarn をインストールした後、
2. 下記のように依存パッケージをインストールして、

   ```console
   $ yarn add --dev -E prettier
   $ yarn add --dev typesync webpack webpack-dev-server typescript awesome-typescript-loader html-webpack-plugin
   $ yarn add react react-dom mobx mobx-react
   $ yarn run typesync
   $ yarn
   ```

3. ちょっと `webpack.config.js` を書いて

   ```javascript
   // @ts-check
   const path = require("path");
   const HtmlWebpackPlugin = require("html-webpack-plugin");

   /** プロジェクトのディレクトリ規約はこうやってまとめておくと便利。 */
   const project = {
     base(...args) {
       return path.join(__dirname, ...args);
     },
     src(...args) {
       return this.base("src", ...args);
     },
     dist(...args) {
       return this.base("dist", ...args);
     }
   };

   module.exports = {
     entry: project.src("index.tsx"),
     output: {
       path: project.dist(),
       filename: "app.js",
       publicPath: "/"
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: project.src("index.html")
       })
     ]
   };
   ```

4. 上記のスクリプトにて参照している `src/index.html` と `src/index.tsx` を適当に準備して
5. `package.json` に `webpack-dev-server` を立ち上げるスクリプトを書いて、

   ```json
   "scripts": {
       "dev": "webpack-dev-server"
   },
   ```

6. `webpack-dev-server` を立ち上げればだいたいシンプルなセットアップは完了します。

   ```console
   $ yarn run dev

   # => http://localhost:8080
   ```

7. 開発環境は Visual Studio Code を使うといいでしょう。

この上に秘伝のタレやボイラープレート、スタイルシートフレームワーク、UI フレームワークなどなど各々の好みなどを載せていくことになると思いますが、今回は触れません。

ソースコードの詳細はリポジトリを見てください。

## 画面の仕様を考える

### リストアプリでどんなことができるかを考える

深い分析はしませんが、下記ができれば OK ということにしましょう。

* TODO の追加
* TODO の閲覧・フィルタリング
* TODO のチェック
* TODO の件数件数カウント

### 画面レイアウトのラフスケッチを描く

チラシの裏でもなんでもいいので、適当に今回作ろうとしている画面を絵に描いてみます。

[TODO 絵]

「どんなことができるかを考える」で考えた要件が満たせていれば OK です。

## 画面の設計を考えて実装する

### 画面のコンポーネント割を考える

さきほど描いた絵をもとに、画面のコンポーネントの割り方を考えます。

[TODO 絵]

下記のようなコンポーネント割をすることに決めました。

* TODO アプリ全体
  * TODO 追加欄
  * TODO 閲覧
    * TODO フィルタテキストボックス
    * TODO リスト
      * TODO アイテム \* n 個
  * TODO カウント表示

だいたいどこに繰り返し項目が来るのかを意識すれば階層的に割れると思います。

### コンポーネントに対応するコンポーネントファイルを作る

`src/components` の下にガシガシ画面のコンポーネントを書いた `index.tsx` ファイルをおいていきましょう。

* TODO アプリ全体: `src/components/App`
  * TODO 追加欄: `src/components/TodoInput`
  * TODO フィルタテキストボックス: `src/components/TodoFilter`
  * TODO リスト: `src/components/TodoList`
    * TODO アイテム \* n 個: `src/components/TodoList/TodoItem`
  * TODO カウント表示: `src/components/TodoCounter`

上記が唯一の正解ではありません。見やすいやり方であれば問題ありません。

### コンポーネントファイルを肉付けしていく

#### 肉付け： TODO カウント表示

アプリ全体のコンポーネントファイルから作っていきたいのですが、説明上、ちょっと面倒になるのでカウント表示コンポーネントから作っていきます。

こんな感じで作ります。

```typescript
// src/components/TodoCounter/index.tsx

export interface TodoCounterVM {
  totalCount: number;
  doneCount: number;
  restCount: number;
}

export const TodoCounter = observer((props: { model: TodoCounterVM }) => {
  const { totalCount, doneCount, restCount } = props.model;
  return (
    <p>
      残件数: {restCount} / 全件数: {totalCount} (完了件数: {doneCount})
    </p>
  );
});
```

とりあえず具体的な計算ロジックのことは半分忘れて、下記を作ります。

1. `TodoCounter` という React コンポーネントを作る。
   * `props` として `model: TodoCounterVM` をもらう
     * もらった `model` を使ってコンポーネントを描画する
   * MobX によるアプリのステート更新を自動的に拾うために `observer(...)` で囲む
2. `TodoCounterVM` としてコンポーネントのビューモデルを記述する。
   * ビューモデル：ビューのモデル（＝ React コンポーネントのモデル）
   * ビュー側から欲しいデータやイベントハンドラをそのまんま書く。
   * ここではどうやって残件数 + 全件数を計算するか？などは考えない。なるべくビューをおバカにしておく。
     * ただ、便利さを取れるぐらいのおバカさにしておきましょう。たとえば、日付表示を行うコンポーネントの場合、フォーマットされた日付文字列をビューモデルにもらうのではなく、ビューモデルとして日付オブジェクトそのもの（`Date`）を取り扱う、とかでいいと思います。

#### 肉付け： TODO 追加欄

同じ要領で追加欄も作ってしまいましょう。

```typescript
// src/components/TodoInput/index.tsx

export interface TodoInputVM {
  todo: string;
  onTodoChanged: (todoTitle: string) => void;
  onAddTodo: () => void;
}

export const TodoInput = observer((props: { model: TodoInputVM }) => {
  const { todo, onTodoChanged, onAddTodo } = props.model;

  return (
    <p>
      <input
        type="text"
        value={todo}
        placeholder="Todoを入れてね"
        onChange={ev => onTodoChanged(ev.currentTarget.value)}
      />
      <button onClick={() => onAddTodo()}>追加</button>
    </p>
  );
});
```

今回は `input` と `button` のイベントハンドラをそのままモデルのイベントハンドラに横流ししています。

テキストボックスのイベントハンドラはそのまま文字列が来るわけではないので、一旦文字列を取り出してから渡すようにしています。ビューモデルにそのまんまのイベントオブジェクトを渡す必要はありません。便利にいきましょう。

#### 肉付け: TODO アイテム

やることは同じです。あんまり頭を使わなくて OK ですね。

```typescript
// src/components/TodoList/TodoItem/index.tsx

export interface TodoItemVM {
  todo: string;
  done: boolean;
  onToggleTodo: () => void;
}

export const TodoItem = observer((props: { model: TodoItemVM }) => {
  const { todo, done, onToggleTodo } = props.model;

  return (
    <li>
      <label>
        <input type="checkbox" checked={done} onChange={() => onToggleTodo()} />
        {todo}
      </label>
    </li>
  );
});
```

#### 肉付け: TODO リスト

少し異色のビューモデルを書くことになります。

```typescript
// src/components/TodoList/index.tsx

import { TodoItemVM, TodoItem } from "./TodoItem/index";

export interface TodoListVM {
  todos: TodoItemVM[];
}

export const TodoList = observer((props: { model: TodoListVM }) => {
  const { todos } = props.model;

  // TodoItem に key を指定したほうがいいよ(余裕のある人はやってみよう)
  return <ul>{todos.map(it => <TodoItem model={it} />)}</ul>;
});
```

ビューモデルとして、他所のビューモデルの配列を持つことになっています。 (`todos: TodoItemVM[]`の部分)

また、その配列を実際に子コンポーネントをレンダリングする時に使っています。

このように、コンポーネントの親子関係に呼応して、ビューモデル自体も親子関係を伴って定義されます。

#### 肉付け: TODO フィルタテキストボックス

似たようなものなので省略。

#### 肉付け: TODO アプリ全体

今まで作ってきた直下のコンポーネント及びビューモデルを組み合わせるだけです。

```typescript
// src/components/App/index.tsx

import { TodoCounter, TodoCounterVM } from "../TodoCounter/index";
import { TodoFilter, TodoFilterVM } from "../TodoFilter/index";
import { TodoInput, TodoInputVM } from "../TodoInput/index";
import { TodoList, TodoListVM } from "../TodoList/index";

export interface AppVM {
  todoInputVM: TodoInputVM;
  todoFilterVM: TodoFilterVM;
  todoListVM: TodoListVM;
  todoCounterVM: TodoCounterVM;
}

export const App = observer((props: { model: AppVM }) => {
  const { todoInputVM, todoFilterVM, todoListVM, todoCounterVM } = props.model;
  return (
    <div>
      <TodoInput model={todoInputVM} />
      <TodoFilter model={todoFilterVM} />
      <TodoList model={todoListVM} />
      <TodoCounter model={todoCounterVM} />
    </div>
  );
});
```

### ドメインを書く

ちょっと脳みそを使いますが、ドメインを書いていきます。なんとなく、上で書いたコンポーネントの状態を拾えるものであれば OK としましょう。

```typescript
// src/domain/App.ts

export class AppModel {
  @observable todoInput: string = "";

  @observable filterText: string = "";

  @observable todoList: Todo[] = [];

  addTodo() {
    const todo = new Todo();
    todo.done = false;
    todo.todo = this.todoInput;
    this.todoList.push(todo);
  }

  @computed
  get filteredTodo(): Todo[] {
    return this.todoList.filter(it => it.todo.indexOf(this.filterText) >= 0);
  }

  @computed
  get allCount() {
    return this.todoList.length;
  }

  @computed
  get doneCount() {
    return this.todoList.filter(it => it.done).length;
  }
}

export class Todo {
  @observable todo: string;
  @observable done: boolean = false;
}
```

それぞれ下記の mobx のデコレータがついています。

* 変化するプロパティ： `@observable`
* 変化したプロパティに応じて計算のし直しが必要なプロパティ： `@computed`

### ビューモデルをドメインとつなぐ

上記で作ったドメインを
