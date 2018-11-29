# FDS 최종 실습 템플릿 프로젝트

이 프로젝트에는 이제까지 다뤘던 라이브러리들이 모두 설치되어 있습니다. 팀 프로젝트의 기반 코드로 사용할 수 있습니다.

이 프로젝트에는 `semantic-ui-css`가 포함되어 있기 때문에 별도의 **CSS 리셋**을 적용하실 필요가 없습니다. Semantic UI를 삭제하고 싶으시면 아래와 같이 해 주세요.

1. `npm uninstall semantic-ui-css semantic-ui-react` 실행
2. `/src/index.js`와 `/.storybook/config.js`에서 `semantic-ui-css` import 구문 삭제

## 저장소 복사하기

**Github의 fork 기능으로는 계정 당 저장소 하나밖에 복사하지 못합니다.** Fork 기능을 사용하지 않고 프로젝트를 복사하려면, 아래의 절차대로 해 주세요.

1. 복사하고 싶은 저장소를 `git clone` 명령을 사용해 내려받는다.
1. 내려받은 폴더로 이동한 후, `rm -rf .git` 명령을 실행한다.
1. `git init`, `git add .`, `git commit -m "..."` 명령을 차례로 실행한다. (저장소 초기화)
1. Github에서 새 저장소를 만든 후, 위에서 초기화한 저장소를 푸시한다.

## 개발환경 환경변수 설정하기

`create-react-app`으로 만들어진 프로젝트는 자체적인 환경변수 사용법을 가지고 있습니다.

1. [여러 종류의 환경변수 설정 파일](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables#what-other-env-files-can-be-used)을 사용할 수 있습니다. 보통의 경우 `.env.local`을 사용하면 됩니다.
1. 환경변수 이름은 반드시 `REACT_APP_`으로 시작해야 합니다.

## 프로젝트를 처음부터 설정하기

새로 만든 프로젝트를 지금 보고 계신 프로젝트와 똑같이 설정하시려면 아래의 내용을 따라하시면 됩니다.

### 1. create-react-app으로 프로젝트 생성

```
npx create-react-app <my-project-name>
cd <my-project-name>
```

### 2. ESLint, Prettier 설정

https://gist.github.com/seungha-kim/bdfa171962362f9308e5264766100dbe

### 3. 필요한 라이브러리 설치하기

```
npm install axios classnames node-sass react-helmet semantic-ui-css semantic-ui-react react-router-dom
```

### 4. 스토리북 설정하기

터미널에서 아래 명령 실행

```
npx -p @storybook/cli sb init
npm install --save-dev storybook-react-router
```

`.storybook/config.js` 내용 수정 ([공식 문서 링크](https://storybook.js.org/basics/writing-stories/#loading-stories-dynamically))

```
import { configure } from '@storybook/react';

const req = require.context('../src/components', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
```

스토리북에서 `<Link />` 컴포넌트 사용할 수 있도록 설정하기 ([공식 문서 링크](https://github.com/gvaldambrini/storybook-router/tree/master/packages/react))

```
// .storybook/config.js
import { configure, addDecorator } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

addDecorator(StoryRouter());
```
