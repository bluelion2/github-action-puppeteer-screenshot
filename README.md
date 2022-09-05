# github-action-puppeteer-screenshot

Puppeteer를 통해 특정 이미지를 열어서 스크린샷 찍어, slack으로 보내는 actions 입니다.

### Option

|     Option     | Require | Description                  |
| :------------: | :-----: | :--------------------------- |
|  target-file   |  true   | Puppeteer로 스캔할 파일      |
|  slack-token   |  true   |                              |
| slack-channels |  true   |                              |
|    img-name    |  false  | 결과물 이름 : Default - test |
|    img-type    |  false  | 결과물 타입 : Default - jpeg |