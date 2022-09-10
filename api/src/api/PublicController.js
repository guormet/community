import svgCaptcha from 'svg-captcha';
import { setValue } from '../config/RedisConfig';

class PublicController {
  /**
   * 获取验证码
   * @param {} ctx
   */
  async getCaptcha (ctx) {
    const body = ctx.request.query;
    const newCaptca = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1iIl',
      color: true,
      noise: Math.floor(Math.random() * 5),
      width: 150,
      height: 60
    });
    // 保存图片验证码数据，设置超时时间 60s
    setValue(body.sid, newCaptca.text, 60);

    ctx.body = {
      code: 200,
      data: newCaptca.data
    };
  }
}

export default new PublicController();
