/** @class: setupManager
  * @desc : registers functions to be called in setup function, to build global
  *         variables.
*/
class SetupManager {
  constructor() {
    this.functions = [];
  }
  add_function(func) {
    this.functions.push(func);
  }
  run_all() {
    for (var func of this.functions) {
      func();
    }
  }
}

var setupManager = new SetupManager();
