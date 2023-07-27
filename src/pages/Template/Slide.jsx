import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../../components/Loading';
import { api } from '../../components/Api/api';
import { Upload, message, Alert } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const bannerUploadProps = {
  name: 'banner',
  multiple: false,
  showUploadList: true,
  customRequest: ({ onSuccess, onError, file }) => {
    // Your custom upload logic here for the "Banner" zone
    // Replace this with your actual logic for uploading the file to the backend and Cloudinary
    // onSuccess() and onError() should be called accordingly based on the result of the upload process
    // For example:
    // onSuccess();
    // onError('Upload failed');
  },
};

const slideUploadProps = {
  name: 'slide',
  multiple: true,
  showUploadList: true,
  customRequest: ({ onSuccess, onError, file }) => {
    // Your custom upload logic here for the "Slide" zone
    // Replace this with your actual logic for uploading the file to the backend and Cloudinary
    // onSuccess() and onError() should be called accordingly based on the result of the upload process
    // For example:
    // onSuccess();
    // onError('Upload failed');
  },
};

const Slide = () => {
  const [bannerImages, setBannerImages] = useState(null);
  const [slideImages, setSlideImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const bannerUploadText =
    'Kích thước hiển thị tốt nhất 1440*480px, hãy chọn các ảnh có cùng chiều dài, chiều rộng, chiều dài >= 1440px, chiều rộng >= 480px để hiển thị đạt chất lượng tốt nhất !';

  const draggerStyle = {
    padding: '50px',
    textAlign: 'center',
    backgroundColor: '#fafafa',
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: 'gray'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(location.pathname);
        console.log(res.data);
      }
      catch (err) {
        navigate('/error');
      }
      finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [])

  return (
    <div>
      {loading ?
        (
          <Loading />
        )
        :
        (
          <>
            <div style={{ marginBottom: '16px' }}>
              <div style={headingStyle}>Banner</div>
              <Dragger {...bannerUploadProps} style={draggerStyle}>
                <p style={{ textAlign: 'center', margin: '8px 0' }}>
                  <InboxOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
                </p>
                <p style={{ textAlign: 'center', margin: '8px 0' }}>Drag and drop or click to upload</p>
              </Dragger>
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
              <Dragger {...slideUploadProps} style={draggerStyle}>
                <p style={{ textAlign: 'center', margin: '8px 0' }}>
                  <InboxOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
                </p>
                <p style={{ textAlign: 'center', margin: '8px 0' }}>Drag and drop or click to upload</p>
              </Dragger>
            </div>
          </>
        )
      }
    </div>
  );
};

export default Slide;
