import Swal from 'sweetalert2'
export default function useStoreModal() {
  let excelPrompt = async () => { Modal({ icon: 'success', title: 'Excel上傳、預覽、下載頁面，請上傳Excel' }) }
  let excelUploadPrompt = async () => { Modal({ icon: 'error', title: '請先點選左側藍色上傳檔案鈕' }) }
  let excelUploadSuccessPrompt = async () => { Modal({ icon: 'success', title: '上傳成功' }) }
  let myTablePrompt = async () => { Modal({ icon: 'success', title: '新增欄位成功' }) }
  return { excelPrompt,excelUploadPrompt,myTablePrompt,excelUploadSuccessPrompt }
}
function Modal(request) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 10000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  Toast.fire({
    icon: request.icon,
    title: request.title
  })
}