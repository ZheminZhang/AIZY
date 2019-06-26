// 服务器域名
const baseUrl = 'http://192.168.1.4:3003/';
const testUrl_1 = 'http://192.168.1.4:7500/';
const testUrl_2 = 'http://192.168.1.10:8848/';
// 登录接口
const loginUrl = baseUrl + 'login';
// 授权列表查询接口
const manageUrl = testUrl_1 + 'manage';
// 查询接口
const queryUrl = testUrl_2 + 'query';
// 授权接口
const authorizedUrl = testUrl_2 + 'authorized'
// 注册接口
const registUrl = testUrl_2 + 'regist'
// insert接口
const insertUrl = testUrl_2 + 'insert'

module.exports = {
  loginUrl: loginUrl,
  manageUrl: manageUrl,
  queryUrl: queryUrl,
  authorizedUrl: authorizedUrl,
  registUrl: registUrl,
  insertUrl: insertUrl
};
