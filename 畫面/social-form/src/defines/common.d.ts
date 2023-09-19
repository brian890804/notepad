namespace Public{
    interface MyFormValues {
        sex: number;
        city_id: number;
        nick_name: string;
        age: number;
        qq: number | string;
        wechat?: number | string;
        tudou?: number | string;
        line?: number | string;
        phone?: number | string;
        price: number;
        miaoshu: number | string;
        currency: string;
        height: number;
        size: string;
        profession: string;
        shape: string;
        isAuth?: boolean;
        coin?:array<number>;
      }
}

namespace UseStore{
  interface AlertDialog{
      status: boolean;
      title: string;
      content: string;
    
  }
  interface SelectProps{
    age: Array<{ id: number; name: string; value: number }>;
    sex: { [index: number]: string };
    city: Array<{ id: number; name: string; value: number }>;
    shape: Array<string>;
    size: Array<string>;
  }
}