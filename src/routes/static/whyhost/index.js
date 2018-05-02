import React from 'react';
import Layout from '../../../components/Layout';
import Page from '../../../components/Page';

export default {

  path: '/whyhost',

  async action({ locale }) {
    const data = await new Promise((resolve) => {
      require.ensure([], (require) => {
        resolve(require('./whyhost.md'));
      }, 'whyhost');
    });

    return {
      title: data.title,
      chunk: 'whyhost',
      component: <Layout><Page {...data} /></Layout>,
    };
  },

};
