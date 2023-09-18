import {Id, toast} from 'react-toastify';

export const pushNotificationError = (msg: string, toastId?: Id) => {
  toast.error(msg, {
    toastId: toastId,
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });
};

export const pushNotificationSuccess = (msg: string, toastId?: Id) => {
  toast.success(msg, {
    toastId: toastId,
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });
};

export const pushNotificationLoading = (toastId: Id) => {
  return toast.loading('Выполнение запроса', {
    toastId: toastId,
    position: 'top-center',
    hideProgressBar: true,
    style: {
      color: 'blue',
      textAlign: 'center'
    }
  });
};

export const notificationHideLoading = (toastId: Id) => {
  toast.dismiss(toastId);
};
