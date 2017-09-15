import React from 'react';
import FoundItemForm from '../../Forms/FoundItemForm/FoundItemForm';

import './found-item-section.scss';

const FoundItemSection = () => (
  <div styleName="found-item-section-wrapper">
    <h1>Report found item</h1>
    <FoundItemForm />
  </div>
);

export default FoundItemSection;
