import React, { memo } from 'react';
import { PageSearch } from '@bhb-frontend/admin-components';
import { PageSearchProps } from '@bhb-frontend/admin-components/lib/PageSearch';
import { Card, Popover } from '@arco-design/web-react';
import { IconExclamationCircle } from '@arco-design/web-react/icon';

const testComponents = memo(() => {
  const config: PageSearchProps[] = [
    {
      type: 'inputGroup',
      formOptions: {
        field: 'group',
        label: '组合组件',
        // initialValue: { searchInput: '', searchType: '' },
      },
      groupKey: {
        inputKey: 'searchInput',
        selectKey: 'searchType',
      },
      options: {
        inputOptions: {
          placeholder: '请输入',
        },
        selectOptions: {
          placeholder: '请选择',
          options: [
            { label: '1', value: '1' },
            { label: '2', value: '2' },
          ],
        },
      },
    },
    {
      type: 'input',
      formOptions: {
        field: 'name',
        label: '名字',
        initialValue: '22222',
      },
      options: {
        placeholder: '请输入',
      },
    },
    {
      type: 'select',
      options: {
        options: [
          { label: '1', value: '1' },
          { label: '2', value: '2' },
        ],
      },
      formOptions: {
        field: 'name1',
        label: '选择',
        initialValue: '',
      },
    },
    {
      type: 'rangePicker',
      formOptions: {
        field: 'picker',
        label: (
          <>
            时间
            <Popover content="可筛选各渠道添加的模板">
              <IconExclamationCircle />
            </Popover>
          </>
        ),
      },
      options: {
        showTime: { defaultValue: ['00:00:00', '23:59:59'] },
      },
    },
  ];

  return (
    <Card>
      <PageSearch
        config={config}
        onChange={value => {
          console.log(value);
        }}
      />
    </Card>
  );
});

export default testComponents;
