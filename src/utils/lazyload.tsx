import React from 'react';
import loadable from '@loadable/component';
import { Spin } from '@arco-design/web-react';
import styles from '../layout/style/layout.module.less';

// https://github.com/gregberge/loadable-components/pull/226
function load(fn, options) {
  const Component = loadable(fn, options);
  // console.log(fn, 'ComponentComponent');

  Component.preload = fn?.requireAsync || fn;

  return Component;
}

function LoadingComponent(props) {
  const { error } = props;
  if (error) {
    console.error(error);
    return null;
  }
  return (
    <div className={styles.spin}>
      <Spin />
    </div>
  );
}

export default loader =>
  load(loader, {
    fallback: LoadingComponent({
      pastDelay: true,
      error: false,
      timedOut: false,
    }),
  });