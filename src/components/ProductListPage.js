import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductListPage({ number, currentCategory }) {
  const noCategoryLink = `/product/?_page=${number}`;
  const withCategoryLink = `/product/?category=${currentCategory}&_page=${number}`;
  if (currentCategory === 'all') {
    return (
      <li key={number} id={number}>
        <Link to={noCategoryLink}>{number}</Link>
      </li>
    );
  } else {
    return (
      <li key={number} id={number}>
        <Link to={withCategoryLink}>{number}</Link>
      </li>
    );
  }
}
