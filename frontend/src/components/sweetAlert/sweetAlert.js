import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    width: 430,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  export default Toast;