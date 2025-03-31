import React, { useState } from 'react';
import { List, Button, Modal, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { NewsItem } from '@/shared/const';
import { NewsCard } from '@/entities/NewsCard/ui/NewsCard';
import { useNewsData } from '@/shared/hooks/useNewsData/model';
import { EditNewsModal } from '@/features/EditNewsModal/ui/EditNewsModal';
import { AddNewsModal } from '@/features/AddNewsModal/ui/AddNewsModal';


export const NewsList: React.FC = () => {
  const [form] = Form.useForm();
  const { newsList, setNewsList, initializeWithDefault } = useNewsData();
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [editText, setEditText] = useState('');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isInitModalVisible, setIsInitModalVisible] = useState(!newsList.length);

  const handleDelete = (id: number) => {
    setNewsList(newsList.filter(item => item.id !== id));
  };

  const handleEditStart = (item: NewsItem) => {
    setEditingItem(item);
    setEditText(item.news);
    setIsEditModalVisible(true);
  };

  const handleEditSave = (text: string) => {
    if (!editingItem) return;

    setNewsList(newsList.map(item =>
      item.id === editingItem.id ? { ...item, news: text } : item
    ));
    setIsEditModalVisible(false);
    setEditingItem(null);
  };

  const handleAddSave = (values: { title: string; news: string }) => {

    setNewsList([...newsList, {
      id: Date.now(),
      title: values.title,
      news: values.news
    }]);
    setIsAddModalVisible(false);
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1>Список новостей</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsAddModalVisible(true)}
        style={{ marginBottom: '16px' }}
      >
        Добавить новость
      </Button>

      {newsList.length === 0 ? (
        <Card>
          <p>Новостей пока нет</p>
          <Button
            type="primary"
            onClick={() => {
              initializeWithDefault();
              setIsInitModalVisible(false);
            }}
          >
            Загрузить демонстрационные новости
          </Button>
        </Card>
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={newsList}
          renderItem={item => (
            <List.Item>
              <NewsCard
                item={item}
                onEdit={handleEditStart}
                onDelete={handleDelete}
              />
            </List.Item>
          )}
        />
      )}

      <EditNewsModal
        visible={isEditModalVisible}
        item={editingItem}
        onSave={handleEditSave}
        onCancel={() => setIsEditModalVisible(false)}
        text={editText}
        setText={setEditText}
      />

      <AddNewsModal
        visible={isAddModalVisible}
        onSave={handleAddSave}
        onCancel={() => setIsAddModalVisible(false)}
        form={form}
      />

      {
        newsList.length === 0 && (
          <Modal
            title="Новостей не найдено"
            open={isInitModalVisible}
            onOk={() => {
              initializeWithDefault();
              setIsInitModalVisible(false);
            }}
            onCancel={() => setIsInitModalVisible(false)}
            okText="Загрузить демо-новости"
            cancelText="Начать с пустого списка"
          >
            <p>Хотите загрузить демонстрационные новости или начать с пустого списка?</p>
          </Modal>
        )
      }
    </div>
  );
};
