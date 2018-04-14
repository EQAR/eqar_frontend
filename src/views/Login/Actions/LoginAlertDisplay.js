import store from '../../../main_store';

function loginAlertDisplay(display) {
    store.dispatch((dispatch) => {
        dispatch({ type: 'LOGIN_ALERT', payload: display })
    });
}

export default loginAlertDisplay;
