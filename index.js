"use strict";

const Execution = global.ExecutionClass;
const vm = require("vm");
const fs = require("fs");

class executorJSService extends Execution {

  constructor(process) {
    super(process);
  }

  exec(params) {
    let _this = this;
    let script = fs.readFileSync(params.js_file);
    let context = {
      value: params.value,
      require: require,
      callback: function(error, result) {
        if (error) {
          _endError(error);
        } else {
          _endSuccess(result);
        }
      }
    };
    vm.runInNewContext(script, context);
    function _endError(res) {
      let endOptions = {};
      endOptions.end = 'error';
      endOptions.messageLog = res;
      endOptions.err_output = res;
      _this.end(endOptions);
    }
    function _endSuccess(res) {
      let endOptions = {};
      endOptions.extra_output = {};
      if (res.length) {
        endOptions.extra_output.return = res;
      }
      _this.end(endOptions);
    }
  }
  
}

module.exports = executorJSService;
