import { Card, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { NewsItem } from '@/shared/const';

interface NewsCardProps {
  item: NewsItem;
  onEdit: (item: NewsItem) => void;
  onDelete: (id: number) => void;
}

export const NewsCard = ({ item, onEdit, onDelete }: NewsCardProps) => (
  <Card
    title={item.title}
    actions={[
      <Button 
        type="text" 
        icon={<EditOutlined />} 
        onClick={() => onEdit(item)}
      >Изменить</Button>,
      <Button 
        type="text" 
        danger 
        icon={<DeleteOutlined />} 
        onClick={() => onDelete(item.id)}
      >Удалить</Button>
    ]}
  >
    <p>{item.news}</p>
  </Card>
);