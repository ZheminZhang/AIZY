// 服务器域名
const baseUrl = 'http://192.168.1.10:8848/';
const testUrl = 'http://192.168.1.10:8848/';
// 登录接口
const loginUrl = baseUrl + 'login';
// 授权列表查询接口
const manageUrl = testUrl + 'manage';
// 查询接口
const queryUrl = testUrl + 'query';
//记账接口
const insertUrl = baseUrl + 'insert';

module.exports = {
  loginUrl: loginUrl,
  manageUrl: manageUrl,
  queryUrl: queryUrl,
  insertUrl: insertUrl
};
