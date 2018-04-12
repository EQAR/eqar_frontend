import store from '../../../main_store';
import eventActions from './eventActions';


export function formFill(inputValue, inputId) {
  store.dispatch({ type: eventActions(inputId), payload: inputValue });
}

export function addEmptyReportLink(reportLinks=[]) {
  reportLinks.push({link: '', text: ''});
  store.dispatch({ type: 'ADD_EMPTY_REPORTLINK', payload: reportLinks });
}

export function addReportLink(inputValue, inputId, indexOfLink, reportLinks=[]) {
  inputId === 'urlToReport' ? reportLinks[indexOfLink].link = inputValue : reportLinks[indexOfLink].text = inputValue;
  store.dispatch({ type: 'CHANGE_REPORTLINK', payload: reportLinks });
}

export function addProgrammeToReport(inputValue, inputId, programmes=[]) {
  programmes.push(inputValue);
  store.dispatch({ type: eventActions(inputId), payload: programmes });
}
