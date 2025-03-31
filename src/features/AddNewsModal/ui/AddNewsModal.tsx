import { Modal, Form, Input } from 'antd';

interface AddNewsModalProps {
  visible: boolean;
  onSave: (values: { title: string; news: string }) => void;
  onCancel: () => void;
  form: any;
}

export const AddNewsModal = ({
  visible,
  onSave,
  onCancel,
  form
}: AddNewsModalProps) => (
  <Modal
    title="Добавление новости"
    open={visible}
    onOk={() => form.submit()}
    onCancel={onCancel}
    okText="Добавить"
    cancelText="Отменить"
  >
    <Form form={form} layout="vertical" onFinish={onSave}>
      <Form.Item
        name="title"
        label="Заголовок"
        rules={[{ required: true, message: 'Пожалуйста, введите заголовок' }]}
      >
        <Input placeholder="Введите заголовок новости" />
      </Form.Item>
      <Form.Item
        name="news"
        label="Текст новости"
        rules={[{ required: true, message: 'Пожалуйста, введите текст новости' }]}
      >
        <Input.TextArea rows={4} placeholder="Введите текст новости" />
      </Form.Item>
    </Form>
  </Modal>
);