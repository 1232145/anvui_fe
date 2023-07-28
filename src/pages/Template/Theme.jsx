import { useState } from 'react';
import { Card, Image, Row, Col } from 'antd';

const Theme = () => {
  const themes = [
    {
      id: 99,
      imageSrc: 'https://i.imgur.com/w93AdHy.png',
      title: 'Giao diện 1',
    },
  ];

  return (
    <Row gutter={[16, 16]} justify='flex-start'>
      <Image.PreviewGroup>
        {themes.map((theme) => (
          <Col key={theme.id} xs={24} sm={12} md={8} lg={6}>
            <Card hoverable style={{ width: '100%' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '150px',
                  overflow: 'hidden'
                }}
              >
                <Image src={theme.imageSrc}
                  alt="Theme"
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%'
                  }}
                  preview={{
                    toolbarRender: () => { }
                  }}
                />
              </div>
              <div style={{ padding: '16px' }}>
                <h2>{theme.title}</h2>
              </div>
            </Card>
          </Col>
        ))}
      </Image.PreviewGroup>
    </Row>
  );
};

export default Theme;
