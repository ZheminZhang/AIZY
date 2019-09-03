// 服务器域名
const LANIP = "192.168.2.241";
const OPENIP = "27.152.157.128";
const TXIP = "www.lianzhang.club";
// const LANIP = "192.168.1.6";
// const OPENIP = "27.152.157.128";
// const TXIP = "106.52.162.25";

var ip = OPENIP;
var ip = LANIP;
var ip = TXIP;

const baseUrl = "https://" + ip + ":8848/";
const testUrl = "https://" + ip + ":8848/";
const voicebaseUrl = "https://" + ip + ":8849/";
const downloadUrl = baseUrl + "download";
const signDownloadUrl = baseUrl + "signDownload";
// 登录接口
const uploadUrl = baseUrl + "upload";
const loginUrl = baseUrl + "login";
// 语音分录服务器
const voiceUrl = voicebaseUrl + "api/analysis/analysis";
const signUrl = baseUrl + "sign";
// 申请列表查询接口
const granteeUnauthoUrl = baseUrl + "granteeUnautho";
const granteeAuthoUrl = baseUrl + "granteeAutho";
const granteeUnauthoRefuseUrl = baseUrl + "granteeUnauthoRefuse";
// 授权列表查询接口
const grantorUnauthoUrl = baseUrl + "grantorUnautho";
const grantorAuthoUrl = baseUrl + "grantorAutho";
const grantorUnauthoRefuseUrl = baseUrl + "grantorUnauthoRefuse";
// 签名列表查询接口
const signedUrl = baseUrl + "signed";
const unsignedUrl = baseUrl + "unsigned";
const signedRefuseUrl = baseUrl + "signedRefuse";
const signQueryUrl = baseUrl + "signQuery";
// 查询接口
const queryUrl = testUrl + "query";
// 记账接口
const insertUrl = baseUrl + "insert";
// TODO: 注释
const registUrl = baseUrl + "regist";

const authorizedUrl = baseUrl + "authorize";

const requestAuthoUrl = baseUrl + "requestAutho";

module.exports = {
  loginUrl: loginUrl,
  voiceUrl: voiceUrl,
  registUrl: registUrl,
  granteeUnauthoUrl: granteeUnauthoUrl,
  granteeAuthoUrl: granteeAuthoUrl,
  grantorUnauthoUrl: grantorUnauthoUrl,
  grantorAuthoUrl: grantorAuthoUrl,
  granteeUnauthoRefuseUrl: granteeUnauthoRefuseUrl,
  grantorUnauthoRefuseUrl: grantorUnauthoRefuseUrl,
  queryUrl: queryUrl,
  insertUrl: insertUrl,
  authorizedUrl: authorizedUrl,
  requestAuthoUrl: requestAuthoUrl,
  signedUrl: signedUrl,
  unsignedUrl: unsignedUrl,
  signedRefuseUrl: signedRefuseUrl,
  signQueryUrl: signQueryUrl,
  signUrl: signUrl,
  downloadUrl: downloadUrl,
  uploadUrl: uploadUrl,
  signDownloadUrl: signDownloadUrl
};
