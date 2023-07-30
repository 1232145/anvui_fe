import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../../components/Loading';
import { api } from '../../components/Api/api';
import { Upload, message, Alert, Image, Card } from 'antd';
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons';
import './slide.css';

const { Dragger } = Upload;
// const host = 'https://cdn.anvui.vn/';
const slideId = 2107;
const bannerId = 1956;

const imagePreviewContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
};

const imageContainerStyle = {
  width: '155px',
  margin: '0 20px 16px 0',
  position: 'relative',
};

const imageStyle = {
  cursor: 'pointer',
  objectFit: 'cover',
  height: '125px',
  width: '100%',
  borderRadius: '10px',
};

const draggerStyle = {
  padding: '10px',
  textAlign: 'center',
  backgroundColor: '#fafafa',
};

const headingStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '16px',
  color: 'gray',
};

const deleteButtonStyle = {
  position: 'absolute',
  top: '8px',
  right: '8px',
  fontSize: '16px',
  color: 'red',
  cursor: 'pointer',
};

const cardStyle = {
  width: '155px', cursor: 'pointer', height: 'auto'
};

const Slide = () => {
  const [data, setData] = useState({ slide: [], banner: [] });
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const bannerUploadText =
    'Kích thước hiển thị tốt nhất 1440*480px, hãy chọn các ảnh có cùng chiều dài, chiều rộng, chiều dài >= 1440px, chiều rộng >= 480px để hiển thị đạt chất lượng tốt nhất !';

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get(location.pathname);
      const groupedData = res.data.reduce((acc, curr, index) => {
        const { slide_id } = curr;
        curr.key = index;

        if (slide_id === bannerId) {
          acc.banner.push(curr);
        } else if (slide_id === slideId) {
          acc.slide.push(curr);
        }

        return acc;
      }, { slide: [], banner: [] });

      setData(groupedData);
    } catch (err) {
      navigate('/error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageClick = (e) => {
    e.stopPropagation();
  };

  const handleDeleteImage = async (item, e, folder) => {
    e.stopPropagation();
    setLoading(true);
    await api.delete(`${location.pathname}/${folder}/${item.id}/${item.create_time}`)
      .then(res => {
        fetchData();
        message.success('Image deleted successfully.');
      })
      .catch(err => navigate('/error'));
  };

  const getUploadProps = (name, slide_id) => {
    return {
      name: name,
      multiple: true,
      showUploadList: true,
      customRequest: async ({ onSuccess, onError, file }) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG images!');
          return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must be smaller than 2MB!');
          return false;
        }

        try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('folder', name);
          formData.append('slide_id', slide_id);

          setLoading(true);

          await api.post(location.pathname, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }
        catch (err) {
          onError("Upload failed")
        }
        finally {
          fetchData();
          message.success('Image uploaded successfully.');
        }
      },
    }
  }

  const display = (name, id) => {
    return (
      <Dragger {...getUploadProps(name, id)} style={draggerStyle} showUploadList={false} >
        {data[name].length > 0 ? (
          <div style={imagePreviewContainerStyle}>
            {data[name].map((item) => (
              <div key={item.id} style={imageContainerStyle}>
                <Card
                  hoverable
                  cover={<Image
                    src={item.src_link}
                    style={imageStyle}
                    onClick={(e) => handleImageClick(e)}
                    preview={false}
                  />}
                  style={cardStyle}
                >
                  <DeleteOutlined
                    style={deleteButtonStyle}
                    onClick={(e) => handleDeleteImage(item, e, name)}
                  />
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p style={{ textAlign: 'center', margin: '8px 0' }}>
              <InboxOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
            </p>
            <p style={{ textAlign: 'center', margin: '8px 0' }}>Drag and drop or click to upload</p>
          </div>
        )}
      </Dragger>
    )
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div style={{ marginBottom: '16px' }}>
            <div style={headingStyle}>Banner</div>
            {
              display('banner', bannerId)
            }
          </div>
          <Alert
            message={
              <div>
                <span style={{ color: 'red' }}>*</span>
                {bannerUploadText}
              </div>
            }
            type="info"
            style={{ textAlign: 'center', margin: '8px 0' }}
          />

          <div>
            <div style={headingStyle}>Slide</div>
            {
              display('slide', slideId)
            }
          </div>
        </>
      )}
    </div>
  );
};

export default Slide;
