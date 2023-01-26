import fs from "fs/promises";
let checkTrigger;
let checked = {};

export class Trigger {
  constructor(config, folder) {
    this.config = config;
    this.folder = folder;
    (async () => {
      this.html = await fs.readFile(this.folder + "index.html", "utf8");
      this.handler = await fs.readFile(this.folder + "handler.js", "utf8");
    })();
  }

  getSelectionGui = async () => {
    return { html: this.html, handler: this.handler, data: {} };
  };

  triggers = async (data) => {
    if (!checkTrigger)
      checkTrigger = (await import("../../private/triggers.js")).checkTrigger;

    let value = await checkTrigger(data.config);
    let key = JSON.stringify(data.config);

    if (!checked[key]) {
      checked[key] = {
        times: 0,
      };
    }

    if (!value) {
      checked[key].times = 0;
    }

    if (checked[key].times >= data.times) {
      return true;
    }

    return false;
  };
}
