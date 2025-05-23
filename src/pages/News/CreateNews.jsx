import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Switch, Select, Button, Row, Col, Collapse, Upload, Image, message, Checkbox } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import CKEditorForm from '../../utility/CKEditorForm';
import { PlusOutlined } from '@ant-design/icons';
import { api } from '../../components/Api/api';
import { useAuth } from '../../components/Auth';
import Loading from '../../components/Loading';
import { convertFormData, replaceSpecialCharacters, cleanUnusedImages } from '../../tools';

const { Option } = Select;
const { Item } = Form;
const { Panel } = Collapse;
// const host = 'https://cdn.anvui.vn/';

function CreateNews() {
  //data handler
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [areaData, setAreaData] = useState("");
  const [imageHolder, setImageHolder] = useState(null);
  const createTime = useRef(Math.floor(Date.now() / 1000));
  const cleanData = useRef(areaData);
  const auth = useAuth();

  //path handler
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const url = location.pathname + `?id=${id}`;
  const previous = '/news/news-list';

  const getCatIds = async (catIds) => {
    try {
      setLoading(true);
      const category = await api.get('/news/news-category');

      return category.data.map(item => ({
        title: item.title,
        checked: catIds ? (catIds.find(id => id === item.id) ? true : false) : false,
        id: item.id
      }))
    }
    catch (err) {
      if (err === 401) {
        auth.signOut(() => navigate('/login'));
      }
      else {
        navigate('/error');
      }
    }
    finally {
      setLoading(false);
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get(url);

      let procData = res.data;
      const details = procData.details;
      const create_time = procData.create_time;
      const catIds = procData.cat_id.split('|').filter(item => item !== "").map(Number);

      procData.cat_id = await getCatIds(catIds);

      createTime.current = create_time;
      procData.create_time = new Date(create_time * 1000).toLocaleDateString('vi-VN');

      setImageHolder(procData.img);
      cleanData.current = details;
      setAreaData(details);
      setData(procData);
    }
    catch (err) {
      if (err === 401) {
        auth.signOut(() => navigate('/login'));
      }
      else {
        navigate('/error');
      }
    }
    finally {
      setLoading(false);
    }
  }

  const reset = async () => {
    const initialFormData = {
      title: '',
      short: '',
      details: '',
      create_time: new Date(createTime.current * 1000).toLocaleDateString('vi-VN'),
      status: false,
      id_lang: 11,
      cat_id: await getCatIds(),
      meta_title: '',
      meta_keyword: '',
      meta_description: '',
      img: null,
    };

    setAreaData("");
    setImageHolder(null);
    setData(initialFormData);
    form.setFieldsValue(initialFormData);
  }

  useEffect(() => {
    if (id) {
      fetchData();
    }
    else {
      reset();
    }

    return () => {
      cleanUnusedImages(api, `${location.pathname}/clean-images`, cleanData.current, createTime.current);
    }
  }, [id])

  const handleAreaData = (e) => {
    setAreaData(e);
  }

  const handleCatId = (id, checked) => {
    let update = { ...data };
    update.cat_id.find(item => item.id === id).checked = checked;
    setData(update);
  }

  const handleFileUpload = async (file) => {
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

    setImageHolder(URL.createObjectURL(file));

    return false; // Prevent default upload behavior
  };

  const onFinish = async (values) => {
    const checkedIds = data.cat_id.reduce((acc, item) => {
      if (item.checked) {
        acc.push(item.id);
      }
      return acc;
    }, []);

    const convertedCatId = checkedIds.length > 0 ? '|' + checkedIds.join('|') + '|' : '||';

    values.create_time = createTime.current;
    values.cat_id = convertedCatId;
    values.img = values.img?.file;
    values.alias = replaceSpecialCharacters(values.title);
    values.status = values.status ? 1 : 0;
    values.details = areaData;
    values.id_lang = values.id_lang ? values.id_lang : 11;

    cleanData.current = areaData;

    const formData = convertFormData(values);

    setLoading(true);
    await api.post(id ? url : location.pathname, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => {
      setLoading(false);
      message.success(res.data.msg);
      navigate(previous);
    })
      .catch(err => {
        navigate('/error');
      })
  };

  return (
    <div>
      {
        loading ?
          (
            <Loading />
          )
          :
          (
            <Form
              style={{ maxWidth: '100%', fontSize: '16px', fontWeight: 500 }}
              name='dynamic_form_nest_item'
              onFinish={onFinish}
              form={form}
              initialValues={data}
            >
              <Row gutter={20}>
                <Col xs={25} md={17}>
                  <Item
                    label="Tiêu đề"
                    name="title"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                  >
                    <Input />
                  </Item>

                  <Item
                    label="Mô tả"
                    name="short"
                  >
                    <Input.TextArea rows={5} />
                  </Item>

                  <Item
                    label="Nội dung"
                    name="details"
                  >
                    <CKEditorForm
                      data={areaData}
                      handleChange={handleAreaData}
                      url="/news/create-news/upload-image"
                      name={createTime.current}
                    />
                  </Item>

                  <Item style={{ marginTop: '10px' }}>
                    <Collapse
                      accordion
                      expandIcon={({ isActive }) => <p rotate={isActive ? 90 : 0} />}
                    >
                      <Panel header="SEO" key="1">
                        <Item label="Meta Title" name='meta_title'>
                          <Input />
                        </Item>
                        <Item label="Meta Keyword" name='meta_keyword'>
                          <Input />
                        </Item>
                        <Item label="Meta Description" name='meta_description'>
                          <Input />
                        </Item>
                      </Panel>
                    </Collapse>
                  </Item>
                </Col>

                <Col xs={12} md={7}>
                  <Collapse
                    bordered={true}
                    expandIconPosition="right"
                  >
                    <Panel header="Thông tin" key="1">
                      <Item
                        name="create_time"
                        label="Ngày đăng"
                      >
                        <Input disabled />
                      </Item>

                      <Item label="Hiện/Ẩn" valuePropName="checked" name="status">
                        <Switch />
                      </Item>

                      <Item label="Ngôn ngữ" name="id_lang">
                        <Select>
                          <Option value={11}>Tiếng Việt</Option>
                          <Option value={12}>English</Option>
                        </Select>
                      </Item>

                      <Item label="Danh mục" name="cat_id">
                        <div style={{ border: '1px solid #d9d9d9', borderRadius: 4, padding: 8 }}>
                          {data.cat_id?.map((item, index) => (
                            <Checkbox
                              key={index}
                              checked={item.checked}
                              onChange={(e) => handleCatId(item.id, e.target.checked)}>
                              {item.title}
                            </Checkbox>
                          ))}
                        </div>
                      </Item>

                      <Item label="Ảnh" name="img">
                        <Upload.Dragger
                          beforeUpload={(file) => handleFileUpload(file)}
                          showUploadList={false}
                          style={{ width: '75%' }}
                        >
                          {
                            imageHolder ? (
                              <Image src={imageHolder} alt="" preview={false} />
                            )
                              :
                              (
                                <PlusOutlined />
                              )
                          }
                        </Upload.Dragger>
                      </Item>
                    </Panel>
                  </Collapse>
                </Col>
              </Row>

              <Item style={{ marginTop: '10px' }}>
                <Button type="primary" htmlType="submit" style={{ marginRight: '7.5px' }}>
                  Lưu
                </Button>
                <Button type="default" onClick={() => navigate(previous)}>Hủy</Button>
              </Item>
            </Form>
          )
      }
    </div>
  );
}

export default CreateNews;
