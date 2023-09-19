import create from "zustand";
type optionsProps = {
  value?: string | number;
  name?: string;
};
type Props = {
  selectProps: Array<{
    name: string | number;
    label: string;
    options: Array<optionsProps | string>;
    nowSelect: number;
  }>;
  initSelectProps: (data: UseStore.SelectProps) => void;
  setSelectProps: (name: string, value: number) => void;
  alertStatus: UseStore.AlertDialog;
  setAlertStatus: (status: UseStore.AlertDialog) => void;
};

export const useStore = create<Props>((set) => ({
  alertStatus: { status: false, title: "請輸入標題", content: "請輸入內容" },
  setAlertStatus: (status) => set(() => ({ alertStatus: status })),
  selectProps: [
    {
      name: "sex",
      label: "性別",
      options: [
        { value: 1, name: "男" },
        { value: 2, name: "女" },
      ],
      nowSelect: 0,
    },
    {
      name: "age",
      label: "年齡",
      options: [],
      nowSelect: 0,
    },
    {
      name: "city_id",
      label: "地區",
      options: [],
      nowSelect: 0,
    },
    {
      name: "shape",
      label: "罩杯",
      options: [],
      nowSelect: 0,
    },
    {
      name: "size",
      label: "身材",
      options: ["纖細", "偏瘦", "標準", "稍壯", "微肉", "肉感"],
      nowSelect: 0,
    },
  ],
  setSelectProps: (name, value) => {
    //formik接管這邊沒用了
    set((state) => ({
      selectProps: state.selectProps.filter((data) =>
        data.label === name ? (data.nowSelect = value) : data
      ),
    }));
  },
  initSelectProps: (data) =>
    set(() => ({
      selectProps: [
        {
          name: "sex",
          label: "性別",
          options: [
            //{1:男,2:女}
            { id: Number(Object.keys(data.sex)[0]), name: data.sex[1] },
            { id: Number(Object.keys(data.sex)[1]), name: data.sex[2] },
          ],
          nowSelect: 0,
        },
        {
          name: "age",
          label: "年齡",
          options: data.age,
          nowSelect: 0,
        },
        {
          name: "city_id",
          label: "地區",
          options: data.city,
          nowSelect: 0,
        },
        {
          name: "shape",
          label: "罩杯",
          options: data.shape,
          nowSelect: 0,
        },
        {
          name: "size",
          label: "身材",
          options: data.size,
          nowSelect: 0,
        },
      ],
    })),
}));
