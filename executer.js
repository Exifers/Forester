/** @class: Exectuer
  * @desc : Helper class to run code once in a loop.
*/
class Executer {
  constructor() {
    this.endloop = false;
    this.ids = [];
    this.to_be_run_after_setup = [];
  }
  /** @method: run_on_first_loop
    * @desc  : takes a lambda and runs it only if endLoop() hasn't been called. 
  */
  run_on_first_loop(func) {
    if (!this.endloop) {
      func();
    }
  }
  /** @method: run_once
    * @desc  : takes a lambda and an id and runs the lambda only if this id
    *          hasn't been used before.
  */
  run_once(func, id) {
    if (!this.ids.includes(id)) {
      this.ids.push(id);
      func();
    }
  }
  /** @method: end_loop
    * @desc  : Disables all calls to run_on_first_loop.
  */
  endLoop() {
    this.endloop = true;
  }
  run_after_setup(func) {
    this.to_be_run_after_setup.push(func);
  }
}

/** @section: globals
    @desc   : global variables and their setup functions.
*/

var executer;

setupManager.add_function(() => {
  executer = new Executer();
});
