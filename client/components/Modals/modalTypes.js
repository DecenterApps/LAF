import AddItemModal from './AddItemModal/AddItemModal';
import ReportLostModal from './ReportLostModal/ReportLostModal';

// Register modal types here
export const ADD_ITEM_MODAL = 'add_item_modal';
export const REPORT_LOST_MODAL = 'report_lost_modal';

export default {
  [ADD_ITEM_MODAL]: AddItemModal,
  [REPORT_LOST_MODAL]: ReportLostModal
};
