const core = require('@actions/core');
const puppeteer = require('puppeteer-core');
const { WebClient } = require('@slack/web-api');
const fs = require('fs');

try {
  (async () => {
    const target = core.getInput('target-file') || '/';
    const slack_token = core.getInput('slack-token') || null;
    const channels = core.getInput('slack-channels') || null;
    const title = core.getInput('img-name') || 'test';

    if (target && slack_token && channels) {
      const web = new WebClient(slack_token);
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const savePath = `${title}.jpeg`;

      await page.goto(`file://${process.cwd()}/index.html`);
      await page.waitForTimeout(1000);
      await page.screenshot({
        fullPage: true,
        path: savePath,
      });

      try {
        await web.files.upload({
          channels,
          title,
          file: fs.createReadStream(savePath),
        });

        await browser.close();
      } catch (error) {
        console.log('error', error);
        core.setFailed(error.message);
      }
    }
  })();
} catch (error) {
  console.log('error', error);
  core.setFailed(error.message);
}