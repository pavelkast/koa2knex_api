import DefaultModel from '../defaults/DefaultModel';

const _settings = {
  tableName: 'sample',
};

class Sample extends DefaultModel {
  constructor() {
    super(_settings.tableName);
  }
}

const sample = new Sample();
export default sample;