/*
  PresentationController for display game screen remotly
  
  @class bkcore.PresentationController
  @author Guangzhen Li
*/


(function() {
  var PresentationController, exports, _base;

  PresentationController = (function() {

    PresentationController.isCompatible = function() {
      return true;
    };

    /*
        Creates a new PresentationController
    */


    function PresentationController(touchCallback) {
      var _this = this;
      this.touchCallback = touchCallback != null ? touchCallback : null;
      this.alpha = 0.0;
      this.beta = 0.0;
      this.gamma = 0.0;
      this.dalpha = null;
      this.dbeta = null;
      this.dgamma = null;
      window.addEventListener('message', (function(e) {
        return _this.receiveMessage(e);
      }), false);
    }

    /*
        @private
    */
    PresentationController.prototype.orientationCallback = function(msg) {
      var alpha = msg.alpha;
      var beta = msg.beta;
      var gamma = msg.gamma;
      if (this.dalpha === null) {
        console.log("calbrate", beta);
        this.dalpha = alpha;
        this.dbeta = beta;
        this.dgamma = gamma;
      }
      this.alpha = alpha - this.dalpha;
      this.beta = beta - this.dbeta;
      this.gamma = gamma - this.dgamma;
      this.gamma = - this.gamma;
    }

    PresentationController.prototype.receiveMessage = function(event) {
      var json = event.data;
      var msg = JSON.parse(json);

      if (msg.cmd == "OrientationChanged") {
          this.orientationCallback(msg);
      } else if (msg.cmd == "touchEvent") {
          this.touchCallback(msg.touchlength);
      }
    }

    return PresentationController;

  })();

  exports = exports != null ? exports : this;

  exports.bkcore || (exports.bkcore = {});

  (_base = exports.bkcore).controllers || (_base.controllers = {});

  exports.bkcore.controllers.PresentationController = PresentationController;

}).call(this);
