import React from 'react'
import axios from 'axios'
import { Table, Button, Tooltip, Checkbox, Modal, Form, Input } from 'antd';
import {PlusOutlined} from '@ant-design/icons'

const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 10,
      span: 16,
    },
  };


function TodoTable() {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [dataSource, setDataSource] = React.useState([]);
    const [group, setGroup] = React.useState([]);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const onFinish = (values) => {
        setIsModalVisible(false);
        query({method: 'create', value: values});
        form.resetFields();
    };

    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const fetchData = (value, id) => {
        query({method: 'patch', value: value, id: id})
    }
    
    const query = async (data) => {
        console.log(data);
        switch (data.method) {
            case 'create':
                await axios.post('http://localhost:5000/todo', data.value)
                    .then(response => {
                        setDataSource([...dataSource, response.data.data]);

                        if (!group.includes(response.data.data.group)) setGroup([...group, response.data.data.group]);
                    });
              break;
              
            case 'get':
                await axios.get('http://localhost:5000/todo')
                    .then((response) => {
                        console.log(response.data.data)
                        if(response.data.data !== null) {
                            const newData = response.data.data.map(v => v)
                            setDataSource(newData);
                            const newGroup = [...new Set(newData.map((v) => v.group))]
                            setGroup(newGroup);
                        }
                    });
                break;

            case 'patch':
                await axios.patch(`http://localhost:5000/todo/${data.id}`, data.value)
                    .then((response) => console.log(response.data))
                break;

            // case 'delete':
            //   axios.delete(`/api/elements?${data.field}=${data.value}`)
            //         .then(response => Notifications(response.data));
            //   break;
            default:
              break;
        }
    }

    React.useEffect(() => {
        query({method: 'get'});
        // eslint-disable-next-line
    }, [])

    const columns = [
        {
            title: '',
            dataIndex: 'state',
            align: 'center',
            className: 'Todo-Col',
            render: (isDone, record) => <Checkbox defaultChecked={isDone} onChange={(e) => fetchData({state:e.target.checked}, record._id)}></Checkbox>
        },
        {
            title: '그룹',
            dataIndex: 'group',
            className: 'Todo-Col',
            width: '30%',
            align: 'center',
            filters: group.map(v => {
                return {text: v, value: v};
            })/* [
                {text: 'A', value: 'A'},
                {text: 'B', value: 'B'}
            ] */,
            onFilter: (value, record) => record.group.indexOf(value) === 0
        },
        {
          title: '할 일',
          dataIndex: 'task',
          className: 'Todo-Col',
          width: '60%',
          align: 'center'
        }
    ];

    return (
        <div>
            <Table bordered className="Todo-Table" columns={columns} dataSource={dataSource} pagination={false} />

            <div className="Todo-Add-Container">
                <Tooltip title="새 데이터 추가">
                    <Button onClick={showModal} shape="circle" icon={<PlusOutlined />} />
                </Tooltip>
            </div>

            <Modal title="Add TODO" visible={isModalVisible} onCancel={handleCancel} footer={[]}>
                <Form  {...layout} form={form} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Form.Item label="Group Name" name="group" rules={[{required: true, message: 'Please input group name !'}]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Task" name="task" rules={[{required: true, message: 'Please input task !'}]}>
                        <Input />
                    </Form.Item>


                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
            
            
        </div>
     
    )
}

export default TodoTable