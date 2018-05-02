import React from 'react';
import Home from './Home';
import fetch from '../../core/fetch';
import HomeLayout from '../../components/Layout/HomeLayout';

export default {

  path: '/',

  async action({store}) {
    const title = store.getState().siteSettings.data.siteTitle;
    const description = store.getState().siteSettings.data.metaDescription;
    
    return {
      title,
      description,
      chunk: 'home',
      component: <HomeLayout><Home /></HomeLayout>,
    };
  },

};
