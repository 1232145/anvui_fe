import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../../components/Loading';
import { api } from '../../components/Api/api';
import { Upload, message, Alert, Image } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const host = 'https://cdn.anvui.vn/';

const imagePreviewContainerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
};

const imageContainerStyle = {
  display: 'flex',
  width: '155px',
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 20,
};

const imageStyle = {
  cursor: 'pointer',
  objectFit: 'cover',
  width: '100%',
  height: '125px',
  margin: 0
};

const draggerStyle = {
  padding: '75px',
  textAlign: 'center',
  backgroundColor: '#fafafa',
};

const headingStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '16px',
  color: 'gray'
};

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
  const [data, setData] = useState({ slide: [], banner: [] })
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const bannerUploadText = 'Kích thước hiển thị tốt nhất 1440*480px, hãy chọn các ảnh có cùng chiều dài, chiều rộng, chiều dài >= 1440px, chiều rộng >= 480px để hiển thị đạt chất lượng tốt nhất !';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(location.pathname);
        const groupedData = res.data.reduce((acc, curr, index) => {
          const { slide_id } = curr;
          curr.key = index;

          if (slide_id === 1956) {
            acc.banner.push(curr);
          }
          else if (slide_id === 2107) {
            acc.slide.push(curr);
          }

          return acc;
        }, { slide: [], banner: [] });

        setData(groupedData);
      }
      catch (err) {
        navigate('/error');
      }
      finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleImageClick = (e) => {
    e.stopPropagation();
  };

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
              <Dragger {...bannerUploadProps} style={draggerStyle} showUploadList={false}>
                {
                  data.banner.length === 0 ?
                    (
                      <>
                        <p style={{ textAlign: 'center', margin: '8px 0' }}>
                          <InboxOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
                        </p>
                        <p style={{ textAlign: 'center', margin: '8px 0' }}>Drag and drop or click to upload</p>
                      </>
                    )
                    :
                    (
                      <div style={imagePreviewContainerStyle}>
                        <Image.PreviewGroup>
                          {data.banner.map((item) => (
                            <div key={item.id} style={imageContainerStyle}>
                              <Image
                                src={host + item.src_link}
                                style={imageStyle}
                                onClick={handleImageClick}
                              />
                            </div>
                          ))}
                        </Image.PreviewGroup>
                      </div>
                    )
                }
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
              <Dragger {...slideUploadProps} style={draggerStyle} showUploadList={false}>
              {
                  data.banner.length === 0 ?
                    (
                      <>
                        <p style={{ textAlign: 'center', margin: '8px 0' }}>
                          <InboxOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
                        </p>
                        <p style={{ textAlign: 'center', margin: '8px 0' }}>Drag and drop or click to upload</p>
                      </>
                    )
                    :
                    (
                      <div style={imagePreviewContainerStyle}>
                        <Image.PreviewGroup>
                          {data.slide.map((item) => (
                            <div key={item.id} style={imageContainerStyle}>
                              <Image
                                src={host + item.src_link}
                                style={imageStyle}
                                onClick={handleImageClick}
                              />
                            </div>
                          ))}
                        </Image.PreviewGroup>
                      </div>
                    )
                }
              </Dragger>
            </div>
          </>
        )
      }
    </div>
  );
};

export default Slide;
