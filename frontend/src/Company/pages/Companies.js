import React from 'react';

import CompaniesList from '../components/CompaniesList';

const Companies = () => {
    const companies = [
        {id: '1', name: 'First', printersCount: 10},
        {id: '2', name: 'OpenAI', printersCount: 10},
        {id: '3', name: 'Youtube', printersCount: 10},
        {id: '4', name: 'YAY', printersCount: 10},
    ];
    return <CompaniesList items = {companies} />;
};

export default Companies;