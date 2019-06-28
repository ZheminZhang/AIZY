// 服务器域名

const baseUrl = 'http://192.168.1.10:8848/';
const testUrl = 'http://192.168.1.10:8848/';
const testUrl_1 = 'http://192.168.1.5:7500/';
// 登录接口
const loginUrl = baseUrl + 'login';
// 申请列表查询接口
const granteeUnauthoUrl = baseUrl + 'granteeUnautho';
const granteeAuthoUrl = baseUrl + 'granteeAutho';
// 授权列表查询接口
const grantorUnauthoUrl = baseUrl + 'grantorUnautho';
const grantorAuthoUrl = baseUrl + 'grantorAutho';

// 查询接口
const queryUrl = testUrl + 'query';
// 记账接口
const insertUrl = baseUrl + 'insert';

const registUrl = baseUrl + 'regist';

const authorizedUrl = baseUrl + 'requestAutho'

module.exports = {
  loginUrl: loginUrl,
  registUrl: registUrl,
  granteeUnauthoUrl: granteeUnauthoUrl,
  granteeAuthoUrl: granteeAuthoUrl,
  grantorUnauthoUrl: grantorUnauthoUrl,
  grantorAuthoUrl: grantorAuthoUrl,
  queryUrl: queryUrl,
  insertUrl: insertUrl,
  authorizedUrl: authorizedUrl,
};
