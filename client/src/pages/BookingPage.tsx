import React from 'react';
import { Layout, Typography } from 'antd';
import BookingSystem from '../components/booking-system/BookingSystem';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const BookingPage: React.FC = () => {
  return (
    <Layout className="site-layout">
   
      <Content className="site-layout-content">
        <BookingSystem />
      </Content>
    </Layout>
  );
};

export default BookingPage;