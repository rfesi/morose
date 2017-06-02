import { npmPublish, npmLogin, executeSilent, deprecate } from '../../utils/process';
import { createPackageJson } from '../../utils/utils';

export default function() {
  return Promise.resolve()
    .then(() => createPackageJson('package.json', 'test-package', '0.0.1'))
    .then(() => npmLogin('admin', 'blabla', 'foo@bar.com'))
    .then(() => npmPublish())
    .then(() => executeSilent('npm logout'))
    .then(() => deprecate('test-package', 'deprecate message'))
    .then(res => res.code !== 0 ? Promise.resolve() : Promise.reject(''))
    .catch(() => Promise.reject(''));
}
