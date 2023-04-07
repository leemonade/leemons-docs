// src/theme/SearchBar.js

import React from 'react';
import EnhancedSearch from 'enhancedocs-search';

import 'enhancedocs-search/dist/style.css';

export default function SearchBarWrapper(props) {
  return (
    <EnhancedSearch
      config={{
        enhancedSearch: {
          projectId: "642f50979b7dab8fff36a6b8",
          accessToken: "pk_25d195f8f1352d4d6d3d5fd4cc6833e6ef5a1a8da0429a88"
        }
      }}
      {...props}
    />
  );
}
