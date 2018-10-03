
import {goddess} from '../utils/http';
import isServer from '../utils/isServer';


const BUCKET = 'goddess-1257388993';
const REGION = 'ap-chengdu';

let cos = {};
if (!isServer) {
  const COS = require('cos-js-sdk-v5');
  // 初始化实例
  const cos = new COS({
    async getAuthorization(options, callback) {
      // 异步获取签名
      try {
        const data = await goddess.get('/v1/cos/sts', {
          params: {
            bucket: options.Bucket,
            region: options.Region,
            ...options
          }
        });

        const keys = data.credentials;
        callback({
          TmpSecretId: keys.tmpSecretId,
          TmpSecretKey: keys.tmpSecretKey,
          XCosSecurityToken: keys.sessionToken,
          ExpiredTime: data.expiredTime,
        });
      } catch (error) {
        callback(error);
      }
    },
  });

}
// 上传图片
export async function upload(userId, file) {
  return new Promise((resolve, reject) => {
    const key = `${userId}/${Date.now()}-${file.name}`;
    cos.sliceUploadFile({
      Bucket: BUCKET,
      Region: REGION,
      Key: key,
      Body: file
    }, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
