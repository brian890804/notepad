interface CustomWindow extends Window {
  initGeetest4: any;
}

declare const window: CustomWindow;

export const CALL_CAPTCHA_TYPE = {
  REGISTER: '6b03ebb2f6d592bd3821ad625974f43c',
  NEWSLETTER: '9d7bdb4c52fc63a57174e602bcdf3b93'
} as const;

type CallCaptchaType = typeof CALL_CAPTCHA_TYPE;

type Validate = {
  captcha_id: string;
  captcha_output: string;
  gen_time: string;
  lot_number: string;
  pass_token: string;
}

export const callCaptcha = (
  type: CallCaptchaType[keyof CallCaptchaType] = CALL_CAPTCHA_TYPE.REGISTER,
  callback: (result: Validate) => void = () => {},
  errCallback: () => void = () => {}
): void => {

  window.initGeetest4({
    captchaId: type,
    product: 'bind'
  },function (captcha: any) {
    captcha.showCaptcha();
    captcha.onReady(function(){
  }).onSuccess(function(){
      const result = captcha.getValidate();

      callback(result);
      captcha.reset()
    }).onError(function(){
      errCallback();
    })
  })
}