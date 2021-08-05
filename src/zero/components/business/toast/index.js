import { Toast } from "antd-mobile";

export default {
  SHORT: 3,
  LONG: 8,
  show(content, duration, mask) {
    return Toast.info(content, "info", duration, () => {}, mask);
  },
  info(content, duration, onClose = () => void 0, mask) {
    return Toast.info(content, duration, onClose, mask);
  },
  success(content, duration, onClose = () => void 0, mask) {
    return Toast.success(content, "success", duration, onClose, mask);
  },
  fail(content, duration, onClose = () => void 0, mask) {
    return Toast.fail(content, "fail", duration, onClose, mask);
  },
  offline(content, duration, onClose = () => void 0, mask) {
    return Toast.offline(content, "offline", duration, onClose, mask);
  },
  loading(content, duration, onClose = () => void 0, mask) {
    return Toast.loading(content, "loading", duration, onClose, mask);
  },
  hide() {
    Toast.hide();
  },
};
