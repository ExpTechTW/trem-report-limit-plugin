const config = require("../config/config");

class Plugin {
  static instance = null;

  #ctx;
  #config

  constructor(ctx) {
    if (Plugin.instance) return Plugin.instance;

    this.#ctx = ctx;
    this.#config = null;
    this.logger = null;
    this.getConfig = ()=> void 0;

    Plugin.instance = this;
  }

  static getInstance() {
    if (!Plugin.instance) throw new Error("Plugin not initialized");
    return Plugin.instance;
  }

  onLoad() {
    const { TREM, logger , info , utils} = this.#ctx;

    const defaultDir = utils.path.join(info.pluginDir,"./report-limit/resource/default.yml");
    const configDir = utils.path.join(info.pluginDir, "./report-limit/config.yml");
    this.#config = new config("report-limit", this.logger, utils.fs, defaultDir, configDir);
    this.getConfig = this.#config.getConfig;

    TREM.constant.REPORT_LIMIT = this.#config.getConfig().report_limit;
  }
}

module.exports = Plugin;