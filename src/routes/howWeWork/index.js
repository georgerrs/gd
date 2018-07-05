import React from 'react';
import Layout from '../../components/Layout';
import howWeWork from './howWeWork';

const title = 'How We Work';

export default {

  path: '/howWeWork',

  action() {
    return {
      title,
      component: <Layout><howWeWork title={title} /></Layout>,
    };
  },

};
