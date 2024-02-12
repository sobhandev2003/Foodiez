
import {toast} from 'react-toastify';
function Alert(type , message) {
    switch (type) {
        case 'warning':
            return toast.warning(message)
        case 'error':
            return toast.error( message)
        case 'success':
            return toast.success(message)
        case 'info':
            return toast.info(message)
        case 'dark':
            return toast.dark(message)
        default:
            return toast(message)
    }
}

export default Alert