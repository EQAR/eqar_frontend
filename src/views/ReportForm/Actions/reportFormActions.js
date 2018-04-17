import store from '../../../main_store';
import eventActions from './eventActions';


export function formFill(inputValue, inputId) {
  store.dispatch({ type: eventActions(inputId), payload: inputValue });
}

export function addEmptyReportLink(reportLinks=[]) {
  reportLinks.push({link: '', link_display_name: ''});
  store.dispatch({ type: 'ADD_EMPTY_REPORTLINK', payload: reportLinks });
}

export function addReportLink(inputValue, inputId, indexOfLink, reportLinks=[]) {
  reportLinks[indexOfLink][inputId] = inputValue;
  store.dispatch({ type: 'CHANGE_REPORTLINK', payload: reportLinks });
}

export function removeLink(index, reportLinks=[]) {
  reportLinks.splice(index, 1);
  store.dispatch({ type: 'REMOVE_REPORTLINK', payload: reportLinks });
}

export function addProgrammeToReport(inputValue, inputId, programmes=[]) {
  programmes.push(inputValue);
  store.dispatch({ type: 'ADD_PROGRAMME', payload: programmes });
}
