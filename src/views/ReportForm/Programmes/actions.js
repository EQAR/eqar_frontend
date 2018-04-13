import axios from 'axios';
import store from '../../../main_store';


export function programmeForm(value, id, programme={}) {
  programme[id] = value;
  console.log(programme)
  store.dispatch({ type: 'CHANGE_PROGRAMME', payload: [programme] });
}

export default programmeForm;
