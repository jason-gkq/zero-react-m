import { AntToast } from "../../index";

export default {
  SHORT: 3,
  LONG: 8,
  show(content, duration, mask) {
    return AntToast.info(content, "info", duration, () => {}, mask);
  },
  info(content, duration, onClose = () => void 0, mask) {
    return AntToast.info(content, duration, onClose, mask);
  },
  success(content, duration, onClose = () => void 0, mask) {
    return AntToast.success(content, "success", duration, onClose, mask);
  },
  fail(content, duration, onClose = () => void 0, mask) {
    return AntToast.fail(content, "fail", duration, onClose, mask);
  },
  offline(content, duration, onClose = () => void 0, mask) {
    return AntToast.offline(content, "offline", duration, onClose, mask);
  },
  loading(content, duration, onClose = () => void 0, mask) {
    return AntToast.loading(content, "loading", duration, onClose, mask);
  },
  hide() {
    AntToast.hide();
  },
};
