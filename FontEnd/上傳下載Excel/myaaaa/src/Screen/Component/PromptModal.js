import Swal from 'sweetalert2'
export default function StoreModal({ request }) {

  (async () => {
    if (request) {
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
        icon: request.type,
        title: request.title
      })
    }
  })()
  return null
}