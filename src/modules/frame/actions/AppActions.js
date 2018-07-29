import Reflux from 'reflux'

var AppActions = Reflux.createActions([
	"initMenu",
	"setTabActiveKey",
	"setTabActiveKeyByTabId",
	"selectRecord",
	"removeTab"
]);

export default AppActions;
