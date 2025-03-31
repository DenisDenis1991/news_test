import { NewsItem } from '@/shared/const';
import { Modal, Input } from 'antd';

interface EditNewsModalProps {
  visible: boolean;
  item: NewsItem | null;
  onSave: (text: string) => void;
  onCancel: () => void;
  text: string;
  setText: (text: string) => void;
}

export const EditNewsModal = ({
  visible,
  item,
  onSave,
  onCancel,
  text,
  setText
}: EditNewsModalProps) => (
  <Modal
    title="Редактирование новости"
    open={visible}
    onOk={() => onSave(text)}
    onCancel={onCancel}
    okText="Сохранить"
    cancelText="Отменить"
  >
    <h3>{item?.title}</h3>
    <Input.TextArea
      rows={4}
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  </Modal>
);