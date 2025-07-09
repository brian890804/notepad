// ConfirmDialog.tsx
import {
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ThemeProvider,
  type ButtonOwnProps,
} from "@mui/material";
import { useEffect, useState, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import ThemeDark from "~config/darkTheme";
import { useBoundStore } from "../../store/useBoundStore";

type okButtonProps = {
  color?: ButtonOwnProps["color"];
  /** 確認按鈕 loading狀態 ||如果用async await handleOk的話會自動判斷狀態 也可以自行控制 */
  loading?: boolean;
  /** 確認按鈕disabled狀態 */
  disabled?: boolean;
  /** true 按鈕顏色變紅 */
  danger?: boolean;
};

// type
type ConfirmOptions = {
  /** dialog寬度 */
  width?: `${string}px` | number;
  /** 標題  */
  title?: string;
  /** 內容 */
  content?: string | ReactNode;
  /** 確認文字 */
  okText?: string;
  /** 取消文字(沒有按鈕也不會出現) */
  cancelText?: string;
  okButtonProps?: okButtonProps;
  /** 確認事件 */
  handleOk?: (cancelFunc: () => void) => void;
  /** 取消事件 */
  handleCancel?: () => void;
};

export type DialogInstance = {
  update: (newProps: Partial<ConfirmOptions>) => void;
  close: () => void;
};

/**
 * 傳遞一個event list 有 update 跟 close func 來執行 需搭配 async await
 */
export function dialog(initialOptions?: ConfirmOptions): DialogInstance {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  let currentOptions = initialOptions;

  const handleUnmount = () => {
    root.unmount();
    container.remove();
  };

  const render = () => {
    root.render(
      <ConfirmModal {...currentOptions} handleUnmount={handleUnmount} />
    );
  };

  const instance: DialogInstance = {
    update: (newProps) => {
      currentOptions = { ...currentOptions, ...newProps };
      render();
    },
    close: () => {
      currentOptions = { ...currentOptions };
      render();
    },
  };

  render();

  return instance;
}

// component
// eslint-disable-next-line react-refresh/only-export-components
const ConfirmModal = (
  props: ConfirmOptions & { handleUnmount: () => void }
) => {
  const {
    width = "500px",
    title = "確認操作",
    content = "",
    okText = "確定",
    cancelText = "",
    handleUnmount,
    handleOk,
    handleCancel,
    okButtonProps = {},
  } = props;
  const {
    color,
    loading: outsideLoading = false,
    disabled = false,
    danger = false,
  } = okButtonProps;

  const [open, setOpen] = useState(true);
  /**內部loading 當async handleOk的時候會跑一次 */
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(ThemeDark);
  const themeMode = useBoundStore((state) => state.theme.themeMode);

  useEffect(() => {
    if (themeMode === "dark") {
      setTheme(ThemeDark);
    } else {
      import("~config/lightTheme").then((mod) => {
        setTheme(mod.default);
      });
    }
  }, [themeMode]);

  const onConfirm = async () => {
    setLoading(true);
    await handleOk?.(() => {
      setOpen(false);
      handleUnmount();
    });
    setLoading(false);
  };

  const onCancel = () => {
    setOpen(false);
    handleUnmount();
    handleCancel?.();
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dialog
        open={open}
        onClose={onCancel}
        sx={{ "& .MuiDialog-paper": { width, padding: "20px" } }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <div>{content}</div>
        </DialogContent>
        <DialogActions>
          {cancelText && (
            <Button variant="outlined" onClick={onCancel} color="secondary">
              {cancelText}
            </Button>
          )}
          <Button
            disabled={disabled}
            loading={loading || outsideLoading}
            onClick={onConfirm}
            variant="contained"
            // danger 按鈕顏色變紅 || 判斷color傳遞顏色||預設priimary
            color={danger ? "error" : color || "primary"}
          >
            {okText}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};
