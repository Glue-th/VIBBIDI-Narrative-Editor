import React from 'react';
import classNames from 'classnames';
import { Button, Form } from 'antd';

const FormItem = Form.Item;

const LoginSubmit = ({ className, ...rest }) => {
    const clsString = classNames(styles.submit, className);
    return (
        <FormItem>
            <Button size="large" className={clsString} type="danger" htmlType="submit" {...rest} />
        </FormItem>
    );
};

export default LoginSubmit;
