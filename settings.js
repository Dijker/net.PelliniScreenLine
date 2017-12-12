/* global $, Homey */
var Homey;

function onHomeyReady( homeyReady ){
  Homey = homeyReady;
  Homey.ready();
//  showPanel(1);
};

Date.prototype.yyyymmddHHMMss = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
    var HH = this.getHours();
    var MM = this.getMinutes();
    var ss = this.getSeconds();
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd,
            (HH>9 ? '' : '0') + HH,
            (MM>9 ? '' : '0') + MM,
            (ss>9 ? '' : '0') + ss,
           ].join('');
};

// logAllFlowsf
function logAllFlowsf(){
    Homey.set('logAllFlows', Date() );
};

function showPanel (panel) {
  $('.panel').hide()
  $('.panel-button').removeClass('active')
  $('#panel-button-' + panel).addClass('active')
  $('#panel-' + panel).show()
  show_log()
}
