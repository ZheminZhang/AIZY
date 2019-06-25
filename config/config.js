// 服务器域名
const baseUrl = 'http://192.168.1.4:3003/';
const testUrl = 'http://192.168.1.4:7500/';
// 登录接口
const loginUrl = baseUrl + 'login';
// 授权列表查询接口
const manageUrl = testUrl + 'manage';
// 查询接口
const queryUrl = testUrl + 'query';

module.exports = {
  loginUrl: loginUrl,
  manageUrl: manageUrl,
  queryUrl: queryUrl 
};
