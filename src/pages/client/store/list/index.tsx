import FilterForm from '@/components/FilterForm';
import React from 'react'
import StoreListSchema from './schema';

interface StoreListProps {
  
}
const StoreList: React.FC<StoreListProps> = (props) => {

  return <div>
    <FilterForm formItemConfigList={StoreListSchema}></FilterForm>
  </div>
}

export default StoreList;