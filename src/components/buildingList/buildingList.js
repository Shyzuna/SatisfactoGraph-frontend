import React from "react";
import ReactDOM from "react-dom";

import Building from './../building/building.js';

class BuildingList extends React.Component {

    render() {
        const buildings = [
            {
                'name': 'Miner mk',
                'category': 'miner',
                'icon': 'bleeding'
            },
            {
                'name': 'Miner mk 2',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk 3',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk3',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk3',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk3',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk3',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk3',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk3',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk3',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk3',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk3',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk3',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk3',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk3',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk3',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk3',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk3',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk3',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk3',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk3',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk3',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk3',
                'category': 'miner',
                'icon': ''
            },
            {
                'name': 'Miner mk3',
                'category': 'miner',
                'icon': ''
            }
        ];

        const items = buildings.map((building, key) =>
            <Building key={key} name={building.name} category={building.category} icon={building.icon} />
        );
        return (
            <div className="building">
                {items}
            </div>
        );
    }
}

export default BuildingList;
